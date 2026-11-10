#!/usr/bin/env python3
"""
canvas_pages.py -- download Canvas pages to edit, then upload your edits.

    python3 canvas_pages.py export COURSE_ID            # read-only
    python3 canvas_pages.py update COURSE_ID            # dry run: shows what would change
    python3 canvas_pages.py update COURSE_ID --apply    # uploads changed pages

export   Saves every page to pages/<page-url>.html. Nothing in Canvas changes.

update   Compares each file in pages/ with the page now in Canvas. Only pages
         you changed are listed. With --apply, it first saves the current
         Canvas version to backup/<page-url>.html, then uploads your version.
         It never creates or deletes pages, and never touches page titles.

Edit the files in pages/ with any editor, or paste one into ChatGPT Edu or
Claude, ask for a cleaned-up version, and save the result over the file. Check
each page has no student names, grades, or feedback before you paste it.

Setup (Mac Terminal; on Windows PowerShell use $env:NAME="value"):
    export CANVAS_BASE_URL="https://canvas.drexel.edu"
    export CANVAS_TOKEN="paste-your-token-here"

Always try it in a sandbox course first.

Uses only the Python standard library. No installs needed.
"""

import json
import os
import re
import sys
import urllib.parse
import urllib.request


def request(base, token, method, path, fields=None):
    data = urllib.parse.urlencode(fields).encode() if fields else None
    req = urllib.request.Request(f"{base}/api/v1{path}", data=data, method=method,
                                 headers={"Authorization": f"Bearer {token}"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.load(resp), resp.headers.get("Link", "")


def all_pages(base, token, course):
    out, path = [], f"/courses/{course}/pages?per_page=100&include[]=body"
    while path:
        data, link = request(base, token, "GET", path)
        out.extend(data)
        m = re.search(r'<[^>]*?/api/v1([^>]+)>;\s*rel="next"', link)
        path = m.group(1) if m else None
    return out


def same(a, b):
    """Treat pages as unchanged if only spacing differs."""
    return " ".join((a or "").split()) == " ".join((b or "").split())


def main():
    args = [a for a in sys.argv[1:] if a != "--apply"]
    apply = "--apply" in sys.argv
    if len(args) != 2 or args[0] not in ("export", "update"):
        sys.exit(__doc__)
    mode, course = args
    base = os.environ.get("CANVAS_BASE_URL", "").rstrip("/")
    token = os.environ.get("CANVAS_TOKEN", "")
    if not base or not token:
        sys.exit("Set CANVAS_BASE_URL and CANVAS_TOKEN first (see the top of this file).")

    pages = all_pages(base, token, course)

    if mode == "export":
        os.makedirs("pages", exist_ok=True)
        for p in pages:
            with open(os.path.join("pages", f"{p['url']}.html"), "w", encoding="utf-8") as fh:
                fh.write(p.get("body") or "")
        print(f"Saved {len(pages)} pages to pages/. Nothing in Canvas changed.")
        return

    # update
    current = {p["url"]: p for p in pages}
    changed = []
    for fname in sorted(os.listdir("pages")):
        if not fname.endswith(".html"):
            continue
        slug = fname[:-5]
        if slug not in current:
            print(f"  ? pages/{fname} has no matching page in Canvas; skipped.")
            continue
        with open(os.path.join("pages", fname), encoding="utf-8") as fh:
            new = fh.read()
        if not same(new, current[slug].get("body")):
            changed.append((slug, new))

    if not changed:
        print("No pages differ from Canvas. Nothing to do.")
        return
    print(f"{'UPLOADING' if apply else 'DRY RUN (nothing will change)'}: {len(changed)} changed page(s)")
    for slug, new in changed:
        print(f"  - {current[slug]['title']}  ({slug})")
        if apply:
            os.makedirs("backup", exist_ok=True)
            with open(os.path.join("backup", f"{slug}.html"), "w", encoding="utf-8") as fh:
                fh.write(current[slug].get("body") or "")
            request(base, token, "PUT", f"/courses/{course}/pages/{urllib.parse.quote(slug)}",
                    {"wiki_page[body]": new})
    if apply:
        print("Done. Originals are in backup/. Check each page in Canvas with Student View.")
    else:
        print("Run again with --apply to upload these pages.")


if __name__ == "__main__":
    import urllib.error
    try:
        main()
    except urllib.error.HTTPError as e:
        if e.code == 401:
            sys.exit("Canvas rejected the token (401). Check CANVAS_TOKEN and that it hasn't expired.")
        sys.exit(f"Canvas returned an error ({e.code} {e.reason}). Check the course ID and your access.")
    except urllib.error.URLError as e:
        sys.exit(f"Could not reach Canvas: {e.reason}. Check CANVAS_BASE_URL.")
    except FileNotFoundError:
        sys.exit("No pages/ folder here. Run 'export' first, in this same folder.")
