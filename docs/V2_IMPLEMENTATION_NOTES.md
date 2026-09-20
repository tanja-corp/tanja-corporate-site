# TANJA Web V2 — Implementation Notes

Updated: 2026-09-20 · Branch: `web-v2-requirements` · Status: **first static prototype, ready for content review**

Audience: the developer who will migrate this to WordPress, the TANJA project owner who has to approve content, and the local English-speaking IT editor who will maintain it later.

Companion files: `docs/PHOTO_MANIFEST.md` (every image slot), `docs/WEB_V2_WORKING_BRIEF.md` (requirements), `docs/CONTENT_SOURCE_MAP.md` (where each claim may come from).

---

## 1. Implementation summary

- **What it is.** One long-scroll page built with plain `index.html`, `styles.css` and `script.js`. Open `index.html` in a browser; there is nothing to install or build.
- **What is on it.** The five visible sections confirmed on 2026-09-20: Home (= Hero), About, What We Do, Career, Contact, plus a header and a compact footer. News / Updates is *not* built but has marked insertion points.
- **Languages.** English (default), Kiswahili, Japanese, switchable from the header at any time; the visitor's choice is remembered.
- **Content status.** Everything that TANJA has not yet confirmed is shown as a quiet, clearly marked placeholder (see section 7). No fact was invented to fill space. The three photographs used are real TANJA farm photographs from the OSTI public site and are marked provisional.
- **Weight.** About 320 KB on a phone (152 KB before any lazy photo loads), 430 KB on desktop; six to seven requests; no third-party code, no web fonts, no video.
- **What was deliberately left out:** contact form, chatbot, News, dark mode, analytics, Open Graph image (needs a public URL), video, AVIF, any framework.

Files:

| File | Purpose |
|---|---|
| `index.html` | Structure and all three language versions of the copy. Long header comment explains the conventions. |
| `styles.css` | Design tokens (`:root`) then base, layout, header, hero, components, sections, footer, motion, print. |
| `script.js` | Progressive enhancement only (≈ 8 KB raw): language switch, mobile menu (with focus containment), header over the hero, current-section marker, placeholder-link guard. |
| `assets/images/` | `NN-slot-name` derivatives (WebP + JPEG). Older files (`hero.*`, `about-farm-path.*`, `community-coffee-cherries.*`, `hero-mobile.*`) are legacy and unused; safe to delete. |
| `assets/favicon.svg` | Existing favicon. |

## 2. Section structure

```
#home            Home = Hero            slot 01   one static photo, wordmark, one line of location text
#about           About
  #our-company   Our Company            slot 02   facts list + 1 paragraph + photo
  #our-staff     Our Staff              slot 03   repeatable portrait cards (4 placeholders)
  #vision-mission Vision / Mission                 full-width green band, two placeholder statements
#what-we-do      What We Do
  #farm          Farm
    #coffee      Coffee (feature)       slot 04
    #macadamia   Macadamia              slot 05   placeholder photo
    #avocado     Avocado                slot 06   placeholder photo
  #project       Project (extensible grid)
    #carbon      Carbon                 slot 07   placeholder photo
    #school      School                 slot 08   placeholder photo
                 [future project cards go here]
                 [future: News / Updates section goes here]
#career          Career                 slot 09   placeholder photo + "to be confirmed" status. No Apply button.
#contact         Contact                          email, phone, Instagram, Facebook (all placeholders); no form
footer                                            brand, nav, EN|SW|JP, social icons, copyright placeholder
```

Heading hierarchy: one `h1` (hero wordmark) → `h2` per section → `h3` for blocks/groups → `h4` for a crop or project. Karatu is **not** a section (per the 2026-09-20 decision); location appears only as one line in the hero and one row in the Our Company facts.

### Extending the page without touching CSS (tested on 2026-09-20)

- **More projects.** Copy a project `<li>`; change title, text, photo **and the id**. 3, 4 and 5 cards reflow by themselves (`auto-fit`). One lone card becomes very wide, so the pattern assumes two or more.
- **More staff.** 3, 4, 5 or 6 cards choose sensible column counts. Their photos are `<div class="media">` frames, so swapping in a portrait needs no layout change.
- **A real photo instead of a placeholder.** Follow the pattern in `PHOTO_MANIFEST.md` section 4.
- **News / Updates.** Three edits, marked in the HTML: the section (between What We Do and Career), the header nav item and the footer nav item. Section backgrounds alternate **by hand** (`section--tint`), so also add `section--tint` to Career and remove it from Contact to keep the rhythm. No CSS or JS change is needed; the current-section marker picks the new link up by itself.

## 3. Design decisions

**Direction.** Calm, credible, agricultural, image-led, restrained. Photography and whitespace carry the page; there are almost no boxed cards, no shadows, no gradients other than a scrim over the hero photo, and no decorative motion.

**References.** The brief names Lima Tanzania as the strongest reference, and the team liked its menu. It could not be fetched from this environment (HTTP 403), so it was not copied or traced. The pieces borrowed in spirit: a photograph-first opening, a very small header, short text blocks, a clear split between crops and projects. Everything else is TANJA-specific.

**Apple HIG and Material Design 3** (supplied by the operator) were used as *principles*, not components:

| Principle | Where it shows up |
|---|---|
| HIG: 44 pt minimum hit target | Every button and link is ≥ 44×44 px on phones (`--touch`); measured, see section 12. |
| HIG: segmented control for a small set of exclusive choices | The EN \| SW \| JP language control. |
| HIG: full-width sheet for a menu on a phone; content over chrome | The mobile menu is a full-screen sheet with large rows; header stays visible above it. |
| HIG: safe-area insets | `env(safe-area-inset-*)` on container padding, the menu sheet and the footer. |
| HIG: legible default text size | Body text is 17 px. |
| M3: colour *roles* | `--c-surface`, `--c-on-surface`, `--c-primary`, `--c-primary-2` (container), `--c-outline`, … so a future re-skin edits one block. |
| M3: type scale | `--fs-display / headline / title-l / title / body-l / body / label`, fluid with `clamp()`. |
| M3: shape scale, state layers, standard easing | Small radii; hover states are a 6–8 % tint of the text colour; `cubic-bezier(0.2, 0, 0, 1)`; every transition is switched off under `prefers-reduced-motion`. |

**Colour.** Forest green (`#24402f`) as the anchor, warm paper (`#faf8f2`) as the surface, coffee-cherry red (`#9c3a2d`) used only for the current-section marker and the Career status bar. All text pairs measure ≥ 4.5:1 (table in section 12). No dark mode: the page is photography-led and dark mode would need its own photo treatment; tokens make it a small later addition.

**Typography.** System fonts only. No font is downloaded, which is the single biggest saving on a slow connection and removes a source of layout shift. Japanese uses the platform's Japanese UI face with looser leading and `line-break: strict`. Hierarchy comes from scale, weight and tracking rather than a display face.

**Header.** Transparent over the hero (white text, darkened top of the photo for legibility) and solid paper once the hero has scrolled away. Two classes on `<html>` keep this safe: `js` (added by a 6-line inline script before first paint) drives the *layout* (collapsed nav, hero pulled under the header), so nothing moves when `script.js` arrives; `js-ready` (added by `script.js` when it has run) reveals the language and menu controls and enables the transparent colours. Without JS, or if `script.js` fails to load (`onerror` removes `js`), the header is solid and the plain inline nav shows. A current-section marker (underline) follows the scroll position.

**Hero.** One static photograph, `height: clamp(34rem, 100svh, 60rem)`, wordmark bottom-left, one line of text. No slider, no video, no button. The photo is a single `<picture>` so it is one field in the CMS.

**Placeholders are designed, not blank.** Missing photos are hatched tiles with a small icon and "Photo to be added" plus the slot number; missing text is a muted "to be confirmed" line; the Vision / Mission band keeps its full-width place with one plain sentence. The aim is that a reviewer sees a finished layout and can immediately tell what is not yet real.

## 4. Responsive decisions

Mobile-first: the base CSS is the phone layout; media queries only add.

| Width | Behaviour |
|---|---|
| < 600 px | Single column; staff cards 2×2; Coffee stacked (photo then text); menu is a sheet. |
| 600–767 px | Staff 4 across; Macadamia/Avocado and Vision/Mission side by side. |
| 768–959 px | Our Company and Career become two columns; Coffee feature becomes photo left / text right; Contact two columns; footer one row. |
| ≥ 960 px | Header shows the inline nav; menu button disappears. (`60em`, chosen because the longest Kiswahili nav labels need it.) |
| ≥ 1200 px | Wider gaps between split columns. Container is capped at 1240 px. |
| ≤ 360 px | Language buttons and brand tighten so the bar never wraps. |

- **Hero art direction.** At ≤ 700 px the browser gets a separate *portrait crop* (`01-hero-mobile`, 660×1166) instead of squeezing the landscape into a thin centre strip. The crop keeps the red cherries and the terraced rows.
- The mobile breakpoint for the menu (`60em`) and the image swap (`700px`) are intentionally different.
- Text is `rem`-based so browser font-size settings are respected; long words and the email address wrap (`overflow-wrap: anywhere` where needed), grid tracks are `minmax(0, …)`, and the header controls are capped in `px` so a 150–200 % text size cannot push the menu button off-screen. Verified at root font sizes of 24 px and 32 px in all three languages: no sideways scroll.
- The SW/JP draft strip is subtracted from the hero height (`--note-h`), so the wordmark and subtitle stay on the first screen; on landscape phones the hero fits the viewport.
- Checked at 320, 360, 390, 412, 768, 1024, 1280, 1440, 1920 px and a landscape phone; see section 12.

## 5. Language architecture

- **Markup.** Every translatable string exists three times: `<span data-l="en">…</span><span data-l="sw" lang="sw">…</span><span data-l="ja" lang="ja">…</span>`. Text identical in all languages (a company name, a year) is written once with no `data-l`. `<title>` and `<meta name="description">` carry `data-sw` / `data-ja`; image `alt`s carry `data-alt-sw` / `data-alt-ja`.
- **Switching.** `<html data-lang>` selects the language; CSS hides the other two variants (`display: none`, so they are also removed from the accessibility tree). `script.js` sets `data-lang` and `lang`, updates the title, description and alts, and toggles `aria-pressed` on **every** language control (header and footer).
- **Default and memory.** English on first visit. A saved SW or JP choice is applied by a 6-line inline script in `<head>` before first paint, so there is no flash of English. Storage access is wrapped in `try/catch`; if storage is blocked the switch still works for the session and a corrupt value is ignored.
- **JavaScript off.** `<html data-lang="en">` is hard-coded, so the English copy and the inline navigation are fully readable; the language and menu controls are invisible rather than dead.
- **Review status on screen.** While SW and JP are unreviewed, a thin strip under the top of the page says so in that language ("draft translation, awaiting native review" / 「AIによる下書きで、日本語話者の確認前です」). Remove the `.tl-note` element once each language is approved. Owners: **EN** internal English reviewer; **SW** native Kiswahili reviewer; **JP** AI draft, then Japanese human review, then publish. Neither the SW nor the JP copy here is approved.
- **Same structure in every language.** All three variants sit in the same element, so the layout cannot differ between languages. Content can still be incomplete: if a string has no SW or JP variant, English is shown for that string instead of a blank gap (`:has()` fallback in `styles.css`). Parity check used during the build: every `[data-l="en"]` has a `sw` and a `ja` sibling (71 of 71 today).
- **Adding a language (touch points).** (1) a `data-l="xx"` span in every triad; (2) a button in **both** language controls (header and footer); (3) the three rule groups in `styles.css` section 1 (default hide, show when active, hide English when active) and the fallback; (4) the boot script in `<head>` (`l === 'sw' || l === 'ja'`) **and** `LANGS` in `script.js`, which are two separate lists; (5) `data-xx` on `<title>`, the description and every `data-alt-*` image; (6) the nav-label spans (`nav-primary-label`, `nav-footer-label`) and the draft strip. Easy but not one-line; per the brief a fourth language also needs a named audience and translation owner.
- **Accessible names follow the language.** Both `<nav>` landmarks are named through visually hidden triads, images get translated alts, and the language buttons keep their visible label in their name (`JP 日本語`) so voice control works.
- **Labels.** The switch shows `EN | SW | JP` (no flags), with accessible names "English", "Kiswahili", "日本語".

## 6. Image architecture

See `docs/PHOTO_MANIFEST.md` for every slot. In short:

- Nine numbered slots; `data-slot="NN"` in the HTML.
- `<picture>` with WebP then JPEG; `width`/`height` on every `<img>`; lazy-loading everywhere except the hero; `fetchpriority="high"` on the hero.
- The frame (`.media`) fixes the aspect ratio via a modifier class (`media--3x2`, `--4x3`, `--3x4`) and the image always covers it with `object-fit: cover`; a per-photo focal point is `--focal` on the frame. Swapping a photo therefore never moves the layout.
- No Drive original is ever linked from the page.

## 7. Placeholder list

Every placeholder is tagged `data-placeholder="…"` in `index.html` (search for it). Photos are in the manifest.

| `data-placeholder` | What is shown | To replace it, TANJA must supply |
|---|---|---|
| `logo` | Text wordmark "TANJA" | Official logo file(s) |
| `hero-line` | "Farms in Karatu, Tanzania" | Approval of this line (location only) |
| `staff-roster` | 4 cards: "Staff Member" / "Role / Position" | Approved roster, exact English titles, approved portraits |
| `vision`, `mission` | "Official wording to be confirmed." | Approved Vision and Mission wording (do **not** blend the Smart Village mission with OSTI values) |
| `coffee-details`, `macadamia-details`, `avocado-details` | "Details to be confirmed." | Approved crop copy: stage, variety, area, timeline — only if TANJA wants them public |
| `carbon-details`, `school-details` | "Details to be confirmed." | An approved one-page summary per project (scope, partner, what actually happened, dates, permitted photos) |
| `career-status` | "Current openings and recruitment details to be confirmed." | Whether TANJA is recruiting, and the route (email, page, none) |
| `email` | `hello@example.com` (reserved example domain, can never reach a real inbox) | Official public email |
| `phone` | `+255 XX XXX XXXX` (not a link) | Official public phone / WhatsApp |
| `instagram-url`, `facebook-url` | Icon links with `href="#"`, `aria-disabled="true"`; clicking does nothing | Official account URLs (also in the footer icons) |
| `copyright` | © 2026 TANJA Corporation Limited | Approved legal line |
| Photos 03, 05–09 | Hatched frames | See manifest |

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
| Photos 01, 02, 04 | OSTI public site | Rights and approval for TANJA's own site; photo 04 is dated January 2023 by its source |

**Deliberately not stated** (sources conflict or are stale): employee count (550+ vs 500+), farm and crop hectares, planting year, harvest years, OSTI group founding year (2012 vs 2013), certifications, carbon-credit status, solar PPA figures, registered-office vs farm address, directors, seedling counts, any market, buyer, price or export claim. **Ngorongoro is not mentioned anywhere**; if it is ever added it needs the "separate district" qualifier from the culture research, because of the documented Ngorongoro land-relocation controversy.

## 9. WordPress / Gutenberg migration notes

The CMS choice is not locked (brief, section 3). This is the mapping if WordPress + block editor is chosen.

**Principle: content is editable, design is fixed.** Layout lives in a custom block theme; editors fill fields inside locked patterns.

| Prototype piece | WordPress equivalent |
|---|---|
| `:root` tokens in `styles.css` | `theme.json` (colours, font sizes, spacing) — the names already mirror it |
| Each `<section>` | A locked **block pattern** (Hero, About, What We Do, Career, Contact). `templateLock: "all"` on the front-page template; editors edit inside, cannot move or delete sections |
| Staff cards | Custom post type `tanja_staff` (name, role, portrait, order); the pattern renders 3–6 entries via a Query Loop |
| Project cards | Custom post type `tanja_project` (title, summary, photo, "detail page" toggle). The grid already reflows, so adding a project needs no layout work |
| Crops (Coffee / Macadamia / Avocado) | Three fixed pattern slots (the hierarchy is fixed by the meeting), or a small `tanja_crop` CPT capped at three |
| Contact values, social URLs, copyright | One "Site details" options page; the header, footer and Contact section all read it |
| Language triads | See below |
| News / Updates | Standard posts with one category; a locked pattern shows the latest 3 between What We Do and Career, plus an archive; later, an article can be surfaced inside Farm or Project by category |

**Multilingual.** Two workable options; pick with the editor.
- **A. One post per language (Polylang or similar). Recommended.** Each language has its own front page and its own WordPress status, so "SW is still a draft, JP is pending review, EN is published" is native and visible, which the brief asks for. Gives real per-language URLs and `hreflang`. The three pages are built from the same locked pattern, so structure stays identical. The header `EN | SW | JP` becomes the plugin's switcher styled by the theme.
- **B. Triad fields on one page (as in this prototype).** Instant switching without reload and structure guaranteed identical, but it needs per-language fields for every block (ACF Pro or custom meta), no per-language URLs, and every language is downloaded on every visit (small). Fine for a very small site.

Either way, keep the "unreviewed draft" strip and switch it off per language when that language is approved.

**Hero.** One image field. Provide an optional second field for a portrait crop, or use the Cover block's focal-point control; without one of them, phones would see a thin centre strip of the landscape.

**Editors** get a custom role: edit content and staff/projects/news, upload media, publish. No theme, plugin, code, menu-structure or settings access; disable the Custom HTML block and the code editor; restrict the block inserter to what the patterns use.

**Images.** Let WordPress generate WebP sizes; set a max upload dimension and remind editors to upload ≥ 1600 px landscape and ≥ 900×1200 portraits; keep the manifest columns as the editor's checklist (alt text in three languages).

## 10. Recommended CMS fields

| Block | Field | Type | Notes |
|---|---|---|---|
| Hero | Image; mobile crop (optional) | Image | Alt text ×3 languages |
| Hero | Location line | Text ×3 | Currently "Farms in Karatu, Tanzania" |
| Our Company | Facts (company, started, location) | 3 label/value pairs ×3 | |
| Our Company | Paragraph | Text ×3 | |
| Our Company | Photo | Image + alt ×3 | |
| Our Staff | Entries (3–6) | Repeater / CPT | Name, role ×3, portrait, alt |
| Vision / Mission | Vision, Mission | Text ×3 each | Required before the placeholder disappears; keep the placeholder as the empty state |
| Farm | For each crop: chip, title, text, photo, "details" line | Text ×3, Image | Coffee also has the larger layout |
| Project | Entries (extensible) | Repeater / CPT | Title, text ×3, photo, optional link to a detail article |
| Career | Text, status line | Text ×3 | A "currently recruiting" switch plus an apply link **only** when a route exists |
| Career | Photo | Image + alt | |
| Contact | Email, phone, Instagram URL, Facebook URL | Options page | Empty value = show nothing, not a placeholder, in production |
| Footer | Copyright line | Text | |
| Site | Translation status per language | Status | Draft / Reviewed / Published |

## 11. Developer-only areas

Routine editors must not touch: the theme and `theme.json`; block patterns and the front-page template; CSS and JavaScript; grid, spacing, typography and breakpoints; the navigation structure and section order; plugin and role settings; hosting, DNS, deployment and backups; the placeholder-marking convention. Developer changes are also needed to add a new *kind* of section, a new language, or a new field type.

## 12. Verification (2026-09-20)

Test scripts live outside the repository (session scratchpad) and drive Microsoft Edge through Playwright. Nothing was installed in the repository.

**Independent review.** Seven reviewers (content integrity, Kiswahili, Japanese, HTML/accessibility, responsive visual, performance/robustness, extensibility) examined the page; a second agent tried to refute each of their findings. Outcome: 31 findings survived and were handled, 19 were refuted (for example: "Career mentions openings", which the brief requires to be worded as "to be confirmed"; "the notes file does not exist", it does), 15 were nits, 6 lower-priority items were not re-tested. Every fix below was re-tested by the author, not only by the reviewers.

| Area | Result |
|---|---|
| Behaviour suite (header states, menu, language switch + memory, JS off, blocked storage, scroll marker, keyboard, touch targets, reduced motion) | 33 / 33 pass |
| Regression suite, one test per fixed finding (layout shift with a late script, script-failure fallback, bad nav link, focus ring on the selected language, menu focus in both motion modes, focus containment, large text, draft strip vs hero height, menu position with the strip, landscape phone, missing-translation fallback, 3/5/6 staff cards, landmark names, print, forced colours, JA header 960–1100 px) | 55 / 55 pass |
| Overflow and console errors, EN/SW/JP × 360, 390, 768, 1024, 1440 px | 15 / 15 clean; also clean at 320, 412, 1280, 1920 px and 844×390 landscape (reviewer run) |
| Root font size 24 px and 32 px (Chrome "very large" and 200 %), 360 / 390 / 768 px, 3 languages | no horizontal scroll |
| axe-core (WCAG 2.2 AA + best-practice), EN/SW/JP × 390 and 1440 px × top / scrolled / menu-open | 0 violations. The remaining "incomplete" items are text over photographs, measured separately below |
| html-validate | 4 findings, all deliberate: `role="list"` on `<ul>` whose markers are removed (keeps list semantics in Safari/VoiceOver) |
| Layout shift (CLS) with `script.js` delayed 400 ms, 390 and 1440 px, EN and SW | 0.0000 (was 0.13–0.17 before the fix) |
| Text contrast, colour tokens (WCAG) | all text pairs ≥ 4.5:1 (lowest: muted text on the placeholder tile, 4.72:1); borders and icons ≥ 3:1 |
| Text contrast over the hero photograph (rendered pixels, 95th-percentile brightness, text hidden) | nav, language control, brand ≥ 5.5:1; wordmark ≥ 5.9:1; subtitle ≥ 7.7:1 |
| Requests | index, CSS, JS, favicon, hero, and the two lazy photos; none third-party; no font files |
| Weight | ≈ 320 KB phone / 430 KB desktop; HTML 34 KB + CSS 28 KB + JS 8 KB raw (≈ 19 KB gzipped together) |

**Known trade-offs, deliberately accepted**
- **Photo sharpness.** To keep the page light, the phone hero (660×1166) and the Our Company photo (642×452) are soft on 2–3× screens. Higher-resolution candidates were *not* added to `srcset` because the weight would rise for the most common phones. Fix by supplying proper originals (`PHOTO_MANIFEST.md`, open questions) and adding `srcset` then.
- **Header transparency needs JavaScript.** With JS off the header is solid, by design.
- **Hidden until ready.** The language and menu controls are invisible (space reserved) until `script.js` has run, roughly the first few tens of milliseconds.
- **Developer comments ship in the HTML.** They are for the migration; strip them (or keep only IDs) before a public deployment. They no longer contain addresses or internal document names.
- **Not tested:** real phones and screen readers (VoiceOver, TalkBack, NVDA); Safari and Firefox (Chromium/Edge only); Opera Mini "extreme" mode; real Tanzanian network conditions beyond emulated throttling. Recommended next check: a mid-range Android phone with Chrome and Data Saver.

## 13. Repository housekeeping

- The requested branch `web-v2-requirements` existed only on the remote. It was created locally to track `origin/web-v2-requirements`.
- Before switching, the working tree held the operator's uncommitted legacy work (a recruitment-direction `CLAUDE.md`, `README.md`, `index.html`, `styles.css`, `editorial.css`). Nothing was deleted: `CLAUDE.md` was stashed (`git stash list`) and a copy plus the legacy page files were saved to `archive/legacy-editorial-20260915/`. That folder, `research/`, `knowledge/`, `.github/`, `docs/knowledge/` and other untracked operator files were left untouched and are **not** part of these commits.
- `knowledge/tools/kb.py build|check` (untracked) looks for `<!-- kb:updates:start/end -->` markers in `index.html`. V2 has no News section yet, so `kb.py check` will report the markers missing. Add the markers inside the future News section when it is built; do not add them to the page now (`build` would inject visible markup).
- The root `editorial.css` belongs to the legacy page and is no longer referenced.
- `CLAUDE.md` on this branch still says the existing `index.html` and `styles.css` are a legacy prototype and that the rebuild must wait for the requirements interview. Both statements are now out of date (the build gate passed on 2026-09-20 and this is the rebuild). It was left unchanged because it is a project-instruction file; update it when you are ready.

## 14. Next steps

1. **TANJA approvals** — section 8 table; then flip statements from "VERIFY" to approved and record who approved them.
2. **Translations** — native Kiswahili review of every SW string; Japanese human review of the JP draft; then remove each language's draft strip.
3. **Photos** — obtain the remaining Drive subfolders (or an export); choose photos for slots 03, 05–09; replace the low-resolution slot 02; decide whether the January-2023 cherries stay for Coffee. Record approvals in the manifest.
4. **Official details** — logo, email, phone, Instagram, Facebook, copyright line, address policy.
5. **Decide the two open project scopes** — what "Carbon" and "School" mean publicly; then write the two summaries.
6. **Hosting and CMS** — confirm hosting, staging, backup/restore, and the WordPress + multilingual approach (section 9). No production WordPress, DNS or domain was touched.
7. **Editor handoff** — training, English manual, one supervised test update (brief, section 10).
8. **Before launch** — Open Graph image and canonical URL once a domain exists; favicon review with the official logo; a 404 page in the CMS.
