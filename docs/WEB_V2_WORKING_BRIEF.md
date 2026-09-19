# TANJA Web V2 — Working Brief

Updated: 2026-09-19  
Status: **requirements discovery / do not implement the final site yet**  
Working branch: `web-v2-requirements`

## 1. Why this document exists

The website direction changed materially in the 2026-09-18 team discussion. The current prototype and the old `CLAUDE.md` were based on a broader Japanese B2B corporate-site concept and WordPress migration assumptions. Those assumptions are no longer authoritative.

The new direction is:

- Start with the **minimum set of sections visible on the meeting whiteboard**.
- Keep the site **simple, polished, image-led, and lightweight**.
- Use **plain HTML + CSS + JavaScript only** for this phase.
- Use **Lima Tanzania** as the strongest design/content reference because it received the best reaction in the team discussion.
- Select photographs from the TANJA Google Drive folder supplied by the team.
- Do not invent company facts, project outcomes, staff titles, contact details, certifications, or timelines.
- Complete a `/grill-me` requirements interview before treating any open assumption as final.

## 2. Current information architecture from the whiteboard

The whiteboard is the highest-priority record of the 2026-09-18 meeting. **This section structure is fixed by the internal meeting and must be followed. Do not redesign the information architecture during /grill-me.** The remaining work is to define the content, evidence, wording, behavior, and implementation details within these sections.

### Home
A minimal landing page / hero that immediately communicates TANJA, the farm, and what the company does.

### About
Candidate subsections shown on the board:

1. Our Company
2. Our Staff
3. Vision / Mission
4. Career / Careers

Notes:
- “Our Staff” is visually parenthesized on the board and may still be optional. Confirm in grilling.
- “Carrier” on the board is interpreted as “Career/Careers”, but this must be confirmed.
- Do not add a long corporate history unless it supports one of these sections.

### What We Do
Two top-level content groups appear on the board.

**Farm**
- Coffee
- Macadamia
- Avocado

**Project**
- Carbon
- School
- Additional project slot(s) are not yet confirmed.

### Contact
A concise contact area with the correct business/farm contact route.

### Social links
The board shows:
- Instagram
- LinkedIn appears likely, but the handwriting should be confirmed before implementation.

## 3. Confirmed product goal

Decision confirmed on 2026-09-19:

- **Primary goal: build domestic awareness and credibility in Tanzania.**
- **Audience priority 1:** TANJA's existing workforce (roughly 500 people) and the surrounding local community.
- **Audience priority 2:** Tanzanian companies, government/industry stakeholders, and prospective collaboration partners.
- **Audience priority 3:** prospective employees / young people in Tanzania.
- Business transactions and partnerships remain important, but they are a downstream outcome rather than the first design objective.
- The site should first help people closest to TANJA understand who the company is, what it does, how it relates to the community, and where it is heading.
- **Outcome priority for the first audience:** (1) make it easy for workers/community members to explain and share what TANJA is to others, (2) strengthen understanding and trust, (3) provide practical company/project/contact information.
- Internal pride/belonging is desirable, but it is not the first content objective.
- Do not optimize the first version around Japanese B2B lead generation.

### Editorial handoff / no-code maintenance

Decision confirmed on 2026-09-19:
- The first implementation may be hand-coded in HTML/CSS/JavaScript.
- The final operational site must be editable by a local English-speaking TANJA IT worker **without editing code**.
- The target editor skill level is modest: comfortable with a browser, basic IT tasks, and free ChatGPT-level assistance, but not expected to maintain custom frontend code.
- The project therefore needs an explicit **migration + handoff phase** after the static prototype is approved.
- The no-code editing experience should cover routine content operations such as:
  - replacing text,
  - updating crop/project descriptions,
  - replacing images,
  - editing staff/career/contact details,
  - adding/removing cards or entries within pre-defined sections,
  - maintaining EN / SW / JP content.
- **Confirmed editor boundary:** content is editable; design and layout are fixed by default.
- Routine editors must not need to touch theme code, CSS, JavaScript, DNS, deployment settings, or GitHub.
- Routine editors should not be able to freely change grid structure, spacing, typography, responsive behavior, navigation architecture, or other design-system rules.
- The static V2 should be structured so that its sections map cleanly into reusable CMS blocks/templates later.

Working recommendation:
- **WordPress + Gutenberg/block editor** is the default migration target because it is widely understood, browser-based, no-code for editors, and can preserve a lightweight custom design without requiring a heavy page builder.
- Do not lock the final CMS choice until hosting, editor workflow, multilingual operation, and permissions are confirmed in /grill-me.
- Avoid designing the static version in ways that are difficult to reproduce as editable blocks.

### Language direction

Decision confirmed on 2026-09-19:
- English is the primary/default language.
- Kiswahili is mandatory and must cover the same core public content as English.
- Japanese is also included as a third language for group/Japan-side accessibility.
- Additional languages are **not yet approved**. The architecture should make them easy to add later, but they should be justified by a real audience rather than added “just in case”.
- Do not assume that web/device access implies English proficiency. Tanzania 2022 census literacy data show a large rural/urban gap in English+Kiswahili literacy, so Kiswahili is essential for the workforce/community-first objective.

See `docs/LANGUAGE_RESEARCH.md`.

### Mission / Values handling
The team will finalize Mission / Values wording later. For the first implementation:
- preserve the whiteboard section position,
- use a clearly marked placeholder,
- do not fabricate or synthesize final Mission / Values copy,
- do not block the rest of the build on final wording.

### Design status
The design direction is **not final**.
- Lima remains the strongest reference.
- The first implementation may establish layout and interaction direction, but it should remain easy to revise.
- Do not over-invest in visual polish before content and section requirements are confirmed.

## 4. Explicit non-goals for V2 MVP

Unless the grilling session changes this, do **not** add these to the first build:

- News archive
- Long-form article / field-note system
- Consumer e-commerce
- Product checkout
- Public chatbot
- WordPress or another CMS
- React, Vue, Next.js, Tailwind, Bootstrap, or other frontend frameworks
- Large animation libraries
- Complex dashboards
- Internal operations data
- Unapproved internship information
- Unapproved claims about impact, certifications, export volume, yield, revenue, or project success

The current repository already contains News, Field Notes and a broader business layout. Those are legacy prototype assumptions, not V2 requirements.

## 5. Technical direction

### Required stack
- `index.html`
- `styles.css`
- `script.js` only if interaction is genuinely needed

No build step should be required. A user should be able to open `index.html` locally and inspect the site.

### JavaScript policy
Use JavaScript only for lightweight behavior such as:
- mobile navigation
- disclosure / accordion if approved
- small progressive-enhancement interactions

Core content and navigation must still work without JavaScript.

### Performance direction
The phrase “重くないサイト” from the meeting is a product requirement, not merely a preference.

Working targets to confirm in grilling:
- Avoid video autoplay in the MVP.
- Prefer locally optimized JPEG/WebP/AVIF derivatives rather than loading multi-megabyte originals directly.
- Avoid third-party JS.
- Keep above-the-fold imagery intentional: one strong hero image is better than a slider.
- Lazy-load below-the-fold images.
- Keep font usage minimal; system fonts or one carefully chosen webfont family at most.
- Ensure acceptable display on a typical mobile connection in Tanzania as well as Japan.

These are working recommendations, not approved numeric budgets yet.

## 6. Design-reference hierarchy

### 1. Lima Tanzania — primary reference
https://www.limatanzania.com/

Why it is the strongest reference:
- It is an agriculture business operating in Tanzania, so the tone and context are unusually relevant.
- The homepage is straightforward: company identity, mission/news, products, projects, people/story.
- It communicates credibility with real farm imagery rather than heavy visual effects.
- It remains readable and relatively light.
- Content sections are short enough to scan.

Borrow:
- simple editorial rhythm
- generous whitespace
- farm-first photography
- short content blocks
- clear separation between crops/products and projects
- human/team presence without turning the page into a recruitment portal

Do not copy:
- Lima wording, visual identity, exact layout, or brand components
- smallholder-specific claims that do not apply to TANJA

### 2. Karsten Group — B2B agribusiness tone
https://www.karsten.co.za/

Borrow:
- concise hero proposition
- partnership / trust language architecture
- sustainability presented as part of the business rather than as decorative CSR
- clean B2B agriculture credibility

### 3. Sensei Farms — visual culture/team reference
https://www.senseifarms.com/careers

Borrow selectively:
- strong photography with restrained copy
- staff/culture cards if Our Staff or Careers survives the MVP
- clear principles presented in a scannable format

Avoid:
- making TANJA look like a Silicon Valley careers site
- overbuilding benefits/careers content

### 4. Airbnb Life — editorial spacing and people storytelling
https://careers.airbnb.com/life-at-airbnb/

Borrow selectively:
- large images
- whitespace
- simple value statements

Avoid:
- complex career navigation
- large HR content hierarchy
- consumer-tech visual language that weakens the farm identity

## 7. Source authority

For every public-facing claim, record a source and an approval state.

Use this priority order:

1. **Decision from the 2026-09-18 website meeting / subsequent direct confirmation from TANJA management**
2. **Current TANJA internal corporate material approved for external use**
3. **Current OSTI Global public pages / TANJA public releases**
4. **Older TANJA internal material, only after confirming that the information remains current**
5. **Internship notes / meeting minutes as leads for verification, not as automatic public sources**
6. **Independent research prepared by Matsui as research only, not as proof of TANJA corporate facts**

If two sources conflict, do not silently choose one. Mark the item `VERIFY` and surface the conflict.

## 8. Content-writing rules

Every section should answer a visitor question, not simply fill space.

- Home: “What is TANJA, where is it, and why should I continue?”
- Our Company: “Who operates this business and what is its scope?”
- Our Staff: “Who are the people responsible for the business?”
- Vision / Mission: “What long-term purpose guides TANJA?”
- Careers: “Is TANJA currently recruiting, and where should I go?”
- Coffee: “What does TANJA grow/produce and what makes the farm relevant?”
- Macadamia: “What is being developed and at what stage?”
- Avocado: “What is being developed and at what stage?”
- Carbon: “What is the project trying to achieve and what is actually underway?”
- School: “What partnership/support exists, for whom, and what has actually happened?”
- Contact: “Who should I contact for what purpose?”

Prefer short paragraphs and concrete facts. Avoid inflated claims such as “world-class”, “revolutionary”, “leading”, “transforming Africa”, or “sustainable” unless the following sentence explains what that means in verifiable terms.

## 9. Photo policy

Primary photo source:
https://drive.google.com/drive/folders/1AaqD-NB_tc89Y0OMhLAn7YAhtZg6S63v

The root folder currently includes useful subfolders such as:
- `■写真集用`
- `Drone`
- `農園アプローチ`
- `農園への道や風景`
- `農園集合写真`
- `農園他の農作物`
- `農園風景・貯水湖`
- `チェリーイメージ１`
- `加工機械など`
- `乾燥プロセス`
- `事務所周り　景色`
- `収穫風景・手元イメージ`
- `収穫風景・手元イメージ２`
- `収穫物を運ぶ`

Do not hotlink huge Drive originals in production. The implementation workflow should:
1. select source photos,
2. download approved originals,
3. create web derivatives,
4. keep a source manifest with original Drive file ID, crop/section, alt text and approval status.

Do not infer names, roles, exact locations, crop variety, dates, or employment status from a photograph alone.

## 10. Handoff requirements

The final delivery is not complete when the static site looks correct. It is complete only when the local editor can perform routine updates without code.

The handoff package should include:
- CMS migration plan
- content model / field map for every approved section
- editor roles and permissions
- multilingual editing workflow
- image upload/optimization workflow
- publishing checklist
- backup/restore instructions
- short English editor manual with screenshots
- 30–60 minute practical training
- one supervised test update by the local editor
- rollback procedure
- list of changes that still require a developer

Acceptance criterion:
A designated TANJA editor should be able to update one text item, replace one image, edit one project/crop entry, update all required language versions, preview the result, and publish it without touching code.

## 11. Implementation gate

Do not rewrite the final page until these parent decisions are resolved through `/grill-me`:

1. primary visitor and primary website goal
2. primary language and any language-switch requirement
3. exact MVP navigation and whether About subsections are standalone pages or one page
4. whether Our Staff is public
5. whether Careers is active, inactive, or omitted
6. exact meaning/scope of Carbon and School
7. approved company mission wording
8. contact destinations and public social URLs
9. photo approval workflow
10. deployment target and whether this repository remains static-only

After the grill, synthesize the decisions into a final specification before coding.


## 12. Multilingual editorial ownership

Decision confirmed on 2026-09-19:

- **English:** maintained and reviewed by an English-capable/native internal editor.
- **Kiswahili:** maintained and reviewed by a native Kiswahili speaker internally.
- **Japanese:** AI may create the first draft, but a Japanese speaker must review/approve before publication.
- English and Kiswahili are not treated as machine-translation-only outputs.
- Japanese AI drafts must never auto-publish.
- The CMS workflow should make translation status visible so editors can distinguish draft / reviewed / published content.


## 13. Hero role

Decision confirmed on 2026-09-19:

- The hero is **not** responsible for explaining TANJA's business model in detail.
- Its primary job is visual: establish quality, place, atmosphere and credibility through photography, composition and interaction.
- Keep hero copy minimal. Do not force “who / where / what” into the first screen.
- The first factual explanation of TANJA can begin immediately below the hero in the approved section flow.
- Prioritize one strong photograph, clean navigation, clear language switching and fast loading over dense messaging.
- The hero should feel useful and intentional, not like a text-heavy corporate pitch.


### Hero media
Confirmed 2026-09-19: use **one static hero image**. No carousel/autoplay video in the MVP. The hero image must be replaceable as a single CMS field during the later no-code handoff.
