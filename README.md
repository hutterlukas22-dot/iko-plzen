# IKO stavby s.r.o. — Web portal

Premium redesign & implementation of the IKO Plzeň website. A contemporary,
editorial real-estate-developer experience built as a fast, dependency-free
**static site** generated from structured data — a digital interpretation of the
IKO Design System (dodatek 2026): Figtree, IKO Blue `#005EAA` + white, the tape
motif, clean squared geometry, restrained motion.

## Stack
- Custom Node static-site generator (ESM template functions → `dist/`), no framework runtime.
- Vanilla CSS (design tokens, fluid `clamp()` type, CSS Grid) — `public/css/site.css`.
- Vanilla JS, progressive enhancement, `prefers-reduced-motion` aware — `public/js/app.js`.
- Figtree via Google Fonts. Icons are inlined SVG (Lucide-style), no CDN.

## Commands
```bash
npm run build     # render data + templates → dist/
npm run serve     # static server for dist/  → http://localhost:4321
npm run dev       # build + serve
```
Optional: `powershell -File optimize-images.ps1` regenerates optimized project
imagery (`-lg` ≤1920px, `-sm` ≤900px) from the source visualization folders.

## Structure
```
src/
  data/site.js         company, nav, contact, services, milestones, career, principles
  data/projects.js     portfolio (featured w/ galleries, pipeline, completed) + SEO slugs
  components.js         layout shell, header, mobile menu, footer, tape, stat band
  blocks.js            project card/row, gallery, meta, units table, timeline, forms…
  pages/*.js           home, projekty, projekt (detail template), o-nas, sluzby, kariera, kontakt, 404
  build.mjs            SSG: writes dist/ (+ sitemap.xml, robots.txt)
public/                css, js, favicon, optimized project imagery → copied to dist/
```

## Content & routes
Real content sourced from ikoplzen.cz and the IKO Design System — no invented
prices, units, or statistics. Featured projects have SEO routes:
`/projekty/rezidence-slovanske-udoli/`, `/projekty/bytovy-dum-cukrovarska/`,
`/projekty/radobycice-brizova/`. Pipeline (Připravujeme) and completed
(Dokončené) projects are presented as honest lists without fabricated imagery.

## Contact form
Client-side validation; on success it composes a **real prefilled email** to
`iko@ikoplzen.cz` (mailto) — no fake "sent" state. To wire a backend, POST to the
form's `action="/api/lead"` in `public/js/app.js` instead of the mailto compose.
