# TANJA Web V2 — /grill-me Starter

This file is not the final spec. It is the starting context for a requirements interview.

## How to run

From this repository, invoke:

`/grill-me`

Then give the agent this instruction:

> Stress-test the TANJA Web V2 plan in `docs/WEB_V2_WORKING_BRIEF.md` and `docs/CONTENT_SOURCE_MAP.md`. Explore the repository before asking me anything. Ask exactly one question at a time, give your recommended answer with each question, and resolve parent decisions before child decisions. Do not start implementation until the decision tree is exhausted. Treat the 2026-09-18 whiteboard structure as the current meeting output, but challenge ambiguities instead of silently assuming them.

This matches the intended `grill-me` behavior: one question at a time, recommendation included, and codebase exploration instead of asking questions the repository can answer.

## Decision tree the interview should cover

The agent should not dump these questions all at once. This is a checklist so we know whether the interview is truly complete.

### Parent branch 1 — Goal and audience

**Confirmed 2026-09-19**
- Primary goal: **domestic awareness and credibility in Tanzania**
- Transactions / partnerships: important secondary outcome
- The site should first make TANJA understandable and credible to people in Tanzania
- Do not frame the site primarily as a Japanese B2B lead-generation site

**Audience priority confirmed 2026-09-19**
1. Existing TANJA workforce (roughly 500 people) and the surrounding local community
2. Tanzanian companies, government/industry stakeholders, and prospective collaboration partners
3. Prospective employees / young people in Tanzania

**Outcome priority confirmed 2026-09-19**
1. Enable workers/community members to explain and spread awareness of TANJA to others
2. Increase understanding and trust in TANJA
3. Provide practical company/project/contact information

All are important, but the priority order is D → A → C. Pride/belonging can be a beneficial outcome but is not the primary content goal.

Still resolve:
- What should a visitor be able to say about TANJA after 60–90 seconds?
- What language(s) are necessary for the first audience?
- What practical information belongs on the public site versus elsewhere?

### Parent branch 2 — Language

**Confirmed 2026-09-19**
- English = primary/default
- Kiswahili = mandatory
- Japanese = included as a third language
- Core content should not be English-only; Kiswahili must be a first-class version because the top audience is workers/local community.
- Architecture should support future languages, but additional languages require a real audience/use case.

Research note:
- A sample of major Tanzanian private corporate sites is commonly English-first.
- Consumer/public-service sites often provide English/Kiswahili switching.
- Tanzania 2022 census data do not support the assumption that rural web-capable audiences can safely be treated as English-literate.
- Rwanda should not be treated as “covered by Swahili”: Kinyarwanda is the common language; English, French and Kiswahili are also official.

Still resolve:
- Who approves Kiswahili and Japanese translations?
- Should language selection remember the visitor's choice?
- Should first visit always default to English or respect browser language?
- Whether any fourth language has a concrete audience strong enough to justify maintenance.

### Parent branch 3 — Navigation / page model

**Fixed by internal meeting:** follow the whiteboard section structure. Do not use /grill-me to remove or replace those sections.

Still resolve:
- one-page site vs several lightweight pages
- whether whiteboard items are anchors/subsections or pages
- whether crop items need expandable/detail treatment
- whether Carbon/School are compact sections or detail pages
- footer behavior
- exact spelling/capitalization

Recommended starting hypothesis:
**One primary scrolling homepage plus detail pages only where content is genuinely strong enough.**
Reason: it preserves the approved structure while keeping the site light.

### Parent branch 4 — Home

**Confirmed 2026-09-19:** the hero is visual-first, not explanatory-first.

Hero priorities:
- photography
- composition
- navigation/functionality
- language switch
- fast loading
- restrained copy

Do not force a dense company explanation into the first screen. The first factual explanation can begin immediately below the hero.

**Confirmed:** one static hero image. No slider/autoplay video.

Still resolve:
- hero image style
- whether there is any short line of copy at all
- CTA/no CTA
- navigation treatment over the hero
- mobile crop behavior

### Parent branch 5 — About
Resolve:
- company facts shown
- OSTI relationship
- amount of history
- whether map/estate map appears
- whether Our Staff remains in MVP
- whether Careers remains in MVP

Recommended starting hypothesis:
Keep company facts short; show staff only if an approved roster/photos exist; hide Careers if no current recruiting route exists.

### Parent branch 6 — Vision / Mission

**Confirmed 2026-09-19:** final Mission / Values wording will be written later.

For the first implementation:
- keep the approved section,
- use an explicit placeholder,
- do not invent final wording,
- do not delay the rest of the build.

Later resolve:
- authoritative TANJA mission source
- Smart Village mission vs TANJA corporate mission
- whether OSTI Trust/Connect/Challenge values appear
- exact final approved wording

### Parent branch 7 — Farm
Resolve:
- whether the farm itself gets an overview before crops
- which farm numbers are public
- estate names/spellings
- whether map is necessary
- whether coffee gets more space than macadamia/avocado
- crop status wording

Recommended starting hypothesis:
Farm overview + three crops, with **coffee visually dominant because it is the established current business** and macadamia/avocado clearly labeled by development stage.

### Parent branch 8 — Project / Carbon
Resolve:
- what “Carbon” means
- current vs planned activities
- whether solar PPA belongs here
- whether cookstove/carbon credit/biochar/biogas belong here
- partner logos/names
- measurable claims

Recommended starting hypothesis:
Show only 1–2 concrete implemented carbon/energy initiatives in the MVP; link future ambitions separately and label them as future.

### Parent branch 9 — Project / School
Resolve:
- exact project identity
- partner
- school
- status
- current activity
- permission to show students
- impact numbers

Recommended starting hypothesis:
Do not publish until an approved one-page factual project summary exists.

### Parent branch 10 — Staff / Careers
Resolve:
- whether named staff improves visitor trust enough to justify maintenance/privacy cost
- number of staff profiles
- title language
- headshots
- careers link state

Recommended starting hypothesis:
Small leadership/operations roster only if management can keep it current. No careers page if recruitment is closed.

### Parent branch 11 — Contact / conversion
Resolve:
- primary CTA wording
- email vs form
- physical address
- farm vs registered office
- phone/WhatsApp
- inquiry categories
- Instagram/LinkedIn exact accounts

Recommended starting hypothesis:
Use a simple approved email/contact route and social links. Add a form only if there is an owner/process for handling submissions and privacy.

### Parent branch 12 — Visual direction

**Confirmed 2026-09-19:** visual design is not final yet.

Resolve only enough for a revisable first implementation:
- how closely to follow Lima structurally
- basic layout rhythm
- photo density
- mobile behavior
- whether logo assets exist
- acceptable level of motion

Defer:
- final color palette
- final typography system
- detailed component styling
- decorative polish

Recommended starting hypothesis:
**Lima-level simplicity, TANJA photography, minimal motion, and a deliberately provisional design system.**

### Parent branch 13 — Photo selection
Resolve:
- who approves final photos
- whether people/students can appear
- whether old photos can represent current projects
- cropping rules
- image optimization format/quality
- photo credits

Recommended starting hypothesis:
Create a photo manifest and require approval for any recognizable person used prominently.

### Parent branch 14 — Performance / accessibility
Resolve:
- target mobile devices/connections
- image budget
- font loading
- reduced motion
- keyboard navigation
- color contrast
- alternative text

Recommended starting hypothesis:
Treat mobile performance and accessibility as base requirements, not later polish.

### Parent branch 15 — Editor / no-code handoff

**Confirmed 2026-09-19**
- Initial site can be hand-coded in HTML/CSS/JavaScript.
- Operational ownership must be handed to a local English-speaking IT worker who should not need to edit code.
- Routine updates must be browser-based and no-code.
- The handoff must include training and documentation, not only a deployed site.

**Confirmed 2026-09-19:** choose the content-only model. Local editors may update text, images and structured entries, but the site layout/design remains fixed by default.

**Confirmed multilingual ownership 2026-09-19:**
- EN: internal English-capable/native reviewer
- SW: internal native Kiswahili reviewer
- JP: AI first draft + Japanese human review before publication

Still resolve:
- final no-code platform
- who can publish vs draft
- image optimization responsibility
- backup / rollback ownership
- who handles rare developer-only changes

Recommended starting hypothesis:
**WordPress + Gutenberg/block editor, custom lightweight theme, restricted editor permissions, reusable block patterns, and content fields that mirror the approved whiteboard sections.**
Avoid a heavy builder unless the editor genuinely needs free-form layout control; unrestricted page-builder freedom increases breakage risk and makes multilingual consistency harder.

### Parent branch 16 — Hosting / delivery
Resolve:
- final hosting environment
- relationship to the existing WordPress/domain setup
- whether static files will later be embedded/migrated
- staging/approval flow
- who can publish
- analytics requirement
- SEO basics

Recommended starting hypothesis:
Build and approve the static site first. Do not touch production WordPress/DNS until deployment requirements are separately confirmed.

## “Done grilling” definition

The interview is complete only when:
- every whiteboard item has an explicit include/omit decision,
- every included section has a visitor purpose,
- every factual claim category has an identified source/approver,
- language is settled,
- contact/conversion is settled,
- photo governance is settled,
- the static technical boundary is settled,
- no-code editor handoff and acceptance test are defined,
- deployment is separated from implementation,
- remaining unknowns are explicit rather than hidden assumptions.

After that, write a final spec and only then rebuild the site.
