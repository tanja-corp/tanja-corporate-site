# Web meeting 2026-10-16: ledger of every point

Source: the English-language web review meeting (transcript supplied by the user). The site that was reviewed was the live review site
(`tanja-corp/tanja-site-review`, state of 2026-10-15), which was ahead of `pages-review` (see `V2_IMPLEMENTATION_NOTES.md`, section 21).

Status words: **Done** (in the site), **Open** (waiting for something or someone), **Decided** (a decision, no code), **Not applied** (raised but not decided).
Owner names are the ones used in the meeting. Reasons are short on purpose: the full wording of removed text is in `COPY_DECK.md`.

## A. The site

| # | Point raised | Decision | Status | Where / next |
|---|---|---|---|---|
| 1 | Eight hero photos are too many | Three to four | **Done** | 4 slides: coffee rows, ripening cherries, drying beds, workers group photo |
| 2 | Use the workers group photograph | In the hero | **Done, low resolution** | The copy is 1025×582. Supply the original; swap `01-hero-9.*` under the same names |
| 3 | "A picture showing the season" | Not named in the meeting | **Stand-in** | Ripening cherries (slide 2). One slot to change |
| 4 | Hero captions and the "01 / 08" counter are not needed | Remove, keep the top page simple | **Done** | Arrows, dots and the pause button stay (a moving slideshow needs a stop control) |
| 5 | The location line (Oldeani, Karatu, Arusha) says nothing about what TANJA is; a keyword such as "coffee farm" is better | Tentative "Coffee farms on the edge of Ngorongoro" | **Done (tentative)** | Final wording after the mission / vision / values discussion. Location moved to About |
| 6 | Remove Japanese for now: English and Swahili only. Keep a place for Japanese | Japanese off, strings kept | **Done** | How to switch it back: comment in `index.html` `<head>` |
| 7 | The Swahili is machine translation: review every sentence or draft from scratch | Native review needed | **Open** | A native Kiswahili reviewer. Every SW string is still marked "draft" |
| 8 | "01 Our Company", "02 Farm · Sustainability" and the like repeat About / What We Do and confuse | Remove all numbered labels | **Done** | |
| 9 | The What We Do sentence "Our work spans…" was there before Nawaki's text | Remove | **Done** | |
| 10 | Farm: drop the certification sentence; reduce the Rainforest Alliance and GLOBALG.A.P. buttons; use the logos somewhere | Small marks, no chips, no sentence | **Done** | The GLOBALG.A.P. mark is plain text. **Open:** official logo file |
| 11 | Farm: shorter text; the explanation and the photos on one screen; too long on a phone | Fits 1440×900 and 1280×720 | **Done** | A test asserts it. A phone stacks the tiles, so it scrolls by nature |
| 12 | Sustainability: Lunch and Cattle are not projects but farming activity | Remove both cards and their paragraphs | **Done** | Text kept in `COPY_DECK.md`. May return under Farm. **Open:** wording from Nawaki |
| 13 | Sustainability: only the cookstove (carbon) project; one photo; keep the balance | One wide card | **Done** | **Open:** the cookstove photo from Yuki (the current one was added on the live site on 2026-10-15) |
| 14 | Sustainability: Nawaki will send new, shorter sentences | Replace when they arrive | **Open** | Nawaki |
| 15 | Three estates: too heavy; a simple explanation in About | One sentence in About | **Done** | Estate details can go to the next layer (`what-we-do.html`) |
| 16 | The Japanese investment is a point of uniqueness; say it somewhere (About or Staff) | One sentence in About | **Done, needs a source** | "TANJA is invested in by a Japanese company" is marked VERIFY |
| 17 | Staff: no nationalities, just diversity; Kenyans are on the team; drop the small explanations | One sentence | **Done** | |
| 18 | Staff should include the general workers (about 500), not only the professionals | The workers group photo carries it | **Open** | Decide whether the group photo also goes in Staff (the original is needed first) |
| 19 | Contact section is not needed now: put everything in the footer; keep room for recruitment later | Section removed; the footer is the contact point (`id="contact"`) | **Done** | Recruitment information can use the Staff block or the footer later |
| 20 | Instagram and LinkedIn: only the marks, in the footer | Icons only | **Done** | The LinkedIn URL is a personal-profile type (`/in/…`). Check whether a company page is meant |
| 21 | Phone number: not needed now; later an official number and WhatsApp | Removed | **Done** | The number is in use for HR communication |
| 22 | Email: create an inquiry-only address and name a person who checks it daily (the current mailbox is shared and used by the accountants) | New address needed | **Open** | Hide. The footer keeps `office@tanja.co.tz` **temporarily**; change `href` and text together |
| 23 | Footer address line "Karatu District, Arusha Region, Tanzania" | Remove | **Done** | |
| 24 | Mission / Vision / Values: where? | Before About | **Done (hidden)** | `#mission` is prepared and hidden. No wording is written |
| 25 | About: waiting for updates | | **Open** | Calliste |
| 26 | Macadamia and avocado photographs for What We Do | | **Open** | The sender has not yet sent them. The macadamia photo on the page is 476×595 |
| 27 | "Next layer" button from Farm to a detail page | Only floated ("maybe") | **Not applied** | The detail page stays unlinked. How to link it is in the `index.html` comment |

## B. Process (no code)

| # | Point raised | Decision | Status | Owner / when |
|---|---|---|---|---|
| 28 | Publish date | Aim to finish by the middle of November. Latest 12 December (the visa ends 10 December; the insurance ends 10 November) | **Decided** | |
| 29 | Show the site to everyone before publishing, the admin team and, if possible, the general workers | A one-hour meeting with all office staff; comments and advice welcome | **Open** | Date and room to be set |
| 30 | Collect what people feel about the company, to write the mission / vision / values | Small groups of 2–4; representatives (supervisors and a few members of the coffee and macadamia teams, who can help choose them); interviews | **Decided** | Written answers by a box were doubted because not everyone can write |
| 31 | The inquiry mailbox needs a person in charge | See row 22 | **Open** | Hide |
