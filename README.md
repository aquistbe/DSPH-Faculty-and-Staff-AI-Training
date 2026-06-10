# DSPH Faculty & Staff AI Training

Source for the **AI Workshops for DSPH** website — a hands-on workshop series introducing AI tools to staff and faculty at the Dornsife School of Public Health, Drexel University.

**Live site:** https://aquistbe.github.io/DSPH-Faculty-and-Staff-AI-Training/

## About the series

Short, hands-on, one-hour workshops. Each is a brief overview followed by activities that fit in the hour. One general track for administrative staff, research staff, and faculty; specialized research-coding sessions and additional topics follow later.

| # | Workshop | Date |
|---|----------|------|
| 1 | Foundations & Capabilities | June 29, 2026 |
| 2 | Workflow Enhancement | July 7, 2026 |
| 3 | Collaboration on Projects | July 14, 2026 |
| 4 | Documents & Visuals (Adobe) | Fall 2026 (TBD) |

The series repeats in fall. Focus is on Drexel-approved tools: **ChatGPT Edu**, **Microsoft Copilot**, **Zoom AI Companion**, and **Adobe Creative Cloud Pro**, with data-handling guidance throughout.

## How it's built

The site is built with [Quarto](https://quarto.org). Content lives in plain-text `.qmd` files; Quarto renders them to HTML in `docs/`, which GitHub Pages serves.

- `index.qmd` — home (overview, schedule, data-privacy)
- `workshop1.qmd` … `workshop4.qmd` — individual sessions
- `tools.qmd` — Drexel-approved tools and data rules
- `resources.qmd` — guides and further learning
- `_quarto.yml` — site config (navigation, theme)
- `styles.css` — Drexel-themed styling
- `docs/` — rendered output served by GitHub Pages

## Editing and publishing

1. Edit a `.qmd` file.
2. Render: `quarto render`
3. Commit and push:

   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```

The live site updates a minute or two after each push.

## Visibility

The site includes a `noindex` tag and a `robots.txt` so it is not listed by search engines. This is not access control — anyone with the link can view it. For a true Drexel-login restriction, the site would need to be hosted behind Drexel SSO.

## Contact

D. Alex Quistberg, PhD, MPH — [daq26@drexel.edu](mailto:daq26@drexel.edu)
