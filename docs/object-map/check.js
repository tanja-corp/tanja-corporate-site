/* TANJA object map — check.js
   Run:  node docs/object-map/check.js
   Compares model.js with the site itself and catches ADDED or REMOVED ids, slots, placeholders and repeat counts, changed tokens and
   breakpoints, the order of the top-level sections, and slot approval states. It does NOT check which object owns which slot or
   placeholder, nesting or order below the top level, class names, alsoIn, or the meaning of links. Compared:
     styles.css     ← design tokens and width breakpoints
     index.html     ← section ids, section order, photo slots, placeholders, repeat counts
     PHOTO_MANIFEST ← slot approval states
   Exit code 1 when something differs. No dependencies. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const OM = require('./model-core.js');

const root = process.env.OM_ROOT || path.join(__dirname, '..', '..');   // OM_ROOT lets the tests point at a deliberately broken copy
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'docs', 'object-map', 'model.js'), 'utf8'), ctx);
const model = ctx.window.OBJECT_MODEL;

const errors = [], warns = [], ok = [];
const err = m => errors.push(m), warn = m => warns.push(m), good = m => ok.push(m);
const norm = s => String(s).replace(/\/\*.*?\*\//gs, '').replace(/\s+/g, ' ').trim();

/* ---- 0. the model itself ---- */
OM.validate(model).forEach(i => (i.level === 'error' ? err : warn)('model: ' + i.msg));

/* ---- 1. design tokens ↔ styles.css :root ---- */
const css = read('styles.css');
const rootBlock = (css.match(/:root\s*\{([\s\S]*?)\n\}/) || [])[1] || '';
const cssTokens = {};
rootBlock.replace(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi, (_, k, v) => { cssTokens[k] = norm(v); });
const IGNORED_CSS_TOKENS = new Set(['--font-sans', '--font-ja', '--focus', '--c-hero-scrim']);
let tokenOk = 0;
(model.tokens || []).forEach(t => {
  if (!(t.name in cssTokens)) err('token ' + t.name + ' is in model.js but not in styles.css :root');
  else if (norm(t.value) !== cssTokens[t.name]) err('token ' + t.name + ': model "' + t.value + '" ≠ css "' + cssTokens[t.name] + '"');
  else tokenOk++;
});
Object.keys(cssTokens).forEach(k => {
  if (!IGNORED_CSS_TOKENS.has(k) && !(model.tokens || []).some(t => t.name === k)) err('token ' + k + ' is in styles.css but missing from model.js');
});
good('design tokens: ' + tokenOk + ' of ' + Object.keys(cssTokens).length + ' CSS tokens match');

/* ---- 2. breakpoints ---- */
const html = read('index.html');
const htmlNoComments = html.replace(/<!--[\s\S]*?-->/g, '');
const cssMedia = new Set();
css.replace(/@media\s*(\((?:min|max)-width:\s*[^)]+\))/g, (_, q) => { cssMedia.add(norm(q)); });
(model.breakpoints || []).forEach(b => {
  const q = norm(b.query);
  if (b.html) { if (!htmlNoComments.includes('media="' + q.replace(/^\(|\)$/g, '') ) && !htmlNoComments.includes('media="' + q + '"')) err('breakpoint ' + q + ' not found in index.html'); }
  else if (!cssMedia.has(q)) err('breakpoint ' + q + ' is in model.js but not in styles.css');
});
cssMedia.forEach(q => { if (!(model.breakpoints || []).some(b => norm(b.query) === q)) err('breakpoint ' + q + ' is in styles.css but missing from model.js'); });
good('breakpoints: ' + cssMedia.size + ' width queries in CSS');

/* ---- 3. ids and section order ---- */
const idsInHtml = new Set(); htmlNoComments.replace(/\sid="([^"]+)"/g, (_, id) => { idsInHtml.add(id); });
const modelIds = new Map();
model.objects.forEach(o => { if (o.design && o.design.htmlId && !o.design.ghost) modelIds.set(o.design.htmlId, o.id); });
modelIds.forEach((obj, id) => { if (!idsInHtml.has(id)) err('object "' + obj + '" says htmlId #' + id + ' but index.html has no such id'); });
const IGNORE_ID = [/-title$/, /^main$/, /^site-nav$/, /^nav-/, /^tl-note-text$/, /^i-/];
idsInHtml.forEach(id => { if (!modelIds.has(id) && !IGNORE_ID.some(r => r.test(id))) err('index.html has id #' + id + ' that no object in model.js accounts for'); });
good('ids: ' + modelIds.size + ' block ids match');

const sectionOrder = []; htmlNoComments.replace(/<section\b[^>]*\sid="([^"]+)"/g, (_, id) => { sectionOrder.push(id); });
const d = OM.derive(model);
const modelOrder = (d.children.get(d.designRoot) || []).map(id => model.objects.find(o => o.id === id)).filter(o => o.design.htmlId && !o.design.ghost).map(o => o.design.htmlId);
if (JSON.stringify(sectionOrder) !== JSON.stringify(modelOrder)) err('section order differs: index.html [' + sectionOrder.join(' → ') + '] vs model [' + modelOrder.join(' → ') + ']');
else good('section order: ' + sectionOrder.join(' → '));

/* ---- 4. photo slots (data-slot) and repeat counts ---- */
const slotCount = {}; htmlNoComments.replace(/data-slot="(\d+)"/g, (_, n) => { slotCount[n] = (slotCount[n] || 0) + 1; });
const modelSlots = {};
model.objects.forEach(o => { if (o.design && o.design.slot) modelSlots[o.design.slot] = (modelSlots[o.design.slot] || 0) + (o.design.repeat ? o.design.repeat.shown : 1); });
const slotObjects = model.objects.filter(o => /^slot-\d+$/.test(o.id)).map(o => o.id.slice(5));
new Set([...Object.keys(slotCount), ...Object.keys(modelSlots), ...slotObjects]).forEach(n => {
  if (!(n in slotCount)) err('slot ' + n + ' is in model.js but no element in index.html has data-slot="' + n + '"');
  else if (!(n in modelSlots)) err('index.html uses data-slot="' + n + '" but no design object in model.js is placed in that slot');
  else if (slotCount[n] !== modelSlots[n]) err('slot ' + n + ': index.html has ' + slotCount[n] + ' element(s), model.js expects ' + modelSlots[n]);
  if (slotObjects.indexOf(n) < 0) err('slot ' + n + ' has no object "slot-' + n + '" (PhotoSlot row)');
});
good('photo slots: ' + Object.keys(slotCount).length + ' slots, counts match (incl. staff ×' + (slotCount['03'] || 0) + ')');

/* ---- 5. placeholders (data-placeholder) ---- */
const phHtml = new Set(); htmlNoComments.replace(/data-placeholder="([^"]+)"/g, (_, p) => { phHtml.add(p); });
const phModel = new Set(); model.objects.forEach(o => ((o.design && o.design.placeholders) || []).forEach(p => phModel.add(p)));
phModel.forEach(p => { if (!phHtml.has(p)) err('placeholder "' + p + '" is in model.js but not marked in index.html'); });
phHtml.forEach(p => { if (!phModel.has(p)) err('index.html marks placeholder "' + p + '" that no object in model.js lists'); });
good('placeholders: ' + phHtml.size + ' marked in HTML, ' + phModel.size + ' in model');

/* ---- 6. repeat counts that can be counted in the HTML ---- */
const count = (re, s) => (s.match(re) || []).length;
const headerNav = (htmlNoComments.match(/<nav class="site-nav"[\s\S]*?<\/nav>/) || [''])[0];
const langGroup = (htmlNoComments.match(/<div class="lang"[\s\S]*?<\/div>/) || [''])[0];
const repeats = [
  ['nav-item', count(/<li>/g, headerNav), 'items in the header nav'],
  ['language', count(/data-set-lang=/g, langGroup), 'buttons in the language control'],
  ['social', count(/class="social__link"/g, htmlNoComments), 'Contact social links'],
  ['staff', count(/<li class="person"/g, htmlNoComments), 'staff cards'],
];
repeats.forEach(([id, n, what]) => {
  const o = model.objects.find(x => x.id === id), shown = o && o.design && o.design.repeat && o.design.repeat.shown;
  if (shown !== n) err(id + ': model says ×' + shown + ' but index.html has ' + n + ' ' + what);
});
const rowsOf = t => model.objects.filter(o => o.er && o.er.rowOf === t).length;
const cropCards = count(/<article class="crop\b/g, htmlNoComments), projectCards = count(/<article class="project"/g, htmlNoComments);
if (cropCards !== rowsOf('farm')) err('Crop rows in model.js (' + rowsOf('farm') + ') ≠ crop cards in index.html (' + cropCards + ')');
if (projectCards !== rowsOf('project')) err('Project rows in model.js (' + rowsOf('project') + ') ≠ project cards in index.html (' + projectCards + ')');
good('repeat counts: nav ' + repeats[0][1] + ', languages ' + repeats[1][1] + ', social ' + repeats[2][1] + ', staff ' + repeats[3][1] + ', crops ' + cropCards + ', projects ' + projectCards);

/* ---- 7. photo manifest approval ↔ status ---- */
const manifest = read('docs/PHOTO_MANIFEST.md');
const MAP = { PROVISIONAL: 'provisional', PLACEHOLDER: 'placeholder', APPROVED: 'built' };
let rows = 0;
manifest.replace(/^\|\s*(\d{2})\s*\|.*?`(PROVISIONAL|PLACEHOLDER|APPROVED)`.*\|\s*$/gm, (_, n, st) => {
  rows++;
  const o = model.objects.find(x => x.id === 'slot-' + n);
  if (!o) err('PHOTO_MANIFEST lists slot ' + n + ' but model.js has no slot-' + n);
  else if (o.status !== MAP[st]) err('slot ' + n + ': PHOTO_MANIFEST says ' + st + ', model.js says ' + o.status);
});
if (rows !== slotObjects.length) err('PHOTO_MANIFEST has ' + rows + ' slot rows, model.js has ' + slotObjects.length);
else good('photo manifest: ' + rows + ' slots, approval states match');

/* ---- report ---- */
ok.forEach(m => console.log('ok    ' + m));
warns.forEach(m => console.log('warn  ' + m));
errors.forEach(m => console.log('ERROR ' + m));
console.log('\n' + (errors.length ? errors.length + ' problem(s): model.js and the site have drifted apart.' : 'model.js and the site agree.'));
process.exit(errors.length ? 1 : 0);
