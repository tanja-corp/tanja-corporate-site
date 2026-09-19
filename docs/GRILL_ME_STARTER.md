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
Resolve:
- What is the single primary job of the site?
- Who is the primary visitor?
- Who is explicitly secondary?
- What should the primary visitor do after 60–90 seconds?
- Is the site mainly credibility, sales/partnership lead generation, recruiting, stakeholder communication, or a balanced corporate profile?

Recommended starting hypothesis:
**Primary = prospective business/partnership visitors; secondary = general stakeholders; recruitment is tertiary.**
Reason: it supports a concise corporate site and prevents Careers from dominating the information architecture.

### Parent branch 2 — Language
Resolve:
- English first, Japanese first, or bilingual at launch?
- If bilingual, identical information or localized content?
- Is Swahili required now or later?
- Who approves English copy?

Recommended starting hypothesis:
**English-first MVP, architecture that can add Japanese later.**
Reason: TANJA is a Tanzania-based operating company and the whiteboard labels are English. This must still be validated against actual visitor needs.

### Parent branch 3 — Navigation / page model
Resolve:
- one-page site vs several lightweight pages
- whether About items are anchors/subsections or pages
- whether crop pages are standalone
- whether Carbon/School are project cards or full pages
- whether footer repeats navigation
- exact spelling/capitalization

Recommended starting hypothesis:
**One primary scrolling homepage plus detail pages only where content is genuinely strong enough.**
Reason: it best fits “minimum”, “simple”, and “not heavy”.

### Parent branch 4 — Home
Resolve:
- what single idea leads the hero
- whether hero copy says TANJA + Tanzania explicitly
- whether the site leads with coffee or broader agriculture
- whether mission appears above or below What We Do
- hero photo style
- CTA destination

Recommended starting hypothesis:
Lead with **TANJA as a farm-based agribusiness in Karatu, Tanzania**, not with a slogan that hides what the company is.

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
Resolve:
- authoritative mission source
- Smart Village mission vs TANJA corporate mission
- whether OSTI Trust/Connect/Challenge values appear
- exact approved wording
- whether mission needs explanatory copy

Recommended starting hypothesis:
Do not create a new blended mission. Use one approved official sentence and connect it to real Farm + Project evidence.

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
Resolve:
- how closely to follow Lima
- color palette
- typography
- photo density
- borders/cards vs editorial sections
- animation tolerance
- whether logo assets exist
- mobile behavior

Recommended starting hypothesis:
**Lima-level simplicity with more deliberate typography and TANJA's own photography.** No sliders, no parallax, no decorative motion.

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

### Parent branch 15 — Hosting / delivery
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
- deployment is separated from implementation,
- remaining unknowns are explicit rather than hidden assumptions.

After that, write a final spec and only then rebuild the site.
