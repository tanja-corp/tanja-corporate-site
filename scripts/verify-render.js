/* TANJA Web V2 — verify-render.js
   Run:  npm run test:render   (needs `npm install` once — playwright is a devDependency, CI-only; the SITE itself has no build step)

   Boots the static site locally, drives it with Playwright, and checks the things a human reviewer would otherwise have to check
   by hand: no console/page errors, no horizontal overflow, the six sections appear in the right order in EN/SW/JA at four widths,
   the Farm/Sustainability card counts are right, the mobile menu opens, JavaScript-off still shows full English content, and the
   architecture/ viewer loads in all three views without erroring.

   This is a REGRESSION check, not a design spec: when the page's real structure changes on purpose (a section renamed, added,
   reordered — see architecture/model.js, which is the source of truth), update the constants below to match, the same way
   architecture/check.js gets kept in sync. A failure here means "the site stopped doing what it did yesterday", not "the site is
   wrong forever".

   No dependency beyond `playwright` (devDependency only). Exits 1 on any failure so CI fails the job. */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const PORT = 8888 + (process.pid % 500);   // avoid clashes when run concurrently

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.json': 'application/json'
};

/* ---- what "correct" means today (update alongside architecture/model.js and index.html) ---- */
const EXPECTED_SECTION_ORDER = ['home', 'about', 'what-we-do', 'career', 'contact'];   // Our Staff removed 2026-09-26
const EXPECTED_NAV_COUNT = 4;
const EXPECTED_FARM_COUNT = 4;
const EXPECTED_SUSTAIN_COUNT = 3;
const EXPECTED_DETAIL_ANCHORS = ['coffee', 'avocado', 'macadamia', 'beekeeping', 'carbon', 'school', 'cattle', 'cafe'];
const WIDTHS = [1440, 1024, 768, 390];
const LANGS = ['en', 'sw', 'ja'];
// Case-insensitive: innerText reflects CSS text-transform (e.g. .eyebrow renders "Cafe" as "CAFE"), so match loosely.
const JS_OFF_MUST_CONTAIN = [
  'About', 'What We Do', 'Farm', 'Coffee', 'Avocado', 'Macadamia', 'Beekeeping',
  'Sustainability', 'Carbon Credit', 'Lunch', 'Cattle', 'Cafe', 'Career', 'Contact'
];

function serve(root) {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/index.html';
    const full = path.join(root, p);
    if (!full.startsWith(root)) { res.writeHead(403); res.end(); return; }
    fs.readFile(full, (err, data) => {
      if (err) { res.writeHead(404); res.end('not found: ' + p); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(full)] || 'application/octet-stream' });
      res.end(data);
    });
  }).listen(PORT);
}

let passed = 0, failed = 0;
const results = [];
function check(name, ok, detail) {
  if (ok) { passed++; console.log('PASS  ' + name); }
  else { failed++; console.log('FAIL  ' + name + (detail ? '\n      ' + detail : '')); }
  results.push({ name, ok, detail });
}

(async () => {
  const server = serve(ROOT);
  const base = `http://localhost:${PORT}`;
  const browser = await chromium.launch();

  try {
    /* ---- 1. matrix: width x language ---- */
    for (const width of WIDTHS) {
      for (const lang of LANGS) {
        const page = await browser.newPage({ viewport: { width, height: 900 } });
        const errors = [];
        page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
        page.on('pageerror', err => errors.push('pageerror: ' + err.message));

        await page.goto(`${base}/index.html`, { waitUntil: 'load' });
        if (lang !== 'en') {
          await page.click(`[data-set-lang="${lang}"]`);
          await page.waitForTimeout(150);
        }

        const tag = `${width}px / ${lang}`;
        check(`${tag}: no console/page errors`, errors.length === 0, errors.join(' | '));

        const overflow = await page.evaluate(() => {
          const de = document.documentElement;
          return de.scrollWidth - de.clientWidth;
        });
        check(`${tag}: no horizontal overflow`, overflow <= 0, `scrollWidth - clientWidth = ${overflow}px`);

        const sectionIds = await page.evaluate(() => Array.from(document.querySelectorAll('main > section')).map(s => s.id));
        check(`${tag}: section order`, JSON.stringify(sectionIds) === JSON.stringify(EXPECTED_SECTION_ORDER),
          `got [${sectionIds.join(' -> ')}]`);

        const navCount = await page.$$eval('.site-nav a', els => els.length);
        check(`${tag}: header nav has ${EXPECTED_NAV_COUNT} items`, navCount === EXPECTED_NAV_COUNT, `got ${navCount}`);

        const farmCount = await page.$$eval('#farm .farm-grid > .crop', els => els.length).catch(() => -1);
        check(`${tag}: Farm has ${EXPECTED_FARM_COUNT} cards`, farmCount === EXPECTED_FARM_COUNT, `got ${farmCount}`);

        const sustainCount = await page.$$eval('#project .project-grid > li', els => els.length).catch(() => -1);
        check(`${tag}: Sustainability has ${EXPECTED_SUSTAIN_COUNT} cards`, sustainCount === EXPECTED_SUSTAIN_COUNT, `got ${sustainCount}`);

        const cafeExists = await page.$('#cafe') !== null;
        check(`${tag}: Cafe section present`, cafeExists);

        if (width === 1440 && lang === 'en') {
          const detailLinks = await page.$$eval(
            '.crop__title a, .project__title a, .cafe__text .eyebrow a',
            els => els.map(a => a.getAttribute('href'))
          );
          const expected = EXPECTED_DETAIL_ANCHORS.map(id => `what-we-do.html#${id}`);
          check('homepage: every What We Do item links to its what-we-do.html anchor',
            JSON.stringify(detailLinks.sort()) === JSON.stringify(expected.slice().sort()),
            `got [${detailLinks.join(', ')}]`);
        }

        await page.close();
      }
    }

    /* ---- 2. mobile menu ---- */
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 800 } });
      await page.goto(`${base}/index.html`, { waitUntil: 'load' });
      await page.click('.menu-btn');
      await page.waitForTimeout(400);
      const navCount = await page.$$eval('.js .site-header.is-menu-open .site-nav a', els => els.length).catch(() => 0);
      check('mobile menu opens and lists all nav items', navCount === EXPECTED_NAV_COUNT, `got ${navCount}`);
      await page.close();
    }

    /* ---- 3. JavaScript disabled: English content still fully readable ---- */
    {
      const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1024, height: 900 } });
      const page = await context.newPage();
      await page.goto(`${base}/index.html`, { waitUntil: 'load' });
      const bodyText = (await page.evaluate(() => document.body.innerText)).toLowerCase();
      const missing = JS_OFF_MUST_CONTAIN.filter(s => !bodyText.includes(s.toLowerCase()));
      check('JS off: full English content still present', missing.length === 0, `missing: ${missing.join(', ')}`);
      await context.close();
    }

    /* ---- 4. architecture/ viewer loads in all three views without error ---- */
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      const errors = [];
      page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
      page.on('pageerror', err => errors.push('pageerror: ' + err.message));
      await page.goto(`${base}/architecture/index.html`, { waitUntil: 'load' });
      await page.waitForTimeout(500);
      for (const key of ['2', '3', '1']) {   // concept, ER, back to design
        await page.keyboard.press(key);
        await page.waitForTimeout(300);
      }
      check('architecture/ viewer: no console/page errors across all three views', errors.length === 0, errors.join(' | '));
      await page.close();
    }

    /* ---- 5. what-we-do.html detail page (added 2026-09-26) ---- */
    for (const lang of LANGS) {
      const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });
      const errors = [];
      page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
      page.on('pageerror', err => errors.push('pageerror: ' + err.message));

      await page.goto(`${base}/what-we-do.html`, { waitUntil: 'load' });
      if (lang !== 'en') {
        await page.click(`[data-set-lang="${lang}"]`);
        await page.waitForTimeout(150);
      }

      const tag = `what-we-do.html / ${lang}`;
      check(`${tag}: no console/page errors`, errors.length === 0, errors.join(' | '));

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      check(`${tag}: no horizontal overflow`, overflow <= 0, `scrollWidth - clientWidth = ${overflow}px`);

      const anchorIds = await page.$$eval('.wwd-detail[id]', els => els.map(el => el.id));
      check(`${tag}: all ${EXPECTED_DETAIL_ANCHORS.length} item anchors present`,
        JSON.stringify(anchorIds.sort()) === JSON.stringify(EXPECTED_DETAIL_ANCHORS.slice().sort()),
        `got [${anchorIds.join(', ')}]`);

      const jumpLinks = await page.$$eval('.wwd-jump a', els => els.map(a => a.getAttribute('href')));
      check(`${tag}: jump-nav links to every anchor`,
        EXPECTED_DETAIL_ANCHORS.every(id => jumpLinks.includes(`#${id}`)), `got [${jumpLinks.join(', ')}]`);

      if (lang === 'en') {
        const coffeeSections = await page.$$eval('#coffee .wwd-detail__section h4', els => els.map(h => h.textContent.trim()));
        check('what-we-do.html: Coffee detail frame has its worked-example subsections',
          coffeeSections.length >= 3, `got [${coffeeSections.join(', ')}]`);
      }

      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
})();
