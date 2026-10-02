# TANJA Corporate Site — V2 Agent Context

## Current state

The website direction changed after the 2026-09-18 TANJA web meeting.

Before editing implementation files, read:
1. `docs/WEB_V2_WORKING_BRIEF.md`
2. `docs/CONTENT_SOURCE_MAP.md`
3. `docs/GRILL_ME_STARTER.md`

The existing `index.html` and `styles.css` are a **legacy prototype**. They are useful only as code/reference material and are not the current information architecture.

## Hard rule: requirements before rebuild

Do not perform the final V2 rebuild until the user has completed a `/grill-me` requirements interview or explicitly tells you to proceed with unresolved assumptions.

When the user invokes `/grill-me`, explore this repository first. Ask one question at a time. For every question, include your recommended answer. Do not ask the user for something that can be learned by inspecting the repository or supplied source material.

## Current V2 direction

- Start from the minimum sections on the meeting whiteboard:
  - Home
  - About
    - Our Company
    - Our Staff (tentative)
    - Vision / Mission
    - Careers (wording/inclusion to confirm)
  - What We Do
    - Farm
      - Coffee
      - Macadamia
      - Avocado
    - Project
      - Carbon
      - School
  - Contact
  - Instagram / LinkedIn or other confirmed official social links
- Primary design reference: Lima Tanzania, https://www.limatanzania.com/
- Other references: Sensei Farms, Airbnb Life at Airbnb, Karsten Group.
- The site should be simple, polished, farm-image-led and lightweight.
- Use plain HTML, CSS and JavaScript only for this phase.
- Do not introduce frameworks or a build pipeline without explicit approval.
- Select photos from the TANJA Drive archive supplied by the user.
- Optimize web copies; do not ship huge Drive originals.

## Content integrity

Never fabricate or silently infer:
- staff roster or titles
- mission wording
- current recruitment
- crop area or harvest timelines
- certification scope
- project outcomes
- carbon-credit status
- beneficiary counts
- partner commitments
- contact details
- social accounts
- addresses

Where evidence conflicts, mark the item for verification.

Treat Matsui's avocado research as research, not as an official TANJA statement.

## Public/private boundary

Internal internship documents and meeting minutes are useful to discover questions and current operations. They are not automatically approved for publication.

Do not expose:
- internal personnel discussions
- operational weaknesses
- individual contact details that are not already approved for public use
- internship logistics
- private business research
- unannounced partnerships
- internal pricing/market hypotheses

## Deployment boundary

Do not modify production WordPress, DNS, hosting, domains, or credentials unless the user explicitly asks after the static V2 has been approved.
