# IT Awareness Club Website

A responsive, frontend-only website built with HTML5, CSS3, and Vanilla JavaScript.
No backend, no database, no build step — open `index.html` or serve the folder.

## Run locally

Because pages fetch JSON files, open the site through a local server (not `file://`):

```bash
# Python (pre-installed on most systems)
python3 -m http.server 8000
# then visit http://localhost:8000
```

Or use the VS Code "Live Server" extension.

## How to update content (no coding required)

| To… | Edit this file |
|---|---|
| Add / edit an activity | `data/activities.json` |
| Add an achievement to the timeline | `data/achievements.json` |
| Add a new generation of members | `data/members.json` (add a new year key) |
| Post news on the homepage | `data/news.json` |

Put images in the matching folder under `assets/images/` and reference the path in the JSON.
Recommended: WebP format, card images ≤ 120 KB, ~600 px wide.

### Example: adding Generation 2027

```json
"2027": [
  { "name": "New President", "role": "President", "photo": "assets/images/members/2027/president.webp" }
]
```

That's it — the About page tabs update automatically.

## Project structure

- `css/variables.css` — all colors, fonts, spacing (change the theme here only)
- `css/components.css` — reusable pieces: navbar, cards, buttons, chips, lightbox
- `js/main.js` — global behavior (menu, back-to-top, preloader)
- `js/activities.js`, `js/achievements.js`, `js/about.js` — page logic (render JSON)
- `data/` — all editable content
- `assets/` — images, icons, logo

## Deploy free with GitHub Pages

1. Push this folder to a GitHub repository.
2. Repo → Settings → Pages → Source: `main` branch, root folder.
3. Your site goes live at `https://<username>.github.io/<repo>/`.

## Rules for contributors

- Only animate `transform` and `opacity`.
- Every image needs an `alt` attribute.
- Buttons are `<button>`, navigation is `<a>` — never clickable `<div>`s.
- Run a Lighthouse audit before merging: Performance ≥ 90, Accessibility ≥ 95.

See `IT-Awareness-Club-PRD.pdf` for the full requirements document.
