# TANJA Corporate Site — V2 Agent Context

## Current state

**Authority order:** the 2026-09-25 Web Development Meeting (this file, "Current V2 direction" below) is the current authority for
information architecture. It supersedes the 2026-09-18 whiteboard structure recorded in `docs/WEB_V2_WORKING_BRIEF.md` — that file
is kept for requirement history and is marked wherever a later decision overrode it. `docs/CONTENT_SOURCE_MAP.md` for evidence and
`docs/GRILL_ME_STARTER.md` for requirements-interview history remain useful background reading, in that order:
1. `docs/WEB_V2_WORKING_BRIEF.md` (history; read the 2026-09-25 addendum first)
2. `docs/CONTENT_SOURCE_MAP.md`
3. `docs/GRILL_ME_STARTER.md`

The static V2 prototype (`index.html`, `styles.css`, `script.js`, plus `what-we-do.html` added 2026-09-26) is the **current, live
implementation** — not a legacy prototype. It was rebuilt against the 2026-09-20 decisions, redesigned 2026-09-21, restructured
2026-09-25, and adjusted again 2026-09-26 (Our Staff removed, What We Do detail page added, hero became a 3-photo rotation) per
direct user instruction rather than a recorded meeting — see "Current V2 direction" below for what that changed.
The `archive/` folder holds genuinely retired material (the old Japanese B2B page); that is legacy and not the current site.

## Hard rule: requirements before structural change

The `/grill-me` build gate passed 2026-09-20, and the site has been rebuilt/restructured twice since against later meeting decisions
(2026-09-21 visual redesign, 2026-09-25 information-architecture change). Do not treat the site as pre-build: implement confirmed
meeting decisions directly rather than re-running a full requirements interview for work already decided below. Only fall back to a
`/grill-me`-style interview (one question at a time, with a recommended answer for each) when a *new* structural change has no clear
decision recorded in this file, `docs/WEB_V2_WORKING_BRIEF.md` or meeting notes supplied by the user — do not silently guess
information architecture that no meeting has settled.

When the user invokes `/grill-me`, explore this repository first. Ask one question at a time. For every question, include your recommended answer. Do not ask the user for something that can be learned by inspecting the repository or supplied source material.

## Current V2 direction (2026-09-25 Web Development Meeting; adjusted 2026-09-26 by direct user instruction)

Visible homepage section order:
- Home / Hero — a slow 3-photo crossfade rotation as of 2026-09-26 (whiteboard option A), reusing the hero, Coffee and Career
  photos already elsewhere on the page (not the whiteboard's literal Coffee/Avocado/Macadamia sequence — Drive still does not
  expose those photos, see below). Degrades to the original single static photo with no JS or under
  `prefers-reduced-motion: reduce`. Details: `docs/V2_IMPLEMENTATION_NOTES.md` §19.
- About (Our Company only: what TANJA is, the meaning of the name "TANJA" — **placeholder, do not guess**, and when it started)
- What We Do
  - Farm: Coffee, Avocado, Macadamia, Beekeeping (one flat grid — do not single out Coffee as an oversized feature)
  - Sustainability: Carbon Credit, Lunch, Cattle (extensible grid — more items need no CSS change; "Lunch" matches the
    2026-09-25 whiteboard's literal wording, not "School Lunch" — see docs/CONTENT_GAPS_2026-09-25.md)
  - Cafe (a separate, third branch — not a Farm crop, not a Sustainability project)
  - Every item's title links to its own anchor on `what-we-do.html` (added 2026-09-26), a dedicated detail page reachable from
    the homepage's "See full details" link and its own per-item jump-nav. Coffee is the worked example of the "detail frame"
    (Overview / Growing & processing / Status subsections); other items reuse the frame with just Overview + a placeholder —
    copy Coffee's shape when more content is approved for another item, do not invent it to fill the frame.
- Career
- Contact
- Instagram / Facebook (footer + Contact; official URLs still unconfirmed, kept as disabled placeholders)

**Not in the visible build:** Vision / Mission (deferred 2026-09-25 — the whiteboard no longer shows it), Our Staff (added as its
own section 2026-09-25, **removed 2026-09-26 at the user's direct instruction** — not a meeting decision, just "it's fine to
delete it"). Both are kept as "planned"/ghost objects in `architecture/model.js` and as unused CSS in `styles.css` so either can
be reinstated — see the DEFERRED comment near About in `index.html`. Also not in the build: News / Updates (future, insertion
point marked in the HTML), LinkedIn (only Instagram/Facebook were confirmed on 2026-09-25).

- Primary design reference: Lima Tanzania, https://www.limatanzania.com/
- Other references: Sensei Farms, Airbnb Life at Airbnb, Karsten Group.
- The site should be simple, polished, farm-image-led and lightweight.
- Use plain HTML, CSS and JavaScript only for this phase.
- Do not introduce frameworks or a build pipeline without explicit approval.
- Select photos from the TANJA Drive archive supplied by the user; as of 2026-09-26 (re-checked after the user re-shared the same
  folder link) the Drive connector still cannot reach most of the archive's subfolders (only `Drone/`, containing one video, is
  visible), so Beekeeping/Cattle/Cafe ship as placeholder frames and the hero rotation reuses existing photos instead of the
  whiteboard's Coffee/Avocado/Macadamia sequence — do not substitute external stock photography.
- Optimize web copies; do not ship huge Drive originals.

## Content integrity

Never fabricate or silently infer:
- staff roster or titles
- mission wording
- current recruitment
- crop area or harvest timelines
- certification scope
- project outcomes
- carbon-credit status
- beneficiary counts
- partner commitments
- contact details
- social accounts
- addresses

Where evidence conflicts, mark the item for verification.

Treat Matsui's avocado research as research, not as an official TANJA statement.

## Public/private boundary

Internal internship documents and meeting minutes are useful to discover questions and current operations. They are not automatically approved for publication.

Do not expose:
- internal personnel discussions
- operational weaknesses
- individual contact details that are not already approved for public use
- internship logistics
- private business research
- unannounced partnerships
- internal pricing/market hypotheses

## Automated verification (CI)

`.github/workflows/verify.yml` runs on every push (all branches) and pull request: `node architecture/check.js`,
`node architecture/test-core.js`, and `node scripts/verify-render.js` (Playwright — console errors, horizontal overflow, section
order/card counts, EN/SW/JA, mobile menu, JS-off fallback, `architecture/` viewer). `package.json` and `scripts/` exist only for
this CI/dev tooling (Playwright is a devDependency); they are not a build step for the site itself, which still ships as plain
HTML/CSS/JS. Run `npm install && npm test` locally before pushing a structural change. When the visible section order or a card
count changes on purpose, update the constants at the top of `scripts/verify-render.js`, the same way `architecture/model.js` gets
updated — a red CI run here means "this used to work and now it doesn't", not "the new structure is wrong".

## Deployment boundary

Do not modify production WordPress, DNS, hosting, domains, or credentials unless the user explicitly asks after the static V2 has been approved.
