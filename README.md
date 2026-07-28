# Rahul Verma — Portfolio Site

A single-page, animated portfolio site. No build step, no npm install — just HTML, CSS, and vanilla JS.

## Files

```
portfolio/
├── index.html      → structure & content (edit text/sections here)
├── css/
│   └── style.css   → all styling, colors, layout, responsive rules
├── js/
│   └── script.js   → animations, scroll effects, form logic
└── README.md
```

## Opening it in VS Code

1. Unzip the folder and open it in VS Code (`File → Open Folder…`).
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions tab — this gives you auto-reload as you edit, and fixes any issues with animations/scroll effects that can behave oddly when opened as a raw `file://` path.
3. Right-click `index.html` → **Open with Live Server**. It'll open in your browser and refresh automatically every time you save.

(You can also just double-click `index.html` to open it directly in a browser — everything works, but Live Server is smoother while editing.)

## Where to make common changes

- **Text/content** → `index.html`. Sections are clearly commented (`<!-- HERO -->`, `<!-- PROJECTS -->`, etc.).
- **Colors** → top of `css/style.css`, in the `:root { ... }` block. Change `--teal`, `--gold`, `--bg`, etc. and it updates everywhere.
- **Fonts** → the Google Fonts `<link>` near the top of `index.html`, plus `--serif` / `--sans` variables in `style.css`.
- **Add a project** → duplicate a `.project-row` block in `index.html` under `<!-- PROJECTS -->` and edit the text/tags.
- **Add a service card** → duplicate a `.service-card` block under `<!-- SERVICES -->`.
- **Real photos** → drop image files into `assets/`, then swap the placeholder `<div class="initials">RV</div>` / `.about-photo` divs for `<img src="assets/yourphoto.jpg">` tags.
- **Contact form** → currently shows a success toast only (no backend). To actually receive messages, connect it to a service like Formspree, Getform, or your own backend endpoint in `js/script.js`'s form submit handler.

## Notes

- Icons come from Font Awesome (loaded via CDN in `index.html`) — browse more icons at fontawesome.com and swap the `<i class="fa-solid fa-...">` classes.
- The scroll-triggered fade-ins, timeline, skill rings, and testimonial carousel are all vanilla JS in `script.js` — no framework required.
- Fully responsive down to mobile; the hamburger menu logic is also in `script.js`.
