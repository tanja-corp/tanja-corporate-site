# TANJA Web V2 — Language Research

Updated: 2026-09-19

## Conclusion

For TANJA's stated objective, the strongest launch model is:

1. **English — default / primary corporate language**
2. **Kiswahili — mandatory, complete core-content version**
3. **Japanese — additional complete/near-complete version for Japan-side stakeholders**
4. Future languages — supported by architecture, but not launched without a defined audience and translation owner

The evidence does **not** support treating “has a web-capable device” as equivalent to “can comfortably consume a corporate website in English”.

## Why English-first is defensible

A sample of current Tanzanian corporate websites shows that English-first is common, especially among large private companies and B2B/corporate sites:

- MeTL Group: main corporate website is English-first.
  https://metl.net/
- Kilombero Sugar Company: English corporate experience.
  https://www.kilomberosugar.co.tz/en/
- Serengeti Breweries: English corporate website.
  https://www.serengetibreweries.co.tz/
- Twiga Cement / TPC PLC: English main corporate website; some formal reports are published in English & Swahili.
  https://www.twigacement.com/en
- Lima Tanzania, the project's primary reference: English main website.
  https://www.limatanzania.com/

This means an English default will not look abnormal for a Tanzanian corporate site.

## Why Kiswahili must still be first-class

Other major Tanzanian public/customer-facing sites explicitly support both languages:

- Airtel Tanzania exposes “Badili kwa Kiswahili” from its English site.
  https://www.airtel.co.tz/
- Tanzania Petroleum Development Corporation offers Kiswahili / English.
  https://tpdc.co.tz/
- Tanzania Ports Authority offers EN / SW / FR.
  https://ports.go.tz/
- CRDB's SimBanking is explicitly bilingual in Kiswahili and English.
  https://www.crdbbank.co.tz/en/for-you/ways-to-bank/mobile-banking

This pattern is consistent with TANJA's unusual audience priority: workers and surrounding communities come before corporate partners.

## Tanzania literacy evidence

Tanzania's 2022 Population and Housing Census reports, for Mainland Tanzania adults aged 15+:
- Kiswahili only literacy: 61.2%
- English only literacy: 0.7%
- both English and Kiswahili: 20.5%

The rural/urban split is especially important:
- rural: 12.5% literate in both Kiswahili and English
- urban: 33.4% literate in both

Source:
https://www.nbs.go.tz/uploads/statistics/documents/sw-1738321714-02.%20Mainland_Demographic%20and%20Socioeconomic%20Profile.pdf

This is literacy, not a direct measurement of website users or spoken-English ability. It therefore cannot tell us exactly what percentage of TANJA workers with smartphones understand English. But it is strong evidence **against** assuming that device/web access makes a Kiswahili version unnecessary.

The World Bank reports internet use in Tanzania at about 31% of the population in 2024. This also does not establish English proficiency among internet users.
https://data.worldbank.org/indicator/IT.NET.USER.ZS?locations=TZ

## Rwanda

Do not treat Rwanda as “Swahili is enough.”

The Government of Rwanda states:
- Kinyarwanda is the common language spoken across the country.
- English, French and Kiswahili are other official languages.

Source:
https://www.gov.rw/about

Practical implication:
- For Rwandan **business/institutional visitors**, English is a strong bridge language.
- For broad Rwandan public/community outreach, Kinyarwanda is the more relevant local-language addition.
- Kiswahili may help but should not be used as a substitute for Kinyarwanda.

## India

Do not add Hindi solely because India may become commercially relevant.

For TANJA's likely cross-border B2B use, English already serves the business audience efficiently, while “India” does not map to one universally appropriate local-language website version. Add an Indian language only if a concrete sales/partnership audience and translation owner emerge.

## Recommendation on fourth/fifth languages

Do not launch 5–6 languages in the MVP.

Reasons:
- every section change multiplies translation and approval work;
- Mission/Values and project facts are still evolving;
- stale translated pages damage trust;
- current top audiences are Tanzania-based.

Preferred model:
- launch EN + SW + JP;
- implement language files / content structure so new locales can be added;
- add a fourth language only after a named audience is identified.

If East/Central African regional expansion later becomes a website objective:
- consider **French** for DRC/francophone institutional audiences;
- consider **Kinyarwanda** only for deliberate Rwanda public/community targeting;
- keep English as the regional B2B bridge.

## UX recommendation

Working recommendation, to confirm:
- Header control: `EN | SW | JP`
- English as first/default rendered version
- remember explicit visitor choice locally
- optionally respect browser language for `sw` or `ja` on first visit, only if the team prefers
- identical navigation/section structure across languages
- no machine-translated public copy without human review
- language names displayed clearly rather than flags
