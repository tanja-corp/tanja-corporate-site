# TANJA Web V2 — Photo Manifest

Updated: 2026-09-20 · Branch: `web-v2-requirements` · Applies to: `index.html` (static prototype)

One row per image **slot**. `data-slot="NN"` in `index.html` matches the slot number here. A slot is a place on the page; the photograph in it can change without touching layout.

## 0. Read this first

**Drive access on 2026-09-20.** The photo archive
(`https://drive.google.com/drive/folders/1AaqD-NB_tc89Y0OMhLAn7YAhtZg6S63v`, folder "タンザニア農園") was checked with the Google Drive connector.
Only `Drone/After_edit/FARM1.mp4` (89 MB, video) was reachable. None of the other subfolders named in the brief (`農園集合写真`, `収穫風景・手元イメージ`, `乾燥プロセス`, …) were visible to the connector, so **no photo was selected from Drive**.
A video is not usable here: the MVP has no video and no autoplay.

**What is on the page instead.**
- Slots 01, 02, 04 use TANJA farm photographs that were already in this repository. All three come from the OSTI group's own public website (`ostiglobal.com`), i.e. they are TANJA's farm, not stock photography. The exact source URL of each is recorded below (verified by HTTP 200 and by visual comparison on 2026-09-20).
- Slots 03 and 05–09 are **replaceable placeholder frames** (hatched tile + "Photo to be added"). Nothing was invented to fill them.

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
| 02 | About / Our Company | A place-and-work image of the estates | OSTI public image (see §2) | `PROVISIONAL` | `assets/images/02-company.{webp,jpg}` |
| 03 | About / Our Staff | Portrait per staff member (repeatable, 3–6) | TBD | `PLACEHOLDER` | — (none yet) |
| 04 | What We Do / Coffee | Coffee, the established core | OSTI public image (see §2) | `PROVISIONAL` | `assets/images/04-coffee.{webp,jpg}` |
| 05 | What We Do / Macadamia | Macadamia | TBD | `PLACEHOLDER` | — |
| 06 | What We Do / Avocado | Avocado | TBD | `PLACEHOLDER` | — |
| 07 | What We Do / Project — Carbon | Whatever TANJA confirms "Carbon" means | TBD | `PLACEHOLDER` | — |
| 08 | What We Do / Project — School | An approved school / CSR photo | TBD | `PLACEHOLDER` | — |
| 09 | Career | People / working environment | TBD | `PLACEHOLDER` | — |

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
| Desktop aspect | Full-bleed, height `clamp(34rem, 100svh, 60rem)`. Source is 3:2; `object-fit: cover` crops top/bottom on wide viewports. |
| Mobile aspect / crop | ≤700 px: a separate **portrait crop**, 660×1166 (≈ 0.57:1), cut from the source at the left-of-centre so the red cherry cluster and the terraced rows both stay in frame. Chosen so a phone does not show a thin centre strip of the landscape. |
| Focal point | Desktop `object-position: 30% 55%` (the cherry cluster). Mobile: baked into the crop. |
| Recommended minimum resolution | Desktop original ≥ 2400×1600. Mobile: a portrait original or crop ≥ 1080×1920. |
| Alt text (EN) | "Coffee branches in the foreground with red and green cherries, and rows of coffee trees on the slope behind." (SW and JP variants are `data-alt-sw` / `data-alt-ja` on the `<img>`.) |
| Caption | None shown. |
| Derivatives | Desktop 1800×1200 WebP 190 KB + JPEG 292 KB (fallback). Mobile 660×1166 WebP 81 KB + JPEG 119 KB. |
| Sharpness | The phone crop is 660 px wide, so it is soft on 2–3× screens (about 1.8–2.2× upscaled). This is a deliberate weight trade-off, not an oversight. When a proper original arrives, export a ~960×1700 portrait crop and a ~2400 px landscape and add them to the `<picture>` as `srcset` width candidates. |
| Replacement notes | Replace the four files (or the one CMS field, see the implementation notes). Keep the subject away from the bottom-left: the TANJA wordmark sits there. The top ~15 % is darkened by a scrim so the header stays legible on any photo. Keep the WebP ≤ ~200 KB. |

### Slot 02 — About / Our Company
| Field | Value |
|---|---|
| Subject | A dirt path between coffee plants under tall trees. |
| Drive original / file ID | **TBD** |
| Source folder | **TBD** (candidates named in the brief: `農園集合写真`, `事務所周り　景色`, `農園風景・貯水湖`). |
| Source used today | `https://www.ostiglobal.com/images/uploads/2024/04/section02_image_09.jpg` — **642×452 px, the only size published**. It sits under the "Tinga Tinga Estate" heading on `/our-farms/tanzania/` but has no caption of its own, so the site does not name an estate for it. |
| Approval | `PROVISIONAL` |
| Desktop aspect | 4:3 (source ≈ 1.42:1, so the crop is slight). |
| Mobile aspect / crop | 4:3, full width. |
| Focal point | Centre. |
| Recommended minimum resolution | ≥ 1600×1200. **Today's file is low-resolution and looks soft above ~640 px display width** — first candidate for replacement. |
| Alt text (EN) | "A dirt path between coffee plants, with tall trees around it." |
| Caption | None. |
| Derivatives | `02-company.webp` 642×452, 48 KB; `02-company.jpg` 61 KB. |
| Replacement notes | The brief asks for "a credible place + people image rather than generic scenery only". A person may appear only with approval (see slot 09 rules). |

### Slot 03 — About / Our Staff (repeatable)
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
| Subject | Green coffee cherries on a branch among broad leaves. |
| Drive original / file ID | **TBD** (candidates: `チェリーイメージ１`, `収穫風景・手元イメージ`). |
| Source used today | `https://www.ostiglobal.com/images/uploads/2024/11/20241130_coffee_cherry_Jan-scaled.jpg` — 1920×2560 px. Source caption: 「昨年2023年１月のコーヒーチェリー」 ("coffee cherries, January 2023"). **So this photo is dated January 2023 by its own source: do not present it as the current season.** No people. |
| Approval | `PROVISIONAL` |
| Desktop aspect | 3:4 portrait, left column of the Coffee feature (5/11 of the width). |
| Mobile aspect / crop | 3:4, full width. |
| Focal point | Centre. |
| Recommended minimum resolution | ≥ 1200×1600. |
| Alt text (EN) | "Green coffee cherries on a branch among broad leaves." |
| Caption | None shown. If one is added it must keep the source's date. |
| Derivatives | `04-coffee.webp` 800×1067, 119 KB; `04-coffee.jpg` 160 KB. |
| Replacement notes | Coffee is the established core and has the largest frame on the page. A ripe-cherry harvest or drying-bed image would suit the "field-to-processing" story the source map suggests. |

### Slot 05 — What We Do / Macadamia
| Field | Value |
|---|---|
| Subject | Macadamia. |
| Source | **TBD** (`農園他の農作物` per the source map; confirm the crop before captioning). |
| Approval | `PLACEHOLDER` |
| Desktop / mobile aspect | 3:2 (two-up on tablet and desktop, single column on phones). |
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

### Slot 07 — Project / Carbon
| Field | Value |
|---|---|
| Subject | Depends on what TANJA decides "Carbon" means (open question in the Content Source Map, D10). |
| Source | **TBD.** No dedicated Drive folder was found. |
| Approval | `PLACEHOLDER` |
| Desktop / mobile aspect | 3:2 |
| Recommended minimum resolution | ≥ 1200×800. |
| Candidate found, **not used** | The solar PPA press-release photo (`…/uploads/2025/07/20250701_Press-Release1.jpg`, 1276×420, people in the right half). Its page never says "carbon", so it must not be used for a Carbon card unless management confirms that solar is part of that project. |

### Slot 08 — Project / School
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
| Subject | People / working environment at TANJA. |
| Source | **TBD.** |
| Approval | `PLACEHOLDER` |
| Desktop aspect | 3:2, left of the text (mirrored on phones: image first). |
| Mobile aspect / crop | 3:2, full width. |
| Recommended minimum resolution | ≥ 1500×1000. |
| Candidates found, **not used** | OSTI public story images of a TANJA orientation (`…/uploads/2026/01/202601_Orientation_2-2.jpeg`, 1600×1200, caption 「オリエンテーションの様子」). All show identifiable faces. None of the source pages states that the people agreed to reuse on a new site. |
| Replacement notes | Any recognisable person shown prominently needs approval first (grill-me branch 13). The section says nothing about openings, so the photo does not have to depict recruiting. Do not use the old closed recruitment page's imagery to suggest a live vacancy. |

## 3. Derivative rules (all slots)

- Formats: **WebP** first, **JPEG** fallback, inside `<picture>`. No AVIF (one more file per slot for a small gain; revisit if the CMS generates it automatically).
- Every `<img>` has `width` and `height`, an `alt`, and `decoding="async"`. Everything below the hero has `loading="lazy"`. The hero has `fetchpriority="high"`.
- Never load a Drive original directly. Web copies only.
- Naming: `NN-slot-name[-variant].ext`, e.g. `01-hero-mobile.webp`. Slot number first, so a folder listing sorts in page order.
- Page weight measured on 2026-09-20 (WebP served): HTML 34 KB + CSS 28 KB + JS 8 KB (≈ 19 KB together when gzipped) + phone hero 81 KB + two lazy photos 48 KB and 119 KB ≈ **320 KB** on a phone (152 KB before any lazy photo loads), ≈ **430 KB** on desktop (hero 190 KB). Seven requests including the favicon; no third-party requests, no web fonts.

## 4. How to replace a photo (developer, until the CMS exists)

1. Pick the source. Record its Drive file ID and folder in the slot table above; set `APPROVED` only with a named approver.
2. Export the web copies to the sizes in the slot's "Derivatives" row (WebP quality ~60, JPEG ~66, progressive). Keep the file names, or update the names in `index.html`.
3. In `index.html`, change the `<picture>` for that `data-slot`. For a placeholder slot, replace the `<div class="media media--placeholder" aria-hidden="true">…</div>` with a `<figure class="media …">` containing `<picture>` (copy slot 02 as the pattern). Remove `aria-hidden` and add real alt text in all three languages.
4. Check at 360, 390, 768 and 1440 px that the focal point still works.

## 5. Open questions for TANJA

1. Who can share the remaining Drive subfolders with the account used for this build, or export the shortlist?
2. Who approves photos, and is one approval enough for a whole batch?
3. May people (staff, students) appear? Which people, and with what consent record?
4. Are the three provisional OSTI images approved for TANJA's own site?
5. Is a January-2023 cherry photo acceptable for Coffee, or should a current-season one replace it?
