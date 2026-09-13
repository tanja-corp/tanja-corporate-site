# TANJA Corporate Site — Project Context

## Purpose

Build a corporate website for TANJA, a Tanzania-based farm business. This is separate from the OSTI group website and the AFRICAN STORIES consumer e-commerce store.

- TANJA site: company, farms, crops, operations, verified partnership/community information, and business enquiries.
- OSTI group site: group-level identity and cross-company information.
- AFRICAN STORIES: consumer product discovery, prices, checkout, delivery, and subscriptions. Link there for retail purchases; do not rebuild commerce.

## Current working assumptions (not all final)

- Primary audience: prospective Japanese business partners, especially coffee-related companies, beverage businesses, and coffee shops. Regional stakeholders are also important.
- Japanese is the initial content language. Keep structure extensible for another language, but do not invent translations or make the language plan final without approval.
- Do not add recruitment or internship content in the first version.
- A representative message is a candidate section, but do not fabricate a quote or name; use a clearly marked placeholder until approved.
- Publish only externally useful facts that have a source and an internal approver. Do not treat every operational detail as public disclosure.
- Home section order follows the user reference https://biwako-omnibass.com/: Purpose, News, Our Business, Company, Articles, Contact.
- Human review is required for facts, photo selection, public-facing wording, and publication.

## CMS and implementation direction

- Target WordPress with Gutenberg/block theme so local editors can update news, article text, and images without code.
- Keep layout, shared components, navigation, and design tokens in code. Do not give routine editors theme/site-structure permissions.
- This repository currently contains a static prototype. First inspect the host project and available files before choosing or adding dependencies.
- Do not connect to or modify the existing live WordPress installation, domain, DNS, accounts, or production content. Do not deploy.
- GitHub Actions may run checks and create a preview artifact. Production deployment must wait until hosting, staging, backup/restore, and approved deployment credentials are confirmed.
- Do not add a public AI chatbot.

## Photo handling

The user approved using TANJA farm photos for the site. The Instagram Story screenshots are a local visual reference only; they include social/browser UI, captions, and blank margins. Do not commit or publish the raw screenshots. Use approved source files or existing OSTI public images in this prototype, and record an honest source/alt description. Do not infer location, date, cultivar, identity, or employment details from appearance alone.

## Content integrity

Do not invent staff counts, farm area, yields, certifications, export volumes, quality specifications, sustainability outcomes, contact details, dates, or representative statements. When evidence or approval is missing, mark the item “要確認” in the working copy and avoid presenting it as a public fact.

## Working method

1. Inspect the current files and Git status before editing; preserve user changes.
2. Implement the smallest coherent local prototype that demonstrates the agreed direction.
3. Keep content easy to move into WordPress blocks and media fields.
4. Run available checks and inspect desktop/mobile rendering when possible.
5. Report changed files, checks, assumptions, and decisions still needed in Japanese.
