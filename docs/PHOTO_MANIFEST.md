# TANJA Web V2 — Photo Manifest

Updated: 2026-09-29 (visual redesign; every visible slot except Cafe now has a real TANJA photograph) · Branch:
`web-20260929-redesign` · Applies to: `index.html` and `what-we-do.html`

One row per image **slot**. `data-slot="NN"` in `index.html` matches the slot number here. A slot is a place on the page; the
photograph in it can change without touching layout. `node architecture/check.js` compares the approval state below with
`architecture/model.js`.

## 0. Read this first

**Where the photographs come from (2026-09-29).** Three sources became reachable in this session:

| Key | Source | What it is | Notes |
|---|---|---|---|
| **DRIVE** | Google Drive "タンザニア農園" (`1AaqD-NB_tc89Y0OMhLAn7YAhtZg6S63v`), owner shiratori.aaic | Professional farm photo archive, Canon 5D, EXIF August 2023 | Every subfolder is now reachable (550 files). The connector cannot download pixels (10 MB limit); copies were fetched read-only over Google's public image endpoint at 2000 px. **The whole archive is shared "anyone with the link", including photographs with identifiable workers** — worth tightening. |
| **NAS** | `\\192.168.0.100\001_SM\●会社概要PPT\` decks (read-only copy) | Photos embedded in TANJA's external-facing decks: `TANJA Profile.pptx`, `JP-TZ Investment Mission用プレゼン.pptx`, `観光客向け_OSTI_タンザニア農園紹介.pptx`; plus `152_CSR\CSR GENERAL INFORAMTION\Presentation CSR Annual Report.pptx` | Already shown to outsiders by TANJA; deck captions recorded where they exist. |
| **OSTI** | ostiglobal.com public story pages | TANJA farm photos already published by the group | Used for Macadamia only (the only photo whose own caption says it is TANJA's macadamia). |
| **USER** | Supplied directly in the working session, 2026-09-29 ("これ使って あぼかど") | Avocado close-up, 1920×1440 | |

**Rules kept.** Descriptions repeat only what the source caption says or what is plainly visible. Names, places, dates and
varieties are never inferred from a picture. No identifiable face is shown anywhere (the Career photograph shows hands only).
Photos that were checked and **rejected**: the gate sign "SHAH PLANTATIONS LTD" (DRIVE office 2-12; name relationship unverified),
frames from the edited drone videos (owned by an outside account; rights unverified), NAS school photos (minors), the cookstove
photos (identifiable faces in a neighbour household), and DRIVE `農園他の農作物` saplings (species cannot be identified).

**Approval state key**
| State | Meaning |
|---|---|
| `PROVISIONAL` | Photo is real and TANJA-owned (archive, external-facing deck, public page or supplied by the user), but nobody at TANJA has yet approved it for *this* site. |
| `PLACEHOLDER` | No photo. The frame is a designed stand-in. |
| `APPROVED` | Approved by a named TANJA approver. **No slot has this state yet.** |

## 1. Slot table

| Slot | Section | Subject | Source | Approval | Derivative file(s) |
|---|---|---|---|---|---|
| 01 | Home / Hero (slide 1 of 8) | Coffee rows running towards the plain | DRIVE `農園風景・貯水湖/coffee farm landscape reservoir lake-5.jpg` (`1hdJlokxTAd2KuWjN3et9d7aQEfn4dgBA`) | `PROVISIONAL` | `01-hero-1{,-1200,-m}.{webp,jpg}` |
| 02 | About / Our Company | Road through an avenue of old trees, coffee on both sides | DRIVE `農園アプローチ/coffee farm approach-11.jpg` (`1_GgN7cRQzQ1F0Z_9NuZs_ebdCVFDZTeS`) | `PROVISIONAL` | `02-company{,-700}.{webp,jpg}` |
| 03 | Our Staff (ghost since 2026-09-26) | — | — | `PLACEHOLDER` | — |
| 04 | Farm — Coffee | Cluster of ripe red cherries | DRIVE `チェリーイメージ１/coffee farm cherry-8.jpg` (`1vtuYXRDrhj2QtrZBZYKC0KNzH2swLvgM`) | `PROVISIONAL` | `04-coffee{,-500}.{webp,jpg}` |
| 05 | Farm — Macadamia | Young macadamia trees in rows | OSTI `/images/uploads/2025/12/202512_Macadamia.jpg`, left panel only; caption 「TANJA農園でもマカダミア・ナッツの定植完了」 | `PROVISIONAL` | `05-macadamia.{webp,jpg}` (476×595 — low resolution; replace first) |
| 06 | Farm — Avocado | Green avocado hanging from a branch | USER, 2026-09-29 (What We Do only, not the hero) | `PROVISIONAL` | `06-avocado{,-500}.{webp,jpg}`; wide crop for the detail page `06-avocado-wide{,-700}` |
| 07 | Sustainability — Carbon Credit | Trees and bush on the hills, plain beyond (the landscape the project protects; not a cookstove) | DRIVE `農園への道や風景/coffee farm scenery-18.jpg` (`1KaY1DO1IcXu4qnHbNvsGxCdwZk9C29UR`) | `PROVISIONAL` | `07-carbon{,-700}.{webp,jpg}` — replace with a consented cookstove photo when one exists |
| 08 | Sustainability — Lunch | Open hand holding white maize | NAS `Presentation CSR Annual Report.pptx` slide 6 | `PROVISIONAL` | `08-lunch{,-700}.{webp,jpg}` |
| 09 | Career | Circle of hands holding red coffee cherries (no faces) | DRIVE `チェリーイメージ１/coffee farm cherry-13.jpg` (`1iM6uzLBwjGh3gu0erqoF5AX-93iA0Mfg`) | `PROVISIONAL` | `09-career{,-700}.{webp,jpg}` |
| 10 | Farm — Beekeeping | Hive frame covered in bees | NAS `TANJA Profile.pptx` slide 9 (also tourist deck slide 26) | `PROVISIONAL` | `10-beekeeping{,-500}.{webp,jpg}` |
| 11 | Sustainability — Cattle | A cow beside a wooden shed | NAS `TANJA Profile.pptx` slide 9 (also tourist deck slide 26) | `PROVISIONAL` | `11-cattle{,-700}.{webp,jpg}` — weak photo; replace when a better one exists |
| 12 | Cafe | No photo: a designed dark panel | — | `PLACEHOLDER` | — |

## 2. Hero slides (all slot 01, no separate slot numbers)

Eight slides. Slides 2 and 6 are the **previous version's** hero and dam photographs (from OSTI's public site), added at the user's
request on 2026-09-29. The avocado photograph is *not* in the hero (it belongs to What We Do).

| Slide | Caption on the page | Source | Derivatives |
|---|---|---|---|
| 1 | Coffee rows looking out over the plain | DRIVE `農園風景・貯水湖/coffee farm landscape reservoir lake-5.jpg` | `01-hero-1*` |
| 2 | Ripening cherries, with the coffee rows behind | OSTI `/images/uploads/2025/07/coffee-farm-landscape-reservoir_1-scaled.jpg` (2560×1707; the previous hero; press-release caption 「斜面いっぱいに広がる雄大なコーヒー農園」) | `01-hero-2*` |
| 3 | Mt. Oldeani, seen from the farm | NAS `JP-TZ Investment Mission用プレゼン.pptx` slides 15/17, deck caption "Mt. Oldeani from Tanja Farm" | `01-hero-3*` |
| 4 | Coffee on the slope, with a reservoir below | DRIVE `農園風景・貯水湖/coffee farm landscape reservoir lake-43.jpg` | `01-hero-4*` |
| 5 | Drying beds, seen from the air | DRIVE `Drone/Before_edit` raw clip `DJI_0880`, frame at 20 s | `01-hero-5*` |
| 6 | The dam, completed in 2025 | OSTI `/images/uploads/2025/12/Dam_Photo.jpeg` (the previous slot 09; source caption 【新たに完成した広大なダム】). The source states nothing about its size or purpose: the site must not add such claims. | `01-hero-6*` |
| 7 | The first sunrise of 2025 on the farm | NAS `JP-TZ Investment Mission用プレゼン.pptx` slide 25, deck caption "First sunrise of the year, 2025 @Tanja Farm" | `01-hero-7*` |
| 8 | A reservoir on the farm | DRIVE `農園風景・貯水湖/coffee farm landscape reservoir lake-13.jpg` | `01-hero-8*` |

## 3. Detail page only (what-we-do.html, no slot numbers)

| Where | Subject | Source |
|---|---|---|
| Page hero | Coffee on a slope running down to the plain | DRIVE `農園風景・貯水湖/coffee farm landscape reservoir lake-6.jpg` (`1sSY2WCSQYXakdIvSMXcgL9aao_qoeHhB`) |
| Coffee | Cupped hands holding parchment coffee over a drying bed (no face) | DRIVE `乾燥プロセス/coffee farm dry prosess-22.jpg` (`1VurL5xdr9M08D1jxJ65HbGHLQ2C6mhQD`) |

## 4. Still missing

- A sharp, high-resolution **macadamia** photograph taken at TANJA (slot 05 is a 476 px crop).
- A **cookstove** photograph with recorded consent (slot 07 uses landscape instead).
- A better **cattle** photograph (slot 11).
- Anything for **Cafe** (slot 12).
- Written approval of all `PROVISIONAL` slots by a named TANJA approver.
