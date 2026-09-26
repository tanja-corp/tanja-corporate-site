# TANJA Web V2 — Photo Manifest

Updated: 2026-09-26 (Our Staff removed from the visible build, slot 03 now ghost; What We Do detail page `what-we-do.html` added,
reusing slots 04–12 — no new slot numbers) · Branch: `web-20260926-whatwedo-detail` · Applies to: `index.html` and `what-we-do.html`

**2026-09-26.** Our Staff (and its slot 03) is no longer rendered — see §2 below and `docs/WEB_V2_WORKING_BRIEF.md` §0b; the row
is kept in `architecture/model.js` as `"ghost": true` so it still appears in this manifest and in the ER view, but
`architecture/check.js` no longer expects `data-slot="03"` anywhere. The new `what-we-do.html` shows the same photographs as
`index.html` at the same slot numbers (e.g. slot 04 appears on both pages) — it does not need its own slot numbers.

**2026-09-25 additions.** Slots 10 (Beekeeping), 11 (Cattle) and 12 (Cafe) are new placeholder frames — no photo exists for any of
them (see §0 below; the Drive connector was checked again on 2026-09-25 and still cannot reach the archive's crop/project subfolders,
only `Drone/`). Slots 07 (Carbon Credit, was "Carbon") and 08 (Lunch, was "School" — the whiteboard photo confirmed "Lunch", not
"School Lunch") keep their existing photograph/placeholder
state; only the on-page label changed, not the project or the evidence behind it.

One row per image **slot**. `data-slot="NN"` in `index.html` matches the slot number here. A slot is a place on the page; the photograph in it can change without touching layout.

## 0. Read this first

**Drive access on 2026-09-20.** The photo archive
(`https://drive.google.com/drive/folders/1AaqD-NB_tc89Y0OMhLAn7YAhtZg6S63v`, folder "タンザニア農園") was checked with the Google Drive connector.
Only `Drone/After_edit/FARM1.mp4` (89 MB, video) was reachable. None of the other subfolders named in the brief (`農園集合写真`, `収穫風景・手元イメージ`, `乾燥プロセス`, …) were visible to the connector, so **no photo was selected from Drive**.
A video is not usable here: the MVP has no video and no autoplay.

**What is on the page instead.**
- Slots 01, 02, 04 use TANJA farm photographs that were already in this repository, and slot 09 (added in the 2026-09-21 redesign) uses one more. All four come from the OSTI group's own public website (`ostiglobal.com`), i.e. they are TANJA's farm, not stock photography. The exact source URL of each is recorded below (verified by HTTP 200 and by visual comparison).
- **Slots 02 and 04 were re-cropped in the redesign** from the same two originals (02 from the hero original, 04 from the portrait cherry photo), because the previous 642×452 About photo is too small to run at half the window width. Slot 01 and slot 02 therefore show the same photograph in two different crops (the hero is the left-hand cherries; About is the terraced slope on the right). Replace slot 02 first when a second real photo arrives.
- Slots 03 and 05–08 are **replaceable placeholder frames** (a flat, quiet tile with the slot number and one small line). Nothing was invented to fill them.
- **A sweep of the OSTI public site on 2026-09-21** (34 pages, 40 candidate images, each downloaded, measured and looked at) found no usable photograph for macadamia, avocado, Carbon, School or staff: the macadamia and avocado images are composites or under 400px, the estate photographs are 642px wide, and every image with people in it was rejected (no recorded consent). The one new photograph that passed is the dam (slot 09). Rainy-season photographs (`…/2026/03/20260309_TANJA_rain{2,7,8,9,11}.jpeg`, captions say TANJA farm, no people) exist but are soft phone shots of a rainy lawn or grass and were judged not good enough to show.

**Approval state key**
| State | Meaning |
|---|---|
| `PROVISIONAL` | Photo is real and from a TANJA/OSTI-owned public source, but nobody at TANJA has yet approved it for *this* site. Replace or approve before launch. |
| `PLACEHOLDER` | No photo. The frame is a stand-in. |
| `APPROVED` | Approved by a named TANJA approver. **No slot has this state yet.** |

Nothing in this file is inferred from how a picture looks. Subject descriptions repeat only what the source page's own caption or text says, or what is plainly visible (colour, plant parts). Place names, dates, cultivars, people's names and roles are **never** taken from appearance.

## 1. Slot table

| Slot | Section | Intended subject | Source | Approval | Derivative file(s) |
|---|---|---|---|---|---|
| 01 | Home / Hero | One strong landscape of the farm | OSTI public image (see §2) | `PROVISIONAL` | `assets/images/01-hero-desktop.{webp,jpg}`, `01-hero-mobile.{webp,jpg}` |
| 02 | About / Our Company | Rows of coffee on a slope between tall trees | OSTI public image (see §2; re-cropped from the slot-01 original) | `PROVISIONAL` | `assets/images/02-company{,-800}.{webp,jpg}` |
| 03 | Our Staff (independent section since 2026-09-25) | Portrait per staff member (repeatable, 3–6) | TBD | `PLACEHOLDER` | — (none yet) |
| 04 | What We Do / Farm — Coffee | Coffee, the established core | OSTI public image (see §2) | `PROVISIONAL` | `assets/images/04-coffee{,-800}.{webp,jpg}` |
| 05 | What We Do / Farm — Macadamia | Macadamia | TBD | `PLACEHOLDER` | — |
| 06 | What We Do / Farm — Avocado | Avocado | TBD | `PLACEHOLDER` | — |
| 07 | What We Do / Sustainability — Carbon Credit (was "Carbon") | Whatever TANJA confirms "Carbon Credit" means | TBD | `PLACEHOLDER` | — |
| 08 | What We Do / Sustainability — Lunch (was "School") | An approved school/lunch-support photo | TBD | `PLACEHOLDER` | — |
| 09 | Career | The place where TANJA works (a dam, per its source caption). No people until approved. | OSTI public image (see §2) | `PROVISIONAL` | `assets/images/09-career{,-800}.{webp,jpg}` |
| 10 | What We Do / Farm — Beekeeping | Beekeeping | TBD | `PLACEHOLDER` | — (none yet) |
| 11 | What We Do / Sustainability — Cattle | Cattle | TBD | `PLACEHOLDER` | — (none yet) |
| 12 | What We Do / Cafe | Cafe (no public description yet either — see `docs/CONTENT_GAPS_2026-09-25.md`) | TBD | `PLACEHOLDER` | — (none yet) |

## 2. Slot detail

### Slot 01 — Hero
| Field | Value |
|---|---|
| Section | Home = Hero. One static image; no slider, no video, no CTA. |
| Subject | Coffee branches with red and green cherries in the foreground; rows of coffee trees on a slope behind. |
| Drive original / file ID | **TBD** — not located in the accessible part of Drive. |
| Source folder | **TBD**. (The source filename contains "reservoir", which suggests `農園風景・貯水湖`; that is a guess and must be confirmed, not assumed.) |
| Source used today | `https://www.ostiglobal.com/images/uploads/2025/07/coffee-farm-landscape-reservoir_1-scaled.jpg` — 2560×1707 px, 752 KB. Appears on the TANJA/UPDATER solar PPA press release page with the caption 「【写真：農園の様子（斜面いっぱいに広がる雄大なコーヒー農園）】」. No people. |
| Approval | `PROVISIONAL` — OSTI public image; TANJA approval for the new site not yet recorded. |
| Desktop aspect | Full-bleed. Tablet and desktop (≥768px): height `clamp(36rem, 88svh, 62rem)` (about 88% of the window; 1440×900 → 792px). Phones keep `clamp(34rem, 100svh, 60rem)`. Source is 3:2; `object-fit: cover` crops top/bottom on wide viewports. |
| Mobile aspect / crop | ≤700 px: a separate **portrait crop**, 660×1166 (≈ 0.57:1), cut from the source at the left-of-centre so the red cherry cluster and the terraced rows both stay in frame. Chosen so a phone does not show a thin centre strip of the landscape. |
| Focal point | Desktop `object-position: 30% 55%` (the cherry cluster). Mobile: baked into the crop. |
| Recommended minimum resolution | Desktop original ≥ 2400×1600. Mobile: a portrait original or crop ≥ 1080×1920. |
| Alt text (EN) | "Coffee branches in the foreground with red and green cherries, and rows of coffee trees on the slope behind." (SW and JP variants are `data-alt-sw` / `data-alt-ja` on the `<img>`.) |
| Caption | None shown. |
| Derivatives | Desktop 1800×1200 WebP 190 KB + JPEG 292 KB (fallback). Mobile 660×1166 WebP 81 KB + JPEG 119 KB. |
| Sharpness | The phone crop is 660 px wide, so it is soft on 2–3× screens (about 1.8–2.2× upscaled). This is a deliberate weight trade-off, not an oversight. When a proper original arrives, export a ~960×1700 portrait crop and a ~2400 px landscape and add them to the `<picture>` as `srcset` width candidates. |
| Replacement notes | Replace the four files (or the one CMS field, see the implementation notes). Keep the subject away from the bottom-left: the TANJA wordmark sits there (it is the only text on the hero; the location line is optional and not shown). The top ~15 % is darkened by a scrim so the header stays legible on any photo. Keep the WebP ≤ ~200 KB. |

### Slot 02 — About / Our Company
| Field | Value |
|---|---|
| Subject | Rows of coffee trees on a slope between tall trees, with a branch of red cherries at the left edge. |
| Drive original / file ID | **TBD** (same original as slot 01) |
| Source folder | **TBD** |
| Source used today | The slot-01 original, `https://www.ostiglobal.com/images/uploads/2025/07/coffee-farm-landscape-reservoir_1-scaled.jpg` (2560×1707), cropped to the right-hand 1760×1320 px region (x 800–2560, y 250–1570). **Replaces the earlier 642×452 photo** (`…/2024/04/section02_image_09.jpg`, the only size OSTI publishes), which was too small for a half-window photograph. |
| Approval | `PROVISIONAL` |
| Desktop aspect | Stretches to the height of the text beside it (about 1.2:1 at 1440), running from the 7th column to the **right window edge**. 768–1023px: 3:2, full width. Phones: 4:3, edge to edge. The source crop is 4:3. |
| Mobile aspect / crop | 4:3 below 768px (edge to edge) |
| Focal point | Centre (`object-position: 50% 50%`). |
| Recommended minimum resolution | ≥ 1600×1200 (that is what is shipped). |
| Alt text (EN) | "Rows of coffee trees on a slope between tall trees, with branches of red cherries in the foreground." |
| Caption | None. |
| Derivatives | `02-company.webp` 1600×1200 (137 KB) + `.jpg` 231 KB; `02-company-800.webp` 800×600 (64 KB) + `.jpg` 83 KB; `srcset` 800w / 1600w. |
| Replacement notes | Slot 01 and slot 02 currently show the same photograph. A second real farm photograph for About is the first improvement to make. A person may appear only with approval (see slot 09 rules). |

### Slot 03 — Our Staff (**not rendered as of 2026-09-26** — see below; repeatable)

Our Staff became independent on 2026-09-25 and was removed from the visible build on 2026-09-26 at the user's direct request.
This slot is kept in the manifest and in `architecture/model.js` (marked `"ghost": true`) purely for reinstatement — it is not
expected to appear anywhere in `index.html` right now.

| Field | Value |
|---|---|
| Subject | One portrait per staff member. Repeatable card: 3–6 entries; four placeholder cards are shown. |
| Source | **TBD.** Needs an approved public roster, exact English titles and an approved headshot per person. |
| Approval | `PLACEHOLDER` |
| Desktop aspect | 3:4 portrait, four across. |
| Mobile aspect / crop | 3:4, two across. |
| Focal point | Face at ~35 % from the top (set per photo with `--focal` on the `.media` element). |
| Recommended minimum resolution | ≥ 900×1200 per portrait. |
| Alt text | Person's name and role as approved, in the form "[Name], [Role]" (never a guess). |
| Replacement notes | **Do not crop individuals out of `農園集合写真` (group photo) into profile cards** without identity, consent and title confirmation (Content Source Map, section D3). The generic person glyph is drawn inline, so a card without a photo still looks intentional. |

### Slot 04 — What We Do / Coffee
| Field | Value |
|---|---|
| Subject | Clusters of green coffee cherries on branches among broad leaves. |
| Drive original / file ID | **TBD** (candidates: `チェリーイメージ１`, `収穫風景・手元イメージ`). |
| Source used today | `https://www.ostiglobal.com/images/uploads/2024/11/20241130_coffee_cherry_Jan-scaled.jpg` — 1920×2560 px. Source caption: 「昨年2023年１月のコーヒーチェリー」 ("coffee cherries, January 2023"), on the OSTI story page dated 2024-11-30. **The photograph is therefore dated January 2023 by its own source. That date is recorded here only: it is not shown on the page (not in the text, the alt, or a caption), and the photo must not be presented as the current season.** No people. |
| Approval | `PROVISIONAL` |
| Desktop aspect | 5:4 (3:2 from 1200px), from the left window edge to the 7th column, with the text at the bottom right. Phones: 5:4, edge to edge. |
| Mobile aspect / crop | 5:4 |
| Focal point | Centre. The crop keeps the two large cherry clusters (source y 900–2436 of 2560, full width). |
| Recommended minimum resolution | ≥ 1280×1024 (shipped). |
| Alt text (EN) | "Clusters of green coffee cherries on branches among broad leaves." |
| Caption | None shown. If one is added it must keep the source's date. |
| Derivatives | `04-coffee.webp` 1280×1024 (143 KB) + `.jpg` 211 KB; `04-coffee-800.webp` 800×640 (75 KB) + `.jpg` 98 KB. Re-cropped in the redesign from the portrait original (the earlier `04-coffee` was the portrait 800×1067). |
| Replacement notes | Coffee is the established core and has the largest frame on the page. A ripe-cherry harvest or drying-bed image would suit the "field-to-processing" story the source map suggests. |

### Slot 05 — What We Do / Macadamia
| Field | Value |
|---|---|
| Subject | Macadamia. |
| Source | **TBD** (`農園他の農作物` per the source map; confirm the crop before captioning). |
| Approval | `PLACEHOLDER` |
| Desktop / mobile aspect | 3:2. Two-up from 768px with the right-hand frame lowered (a stagger); single column on phones. |
| Focal point | Centre. |
| Recommended minimum resolution | ≥ 1200×800. |
| Alt text | Describe only what is visible. |
| Candidate found, **not used** | OSTI public story image `…/uploads/2025/12/202512_Macadamia.jpg` (1280×595). The story text says TANJA finished planting macadamia seedlings, but the file is a **two-photo composite in a very wide ratio**, so it does not fit a 3:2 frame. Its page also states a seedling count, which this site must not repeat. Confirm it, or supply a single clear photo. |

### Slot 06 — What We Do / Avocado
| Field | Value |
|---|---|
| Subject | Avocado. |
| Source | **TBD** (`農園他の農作物`). |
| Approval | `PLACEHOLDER` |
| Desktop / mobile aspect | 3:2 |
| Recommended minimum resolution | ≥ 1200×800. |
| Candidate found, **not used** | OSTI public story image `…/uploads/2026/04/1.202604_avocado.jpg`, caption 「小さな小さなアボカド」. Only **371×495 px**, far too small for the frame. |

### Slot 07 — Sustainability / Carbon Credit (label was "Carbon" before 2026-09-25)
| Field | Value |
|---|---|
| Subject | Depends on what TANJA decides "Carbon Credit" means (open question in the Content Source Map, D10). |
| Source | **TBD.** No dedicated Drive folder was found. |
| Approval | `PLACEHOLDER` |
| Desktop / mobile aspect | 3:2 |
| Recommended minimum resolution | ≥ 1200×800. |
| Candidate found, **not used** | The solar PPA press-release photo (`…/uploads/2025/07/20250701_Press-Release1.jpg`, 1276×420, people in the right half). Its page never says "carbon", so it must not be used for a Carbon card unless management confirms that solar is part of that project. |

### Slot 08 — Sustainability / Lunch (label was "School" before 2026-09-25; whiteboard photo confirms "Lunch", not "School Lunch")
| Field | Value |
|---|---|
| Subject | An approved school / CSR photograph. |
| Source | **TBD.** No candidate exists in any inspected source. |
| Approval | `PLACEHOLDER` |
| Desktop / mobile aspect | 3:2 |
| Replacement notes | Needs permission to name and photograph the school and any students, plus the partner's approval (Content Source Map, D11). Do not use a generic "children at school" image. |

### Slot 09 — Career
| Field | Value |
|---|---|
| Subject | Calm, rippled water between banks of bare red earth, trees and a wooded hill behind, blue sky. The source calls it "the newly completed dam". **No people.** It shows the place where TANJA works; it does not depict recruiting. |
| Drive original / file ID | **TBD** |
| Source folder | **TBD** (the archive names `農園風景・貯水湖`; not confirmed for this file). |
| Source used today | `https://www.ostiglobal.com/images/uploads/2025/12/Dam_Photo.jpeg` — 4032×3024 px, on `https://www.ostiglobal.com/daily-story/year_end_greetings_2025/` with the caption 「【新たに完成した広大なダム】」 ("the vast dam that was newly completed"). The page states nothing about the dam's size, capacity or purpose: **the site must not add such claims.** |
| Approval | `PROVISIONAL` |
| Desktop aspect | 4:3, from the 7th column to the **right window edge** (text on the left). 768–1023px: 3:2 full width. Phones: 4:3 edge to edge. |
| Mobile aspect / crop | 4:3 below 768px (edge to edge) |
| Focal point | `50% 58%` (set with `--focal` on the figure). |
| Recommended minimum resolution | ≥ 1280×960 (shipped). |
| Alt text (EN) | "Calm, rippled water between banks of bare red earth, with trees and a wooded hill behind under a blue sky with white clouds." (Only what is visible: the source calls it a dam, the alt does not.) |
| Caption | None. |
| Derivatives | `09-career.webp` 1280×960 (113 KB) + `.jpg` 143 KB; `09-career-800.webp` 800×600 (43 KB) + `.jpg` 55 KB. |
| Replacement notes | Any recognisable person shown prominently needs approval first (grill-me branch 13). Candidates found and **not used**: OSTI orientation photos (`…/uploads/2026/01/202601_Orientation_2-2.jpeg`, caption 「オリエンテーションの様子」) and the other staff, harvest and certification-team photos — all show identifiable faces, and no page states that the people agreed to reuse. Do not use the old closed recruitment page's imagery to suggest a live vacancy. |

### Slot 10 — What We Do / Farm / Beekeeping (added 2026-09-25)
| Field | Value |
|---|---|
| Subject | Beekeeping, one of the four Farm cards. |
| Source | **TBD.** The Drive connector still cannot reach the archive's crop-specific subfolders as of 2026-09-25 (only `Drone/` is visible); no OSTI public-site sweep has found a usable beekeeping photograph either. |
| Approval | `PLACEHOLDER` |
| Desktop / mobile aspect | 3:2 (same frame as Avocado/Macadamia in the Farm grid) |
| Recommended minimum resolution | ≥ 1200×800 |
| Alt text | Describe only what is visible, once a photo is selected. |

### Slot 11 — What We Do / Sustainability / Cattle (added 2026-09-25)
| Field | Value |
|---|---|
| Subject | Cattle, one of the three Sustainability cards. |
| Source | **TBD.** A TANJA Cattle-project budget spreadsheet exists internally (Drive) but is financial/operational, not a photo source, and must not be used for public figures. |
| Approval | `PLACEHOLDER` |
| Desktop / mobile aspect | 3:2 |
| Recommended minimum resolution | ≥ 1200×800 |
| Alt text | Describe only what is visible, once a photo is selected. |

### Slot 12 — What We Do / Cafe (added 2026-09-25)
| Field | Value |
|---|---|
| Subject | Cafe. No public description or photo exists yet for internal café plans — see `docs/CONTENT_GAPS_2026-09-25.md`. |
| Source | **TBD.** |
| Approval | `PLACEHOLDER` |
| Desktop aspect | 4:3, running to the right window edge (same shape as Career). 768–1023px: 3:2 full width. Phones: 4:3 edge to edge. |
| Mobile aspect / crop | 4:3 below 768px (edge to edge) |
| Recommended minimum resolution | ≥ 1280×960 |
| Alt text | Describe only what is visible, once a photo is selected. |

## 3. Derivative rules (all slots)

- Formats: **WebP** first, **JPEG** fallback, inside `<picture>`. No AVIF (one more file per slot for a small gain; revisit if the CMS generates it automatically).
- Every `<img>` has `width` and `height`, an `alt`, and `decoding="async"`. Everything below the hero has `loading="lazy"`. The hero has `fetchpriority="high"`.
- Never load a Drive original directly. Web copies only.
- Naming: `NN-slot-name[-variant].ext` (a width variant is `NN-slot-name-800`), e.g. `01-hero-mobile.webp`. Slot number first, so a folder listing sorts in page order.
- Page weight measured on 2026-09-21 (WebP served): HTML 42 KB + CSS 41 KB + JS 9 KB raw (24 KB gzipped together). Phone: hero 81 KB, then the 800 w variants of About 65 KB, Coffee 76 KB and Career 43 KB, ≈ **170 KB** before any lazy photo, ≈ **289 KB** after scrolling the whole page. Desktop at 1440 px, 1×: hero 191 KB, About 65 KB (800 w), Coffee 144 KB (1280 w), Career 43 KB (800 w), ≈ **424 KB** first view and ≈ **467 KB** after scrolling. Eight requests including the favicon; no third-party requests, no web fonts.

## 4. How to replace a photo (developer, until the CMS exists)

1. Pick the source. Record its Drive file ID and folder in the slot table above; set `APPROVED` only with a named approver.
2. Export the web copies to the sizes in the slot's "Derivatives" row (WebP quality ~55, JPEG ~62, progressive; full size plus an 800 px width variant named `NN-slot-name-800`). Keep the file names, or update the names in `index.html`.
3. In `index.html`, change the frame for that `data-slot`. A placeholder frame is `<div class="media media--3x2 media--placeholder" data-slot="05" aria-hidden="true"><span class="media__slot">05</span><span class="media__ph-text">…</span></div>`. Replace the whole `<div>` with a `<figure>` that keeps **the same `media--…` ratio class and the same `data-slot`**, drops `media--placeholder`, and contains a `<picture>` (copy slot 09 or slot 04 as the pattern):
   `<figure class="media media--3x2" data-slot="05"><picture><source srcset="… 800w, … 1280w" sizes="…" type="image/webp"><img src="….jpg" width="…" height="…" loading="lazy" decoding="async" alt="…" data-review-sw="draft" data-review-ja="draft" data-alt-sw="…" data-alt-ja="…"></picture></figure>`.
   Keep the frame's position in its grid cell (do not add `grid-column` classes; the parent already places it), and remove the "Photo to be added" line and slot label with the old `<div>`. The alt text says only what is visible, in all three languages.
4. If the slot's `data-placeholder` list changes, or a slot is added or removed, update `architecture/model.js` (slot row and `design.slot`) and run `node architecture/check.js`.
5. Check at 360, 390, 768, 1024 and 1440 px that the focal point works (`--focal` on the figure).

## 5. Open questions for TANJA

1. Who can share the remaining Drive subfolders with the account used for this build, or export the shortlist?
2. Who approves photos, and is one approval enough for a whole batch?
3. May people (staff, students) appear? Which people, and with what consent record?
4. Are the three provisional OSTI images approved for TANJA's own site?
5. Is a January-2023 cherry photo acceptable for Coffee, or should a current-season one replace it?
