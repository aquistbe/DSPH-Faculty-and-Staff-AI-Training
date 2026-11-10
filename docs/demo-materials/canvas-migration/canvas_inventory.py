#!/usr/bin/env python3
"""
canvas_inventory.py -- list what is in a Canvas course after a Blackboard import.

READ-ONLY. This script only reads from Canvas (GET requests). It never changes
anything in your course.

It writes inventory.md: modules and their items, pages, assignments, quizzes,
discussions, files, and the issues Canvas reported during the import. It also
flags likely problems: links that still point to Blackboard, empty pages,
duplicate titles, content that is not in any module, and assignments with no
due date.

The inventory contains course content only (titles, IDs, dates). It does not
read grades, submissions, or rosters. Check file names before you paste the
inventory into an AI tool: an uploaded file can be named after a student.

Setup (Mac Terminal; on Windows PowerShell use $env:NAME="value"):
    export CANVAS_BASE_URL="https://canvas.drexel.edu"
    export CANVAS_TOKEN="paste-your-token-here"

Run:
    python3 canvas_inventory.py COURSE_ID

COURSE_ID is the number in the course URL: .../courses/123456

Uses only the Python standard library. No installs needed.
"""

import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter

# Text that suggests a link still points to Blackboard. Add your own
# Blackboard address if your old links use a different domain.
BLACKBOARD_PATTERNS = ["bbcswebdav", "/webapps/", "blackboard"]


def api_get_all(base, token, path, params=None):
    """GET every page of results from a Canvas list endpoint.

    Canvas returns long lists in pages and gives the next page's address in
    the 'Link' header. This follows those links until there are no more.
    """
    params = dict(params or {})
    params.setdefault("per_page", 100)
    url = f"{base}/api/v1{path}?{urllib.parse.urlencode(params, doseq=True)}"
    results = []
    while url:
        req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                data = json.load(resp)
                link = resp.headers.get("Link", "")
        except urllib.error.HTTPError as e:
            if e.code == 401:
                sys.exit("Canvas rejected the token (401). Check CANVAS_TOKEN and that it hasn't expired.")
            # 403 = no permission; 404 = wrong course ID or the feature is
            # off in this course. Note it and keep going.
            print(f"  ! {e.code} on {path}: {e.reason}", file=sys.stderr)
            return results
        except urllib.error.URLError as e:
            sys.exit(f"Could not reach Canvas at {base}: {e.reason}. Check CANVAS_BASE_URL.")
        if isinstance(data, list):
            results.extend(data)
        else:
            return data
        match = re.search(r'<([^>]+)>;\s*rel="next"', link)
        url = match.group(1) if match else None
    return results


def blackboard_links(html):
    """Return links in a page body that look like they point to Blackboard."""
    links = re.findall(r'(?:href|src)="([^"]+)"', html or "")
    return [u for u in links if any(p in u.lower() for p in BLACKBOARD_PATTERNS)]


def word_count(html):
    text = re.sub(r"<[^>]+>", " ", html or "")
    return len(text.split())


def main():
    if len(sys.argv) != 2:
        sys.exit("Usage: python3 canvas_inventory.py COURSE_ID")
    course = sys.argv[1]
    base = os.environ.get("CANVAS_BASE_URL", "").rstrip("/")
    token = os.environ.get("CANVAS_TOKEN", "")
    if not base or not token:
        sys.exit("Set CANVAS_BASE_URL and CANVAS_TOKEN first (see the top of this file).")

    c = f"/courses/{course}"
    print("Reading course content from Canvas (read-only)...")
    course_info = api_get_all(base, token, c)
    if not course_info:
        sys.exit(f"Could not read course {course}. Check the course ID and that you teach it.")
    modules = api_get_all(base, token, f"{c}/modules", {"include[]": "items"})
    for m in modules:
        if m.get("items") is None:  # Canvas leaves items out for big modules
            m["items"] = api_get_all(base, token, f"{c}/modules/{m['id']}/items")
    pages = api_get_all(base, token, f"{c}/pages", {"include[]": "body"})
    assignments = api_get_all(base, token, f"{c}/assignments")
    quizzes = api_get_all(base, token, f"{c}/quizzes")
    discussions = api_get_all(base, token, f"{c}/discussion_topics")
    files = api_get_all(base, token, f"{c}/files")
    migrations = api_get_all(base, token, f"{c}/content_migrations")

    # Issues Canvas logged during the most recent import.
    issues = []
    if migrations:
        latest = max(migrations, key=lambda m: m.get("finished_at") or m.get("started_at") or "")
        issues = api_get_all(base, token, f"{c}/content_migrations/{latest['id']}/migration_issues")

    # What is linked from a module?
    in_module = set()
    for m in modules:
        for it in m.get("items", []):
            in_module.add((it.get("type"), str(it.get("content_id") or it.get("page_url") or "")))

    # Assignments that are quizzes or discussions show up in both lists;
    # count them once, under their own type.
    quiz_assignment_ids = {str(q.get("assignment_id")) for q in quizzes if q.get("assignment_id")}
    disc_assignment_ids = {str(d.get("assignment", {}).get("id")) for d in discussions if d.get("assignment")}
    plain_assignments = [a for a in assignments
                         if str(a["id"]) not in quiz_assignment_ids | disc_assignment_ids]

    out = []
    w = out.append
    name = course_info.get("name", course) if isinstance(course_info, dict) else course
    w(f"# Inventory: {name} (course {course})\n")
    w("Course content only: no grades, submissions, or rosters. "
      "**Check file names before pasting this into an AI tool.**\n")
    w(f"Counts: {len(modules)} modules, {len(pages)} pages, {len(plain_assignments)} assignments, "
      f"{len(quizzes)} quizzes, {len(discussions)} discussions, {len(files)} files, "
      f"{len(issues)} import issues.\n")

    # ---- Flags first: this is the cleanup list ----
    w("## Flags\n")
    flagged = False
    for p in pages:
        bad = blackboard_links(p.get("body"))
        if bad:
            flagged = True
            w(f"- Page **{p['title']}** ({p.get('url')}) has {len(bad)} link(s) that still point to Blackboard.")
        if word_count(p.get("body")) < 15:
            flagged = True
            w(f"- Page **{p['title']}** ({p.get('url')}) is empty or nearly empty ({word_count(p.get('body'))} words).")
    for kind, items in [("Page", pages), ("Assignment", plain_assignments),
                        ("Quiz", quizzes), ("Discussion", discussions)]:
        key = "title" if kind in ("Page", "Discussion", "Quiz") else "name"
        for title, n in Counter(i.get(key, "") for i in items).items():
            if n > 1:
                flagged = True
                w(f"- {n} {kind.lower()}s share the title **{title}** (possible duplicates).")
    for p in pages:
        if ("Page", p.get("url", "")) not in in_module:
            flagged = True
            w(f"- Page **{p['title']}** ({p.get('url')}) is not in any module.")
    for a in plain_assignments:
        if ("Assignment", str(a["id"])) not in in_module:
            flagged = True
            w(f"- Assignment **{a['name']}** is not in any module.")
        if not a.get("due_at"):
            flagged = True
            w(f"- Assignment **{a['name']}** has no due date.")
    if not flagged:
        w("- No flags.")
    w("")

    # ---- Import issues ----
    w("## Import issues reported by Canvas\n")
    if issues:
        for i in issues:
            w(f"- [{i.get('issue_type', '')}] {i.get('description', '')}")
    else:
        w("- None reported (or no import found in this course).")
    w("")

    # ---- Full listing, with IDs the module-building script can use ----
    w("## Modules\n")
    for m in sorted(modules, key=lambda m: m.get("position", 0)):
        state = "published" if m.get("published") else "unpublished"
        w(f"### {m.get('position')}. {m['name']} ({state}, id {m['id']})")
        for it in m.get("items", []):
            ref = it.get("page_url") or it.get("content_id") or it.get("external_url") or ""
            w(f"- {'  ' * it.get('indent', 0)}{it.get('type')}: {it.get('title')} [ref {ref}]")
        w("")

    w("## Pages\n")
    w("| Title | ref (page_url) | Words | Published |\n|---|---|---|---|")
    for p in pages:
        w(f"| {p['title']} | {p.get('url')} | {word_count(p.get('body'))} | {p.get('published')} |")
    w("")
    w("## Assignments\n")
    w("| Name | ref (id) | Due | Points | Published |\n|---|---|---|---|---|")
    for a in plain_assignments:
        w(f"| {a['name']} | {a['id']} | {a.get('due_at') or '—'} | {a.get('points_possible')} | {a.get('published')} |")
    w("")
    w("## Quizzes\n")
    w("| Title | ref (id) | Due | Published |\n|---|---|---|---|")
    for q in quizzes:
        w(f"| {q['title']} | {q['id']} | {q.get('due_at') or '—'} | {q.get('published')} |")
    w("")
    w("## Discussions\n")
    w("| Title | ref (id) | Published |\n|---|---|---|")
    for d in discussions:
        w(f"| {d['title']} | {d['id']} | {d.get('published')} |")
    w("")
    w("## Files\n")
    w("| Name | ref (id) | Size (KB) |\n|---|---|---|")
    for f in files:
        w(f"| {f.get('display_name')} | {f['id']} | {round((f.get('size') or 0) / 1024)} |")
    w("")

    with open("inventory.md", "w", encoding="utf-8") as fh:
        fh.write("\n".join(out))
    print(f"Wrote inventory.md ({len(pages)} pages, {len(modules)} modules, {len(issues)} import issues).")


if __name__ == "__main__":
    main()
