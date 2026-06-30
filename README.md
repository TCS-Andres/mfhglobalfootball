# MFH Global Football, Website

The bilingual (English and Spanish) marketing site for MFH Global Football, a FIFA-licensed,
faith-driven football agency. Built with Astro, static output, no server runtime.

The brand contract lives in [`CLAUDE.md`](./CLAUDE.md). The approved visual and copy spec is the
prototype at [`reference/mfh_home.html`](./reference/mfh_home.html). Read both before changing anything.

## Stack

- Astro (static output), vanilla CSS ported from the prototype, no UI framework.
- Astro native i18n: English at `/`, Spanish at `/es/`. Language is route based, not JS based.
- Google Fonts: Archivo, Source Sans 3, Source Serif 4.
- Minimal client JS only: mobile menu, sticky header shadow, scroll reveal.

## Project structure

```text
src/
  styles/      tokens.css (design tokens) + global.css (ported stylesheet)
  i18n/        ui.ts (EN/ES dictionary + t() and locale path helpers)
  layouts/     BaseLayout.astro (head, fonts, SEO, hreflang, Header/Footer)
  components/  Header, Footer, LangSwitch, Home, CtaBanner, pages/*Body.astro
  pages/       index, services, about, the-mfh-plan, contact (+ es/ mirror)
public/        logos, favicons, robots.txt
reference/     the approved prototype and source logos (not deployed)
```

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Local dev server at `localhost:4321`         |
| `npm run build`   | Build the static site to `./dist/`           |
| `npm run preview` | Preview the production build locally          |

## Environment variables

All are optional. The site builds and works with none set (graceful fallbacks). Copy
`.env.example` to `.env` to configure. Only `PUBLIC_`-prefixed vars reach the static build.

| Variable               | Purpose                                                                 |
| :--------------------- | :---------------------------------------------------------------------- |
| `PUBLIC_BOOKING_URL`   | Calendly-style embed URL for the consultation block on `/contact`.      |
| `PUBLIC_FORM_ENDPOINT` | Formspree / Web3Forms style endpoint the footage form POSTs to.         |
| `PUBLIC_CONTACT_EMAIL` | Address for the booking email fallback and the contact details block.   |

If `PUBLIC_BOOKING_URL` is unset, the booking block shows an email fallback. If
`PUBLIC_FORM_ENDPOINT` is unset, the footage form falls back to email on submit.

## Open client inputs

These do not block the build; they slot in via the dictionary or an env var:

- Footer social handles: set the real URLs in `src/components/Footer.astro` (currently `#`).
- Booking choice: Calendly embed (`PUBLIC_BOOKING_URL`) vs simple form (`PUBLIC_FORM_ENDPOINT`).
- Photography: the `.media-slot` blocks (Meet Bert, the Bridge, the About banner) are designed
  placeholders. To use a real photo, drop an `<img>` inside the slot, for example
  `<div class="media-slot"><img src="/photos/bert.jpg" alt="Bert Mahecha" /></div>`.

## Deploy

### Vercel
Astro is auto-detected, output is static. Import the repo in Vercel (or run `vercel`), set any
env vars in Project Settings, and deploy. Preview URLs are created per push.

### Bluehost (static upload)
Run `npm run build`, then upload the entire contents of `dist/` to `public_html` over FTP or the
file manager. The Spanish pages live in `dist/es/`, so upload that folder to `public_html/es/`.
Point `mfhglobal.football` at the hosting account. Set any contact env vars before building, since
they are baked into the static output at build time.
