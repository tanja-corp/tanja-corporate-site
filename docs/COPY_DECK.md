# TANJA Web V2 — Copy deck (2026-09-29 redesign)

Internal working document. **Not for the GitHub Pages allow-list.** This is the English master for every visible string on
`index.html` and `what-we-do.html`, with the source behind each factual sentence. Japanese lives in `docs/COPY_DECK_JA.md`
(linted with jpguard); Kiswahili is written straight into the HTML as `data-review="draft"`.

Source keys:
- **N** — Naoaki (production owner, per the 2026-09-25 whiteboard), WhatsApp message to Futoshi Matsui, 2026-09-29 16:44.
  Supplied as the text to publish for the Farm branch, with the request to use one overall introduction instead of separate
  crop descriptions. Treated as approved wording: reproduced verbatim, not edited.
- **O-farms** — https://www.ostiglobal.com/our-farms/tanzania/ (public, read 2026-09-29)
- **O-tanja** — https://www.ostiglobal.com/about-us/tanja/ (public)
- **O-about** — https://www.ostiglobal.com/about-us/ (public: history, Smart Village)
- **O-solar** — https://www.ostiglobal.com/news/press_release_tanja_updaer_solar_generator_20250717/ (public press release, 2025-07-17)
- **O-ye2025** — https://www.ostiglobal.com/daily-story/year_end_greetings_2025/ (public, 2025-12-19)
- **O-ics** — https://www.ostiglobal.com/news/タンザニアで、カーボン・ニュートラルのステー/ (public, 2024-08-01, stakeholder meeting)
- **O-orient** — https://www.ostiglobal.com/daily-story/orientation_202501/ (public, 2026-01-30)
- **O-ny2026** — https://www.ostiglobal.com/daily-story/new_year_greetings_2026/ (public, 2026-01-06)
- **O-recruit** — https://www.ostiglobal.com/news/recruit_tanja_202512/ (public, recruitment closed 2026-03)
- **O-support** — https://www.ostiglobal.com/daily-story/coffee_avocado_macadamia_202604/ (public, 2026-04-30)
- **O-ecsite** — https://www.ostiglobal.com/news/coffee＆macadamianuts_sale_on_ecsite/ (public, 2024-10-04: 「フルウォッシュド・ハニー・ナチュラルという３種類を実施」)
- **O-tour** — https://www.ostiglobal.com/news/tanja_coffee_tour_202503/ (public, 2025-03-18: three processing methods)
- **O-action1** — https://www.ostiglobal.com/daily-story/action1_check_coffeecherry20240930/ (public, 2024-09-30: 「6～9月は、TANJA農園ではコーヒーの大・収穫期」)
- **O-about-rw** — same page as O-about, Rwanda section: Rwanda Nut Company set up in 2013
- **NAS F1–F16** — TANJA decks and reports on `//192.168.0.100` (read-only), listed in `docs/V2_IMPLEMENTATION_NOTES.md` §20;
  F1 TANJA Profile, F4 visitor briefing, F5 tourist deck, F6 carbon briefing, F10/F11 CSR lunch reports, F15 annual cattle report,
  F16 kitchen reports. **Internal, not public**: sentences resting only on F10/F11/F15/F16 are marked VERIFY and need TANJA approval.

Rule kept from `CLAUDE.md`: nothing below is inferred. Where a public source is dated, the sentence is written so that it stays
true (no "this year", no yields, no counts that change). Items marked **VERIFY** are sourced but should be confirmed by TANJA
before launch.

---

## Home / Hero

| Element | English | Source |
|---|---|---|
| Wordmark | TANJA | — |
| Line under wordmark | On the edge of Ngorongoro, Tanzania | N ("lie on the edge of Ngorongoro") |
| Slide 1 caption | Coffee rows looking out over the plain | visible content (DRIVE photo) |
| Slide 2 caption | Avocado, one of our newer crops | O-support 「コーヒーに加えてアボカドとマカダミアの木を育てはじめています」 |
| Slide 3 caption | Coffee on the slope, with a reservoir below | visible content (DRIVE photo) |
| Slide 4 caption | Mt. Oldeani, seen from the farm | NAS JP-TZ deck caption "Mt. Oldeani from Tanja Farm" |
| Slide 5 caption | Drying beds, seen from the air | visible content (DRIVE drone clip) |
| Slide 6 caption | The first sunrise of 2025 on the farm | NAS JP-TZ deck caption "First sunrise of the year, 2025 @Tanja Farm" |

## About — Our Company

| Element | English | Source |
|---|---|---|
| Section title | About | — |
| Eyebrow | Our Company | — |
| Lede | In 2023, TANJA took over three coffee estates in the highlands of northern Tanzania. Coffee has been grown on these slopes since the 1920s. | O-solar company profile 「100年以上続くコーヒー名産地の農園を引き継ぐ形で2023年設立」; O-farms (three estates); NAS F4 slide 12 / F5 slide 9 「■1920年代：ドイツ、ギリシャ系の入植者」; O-about 「1920年前後…コーヒー農園の開拓を本格的に始めた」 |
| Body | More than 500 people work on the farm today. With agriculture at the core, TANJA runs the Smart Village Project with the surrounding community, working towards a carbon-neutral farm and lasting wellbeing for the people around it. | O-tanja 「従業員数 500名以上」; O-recruit 「農園事業を中核としながら…スマートビレッジの実現という理念を掲げ、カーボンニュートラルの実現、また地域社会の課題の解決への貢献を目指しています」; O-about 「カーボンニュートラルの実現を目指すプロジェクトによって、持続的なウェルビーイングを醸成し、コミュニティ育成していくことを「Smart Village Project」と呼び」 |
| Fact: Company | TANJA Corporation Limited | O-tanja |
| Fact: Name meaning | Official wording to be confirmed. (placeholder `name-meaning`) | none found — see research notes |
| Fact: Started | 2023 | O-tanja 「創業 2023年」 |
| Fact: Farm land | About 1,760 ha | O-solar, O-about |
| Fact: Elevation | 1,370–1,840 m | O-farms, O-solar |
| Fact: Location | Karatu District, Arusha Region, Tanzania | O-solar 「アル―シャ州カラトゥ県」 |

### Three estates (inside Our Company)

| Estate | English | Source |
|---|---|---|
| Bergfrieden | German for "mountain of peace". The highest of the three, where wild elephants often pass through. 1,580–1,840 m. | O-farms 「ドイツ語で「平和の山」を意味し、最も標高が高く…野生のゾウが頻繁に出現する自然と共生した農園」「標高1,580 – 1,840m」 |
| Shah | The largest estate and the centre of daily work, with the wet mill, drying beds and the farm office. 1,400–1,700 m. | O-farms 「総面積・作付面積共に3つの農園の中で最大…大規模なウェットミルとアフリカンベッドを備え…農園のオフィスがあることでコミュニティの中心」「標高1,400 – 1,700m」 |
| Tinga Tinga | A quiet estate under shade trees, where coffee cherries ripen slowly. 1,370–1,400 m. | O-farms 「シェードツリーに囲われた静かな農園…コーヒーの実がゆっくり熟す」「標高1,370 – 1,400m」 |

Spelling: OSTI's page and the NAS block maps both write **Bergfrieden** (OSTI's Japanese has both バーグフリーデン and
バークフリーデン; older internal notes have "Burgfrieden"). The site uses Bergfrieden. VERIFY with TANJA.

## What We Do

| Element | English | Source |
|---|---|---|
| Section title | What We Do | — |
| Lede | Our work spans the farm, sustainability projects with our neighbours, and a café. | whiteboard 2026-09-25 (three branches) |
| Link | Read more about our work → | — |

### Farm (one overall introduction — N)

Verbatim from N. Do not edit without the owner.

> Our farms have a history spanning more than a century and lie on the edge of Ngorongoro, where we share water sources with
> wildlife. Drawing on this heritage and rich natural surroundings, we grow coffee, avocados and macadamias, and keep bees.
>
> Our coffee farms hold Rainforest Alliance certification, and our avocado farms hold GLOBALG.A.P. certification.
>
> We aim to care for the environment, support the wellbeing of the people who work here, and bring joy to those who enjoy the
> harvests of this rich land.

Tiles (photo + name only, per N's request for no separate descriptions):
- Coffee — chip "Rainforest Alliance" (N)
- Avocado — chip "GLOBALG.A.P." (N)
- Macadamia
- Beekeeping

### Sustainability

| Item | English | Source |
|---|---|---|
| Group lede | Projects that reach from the farm into the community. | — (framing only, no fact) |
| Carbon Credit | A project to bring improved cookstoves to households around the farm. They need far less firewood than a traditional three-stone fire: less smoke in the kitchen, less CO₂, and less of the daily work of collecting wood. The project aims to obtain carbon credits. | O-ics 「伝統的な三石かまど…熱効率のよいImproved Cook Stove（ICS）導入プロジェクトを企画。これにより薪の使用量が減少し、CO2排出量の削減、森林保全、煙による目や呼吸器への悪影響の緩和…」「国際認証機関へのカーボン・クレジット認証の申請も計画中」; O-ny2026 「女性が日々の薪集めの労働から解放されることを狙って」; O-recruit (2025-12) 「カーボンクレジットの取得を目指したプロジェクトの形成」 |
| Lunch | Since 2024, TANJA and a partner company have provided lunch for every student at the two secondary schools near the farm. In public secondary schools here, school meals depend on what parents can pay. On the farm, workers are now served a meal too. | NAS F11 (2024 CSR report) §1–2 「給食の提供は、保護者の自己負担に依存」「実施期間：2024年8月～2025年2月」「裨益者：以下、2校の生徒全員」; F10 (2025–26 period); F4 slide 22 「近隣中学校2校で給食支援を実施中」; F5 slide 28 「ランチの提供も開始」. Partner name deliberately NOT shown (partner-commitment rule) — VERIFY with TANJA whether it may be named. |
| Cattle | TANJA also keeps cattle. Their manure goes back to the avocado and coffee fields as compost; meat, milk and biogas are at the planning stage. | NAS F15 (annual cattle report: manure applied to avocado and coffee fields — narrative only); F1 slide 9 「Cattle Keeping … Meat, Milk & Biogas」; F4 slide 19 「畜産（たい肥）… 牛肉・乳製品の販売 / バイオガス」 (plan). No herd numbers (sources conflict). |

### Cafe

No source anywhere (NAS, Drive, OSTI). Visible text: heading + "Details will be shared here." (placeholder `cafe-details`).

## Career

| Element | English | Source |
|---|---|---|
| Section title | Career | — |
| Lede | More than 500 people work at TANJA: in the fields and the wet mill, in the workshop, on community projects and in the office. | O-tanja (500+); O-orient (workshop team, project team, admin team, agricultural staff) |
| Body | Since taking over the farm, TANJA has signed written employment contracts with its workers and helps them join social security. In January 2025 and 2026, the teams met for an orientation on how the company works. | O-orient 「ワーカーさん一人一人との正式な契約書の締結」「年金制度などを含めた社会保障への加入も支援」「500名近くのワーカーさんと、納得の上、契約書を締結」「昨年2025年から実施しており、今年で２回目」 |
| Status (placeholder `career-status`) | Open positions will be announced on this page. | O-recruit (the last recruitment closed 2026-03); nothing current |

## Contact

Unchanged: all values are placeholders until TANJA confirms them (`email`, `phone`, `instagram-url`, `facebook-url`).
The OSTI group Instagram (`osti.african.stories`) is the group's consumer brand account, not a TANJA account: not used.

## What We Do detail page (what-we-do.html)

| Item | Sentence / fact | Source |
|---|---|---|
| Coffee — grown on | All three estates | O-farms (生産品コーヒー for each estate) |
| Coffee — processing | Fully washed, honey and natural | O-ecsite, O-tour |
| Coffee — main harvest | June to September | O-action1 |
| Coffee — certification | Rainforest Alliance | N |
| Coffee — in Japan | Imported and sold by the group company OSTI Japan | O-solar 「グループ会社の株式会社OSTI Japanが責任を持って輸入・販売」 |
| Avocado — first planted / stage | 2023; first trees bearing fruit (April 2026) | O-support 「2023年に最初に植えたアボカドの木々は実をつけ始めています」 |
| Avocado — water | From the reservoir completed in 2025 | O-ye2025 「ダムも2年越しの工事を経て完成し、コーヒー圃場、アボカド圃場に安定的に水を提供」 |
| Avocado — young trees | Staked with stems cut back from the coffee | O-support (カットバックされた幹を添え木に) |
| Macadamia — planted | 28,000 seedlings, completed 2025 | O-ye2025 「マカダミア・ナッツ28,000本の苗木定植完了」 |
| Macadamia — stage | Young trees; harvests still some years away | O-support 「本格的に販売できるようになるまでまだまだ時間がかかります」 |
| Macadamia — experience | OSTI group in Rwanda since 2013 | O-about-rw |
| Beekeeping — role / method / stage | Pollination of avocado and macadamia; moving hives that also help neighbouring farms; early stage | NAS F4 slide 19, F5 slide 26, F1 (trial/initial stages) — VERIFY |
| Carbon — the project | Three-stone fire, smoke, firewood work mostly by women; project aims to bring improved cookstoves | O-ics, O-ny2026 |
| Carbon — listening first | Stakeholder meeting, Karatu District, July 2024, 100+ participants | O-ics |
| Carbon — status | As of late 2025, being set up with the aim of obtaining carbon credits | O-recruit |
| Carbon — clean energy | Solar + battery since July 2025, ten-year on-site agreement, against power cuts | O-solar |
| Lunch — why / what / next | Parents pay; dry year; two schools, every student, 2024–25 and 2025–26, with a partner; primary schools planned; worker meals of porridge and makande | NAS F11, F10, F4 slide 22, F16 — **VERIFY (internal)** |
| Cattle — today / next | Herd, breeding and calf care, compost to avocado and coffee; meat, milk, biogas planned | NAS F15, F1 slide 9, F4 slide 19 — **VERIFY (internal)** |
