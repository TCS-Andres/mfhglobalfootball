# CLAUDE.md — MFH Global Football Website

This file governs how you build and maintain this repository. Re-read it before each task.

## What this is
MFH Global Football is a FIFA licensed, faith driven football (soccer) agency that represents
players and coaches and guides families through the path to professional football. This repo is
the public marketing website at mfhglobal.football. We are in the foundation phase: credibility,
education, and intake. The single most important goal of the site is to get visitors to book a
free bilingual consultation.

## Source of truth
The approved homepage prototype is at `/reference/mfh_home.html`. It is the visual and copy
specification. Match it exactly: same palette, spacing, typography, section order, and copy in
both English and Spanish. When anything is ambiguous, open the prototype and follow it. Do not
redesign it. The fastest path is to reuse its CSS class names so the ported markup looks identical.

## Non negotiable brand rules
- Use "MFH" or "MFH Global Football" only. Never spell out the family holdings name.
- Never guarantee placements, contracts, signings, or results. Use the core promise framing:
  open doors, protect, educate.
- Faith stays quiet. It belongs in the footer (the Jeremiah 29:11 line), never as a headline or
  banner, never at the top of a page.
- Bilingual English and Spanish as equals. Every page ships in both. Spanish is never an afterthought.
- Voice: straightforward, trustworthy, knowledgeable, warm, educational. No hype, no aggressive
  sales language, no profanity, no naming or criticizing competitors.
- Zero em dashes anywhere, in code, comments, or copy. Use commas, colons, or periods.
- Parents are always in the room. Never write anything that reads as approaching a minor without
  a parent present.

## Tech stack
- Astro, static output. `astro build` must produce plain HTML, CSS, and JS with no server runtime.
- Astro native i18n routing. English at `/`, Spanish at `/es/`.
- Vanilla CSS ported from the prototype. No Tailwind, no CSS framework.
- Minimal client JS only for: mobile menu, sticky header shadow, and scroll reveal. Language is
  route based, not JS based.
- Google Fonts: Archivo, Source Sans 3, Source Serif 4.
- Deploy target: Vercel (preview links) or a static upload of `dist/` to Bluehost. Both must work,
  so keep everything static.

Why Astro and not Next.js: this is a content site. Astro ships zero JS by default, runs anywhere
including Bluehost shared hosting, and treats long form pages as components or Markdown. Next.js is
the right home later for the separate MFH platform (player profiles, contract and consent workflows),
which is a different codebase.

## Design tokens
Defined in `src/styles/tokens.css`. Do not hardcode hex values in components, use the variables.

- Primary blue: #005391
- Blue deep (dark sections, footer): #00355C
- Blue 700 (hover): #013E6B
- Gold (accent, the ball pentagon): #C9A227
- Gold soft (small highlights on dark): #E4C45E
- Ink (body text): #0C1B29
- Ink soft (muted text): #475A70
- Sky (light tinted surface): #EAF1F8
- Line (borders): #D9E2EC
- Paper: #FFFFFF
- Radius: 8px
- Content max width: 1180px

## Typography roles
- Display headings: Archivo, weights 700 to 900, slightly tight letter spacing.
- Body: Source Sans 3.
- Serif accent: Source Serif 4, used only in two places, the Core Promise quote and the Jeremiah
  verse. Nowhere else.

## Signature element
The gold pentagon from the center of the soccer ball. Use it small as the eyebrow marker above
section headings and as the numbered nodes in the MFH Plan. Do not overuse it.

## Sitemap and routes
English first, Spanish mirror under /es/:
- `/` and `/es/` — Home (finalized in the prototype, reuse verbatim)
- `/services` and `/es/services` — the service programs in three groups: Players, Coaches and Clubs,
  Families and Youth, framed by FIFA's two categories (Football Agent Services and Other Services)
- `/about` and `/es/about` — Bert's trajectory, the family business, faith as foundation, the bridge
- `/the-mfh-plan` and `/es/the-mfh-plan` — the four step journey plus the teaching stories
- `/contact` and `/es/contact` — consultation booking and footage submission

Use mirrored English slugs under /es/ for simplicity and consistency. The footer carries the
Jeremiah 29:11 line and the social links on every page.

## Components
- `BaseLayout.astro`: html head, fonts, meta, global styles, Header, Footer, and a content slot.
  Accepts `lang` and `title` and `description` props.
- `Header.astro`: logo, nav, LangSwitch, primary CTA. Mobile hamburger.
- `Footer.astro`: logo, nav, contact line, tagline, Jeremiah verse, social links.
- `LangSwitch.astro`: EN and ES links pointing to the same page in the other locale.
- Homepage sections may start inline in the page, then be split into components if helpful.

## i18n
- All UI strings live in `src/i18n/ui.ts` as `ui.en` and `ui.es`, copied from the prototype's
  `I18N` object. Keep the same keys.
- A helper `t(lang, key)` returns the string for a locale.
- Each page exists at both routes and passes its `lang` to components.
- The language toggle is plain anchor links between the two locale URLs. Do not swap text with
  client JS. Language is determined by the route.

## Calls to action
- Primary, on every page: "Book a Free Consultation" / "Agenda una Consulta Gratis", linking to the
  contact page.
- Secondary on the hero: "See how it works" / "Conoce cómo funciona", linking to the MFH Plan.

## Forms and booking (final choice still pending from the client)
- Consultation booking: build the contact page so either a Calendly embed or a simple email form
  can drop in. Put the embed URL or form endpoint in an environment variable.
- Footage submission: collect a link (Google Drive or YouTube) plus name, contact, age group, and
  position. Do not build direct video upload. Match footage is too large for a static form, and a
  link field is the correct pattern.
- Use a static friendly form provider such as Formspree or Web3Forms since there is no server. Keep
  the endpoint in an environment variable, never hardcoded.

## Copy
- Homepage copy is finalized in the prototype in both languages. Reuse it verbatim.
- For inner pages, draw voice and facts from the Master Brain document. Keep every rule above.

## Definition of done, every page
- Renders in English and Spanish with correct accents.
- Responsive at 1280, 920, and 390 pixel widths with no horizontal scroll.
- Visible focus states on all interactive elements.
- Respects prefers-reduced-motion.
- No em dashes. MFH only. No guarantees. Faith only in the footer.
- Strong Lighthouse performance and accessibility on the static build.
