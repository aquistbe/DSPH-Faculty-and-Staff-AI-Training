#!/usr/bin/env python3
"""
canvas_build_modules.py -- build Canvas modules from a plan you have reviewed.

DRY RUN BY DEFAULT. Without --apply, this prints what it would do and changes
nothing. With --apply, it creates new modules (unpublished) and adds items to
them. It never deletes or edits existing modules or content.

The plan is a CSV file with these columns:

    module,type,ref,title,indent

    module  Module name, e.g. "Week 1: Cities and Health"
    type    Page, Assignment, Quiz, Discussion, File, SubHeader, or ExternalUrl
    ref     Page: the page's url slug (from inventory.md, e.g. "week-1-overview")
            Assignment, Quiz, Discussion, File: the numeric id from inventory.md
            ExternalUrl: the full web address
            SubHeader: leave blank
    title   Optional for most types; required for SubHeader and ExternalUrl
    indent  Optional: 0, 1, or 2

Rows for the same module must be together. Modules are created in the order
they first appear.

Setup (Mac Terminal; on Windows PowerShell use $env:NAME="value"):
    export CANVAS_BASE_URL="https://canvas.drexel.edu"
    export CANVAS_TOKEN="paste-your-token-here"

Run:
    python3 canvas_build_modules.py COURSE_ID module_plan.csv            # dry run
    python3 canvas_build_modules.py COURSE_ID module_plan.csv --apply    # make changes

Always run it in a sandbox course first.

Uses only the Python standard library. No installs needed.
"""

import csv
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

TYPES = {"Page", "Assignment", "Quiz", "Discussion", "File", "SubHeader", "ExternalUrl"}


def request(base, token, method, path, fields=None):
    """Send one request to the Canvas API and return the JSON reply."""
    data = urllib.parse.urlencode(fields or {}, doseq=True).encode() if fields else None
    req = urllib.request.Request(f"{base}/api/v1{path}", data=data, method=method,
                                 headers={"Authorization": f"Bearer {token}"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.load(resp), resp.headers.get("Link", "")


def get_all(base, token, path):
    """GET every page of a Canvas list."""
    out, url_path = [], f"{path}?per_page=100"
    while url_path:
        data, link = request(base, token, "GET", url_path)
        out.extend(data)
        m = re.search(r'<[^>]*?/api/v1([^>]+)>;\s*rel="next"', link)
        url_path = m.group(1) if m else None
    return out


def main():
    args = [a for a in sys.argv[1:] if a != "--apply"]
    apply = "--apply" in sys.argv
    if len(args) != 2:
        sys.exit("Usage: python3 canvas_build_modules.py COURSE_ID module_plan.csv [--apply]")
    course, plan_file = args
    base = os.environ.get("CANVAS_BASE_URL", "").rstrip("/")
    token = os.environ.get("CANVAS_TOKEN", "")
    if not base or not token:
        sys.exit("Set CANVAS_BASE_URL and CANVAS_TOKEN first (see the top of this file).")
    c = f"/courses/{course}"

    with open(plan_file, newline="", encoding="utf-8-sig") as fh:
        rows = [{k.strip().lower(): (v or "").strip() for k, v in r.items()} for r in csv.DictReader(fh)]

    # ---- Check the plan against what is really in the course ----
    print("Checking the plan against the course (read-only)...")
    # For each type, map the ref used in the plan to the item's title.
    known = {
        "Page": {p["url"]: p["title"] for p in get_all(base, token, f"{c}/pages")},
        "Assignment": {str(a["id"]): a["name"] for a in get_all(base, token, f"{c}/assignments")},
        "Quiz": {str(q["id"]): q["title"] for q in get_all(base, token, f"{c}/quizzes")},
        "Discussion": {str(d["id"]): d["title"] for d in get_all(base, token, f"{c}/discussion_topics")},
        "File": {str(f["id"]): f["display_name"] for f in get_all(base, token, f"{c}/files")},
    }
    existing_modules = {m["name"] for m in get_all(base, token, f"{c}/modules")}

    problems = []
    for n, r in enumerate(rows, start=2):  # row 1 is the header
        t = r.get("type", "")
        if t not in TYPES:
            problems.append(f"row {n}: unknown type '{t}'")
        elif t in known and r.get("ref") not in known[t]:
            problems.append(f"row {n}: {t} '{r.get('ref')}' is not in this course")
        elif t in ("SubHeader", "ExternalUrl") and not r.get("title"):
            problems.append(f"row {n}: {t} needs a title")
        elif t == "ExternalUrl" and not r.get("ref", "").startswith("http"):
            problems.append(f"row {n}: ExternalUrl needs a full web address in ref")
        if not r.get("module"):
            problems.append(f"row {n}: no module name")
    if problems:
        print("\nFix these rows before running again. Nothing was changed.")
        for p in problems:
            print("  -", p)
        sys.exit(1)

    # ---- Group rows into modules, keeping order ----
    order, items = [], {}
    for r in rows:
        if r["module"] not in items:
            order.append(r["module"])
            items[r["module"]] = []
        items[r["module"]].append(r)

    print(f"\n{'APPLYING' if apply else 'DRY RUN (nothing will change)'}: "
          f"{len(order)} modules, {len(rows)} items\n")
    for name in order:
        note = "  (a module with this name already exists; a second one will be created)" \
            if name in existing_modules else ""
        print(f"Module: {name}{note}")
        module_id = None
        if apply:
            mod, _ = request(base, token, "POST", f"{c}/modules", {"module[name]": name})
            module_id = mod["id"]
            # Keep new modules hidden from students until you review them.
            request(base, token, "PUT", f"{c}/modules/{module_id}", {"module[published]": "false"})
        for r in items[name]:
            t, ref = r["type"], r.get("ref", "")
            fields = {"module_item[type]": t}
            if r.get("title"):
                fields["module_item[title]"] = r["title"]
            if r.get("indent", "").isdigit():
                fields["module_item[indent]"] = r["indent"]
            if t == "Page":
                fields["module_item[page_url]"] = ref
            elif t == "ExternalUrl":
                fields["module_item[external_url]"] = ref
            elif t != "SubHeader":
                fields["module_item[content_id]"] = ref
            print(f"   + {t}: {r.get('title') or known.get(t, {}).get(ref, ref)}")
            if apply:
                try:
                    request(base, token, "POST", f"{c}/modules/{module_id}/items", fields)
                except urllib.error.HTTPError as e:
                    print(f"     ! Canvas refused this item ({e.code}). Check it by hand.")
    print("\nDone." if apply else "\nDry run finished. Run again with --apply to make these changes.")
    if apply:
        print("New modules are UNPUBLISHED. Review them in Canvas, then publish.")


if __name__ == "__main__":
    try:
        main()
    except urllib.error.HTTPError as e:
        if e.code == 401:
            sys.exit("Canvas rejected the token (401). Check CANVAS_TOKEN and that it hasn't expired.")
        sys.exit(f"Canvas returned an error ({e.code} {e.reason}). Check the course ID and your access.")
    except urllib.error.URLError as e:
        sys.exit(f"Could not reach Canvas: {e.reason}. Check CANVAS_BASE_URL.")
