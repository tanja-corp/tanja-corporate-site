# TANJA Web V2 — Implementation Notes

Updated: 2026-09-26 · Branch: `web-20260926-whatwedo-detail` · Status: **static prototype, ready for content review; Our Staff removed and a What We Do detail page added by direct user instruction**

Audience: the developer who will migrate this to WordPress, the TANJA project owner who has to approve content, and the local English-speaking IT editor who will maintain it later.

Companion files: `architecture/` (open `index.html`: the design data, concept diagram and ER diagram of every object on one canvas, drawn from a single `model.js`; `node architecture/check.js` reports drift between it and this site), `docs/PHOTO_MANIFEST.md` (every image slot), `docs/WEB_V2_WORKING_BRIEF.md` (requirements — see its §0 and §0b), `docs/CONTENT_SOURCE_MAP.md` (where each claim may come from), `docs/CONTENT_GAPS_2026-09-25.md` (internal-only gap list; not published).

**What changed on 2026-09-21.** Information architecture and content did not change. The visual composition, desktop layout, spacing, type and image treatment did, and seven clean-ups were made (section 15 has the before / after reasoning).

**What changed on 2026-09-25 (see §16).** Information architecture changed, per the 2026-09-25 Web Development Meeting:
- Our Staff split out of About into its own top-level section (`#our-staff`, added to header/footer nav).
- Vision / Mission removed from the visible build (deferred, not deleted — kept as a "planned" object in `architecture/model.js`
  and as unused CSS in `styles.css`).
- About gained a "Name meaning" placeholder fact (what "TANJA" means — unconfirmed, do not guess).
- What We Do restructured from two branches (Farm / Project) to three (Farm / Sustainability / Cafe): Farm gained **Beekeeping**
  and became a flat 4-card grid instead of one large Coffee feature; the old "Project" group was renamed **Sustainability** and
  gained **Cattle**; **Cafe** is an entirely new third branch. "Carbon" was relabeled **Carbon Credit** and "School" relabeled
  **Lunch** — matching the literal wording on the 2026-09-25 whiteboard photo, not "School Lunch" (same projects, same ids/slots,
  no new facts asserted).

**What changed on 2026-09-26 (see §17).** Direct user instruction in conversation, not a recorded meeting:
- Our Staff **removed** from the visible build (it had only just become independent on 2026-09-25). Deferred like Vision /
  Mission, not deleted — same ghost-object pattern in `architecture/model.js`.
- **New page `what-we-do.html`**: every What We Do item now links from its homepage title to its own anchor on this page, which
  also has its own jump-nav. Coffee is the worked example of a "detail frame" (Overview / Growing & processing / Status); the
  other seven items use the same frame with only Overview + a placeholder.

Sections 1–15 below describe the homepage as it is now; section 16 has the 2026-09-25 restructure's before/after detail, and
section 17 has the 2026-09-26 changes.

---

## 1. Implementation summary

- **What it is.** One long-scroll page built with plain `index.html`, `styles.css` and `script.js`. Open `index.html` in a browser; there is nothing to install or build.
- **What is on it.** The five visible homepage sections as of 2026-09-26: Home (= Hero), About, What We Do, Career, Contact, plus a header and a compact footer, and a second page (`what-we-do.html`) for What We Do detail. Vision / Mission and Our Staff are both deferred (not visible). News / Updates is *not* built but has a marked insertion point that needs two edits (section 9).
- **Languages.** English (default), Kiswahili, Japanese, switchable from the header at any time; the visitor's choice is remembered. Every Kiswahili and Japanese string carries its own review state.
- **Content status.** Everything that TANJA has not yet confirmed is shown as a quiet, clearly marked placeholder (section 7). No fact was invented to fill space. The four photographs used are real TANJA farm photographs from the OSTI public site and are marked provisional; the About photo is a second crop of the hero photograph.
- **Weight.** First view: about **170 KB on a phone** (6 requests) and **424 KB on a 1440 px desktop** (7 requests). After scrolling the whole page: **289 KB** on a phone (8 requests) and **467 KB** on desktop (8 requests). HTML 42 KB + CSS 41 KB + JS 9 KB raw (24 KB gzipped together). Photographs (WebP): hero 81 KB phone / 191 KB desktop; About 65 KB (800 w) or 137 KB (1600 w); Coffee 76 KB or 144 KB; Career 43 KB or 113 KB; the browser picks the 800 w file on phones and on 1440 px desktops at 1×. No third-party code, no web fonts, no video. (Before the redesign: 320 KB phone / 430 KB desktop with two lazy photographs; the redesign adds a third and larger About and Coffee photographs.)
- **What was deliberately left out:** contact form, chatbot, News, dark mode, analytics, Open Graph image (needs a public URL), video, AVIF, any framework, any web font.

Files:

| File | Purpose |
|---|---|
| `index.html` | Structure and all three language versions of the copy. Long header comment explains the conventions. |
| `what-we-do.html` | What We Do detail page (added 2026-09-26): one anchor + "detail frame" per item, plus a jump-nav. Shares the header/footer chrome, `styles.css` and `script.js` with `index.html`; not scanned by `architecture/check.js` (see its own header comment). |
| `styles.css` | Design tokens (`:root`) then base, the 12-column grid (`.wrap`), header, hero, components, sections, footer, breakpoints, motion, print. |
| `script.js` | Progressive enhancement only (≈ 8 KB raw): language switch, mobile menu (with focus containment), header over the hero, current-section marker, footer menu copies the header menu. |
| `assets/images/` | `NN-slot-name` derivatives (WebP + JPEG), with an `-800` width variant where a `srcset` is used. Older files (`hero.*`, `about-farm-path.*`, `community-coffee-cherries.*`, `hero-mobile.*`) are legacy and unused; safe to delete. |
| `assets/favicon.svg` | Existing favicon. |

## 2. Section structure

```
#home            Home = Hero            slot 01   one static photo, wordmark only (location line optional, not shown)
#about           About (Our Company only)
  #our-company   Our Company            slot 02   heading + large lede + paragraph + 4 facts on the left (incl. "Name meaning" — placeholder), photo to the right window edge
                 [DEFERRED: Vision / Mission (2026-09-25) and Our Staff (2026-09-26) — neither is rendered; see the comment in
                  index.html and the "planned"/ghost objects in model.js]
#what-we-do      What We Do (3 branches, 2026-09-25; each item links to what-we-do.html, 2026-09-26)
  #farm          Farm (flat 4-card grid — not one large feature)
    #coffee      Coffee                 slot 04   photo card with an "Established core" chip, same size as the other three
    #avocado     Avocado                slot 06   placeholder photo
    #macadamia   Macadamia              slot 05   placeholder photo
    #beekeeping  Beekeeping (new)       slot 10   placeholder photo
  #project       Sustainability (renamed from "Project"; extensible grid, 3 columns; htmlId stays "project")
    #carbon      Carbon Credit (renamed from "Carbon") slot 07   placeholder photo
    #school      Lunch (renamed from "School")          slot 08   placeholder photo
    #cattle      Cattle (new)                          slot 11   placeholder photo
                 [future project cards go here]
  #cafe          Cafe (new, third branch)  slot 12  photo | text pair (same shape as Career); title + "Details to be confirmed." only
                 [future: News / Updates section goes here]
#career          Career                 slot 09   text on the left, photograph to the right window edge, one quiet status line. No Apply button.
#contact         Contact                          dark green face: email, phone, Instagram, Facebook (all placeholders); no form
footer                                            brand, nav, EN|SW|JP, social icons (disabled), copyright placeholder

what-we-do.html (added 2026-09-26 — a second page, not a section of index.html)
  #wwd-detail-top      page intro: back-to-home link, h1, lede, jump-nav (one link per item below)
  #farm-detail         h2 "Farm" + one .wwd-detail article per item:
    #coffee            slot 04   worked example: Overview / Growing & processing / Status (each a named .wwd-detail__section)
    #avocado           slot 06   Overview (reused from index.html) + one placeholder .wwd-detail__section
    #macadamia         slot 05   same shape as Avocado
    #beekeeping        slot 10   same shape as Avocado
  #sustainability-detail h2 "Sustainability" + one .wwd-detail article per item (Carbon Credit slot 07, Lunch slot 08, Cattle
                          slot 11), each Overview + one placeholder .wwd-detail__section, same shape as Avocado's
  #cafe-detail          h2 "Cafe" + one .wwd-detail article (slot 12), placeholder only — no Overview text exists yet
```

Heading hierarchy on `index.html`: one `h1` (hero wordmark) → `h2` per top-level section (About, What We Do, Career, Contact) → `h3` for blocks/groups (Our Company, Farm, Sustainability, Cafe's eyebrow) → `h4` for a crop or project card. Karatu is **not** a section (per the 2026-09-20 decision); location appears only as one row in the Our Company facts (and in the `<title>` / description).

Heading hierarchy on `what-we-do.html`: `h1` (page title) → `h2` per group (Farm, Sustainability, Cafe) → `h3` per item (`.wwd-detail__title`) → `h4` per named subsection (Overview, etc.) — one level deeper than `index.html` since this is its own page, not a subsection of the homepage.

### Extending the page without touching CSS (checked again on 2026-09-21, see section 12)

- **More projects.** Copy a project `<li>`; change title, text, photo **and the id**. The grid is three columns on a wide window, two on a tablet, one on a phone; a new `<li>` takes the next free cell.
- **More staff.** 3 to 6 cards flow into the eight columns to the right of the "Our Staff" label (four per row on desktop). Their photos are `<div class="media">` frames, so swapping in a portrait needs no layout change.
- **A real photo instead of a placeholder.** Follow the pattern in `PHOTO_MANIFEST.md` section 4.
- **Keep the object map in step.** Adding or removing a section, slot, placeholder, repeated card or token changes what `architecture/model.js` must say. Run `node architecture/check.js` after any structural edit; it names the mismatch. Extending a repeated list that the map counts (staff, projects, crops, nav items, social links) needs the matching row or `repeat` count in `model.js` too. A copied project also needs the next free `data-slot` number and its own manifest row.
- **News / Updates.** **Two edits, both marked in the HTML:** the section (between What We Do and Career) and one `<li>` in the header nav. Section backgrounds alternate by themselves (`main > .section:nth-of-type(odd)`), and the footer menu is copied from the header menu in `script.js`. Nothing else is needed; the current-section marker picks the new link up by itself.
- **Optional hero line.** The hero shows only the wordmark. To add a location line, paste the documented `<p class="hero__sub">` (with its three language variants) after the `<h1>`; no CSS change.

## 3. Design decisions

**Direction.** Calm, credible, agricultural, photography-led, restrained. The page is designed at 1440px first; the phone layout is the desktop composition folded down, not the other way round. Photographs run to the window edge (About right, Coffee left, Career right), text stays on a 12-column grid, and there are no boxed cards, no shadows, no gradients other than a scrim over the hero photograph, and no decorative motion.

**References.**
- **Lima Tanzania** (primary): only its header and section structure were observed (a plain header over a full-width photograph; photograph-and-text halves that run to the window edge; a solid-colour contact face; a minimal footer). It returns HTTP 403 to a scripted fetch and a block page to headless browsers, so it was opened in a normal browser window and screenshotted. Nothing was copied: no wording, colours, layout measurements or brand elements.
- **Material Design 3** was read on `m3.material.io/styles` (colour roles, typography, shape, elevation, motion, icons and state layers) and `foundations` (breakpoints, layout, state layers, colour contrast). It is used as a source of principles and exact numbers, not components. What the reading changed is listed in section 15.
- **Apple HIG** (layout, typography, color, accessibility, materials, motion, images): 44 pt hit targets, no light body weights, contrast targets, text-over-photo scrims, text that reflows at 200 %.

| Principle | Where it shows up |
|---|---|
| HIG: 44 pt minimum hit target | Every button and link is ≥ 44×44 px on phones (`--touch`); measured, see section 12. |
| HIG: segmented control for a small set of exclusive choices | The EN \| SW \| JP language control (a pill on phones; plain text with a marker on the desktop header). |
| HIG: full-width sheet for a menu on a phone; content over chrome | The mobile menu is a full-screen sheet with large rows; the header stays above it. |
| HIG: safe-area insets | `env(safe-area-inset-*)` on the grid edges, the menu sheet and the footer. |
| HIG / M3: no light weights for reading text; 40–60 characters per line | Body is 17 px (phone) to 18 px (desktop) at weight 400; measure is `33.5rem` (≈ 54 Latin characters). Headings are weight 400, only labels and facts go to 600. |
| M3: colour *roles* | `--c-surface`, `--c-surface-2` (= surface-container), `--c-on-surface-2` (= on-surface-variant), `--c-outline-2` (= outline-variant) … the comment on each token in `styles.css` names its M3 role and contrast. |
| M3: shape scale | Photographs are square-cornered when they run to a window edge and 4 px (M3 extra-small) when inset; only controls are pills. |
| M3: state layers and motion tokens | Hover wash 8 %; focus ring 3 px, offset 2 px; standard easing `cubic-bezier(0.2, 0, 0, 1)`; durations 150 / 300 ms; the one travelling element (the menu sheet) uses emphasized decelerate 400 ms in and emphasized accelerate 200 ms out. Every transition is switched off under `prefers-reduced-motion`. |

**Colour.** Forest green (`#24402f`) as the anchor, warm paper (`#faf8f2`) as the surface, alternating paper and a slightly darker container, coffee-cherry red (`#9c3a2d`) **only** as the mobile menu's current-item mark (the M3 reading says cherry is nearly the "error" red: it is never a fill and never a status). The Vision / Mission band and the Contact face are forest green; the footer is a darker green. All text pairs measure ≥ 4.5:1 (section 12). No dark mode: the page is photography-led and dark mode would need its own photo treatment.

**Typography.** System fonts only; no font is downloaded. Hierarchy comes from size, not weight: section headings 64 px / weight 400 at 1440, a 30 px lede, an 18 px body, 13–14 px uppercase labels (Latin) with tracking. Japanese uses the platform's Japanese UI face with looser leading and `line-break: strict`. Type is `rem` / `clamp()` so the browser's text-size setting is respected.

**Header.** Transparent over the hero (white text on a darkened top of the photograph) and solid paper once the hero has scrolled away. On the desktop it is one quiet row: wordmark left, the four links and `EN | SW | JP` as plain text on the right (the current section and the current language get an underline, no boxes or pills). On phones the language control stays a pill and the menu is a full-screen sheet. Two classes on `<html>` keep this safe: `js` (added by a 6-line inline script before first paint) drives the *layout* (collapsed nav, hero pulled under the header), so nothing moves when `script.js` arrives; `js-ready` (added by `script.js` when it has run) reveals the language and menu controls and enables the transparent colours. Without JS, or if `script.js` fails to load (`onerror` removes `js`), the header is solid and the plain inline nav shows.

**Hero.** One static photograph, about 88 % of the window on tablet and desktop (`clamp(36rem, 88svh, 62rem)`) and unchanged on phones (`clamp(34rem, 100svh, 60rem)`, with a separate portrait crop). The wordmark is bottom-left and is the only text. No slider, no video, no button. The photo is a single `<picture>`, so it is one field in the CMS.

**Placeholders are designed, not blank.** Missing photos are flat, quiet tiles with only the slot number and one small "Photo to be added" line (no hatching, no icon); missing text is a muted "to be confirmed" line; the Vision / Mission band keeps its full-width place with one plain sentence. A reviewer sees a finished layout and can immediately tell what is not yet real. Slot frames are the size the real photograph will be, so replacing one never moves the layout.

## 4. Responsive decisions

Phone-first CSS (the base rules are the phone layout, media queries add), designed from the desktop composition. Breakpoints: 600 and 1200 match M3's medium and large; 768 and 1024 are the two the brief asks to check.

| Width | Behaviour |
|---|---|
| < 600 px | Single column; every photograph runs edge to edge with square corners (4:3, Coffee 5:4); staff cards 2×2; menu is a sheet. |
| 600–767 px | Staff 4 across. Still a single column of text. |
| 768–1023 px | The 12-column grid switches on. Photographs stay full width (3:2) under their text; Macadamia/Avocado, Project (2 columns) and Vision/Mission sit side by side; Contact is two columns; hero is about 88 % of the window. |
| ≥ 960 px | Header shows the inline nav (a text-only row); the menu button disappears. (`60em`, chosen because the longest Kiswahili nav labels need it.) |
| ≥ 1024 px | **The desktop composition**: About = text (5 columns) beside a photograph that runs to the right window edge; Staff label left, portraits right; Coffee photograph runs to the left window edge with the text at its bottom right; Project = 3 columns; Career = text beside a photograph to the right edge; Contact = title left, details right. |
| ≥ 1200 px | Coffee photograph becomes 3:2; About photograph is taller. Text columns stop growing at 1312 px (`--container`), photographs keep going to the window edge. |
| ≤ 360 px | Language buttons and brand tighten so the bar never wraps. |

- **Hero art direction.** At ≤ 700 px the browser gets a separate *portrait crop* (`01-hero-mobile`, 660×1166) instead of squeezing the landscape into a thin centre strip. The crop keeps the red cherries and the terraced rows. The menu breakpoint (`60em`) and the image swap (`700px`) are intentionally different.
- **Bleed without 100vw.** The grid has an edge track on each side (`grid-column: … / full-end`), so a photograph can reach the window edge without `100vw` (which would create sideways scroll when a scrollbar is present).
- Text is `rem`-based so browser font-size settings are respected; long words and the email address wrap (`overflow-wrap: anywhere` where needed), grid tracks are `minmax(0, …)`, and the header controls are capped in `px` so a 150–200 % text size cannot push the menu button off-screen.
- Checked at 360, 390, 440, 768, 1024, 1280 and 1440 px in all three languages; see section 12.

## 5. Language architecture

- **Markup.** Every translatable string exists three times: `<span data-l="en">…</span><span data-l="sw" lang="sw" data-review="draft">…</span><span data-l="ja" lang="ja" data-review="draft">…</span>`. Text identical in all languages (a company name, a year) is written once with no `data-l`. `<title>` and `<meta name="description">` carry `data-sw` / `data-ja`; image `alt`s carry `data-alt-sw` / `data-alt-ja`.
- **Switching.** `<html data-lang>` selects the language; CSS hides the other two variants (`display: none`, so they are also removed from the accessibility tree). `script.js` sets `data-lang` and `lang`, updates the title, description and alts, and toggles `aria-pressed` on **every** language control (header and footer).
- **Default and memory.** English on first visit. A saved SW or JP choice is applied by a 6-line inline script in `<head>` before first paint, so there is no flash of English. Storage access is wrapped in `try/catch`; if storage is blocked the switch still works for the session and a corrupt value is ignored.
- **JavaScript off.** `<html data-lang="en">` is hard-coded, so the English copy and the inline navigation are fully readable; the language and menu controls are invisible rather than dead.
- **Review state, per string (replaces the old page-wide "draft" strip).** Every SW and JP string carries `data-review="draft"` (default) or `"reviewed"`. `<title>`, the description and each image with an `alt` carry `data-review-sw` and `data-review-ja`. English carries no state: it is reviewed by the internal English reviewer before it is written here. There is **no** language-level "draft" flag. When one string is approved, only its own attribute changes. A small marker (`.tl-mark`, "Draft translation" in the language being read) sits at the top of a section **only while that section still holds a draft string in that language** (CSS `:has()`; browsers without it show the marker in every section in SW/JP, which errs on the side of saying "draft"). When the last draft in a language is approved, no marker appears for it. The marker looks at the visible strings only; the `<title>`, description and image `alt`s keep their own `data-review-sw` / `data-review-ja`, and they are counted by `check.js` but do not drive the marker. State is machine-countable: `node architecture/check.js` prints, per language, the number of strings, drafts and reviewed, and fails if a string has no valid state or a triad is incomplete. Today: every SW and JP string is `draft`.
- **Owners.** **EN** internal English reviewer; **SW** native Kiswahili reviewer; **JP** AI draft, then Japanese human review, then publish. Neither the SW nor the JP copy is approved. In WordPress the same state belongs on the translation of each post or field (option A below), which is why the ER model has `Translation.review_state` per string, not per language.
- **Same structure in every language.** All three variants sit in the same element, so the layout cannot differ between languages. If a string has no SW or JP variant, English is shown for that string instead of a blank gap (`:has()` fallback in `styles.css`). Parity check: every `[data-l="en"]` has a `sw` and a `ja` sibling (`check.js` counts them).
- **Adding a language (touch points).** (1) a `data-l="xx"` span (with `data-review`) in every triad; (2) a button in **both** language controls (header and footer); (3) the three rule groups in `styles.css` section 1 (default hide, show when active, hide English when active), the fallback and the `.tl-mark` rules; (4) the boot script in `<head>` (`l === 'sw' || l === 'ja'`) **and** `LANGS` in `script.js`, which are two separate lists; (5) `data-xx` and `data-review-xx` on `<title>`, the description and every `data-alt-*` image; (6) the nav-label spans and the `.tl-mark` triads. Per the brief a fourth language also needs a named audience and translation owner.
- **Accessible names follow the language.** Both `<nav>` landmarks are named through visually hidden triads, images get translated alts, the disabled social buttons say "link to be confirmed" in the active language, and the language buttons keep their visible label in their name (`JP 日本語`) so voice control works.
- **Labels.** The switch shows `EN | SW | JP` (no flags), with accessible names "English", "Kiswahili", "日本語".

## 6. Image architecture

See `docs/PHOTO_MANIFEST.md` for every slot. In short:

- Nine numbered slots; `data-slot="NN"` in the HTML.
- `<picture>` with WebP then JPEG; `srcset` with an 800 px and a full-size candidate for slots 02, 04 and 09; `width`/`height` on every `<img>`; lazy-loading everywhere except the hero; `fetchpriority="high"` on the hero.
- The frame (`.media`) fixes the aspect ratio through a modifier class (`media--3x2`, `--4x3`, `--5x4`, `--3x4`), the image always covers it with `object-fit: cover`, and a per-photo focal point is `--focal` on the frame. Where a photograph runs to the window edge it loses its rounded corners; where its height follows the text beside it (About on desktop) the frame stretches instead of using a ratio. Swapping a photo therefore never moves the layout.
- No Drive original is ever linked from the page.
- **Photography.** The three earlier photographs remain; slot 02 and slot 04 were re-cropped from their originals (the old About photo was 642×452 px, too small for a half-window image), and slot 09 (Career) is a new photograph from the OSTI site (a reservoir; no people). A sweep of the OSTI public site found nothing usable for macadamia, avocado, Carbon, School or staff. The rules used: only pages that tie the photo to TANJA; no identifiable people; not a collage; large enough; no Ngorongoro.

## 7. Placeholder list

Every placeholder is tagged `data-placeholder="…"` in `index.html` (search for it), plus `what-we-do.html` for the detail-page-only ones added 2026-09-26 below. Photos are in the manifest.

| `data-placeholder` | What is shown | To replace it, TANJA must supply |
|---|---|---|
| `logo` | Text wordmark "TANJA" | Official logo file(s) |
| `name-meaning` (added 2026-09-25) | "Official wording to be confirmed." in the Our Company facts | What "TANJA" means as a name, if anything — **no source found; do not guess an etymology or acronym** |
| `staff-roster` | **Not rendered as of 2026-09-26** — Our Staff is deferred from the visible build (see §17), same as Vision/Mission below. When it was visible (2026-09-25 only): 4 cards, "Staff Member" / "Role / Position". | Approved roster, exact English titles, approved portraits |
| `vision`, `mission` | **Not rendered as of 2026-09-25** — Vision/Mission is deferred from the visible build (see §16). The placeholder pattern below still applies if it is reinstated. | Approved Vision and Mission wording (do **not** blend the Smart Village mission with OSTI values) |
| `coffee-details`, `avocado-details`, `macadamia-details` | "Details to be confirmed." | Approved crop copy: stage, variety, area, timeline — only if TANJA wants them public |
| `beekeeping-details` (added 2026-09-25) | "Details to be confirmed." | Scale/status of the activity, approved public description — see `docs/CONTENT_GAPS_2026-09-25.md` |
| `carbon-details` (label now "Carbon Credit"), `school-details` (label now "Lunch") | "Details to be confirmed." | An approved one-page summary per project (scope, partner, what actually happened, dates, permitted photos); "Lunch" alone is generic — confirm the exact public name and who it serves (`VERIFY`) |
| `cattle-details` (added 2026-09-25) | "Details to be confirmed." | Scope of the project (vs. simply "the farm has cattle"), approved public description — see `docs/CONTENT_GAPS_2026-09-25.md` |
| `cafe-details` (added 2026-09-25) | Title "Cafe" + "Details to be confirmed." only — no body sentence at all | Whether/how TANJA wants the café publicly announced; concept, timeline — the most sensitive of the new items, do not publish crowdfunding/budget/opening-date detail without sign-off |
| `coffee-growing-details`, `coffee-status-details` (added 2026-09-26, `what-we-do.html` only) | "Details to be confirmed." in Coffee's "Growing & processing" / "Status & certification" subsections | Same open questions as `coffee-details` above, split into the two named subsections of the detail frame |
| `avocado-more-details`, `macadamia-more-details`, `beekeeping-more-details`, `carbon-more-details`, `school-more-details`, `cattle-more-details`, `cafe-more-details` (added 2026-09-26, `what-we-do.html` only) | "Details to be confirmed." in each item's single "More detail" subsection | Same open questions as that item's homepage `…-details` placeholder — these are the detail-page's placeholder, not a new question |
| `career-status` | A muted note: "Current openings and recruitment details to be confirmed." | Whether TANJA is recruiting, and the route (email, page, none) |
| `email` | `hello@example.com` (reserved example domain, can never reach a real inbox) | Official public email |
| `phone` | `+255 XX XXX XXXX` (not a link) | Official public phone / WhatsApp |
| `instagram-url`, `facebook-url` | **Disabled buttons** (not links, not focusable, "Link to be confirmed" beside them); the footer icons are disabled buttons too | Official account URLs. Then replace each `<button disabled>` with an `<a class="social__link" href="…">` and drop the state line (the comment in `index.html` says how) |
| `copyright` | © 2026 TANJA Corporation Limited | Approved legal line |
| Photos 03, 05, 06, 07, 08, 10, 11, 12 | Flat quiet frames | See manifest |

The hero location line (`hero-line`) is **no longer a placeholder**: the hero has no location line by default and the optional snippet is documented in `index.html`.

## 8. Facts needing approval

Everything visible as a statement, and where it came from. **None has yet been approved by TANJA management.**

| Statement on the page | Basis | Approval note |
|---|---|---|
| Company name "TANJA Corporation Limited" | OSTI public TANJA page; invitation letter | Confirm exact legal styling |
| "Started 2023" | OSTI public TANJA page; TANJA Intro | Confirm |
| Located in Karatu, Arusha Region, Tanzania | OSTI public page; P.O. Box 71 Oldeani, Karatu reference | Confirm; do not add a street address until registered office vs farm address is decided |
| Coffee is the established core; macadamia and avocado are newer development areas | TANJA Intro; operator brief | Confirm wording; "established" says nothing about volume or export |
| "Coffee … grown on the estates around Karatu" | TANJA Intro; OSTI farms page | Confirm |
| "The estates have a long history of coffee growing" | TANJA Intro (long estate history) | **VERIFY.** Says only that the estates are old. It says nothing about who owned or acquired the land; land history is the most sensitive category for this location |
| "Community-focused work as part of the Smart Village Project" | TANJA Intro; OSTI About | **VERIFY** the wording and whether TANJA wants the programme named |
| Carbon and School are "project areas" | 2026-09-18 whiteboard | No result, partner, number or status is stated |
| Photos 01, 02, 04, 09 | OSTI public site | Rights and approval for TANJA's own site. Photo 04 is dated January 2023 by its source (the date is in the manifest only, not on the page). Photo 09 is captioned there as "the newly completed dam": the page adds no claim about it |

**Deliberately not stated** (sources conflict or are stale): employee count (550+ vs 500+), farm and crop hectares, planting year, harvest years, OSTI group founding year (2012 vs 2013), certifications, carbon-credit status, solar PPA figures, registered-office vs farm address, directors, seedling counts, any market, buyer, price or export claim. **Ngorongoro is not mentioned anywhere**; if it is ever added it needs the "separate district" qualifier from the culture research, because of the documented Ngorongoro land-relocation controversy.

## 9. WordPress / Gutenberg migration notes

The CMS choice is not locked (brief, section 3). This is the mapping if WordPress + block editor is chosen.

**Principle: content is editable, design is fixed.** Layout lives in a custom block theme; editors fill fields inside locked patterns.

| Prototype piece | WordPress equivalent |
|---|---|
| `:root` tokens in `styles.css` | `theme.json` (colours, font sizes, spacing) — the names already mirror it |
| `.wrap` 12-column grid and its `full-start` / `full-end` lines | The theme's layout CSS; editors never place things on the grid, patterns do |
| Each `<section>` | A locked **block pattern** (Hero, About, Our Staff, What We Do, Career, Contact — Our Staff is now its own pattern, not nested in About). `templateLock: "all"` on the front-page template; editors edit inside, cannot move or delete sections |
| Alternating section backgrounds | Pure CSS (`nth-of-type`), so a News section can be added without any styling work |
| Staff cards | Custom post type `tanja_staff` (name, role, portrait, order); the pattern renders 3–6 entries via a Query Loop |
| Sustainability cards (renamed from "Project") | Custom post type `tanja_project` (title, summary, photo, "detail page" toggle). The grid reflows, so adding a project (e.g. the next one after Cattle) needs no layout work |
| Crops (Coffee / Avocado / Macadamia / Beekeeping) | Four fixed pattern slots in a flat grid (the hierarchy is fixed by the meeting), or a small `tanja_crop` CPT capped at four |
| Cafe (added 2026-09-25) | A single locked pattern (photo + text, same shape as Career) — not a repeater; there is only one Cafe block |
| Contact values, social URLs, copyright | One "Site details" options page; the header, footer and Contact section all read it. An empty social URL renders the disabled state; a filled one renders a link |
| Header and footer menus | One WordPress menu location feeds both (the footer copy in `script.js` is only needed for the static prototype) |
| Language triads and review state | See below |
| News / Updates | Standard posts with one category; a locked pattern shows the latest 3 between What We Do and Career, plus an archive; later, an article can be surfaced inside Farm or Project by category |

**Multilingual.** Two workable options; pick with the editor.
- **A. One post per language (Polylang or similar). Recommended.** Each language has its own front page and its own WordPress status, so "SW is still a draft, JP is pending review, EN is published" is native and visible, which the brief asks for. Gives real per-language URLs and `hreflang`. The three pages are built from the same locked pattern, so structure stays identical. The header `EN | SW | JP` becomes the plugin's switcher styled by the theme.
- **B. Triad fields on one page (as in this prototype).** Instant switching without reload and structure guaranteed identical, but it needs per-language fields for every block (ACF Pro or custom meta), no per-language URLs, and every language is downloaded on every visit (small). Fine for a very small site. The per-string `data-review` maps to a per-field status.

Either way, keep a quiet "draft" marker that switches itself off when the language's last draft is approved.

**Hero.** One image field. Provide an optional second field for a portrait crop, or use the Cover block's focal-point control; without one of them, phones would see a thin centre strip of the landscape. The location line is an optional text field (empty = nothing rendered).

**Editors** get a custom role: edit content and staff/projects/news, upload media, publish. No theme, plugin, code, menu-structure or settings access; disable the Custom HTML block and the code editor; restrict the block inserter to what the patterns use.

**Images.** Let WordPress generate WebP sizes; set a max upload dimension and remind editors to upload ≥ 1600 px landscape and ≥ 900×1200 portraits; keep the manifest columns as the editor's checklist (alt text in three languages).

## 10. Recommended CMS fields

| Block | Field | Type | Notes |
|---|---|---|---|
| Hero | Image; mobile crop (optional) | Image | Alt text ×3 languages |
| Hero | Location line | Text ×3, **optional** | Empty by default; nothing is rendered when empty |
| Our Company | Facts (company, name meaning, started, location) | 4 label/value pairs ×3 | "Name meaning" added 2026-09-25; empty/placeholder until TANJA confirms — do not default to a guess |
| Our Company | Lede (first sentence pair) and paragraph | Text ×3 each | The page sets the first one large |
| Our Company | Photo | Image + alt ×3 | |
| Our Staff | Entries (3–6) | Repeater / CPT | Name, role ×3, portrait, alt. Own pattern/template area since 2026-09-25 (was nested in About) |
| Vision / Mission | Vision, Mission | Text ×3 each | **Deferred 2026-09-25**: not on the live front-page template. Required before the placeholder disappears if reinstated; keep the placeholder as the empty state |
| Farm | For each of 4 crops (Coffee, Avocado, Macadamia, Beekeeping): chip (optional), title, text, photo, "details" line | Text ×3, Image | Flat grid since 2026-09-25 — Coffee no longer has a larger layout, only its chip differs |
| Sustainability (renamed from "Project") | Entries (extensible, Carbon Credit / Lunch / Cattle + future) | Repeater / CPT | Title, text ×3, photo, optional link to a detail article |
| Cafe | Text ("details" line only, no body copy yet) | Text ×3, Image | Single block, not a repeater — added 2026-09-25 |
| Career | Text, status line | Text ×3 | A "currently recruiting" switch plus an apply link **only** when a route exists |
| Career | Photo | Image + alt | |
| Contact | Email, phone, Instagram URL, Facebook URL | Options page | Empty value = show nothing (or the disabled state for a social link), not a placeholder, in production |
| Footer | Copyright line | Text | |
| Every translated field | Review state | draft / reviewed | Per translation, not per language; drives the "draft" marker |

## 11. Developer-only areas

Routine editors must not touch: the theme and `theme.json`; block patterns and the front-page template; CSS and JavaScript; grid, spacing, typography and breakpoints; the navigation structure and section order; plugin and role settings; hosting, DNS, deployment and backups; the placeholder-marking convention. Developer changes are also needed to add a new *kind* of section, a new language, or a new field type.

## 12. Verification (2026-09-21)

Test scripts live outside the repository (session scratchpad) and drive Microsoft Edge through Playwright. Nothing was installed in the repository.

**Independent review.** Seven reviewers examined the finished page (desktop visual quality, responsive behaviour, accessibility and HTML validity, behaviour and regression, content integrity and translation parity, extensibility, performance); each of their **54 findings** was then attacked by a second agent that tried to reproduce and refute it. **16 survived** (none high; all polish or large-text edge cases), 38 were refuted or judged by design (for example: "the Project row leaves the third column empty with two projects", which is what a modular three-column grid does, and "the hero and About show the same photograph", which is documented). Every survivor was fixed and re-tested by the author, not only by the reviewers; a few refuted items that pointed at real documentation gaps were fixed as well.

Fixed after review: four staff cards no longer wrap 3+1 between 1024 and 1279 px (now four across from 1024 px); focusing a header control while scrolled no longer makes the page jump; the disabled social rows and the Swahili lede no longer overflow at 150–200 % text; the wordmark keeps its face in Japanese; the landscape-phone wordmark override now applies; the current language is visible in forced-colours mode over the hero; the Career photo's alt says only what is visible; the invented email is no longer a live link; `sizes` on the two half-window photographs no longer over-fetches; the wordmark link closes an open menu; the phone aspect ratios and photo procedure in the docs were corrected.

| Area | Result |
|---|---|
| Behaviour suite (language switch, title / description / alt, memory across reload, JavaScript off, `script.js` blocked, layout shift with a late script, header transparent → solid, phone menu with inert and Esc, per-section draft marker appears and disappears with the per-string state, footer menu copies a 5th header item) | 16 / 16 pass |
| Regression suite for the review fixes (focus without scroll jump, staff grid at six widths, landscape wordmark, wordmark face, brand closes menu, social rows at 200 % text, large-text sweep at root 24 px and 32 px × 360 / 390 / 768 / 1440 px × EN / SW / JP) | 38 / 38 pass |
| Overflow and console errors, EN / SW / JP × 320, 360, 390, 440, 600, 768, 1024, 1280, 1440, 1920 px | 30 / 30 clean |
| axe-core (WCAG 2.2 AA + best practice), EN / SW / JP × 390 and 1440 px × top / scrolled / menu open | 0 violations (also 0 in the reviewer's 45-state run). Remaining "incomplete" items are text over photographs and one underline gradient, measured separately below |
| html-validate | 4 findings, all deliberate: `role="list"` on `<ul>` whose markers are removed (keeps list semantics in Safari / VoiceOver) |
| Layout shift (CLS) with `script.js` delayed 400 ms, 390 and 1440 px | 0.0000 |
| Text contrast, colour tokens (WCAG) | all text pairs ≥ 4.5:1 (lowest: muted text on the placeholder tile, 4.9:1); rendered-pixel check of 966 text samples in three languages found nothing below 4.5:1 outside header-overlap artefacts; on the forest face and footer ≥ 5.9:1 |
| Text contrast over the hero photograph (rendered pixels, 95th-percentile brightness, text hidden) | brand ≥ 7.4:1, nav and language control ≥ 4.9:1 (1024 px), 5.1 (1280), 5.6 (1440), phone ≥ 6.3:1, wordmark ≥ 6.5:1 |
| Keyboard | skip link first; visible focus ring on every control including the dark Contact face and footer; disabled Instagram / Facebook are announced ("Instagram, link to be confirmed", in the active language) and are not in the tab order |
| Requests and weight | see section 1: no third-party requests, no fonts, first view 170 KB (phone) / 424 KB (desktop) |

**Known trade-offs, deliberately accepted**
- **Photo sharpness.** To keep the page light, the phone hero (660×1166) is soft on 2–3× screens; higher-resolution candidates were not added because the weight would rise for the most common phones. Fix by supplying proper originals (`PHOTO_MANIFEST.md`, open questions).
- **One photograph twice.** Hero (slot 01) and About (slot 02) are two crops of the same original, because no second real farm photograph exists. It is the first thing to replace.
- **Empty photo frames.** Macadamia, Avocado, Carbon and School still have no photograph (a sweep of the OSTI public site found none that qualifies). The frames are quiet and photo-sized so the layout does not change when photos arrive, but four flat frames remain visible on the page.
- **Two projects in a three-column grid** leave the third cell empty until a third project exists.
- **Header transparency needs JavaScript.** With JS off the header is solid, by design. The language and menu controls are invisible (space reserved) until `script.js` has run.
- **Language buttons are 40 px wide at 360 px and below** (44 px tall) so the header bar fits; above 360 px they are 44×44.
- **Draft marker uses `:has()`.** Browsers without it show the marker in every section in SW and JP, which errs on the side of saying "draft".
- **Developer comments ship in the HTML.** They are for the migration; strip them (or keep only IDs) before a public deployment.
- **Not tested:** real phones and screen readers (VoiceOver, TalkBack, NVDA); Safari and Firefox (Chromium / Edge only); Opera Mini "extreme" mode; real Tanzanian network conditions beyond emulated throttling. Recommended next check: a mid-range Android phone with Chrome and Data Saver.

## 13. Repository housekeeping

- The requested branch `web-v2-requirements` existed only on the remote. It was created locally to track `origin/web-v2-requirements`.
- Before switching, the working tree held the operator's uncommitted legacy work (a recruitment-direction `CLAUDE.md`, `README.md`, `index.html`, `styles.css`, `editorial.css`). Nothing was deleted: `CLAUDE.md` was stashed (`git stash list`) and a copy plus the legacy page files were saved to `archive/legacy-editorial-20260915/`. That folder, `research/`, `knowledge/`, `.github/`, `docs/knowledge/` and other untracked operator files were left untouched and are **not** part of these commits.
- `knowledge/tools/kb.py build|check` (untracked) looks for `<!-- kb:updates:start/end -->` markers in `index.html`. V2 has no News section yet, so `kb.py check` will report the markers missing. Add the markers inside the future News section when it is built; do not add them to the page now (`build` would inject visible markup).
- The root `editorial.css` belongs to the legacy page and is no longer referenced.
- `CLAUDE.md` on this branch still says the existing `index.html` and `styles.css` are a legacy prototype and that the rebuild must wait for the requirements interview. Both statements are out of date (the build gate passed on 2026-09-20; the 2026-09-21 redesign was requested in writing). It was left unchanged because it is a project-instruction file; update it when you are ready.

## 14. Next steps

1. **TANJA approvals** — section 8 table; then flip statements from "VERIFY" to approved and record who approved them.
2. **Translations** — native Kiswahili review of every SW string; Japanese human review of the JP draft; set each string's `data-review` to `reviewed` as it is approved (the section markers disappear by themselves).
3. **Photos** — obtain the remaining Drive subfolders (or an export); choose photos for slots 03, 05–08 and **10–12 (added 2026-09-25: Beekeeping, Cattle, Cafe)**, and a second photograph for About (slots 01 and 02 currently share one original); decide whether the January-2023 cherries stay for Coffee; confirm slot 09 (the dam) is acceptable for Career. Record approvals in the manifest.
4. **Official details** — logo, email, phone, Instagram, Facebook, copyright line, address policy.
5. **Decide the open project scopes** — what "Carbon Credit", "Lunch" (a generic word by itself — confirm what it names and who it serves, `VERIFY`), **Cattle** and **Cafe** each mean publicly; then write the summaries. Cafe in particular needs an explicit go/no-go from TANJA management before any public description is written.
6. **Confirm the meaning of the name "TANJA"** for the About section's new "Name meaning" fact, or confirm there is none to state publicly.
7. **Hosting and CMS** — confirm hosting, staging, backup/restore, and the WordPress + multilingual approach (section 9). No production WordPress, DNS or domain was touched.
8. **Editor handoff** — training, English manual, one supervised test update (brief, section 10).
9. **Before launch** — Open Graph image and canonical URL once a domain exists; favicon review with the official logo; a 404 page in the CMS; strip the developer comments from the HTML.

## 15. Visual redesign, 2026-09-21: before and after

**The brief.** The requirements and structure were right, but at 1440px the page read as "the phone layout stretched sideways": large empty areas, a low-density About, headings weakly tied to their text, and farm photography that was a small guest inside cards. The target was a desktop-first, photography-led agribusiness corporate site.

**What was weak, measured on the previous build at 1440px** (screenshots kept outside the repository): the About heading sat alone above a blank band before its content; Our Company was a bordered three-row table beside a 532 px photograph that was only 642 px wide at source; Coffee was a tall portrait photograph with a text column floating in the middle of empty space; five hatched photo tiles took large areas of the page; Career was a red-barred status box; Contact was a narrow two-column list.

| Area | Before | After | Why |
|---|---|---|---|
| Grid | One container, 1240 px, everything in 2 columns | 12-column grid (`.wrap`) with edge tracks; text stops at 1312 px, photographs run to the window edge | Lets one composition mix a text column and a full-bleed photograph without `100vw` |
| Hero | Wordmark + location line, full window height | Wordmark only, about 88 % of the window on tablet and desktop; phones unchanged | The image is the first impression; the location line is not needed and needed approval |
| Header (desktop) | Pills, boxed hover states, filled language pill | Plain text row, underline for the current section and language | Quiet enough not to compete with the photograph, still ≥ 4.9:1 over it |
| About | Heading, then a table and a small photo | Heading, large lede, paragraph and three caption-style facts on the left; a photograph on the right that runs to the window edge and is as tall as the text; Staff and Vision / Mission follow | Dense, asymmetric, and every element belongs to one composition; no new facts were added, the same paragraph was split in two so the first sentence pair can be set large |
| Facts | Bordered table rows | Label over value, no rules between | Editorial, not "corporate database" |
| Staff | Four large hatched portrait tiles | Label and line on the left, four small portraits on the right | A placeholder no longer fills the screen; 3 to 6 people still fit |
| Vision / Mission | Two stacked blocks | Two columns with a hairline between, large regular-weight type | A visual break between About and What We Do |
| Coffee | Tall portrait photo, text centred beside it | Photograph from the left window edge (5:4, 3:2 from 1200 px), text at its bottom right, large headline | The established core is the visual lead |
| Macadamia / Avocado | Two hatched tiles, side by side | Two columns, the right lowered, quiet flat frames | Rhythm and a staggered composition instead of a row of equal boxes; frames are photo-sized for later |
| Project | `auto-fit` grid of two wide cards | Three fixed columns (two on a tablet, one on a phone), photo-led, no card boxes | A new project takes the next cell; two cards do not stretch |
| Career | Text and a red left-bar status box beside a hatched tile | Text left, a real photograph to the right window edge; the status is a muted note | The red bar read as a warning; the state ("to be confirmed") is a fact, not an alert |
| Contact | Narrow two-column list on a tinted background | Forest-green face, large regular-weight values, social rows in the same rhythm; disabled social entries | Bold and simple, and the dark face carries straight into the dark footer |
| Type | 56 px bold headings, 17 px body, 3 levels close in size | 64 px regular headings, 30 px lede, 18 px body, 13–14 px labels; body measure ≈ 54 characters | Contrast between headline, lede, body and label; light weights only at large sizes |
| Backgrounds | Alternated by hand with `section--tint` | Alternate by CSS (`nth-of-type`) | Inserting News needs no class changes |
| Draft translations | A page-wide strip, "SW / JP is a draft" | Per-string `data-review`; a small marker per section only while a draft remains | A language is not "draft" as a whole; approved strings drop out |

**What the M3 and HIG reading verified or corrected** (the previous build used them from memory): easing `cubic-bezier(0.2, 0, 0, 1)` is M3's *standard* curve (right), 150 ms is `short3` (right), 280 ms was not a token (now 300 ms, `medium2`); state layers are 8 % hover and 10 % focus / pressed, not 6–8 %; the focus ring is 3 px with a 2 px offset; the token `--c-surface-3` is *surface-container-highest* (not "high"); `--c-on-surface-3` (muted) is a TANJA extension with no M3 role and is kept to 13 px and up; the cherry red is close to M3's error red, so it is limited to one small mark and never a fill or a status; Segoe UI renders weight 500 as semibold, so weights used are 400 and 600; Latin measure should be 40–60 characters (was ≈ 66); disabled controls need not meet contrast in M3, but the disabled social entries stay ≥ 4.5:1 because the text is information. HIG: avoid light weights for reading text (the previous 300-weight display lines are now 400).

**Cleanup done alongside** (as requested): (1) the hero location line is optional and off; (2) SW is no longer marked "draft" as a language; (3) every translation has its own review state; (4) the Career status is a muted note (no red bar or box); (5) the Coffee photograph's source date (January 2023) is verified at the source and kept in the manifest only, never on the page (the alt, caption and text carry no date); (6) News insertion is two edits, not three plus a background swap; (7) unconfirmed Instagram / Facebook are disabled buttons with an explicit "Link to be confirmed", not `href="#"`.

**Font decision.** No web font was added. A self-hosted WOFF2 would have added a request and a layout-shift risk, and JA and SW glyph coverage would have needed a subset per language. Hierarchy comes from size, weight (400 / 600), tracking and space. Alternative if a brand face is ever supplied: one self-hosted variable WOFF2 subset, `font-display: swap`, size recorded here, Latin + Latin Extended only (Japanese stays on the platform face).

**Kept from before, unchanged:** five sections in order, the triad markup, `js` / `js-ready` behaviour, `data-slot` and `data-placeholder` conventions, repeatable `li.person` / `article.crop` / `article.project`, the full-screen menu sheet with `inert` and Esc, focus rings, `prefers-reduced-motion`, no framework, no build, no third-party requests.

## 16. Information architecture restructure, 2026-09-25: before and after

**The brief.** The 2026-09-25 Web Development Meeting revised the whiteboard information architecture from 2026-09-18/20: Our Staff
became independent, Vision / Mission fell off the board, and What We Do gained a third branch (Cafe) plus two new items
(Beekeeping, Cattle). The visual language (grid, tokens, type, colour) from the 2026-09-21 redesign was kept unchanged; only the
structure and the markup needed to carry it changed.

| Area | Before (2026-09-20/21) | After (2026-09-25) | Why |
|---|---|---|---|
| Section order | 5 sections: Home/About/What We Do/Career/Contact | 6 sections: Home/About/**Our Staff**/What We Do/Career/Contact | Our Staff is now a top-level whiteboard item, not an About subsection |
| About | Our Company, Our Staff, Vision/Mission all in one section | Our Company only, plus a new "Name meaning" fact (placeholder — no source confirms it) | About now centers on identity/name/start, not a general roll-up |
| Vision / Mission | A full-width green band inside About | Not rendered. Kept as a "planned"/ghost object in `architecture/model.js` and as unused CSS in `styles.css` | Off the 2026-09-25 whiteboard; not deleted from the project so it can be reinstated |
| Farm | Coffee as one large feature (edge-bleed photo, big type) + Macadamia/Avocado as a smaller pair | Four equal cards (Coffee, Avocado, Macadamia, Beekeeping) in a flat 2-column grid; Coffee keeps only its "Established core" chip as extra weight | The whiteboard lists four flat items; an asymmetric feature would misrepresent that |
| Project → Sustainability | Generic "Project" label; Carbon and School | Renamed "Sustainability"; **Carbon Credit** (was Carbon), **Lunch** (was School), **Cattle** (new) | Matches the whiteboard's own term (a later whiteboard photo confirmed "Lunch", not "School Lunch"); the CSS/markup (`.project-grid`, `id="project"`) is unchanged, so this was a low-risk rename plus one new card |
| Cafe | Did not exist | New third branch, single feature block reusing Career's text/photo-bleed layout | Whiteboard adds Cafe as a sibling of Farm and Sustainability, not a member of either |
| Header / footer nav | About, What We Do, Career, Contact | About, **Our Staff**, What We Do, Career, Contact | One nav item added, in the one place the file's own convention requires (the footer copies it via `script.js`) |
| `architecture/model.js` | `staff` nested under `about`; `vision-mission` a normal design object; no beekeeping/cattle/cafe objects | `staff` moved to a top-level child of `site` (order 2.5); `vision-mission` marked `ghost: true`/`status: "planned"` (drops its placeholders so `check.js` doesn't expect them in HTML); new `beekeeping`, `cattle`, `cafe` objects and `slot-10`/`slot-11`/`slot-12` PhotoSlot rows | Keeps the object map a true mirror of the site rather than a stale snapshot |

**What did not change:** the design tokens, the 12-column grid mechanics, the language triad/review-state machinery, the hero, Career and Contact content, and every previously-approved photo (slots 01, 02, 04, 09 keep their existing files and approval state).

**Photos.** No new photograph was found for Beekeeping, Cattle or Cafe — the Google Drive connector was checked again on
2026-09-25 with the same result as 2026-09-20/21 (only `Drone/` is reachable). All three ship as the same quiet placeholder frame
used elsewhere on the page; see `docs/PHOTO_MANIFEST.md` slots 10–12.

**Content.** No new fact was asserted anywhere in this restructure. Carbon/School's renamed labels ("Carbon Credit", "Lunch" — the
latter corrected from an earlier "School Lunch" guess once the actual whiteboard photo was available)
are naming choices from the whiteboard, not new claims about credits, status or partners; Beekeeping/Cattle/Cafe use the same
minimal "is one of TANJA's … areas" + "Details to be confirmed." pattern already used for every other unconfirmed item. See
`docs/CONTENT_GAPS_2026-09-25.md` for the consolidated list of what is still missing per item.

## 17. 2026-09-26: Our Staff removed, What We Do detail page added

Both changes came from direct user instruction in conversation, not a recorded meeting — kept distinct from the "meeting decision"
changes in §16 for that reason.

| Area | Before (2026-09-25) | After (2026-09-26) | Why |
|---|---|---|---|
| Section order | 6 sections: Home/About/**Our Staff**/What We Do/Career/Contact | 5 sections: Home/About/What We Do/Career/Contact | User: "staffセクションは消していい" (it's fine to delete the staff section) |
| Our Staff | Independent top-level section, slot 03, 4 placeholder cards | Not rendered. Kept as a "planned"/ghost object in `architecture/model.js` (design facet has no `htmlId` render, `slot`/`repeat`/`placeholders` all dropped so `architecture/check.js` doesn't expect them in the HTML) | Same reversible pattern as Vision/Mission — the DEFERRED comment in `index.html` now covers both |
| What We Do items | Title text only, no link | Each title (`.crop__title`, `.project__title`, Cafe's `.eyebrow`) wraps an `<a href="what-we-do.html#…">`; a "See full details…" link added near the section lede | User: "what we doの各要素がジャンプできるひとつのwhat we do独立ページを作る" |
| What We Do detail | Did not exist | New `what-we-do.html`: page intro + jump-nav, then Farm/Sustainability/Cafe groups, each item a `.wwd-detail` article with a photo and one or more `.wwd-detail__section` subsections | Requested as "コーヒーのことをdetailに解説したりできる枠" (a frame where things like Coffee can be explained in detail) |
| Coffee's detail frame | N/A | Three named subsections: Overview (reused approved copy), Growing & processing (placeholder), Status & certification (placeholder) | The explicit worked example; copy this shape for another item once more content is approved — do not invent content to fill it meanwhile |
| Other 7 items' detail frame | N/A | Same `.wwd-detail` markup, but only Overview (reused from the homepage) + one "More detail" placeholder subsection | Keeps the frame consistent and ready to extend without inventing content for items that have nothing more approved yet |

**Architecture sync.** `architecture/check.js` gained a small extension: a PhotoSlot row (`slot-NN`) can now be marked
`"ghost": true` to mean "this slot is defined but not currently expected in `index.html`" — needed because Our Staff going ghost
means slot 03 no longer appears on the page, but the slot is still worth documenting in `docs/PHOTO_MANIFEST.md` in case Our Staff
returns. `architecture/test-core.js` had two hostile-number tests retargeted from `staff` to `nav-item` (staff no longer has a
`design.repeat` to mutate).

**Content.** No new fact was asserted. Every item on `what-we-do.html` reuses the exact approved sentence already on the
homepage for its Overview, and every additional subsection is "Details to be confirmed." — the same placeholder already used
everywhere else, just at finer granularity.

**Not verified with TANJA management:** neither change is a content decision (nothing new is claimed), so neither needed the
approval workflow in `docs/CONTENT_GAPS_2026-09-25.md` — they are structural/navigation changes only.

## 18. Automated verification (added 2026-09-25)

`.github/workflows/verify.yml` — a separate workflow from `pages.yml` below — runs on every push to every branch and on pull
requests: `architecture/check.js`, `architecture/test-core.js`, and the new `scripts/verify-render.js` (Playwright: console
errors, horizontal overflow, section order and Farm/Sustainability card counts, EN/SW/JA, the mobile menu, the JavaScript-off
fallback, the `architecture/` viewer's three views, and — added 2026-09-26 — `what-we-do.html`'s own render, anchors and
jump-nav). It never deploys anything.

`package.json` (root) exists only to install Playwright for this CI job and to give it `npm run check` / `test:core` /
`test:render` / `test` scripts — it is **not** a build step for the site, which is unchanged: plain HTML/CSS/JS, open directly in
a browser. Run `npm install && npm test` locally before pushing a structural change.

## Review hosting (GitHub Pages)

Two URLs are shared for review (project site, ordinary public link, no `noindex`):

- Website prototype — `https://hikakintvrainydays.github.io/tanja-corporate-site/`
- Website Structure / Design Map — `https://hikakintvrainydays.github.io/tanja-corporate-site/architecture/`

The second is a **planning / structure reference, not the public TANJA website** (a band at the top of the page says so). It links to the website with "View Website"; the website deliberately has no link back to it.

**Published (allow-list, copied into `_site/` by `.github/workflows/pages.yml`):** `index.html`, `styles.css`, `script.js`, `.nojekyll`, `assets/`, and from `architecture/` only `index.html`, `explorer.css`, `model.js`, `model-core.js`, `layout.js`, `skins.js`, `app.js`, `inspector.js`, `i18n.js`, `i18n-en-model.js`, `i18n-en-inspector.js`, `i18n-en-app.js`. All references are relative, so the same files work locally and under `/tanja-corporate-site/`.

**Not published:** `docs/`, `archive/`, `research/`, `knowledge/`, `.github/`, `check.js`, `test-core.js`, READMEs, handoff notes. `docs/` holds internal-source material.

**Updating:** push to the `pages-review` branch; the workflow redeploys. Pages is set to Source: GitHub Actions. The `github-pages` environment must allow deployments from that branch (Settings → Environments → github-pages → Deployment branches).

**If you add a file the site needs (image, font, script), add it to the allow-list in `pages.yml`,** otherwise it 404s on Pages. Paths are case-sensitive on Pages, unlike Windows.

The viewer's Save / draft features still work but only touch the reviewer's own browser (`localStorage` key `tanja-object-map-draft`); nothing is shared. The viewer moved from `docs/object-map/` to `architecture/`; run `node architecture/check.js` and `node architecture/test-core.js`.

**Viewer language and phones.** The `architecture/` viewer has a JA / EN switch (button at the right of the top bar; remembered in `localStorage` key `tanja-object-map-lang`; the default follows the browser language). All viewer text is translated through `i18n.js` (`t('日本語')`) with dictionaries `i18n-en-model.js` (text inside `model.js`), `i18n-en-inspector.js` and `i18n-en-app.js`; a string with no entry falls back to the Japanese source. `model.js` itself stays Japanese and is unchanged in structure. When model text changes, add its English to `i18n-en-model.js`. On phones (≤900px) the header is compacted, touch targets are 44px, and the canvas supports one-finger pan and two-finger pinch.
