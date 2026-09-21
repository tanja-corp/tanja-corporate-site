/* TANJA object map — test-core.js
   Run:  node architecture/test-core.js
   Proves the two promises of the object map without a browser:
     1. the three views are computed from ONE model (a change in any facet shows up in the other views);
     2. the layouts are sane (nothing overlaps, nothing falls outside its parent, no NaN). */
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const OM = require('./model-core.js');
const LY = require('./layout.js');
const SK = require('./skins.js');

const load = () => { const ctx = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'model.js'), 'utf8'), ctx); return ctx.window.OBJECT_MODEL; };
const fresh = () => JSON.parse(JSON.stringify(load()));
let passed = 0, failed = 0;
const test = (name, fn) => { try { fn(); passed++; console.log('PASS ' + name); } catch (e) { failed++; console.log('FAIL ' + name + '\n     ' + (e && e.message)); } };
const obj = (m, id) => m.objects.find(o => o.id === id);
const finite = r => ['x', 'y', 'w', 'h'].every(k => Number.isFinite(r[k]));
const overlap = (a, b) => a.x < b.x + b.w - 0.5 && b.x < a.x + a.w - 0.5 && a.y < b.y + b.h - 0.5 && b.y < a.y + a.h - 0.5;
const inside = (c, p) => c.x >= p.x - 0.5 && c.y >= p.y - 0.5 && c.x + c.w <= p.x + p.w + 0.5 && c.y + c.h <= p.y + p.h + 0.5;

/* ---------------------------------------------------------------- integrity */
test('model.js validates without errors', () => {
  const issues = OM.validate(load());
  assert.deepStrictEqual(issues.filter(i => i.level === 'error'), []);
});
test('serialize → evaluate round-trips exactly', () => {
  const m = load();
  const ctx = { window: {} }; vm.runInNewContext(OM.serialize(m), ctx);
  assert.strictEqual(JSON.stringify(ctx.window.OBJECT_MODEL), JSON.stringify(m));
});
test('every object with a facet appears in at least one view', () => {
  const m = load();
  m.objects.forEach(o => assert.ok(['design', 'concept', 'er'].some(v => OM.inView(m, o, v)), o.id));
});

/* ------------------------------------------------------------------ layouts */
test('layouts: all rectangles finite, all routes finite', () => {
  const all = LY.computeAll(load());
  [all.design.rects, all.concept.rects, all.er.rects].forEach(rs => Object.keys(rs).forEach(k => assert.ok(finite(rs[k]), k)));
  ['concept', 'er', 'design'].forEach(v => all.routes[v].forEach(r => assert.ok(/^M[-\d. ]+/.test(r.d) && !/NaN|undefined/.test(r.d), v + ' ' + r.id)));
});
test('design: every child lies inside its parent; siblings never overlap', () => {
  const m = load(), all = LY.computeAll(m), R = all.design.rects;
  m.objects.forEach(o => {
    if (!o.design) return;
    if (o.design.parent) assert.ok(inside(R[o.id], R[o.design.parent]), o.id + ' outside ' + o.design.parent);
    (all.d.children.get(o.id) || []).forEach((a, i, arr) => arr.slice(i + 1).forEach(b => assert.ok(!overlap(R[a], R[b]), a + ' overlaps ' + b)));
  });
});
test('concept: no two nodes overlap; every node sits inside its domain lane', () => {
  const all = LY.computeAll(load()), R = all.concept.rects, ids = Object.keys(R);
  ids.forEach((a, i) => ids.slice(i + 1).forEach(b => assert.ok(!overlap(R[a], R[b]), a + ' overlaps ' + b)));
  ids.forEach(id => { const lane = all.concept.lanes.find(l => l.id === R[id].domain); assert.ok(lane && inside(R[id], lane), id); });
});
test('ER: tables never overlap; row chips sit inside their table', () => {
  const all = LY.computeAll(load()), T = all.er.tableRects, ids = Object.keys(T);
  ids.forEach((a, i) => ids.slice(i + 1).forEach(b => assert.ok(!overlap(T[a], T[b]), a + ' overlaps ' + b)));
  Object.keys(all.er.rowRects).forEach(id => { const r = all.er.rowRects[id]; assert.ok(inside(r, T[r.table]), id + ' outside table ' + r.table); });
});
test('skins render for every object in every view without throwing', () => {
  const m = load(), all = LY.computeAll(m), ctx = SK.makeCtx(m, all.d, 'ja');
  m.objects.forEach(o => {
    if (all.design.rects[o.id]) assert.ok(SK.designSkin(o, all.design.rects[o.id], ctx).length > 20, o.id + ' design');
    if (all.concept.rects[o.id]) assert.ok(SK.conceptSkin(o, all.concept.rects[o.id], ctx).length > 20, o.id + ' concept');
    if (all.er.rects[o.id]) { const t = all.d.tables.get(o.id); assert.ok((t ? SK.erTableSkin(o, t, all.er.rects[o.id], ctx) : SK.erRowSkin(o, all.er.rects[o.id], ctx)).length > 20, o.id + ' er'); }
  });
});

/* ------------------------------------------- the promise: one edit, three views */
const views = m => { const a = LY.computeAll(m), c = SK.makeCtx(m, a.d, 'ja'); return { a, c }; };
const svgOf = (m, id, view) => {
  const { a, c } = views(m), o = obj(m, id);
  if (view === 'design') return SK.designSkin(o, a.design.rects[id], c);
  if (view === 'concept') return SK.conceptSkin(o, a.concept.rects[id], c);
  const t = a.d.tables.get(id); return t ? SK.erTableSkin(o, t, a.er.rects[id], c) : SK.erRowSkin(o, a.er.rects[id], c);
};

test('rename an object once → the new name is drawn in design, concept AND ER', () => {
  const m = fresh(); obj(m, 'staff').ja = '職員テスト';
  ['design', 'concept', 'er'].forEach(v => assert.ok(svgOf(m, 'staff', v).includes('職員テスト') || v === 'er' && svgOf(m, 'staff', v).includes('職員テスト'), v));
});
test('add a field in the ER facet → the table grows and the new field is drawn; other views are unaffected in layout', () => {
  const m = fresh(), before = views(m).a;
  obj(m, 'staff').er.fields.push({ name: 'phone_number', type: 'text' });
  const after = views(m).a;
  assert.ok(after.er.tableRects.staff.h > before.er.tableRects.staff.h);
  assert.ok(svgOf(m, 'staff', 'er').includes('phone_number'));
  assert.deepStrictEqual(after.design.rects.staff, before.design.rects.staff);
});
test('mark an ER field as 3-language → the design card gets the 3-language badge', () => {
  const m = fresh(); const f = obj(m, 'contact').er.fields.find(x => x.name === 'phone'); delete obj(m, 'contact').er.fields.find(x => x.i18n).i18n;
  assert.ok(!svgOf(m, 'contact', 'design').includes('3言語'));
  f.i18n = true;
  assert.ok(svgOf(m, 'contact', 'design').includes('3言語'));
  assert.ok(views(m).a.d.edges.er.some(e => e.kind === 'i18n' && e.from === 'contact'));
});
test('change the design slot → the ER relationship to PhotoSlot lists the new slot', () => {
  const m = fresh(); obj(m, 'career').design.slot = '05';
  const e = views(m).a.d.edges.er.find(x => x.kind === 'slot' && x.from === 'career');
  assert.ok(e && e.slots.includes('05') && !e.slots.includes('09'));
});
test('repeat count in the design facet → ER table shows the same count', () => {
  const m = fresh(); obj(m, 'staff').design.repeat = { shown: 6, min: 3, max: 6 };
  assert.ok(svgOf(m, 'staff', 'er').includes('×6'));
  assert.ok(svgOf(m, 'staff', 'design').includes('×6'));
});
test('add ONE link → it is drawn in the concept diagram and becomes a foreign key in ER', () => {
  const m = fresh(), a = views(m).a;
  const nc = a.d.edges.concept.length, ne = a.d.edges.er.length;
  m.links.push({ id: 'ltest', from: 'social', to: 'career', card: 'N:1', verb: { ja: '属する', en: 'belongs to' }, field: 'career_ref' });
  const b = views(m).a;
  assert.strictEqual(b.d.edges.concept.length, nc + 1);
  assert.strictEqual(b.d.edges.er.length, ne + 1);
  assert.ok(b.d.tables.get('social').fields.some(f => f.name === 'career_ref' && f.fk === 'career'));
});
test('foreign keys are named from the table in snake_case (CareerNote → career_note_id)', () => {
  const m = fresh(); m.links.push({ id: 'lsnake', from: 'social', to: 'career', card: 'N:1', verb: { ja: 'x', en: 'x' } });
  assert.ok(views(m).a.d.tables.get('social').fields.some(f => f.name === 'career_note_id' && f.fk === 'career'));
});
test('a link with N:1 puts the FK on the "from" table; 1:N on the "to" table', () => {
  const m = fresh();
  m.links.push({ id: 'la', from: 'staff', to: 'contact', card: 'N:1', verb: { ja: 'a', en: 'a' } });
  m.links.push({ id: 'lb', from: 'hero', to: 'social', card: '1:N', verb: { ja: 'b', en: 'b' } });
  const d = views(m).a.d;
  assert.ok(d.tables.get('staff').fields.some(f => f.fk === 'contact' && f.derived));
  assert.ok(d.tables.get('social').fields.some(f => f.fk === 'hero' && f.derived));
});
test('move an object in the design tree → the concept containment line follows', () => {
  const m = fresh();
  assert.ok(views(m).a.d.edges.concept.some(e => e.kind === 'contain' && e.from === 'about' && e.to === 'staff'));
  obj(m, 'staff').design.parent = 'what-we-do';
  const c = views(m).a.d.edges.concept;
  assert.ok(!c.some(e => e.kind === 'contain' && e.from === 'about' && e.to === 'staff'));
  assert.ok(c.some(e => e.kind === 'contain' && e.from === 'what-we-do' && e.to === 'staff'));
});
test('add an ER facet to a concept-only object → it now appears in the ER view (and keeps its concept card)', () => {
  const m = fresh(); assert.ok(!views(m).a.er.rects.tanja);
  obj(m, 'tanja').er = { table: 'Company', fields: [{ name: 'id', type: 'id', pk: true }] };
  const a = views(m).a; assert.ok(a.er.rects.tanja && a.concept.rects.tanja);
});
test('remove the ER facet of a table → its rows and relationships disappear from ER, the design cards stay', () => {
  const m = fresh(); OM.dropFacet(m, 'farm', 'er');
  const a = views(m).a;
  assert.ok(!a.er.rects.farm && !a.er.rects.coffee);
  assert.ok(a.design.rects.coffee && a.concept.rects.coffee);
  assert.deepStrictEqual(OM.validate(m).filter(i => i.level === 'error'), []);
});
test('a link between an already-nested pair replaces the plain "contains" line instead of doubling it', () => {
  const m = fresh(), a = views(m).a;
  m.links.push({ id: 'ldup', from: 'contact', to: 'social', card: '1:N', verb: { ja: '案内する', en: 'lists' }, views: ['concept'] });
  const b = views(m).a;
  assert.strictEqual(b.d.edges.concept.length, a.d.edges.concept.length);
  assert.ok(b.d.edges.concept.some(e => e.id === 'ldup') && !b.d.edges.concept.some(e => e.kind === 'contain' && e.from === 'contact' && e.to === 'social'));
});
test('drop the design facet → children move up, the object stays in concept/ER', () => {
  const m = fresh(); OM.dropFacet(m, 'about', 'design');
  assert.strictEqual(obj(m, 'our-company').design.parent, 'site');
  const a = views(m).a; assert.ok(!a.design.rects.about && a.concept.rects.about);
  assert.deepStrictEqual(OM.validate(m).filter(i => i.level === 'error'), []);
});
test('delete an object → links, children and references are cleaned; model stays valid', () => {
  const m = fresh(); OM.removeObject(m, 'about');
  assert.ok(!obj(m, 'about'));
  assert.strictEqual(obj(m, 'our-company').design.parent, 'site');           // children move up
  assert.ok(!m.links.some(l => l.from === 'about' || l.to === 'about'));
  assert.deepStrictEqual(OM.validate(m).filter(i => i.level === 'error'), []);
});
test('rename an id → parents, links, rows and alsoIn follow; nothing dangles', () => {
  const m = fresh(); OM.renameId(m, 'farm', 'crops');
  assert.strictEqual(obj(m, 'coffee').design.parent, 'crops');
  assert.strictEqual(obj(m, 'coffee').er.rowOf, 'crops');
  assert.ok(m.links.some(l => l.from === 'crops') && !m.links.some(l => l.from === 'farm' || l.to === 'farm'));
  assert.deepStrictEqual(OM.validate(m).filter(i => i.level === 'error'), []);
});
test('rename a field → links and slotField follow (no duplicate FK appears)', () => {
  const m = fresh(); OM.renameField(m, 'hero', 'image', 'main_image');
  assert.strictEqual(obj(m, 'hero').design.slotField, 'main_image');
  const t = views(m).a.d.tables.get('hero');
  assert.ok(t.fields.filter(f => f.name === 'main_image').length === 1 && !t.fields.some(f => f.name === 'image'));
  assert.ok(t.fields.find(f => f.name === 'main_image').fk === 'photo-slot');
});
test('validation catches a dangling parent, a duplicate id and a bad cardinality', () => {
  const m = fresh(); obj(m, 'staff').design.parent = 'nowhere'; m.objects.push(JSON.parse(JSON.stringify(obj(m, 'staff')))); m.links[0].card = 'X:Y';
  const msgs = OM.validate(m).filter(i => i.level === 'error').map(i => i.msg).join('|');
  assert.ok(/does not exist/.test(msgs) && /duplicate object id/.test(msgs) && /card must be/.test(msgs));
});
test('layout is deterministic: same model → identical geometry', () => {
  assert.deepStrictEqual(JSON.stringify(LY.computeAll(load()).design.rects), JSON.stringify(LY.computeAll(load()).design.rects));
});


/* ------------------------------------------- hardening found by the independent review */
test('the page root cannot be deleted or lose its design facet (it would orphan every block)', () => {
  const m = fresh();
  assert.strictEqual(OM.removeObject(m, 'site'), false);
  assert.strictEqual(OM.dropFacet(m, 'site', 'design'), false);
  assert.ok(obj(m, 'site') && obj(m, 'site').design);
  assert.deepStrictEqual(OM.validate(m).filter(i => i.level === 'error'), []);
});
test('validate never throws on garbage input and reports an error instead', () => {
  [null, 42, {}, { objects: {} }, { objects: [null] }, { objects: [], links: {} }, { objects: [], domains: 3 }].forEach(x => {
    const r = OM.validate(x); assert.ok(Array.isArray(r) && r.some(i => i.level === 'error'), JSON.stringify(x));
  });
});
test('validate rejects impossible numbers and an er facet that is neither table nor row', () => {
  const m = fresh();
  obj(m, 'staff').design.repeat.shown = 100000; obj(m, 'hero').design.h = -5; obj(m, 'coffee').design.weight = 0; obj(m, 'tanja').er = { rowOf: '' };
  const msgs = OM.validate(m).filter(i => i.level === 'error').map(i => i.msg).join('|');
  assert.ok(/repeat\.shown/.test(msgs) && /design\.h/.test(msgs) && /design\.weight/.test(msgs) && /neither|needs either/.test(msgs), msgs);
});
test('layout survives hostile numbers (negative height, zero weight, huge repeat) without NaN', () => {
  const m = fresh();
  obj(m, 'staff').design.repeat.shown = 99999; obj(m, 'hero').design.h = -50; obj(m, 'language').design.weight = 0; obj(m, 'farm').design.cols = 0;
  const a = LY.computeAll(m); const c = SK.makeCtx(m, a.d, 'ja');
  Object.values(a.design.rects).forEach(r => assert.ok(finite(r)));
  assert.ok(SK.designSkin(obj(m, 'staff'), a.design.rects.staff, c).length < 60000);       // the card loop is bounded
});
test('a parent cycle does not hang faces()', () => {
  const m = fresh(); obj(m, 'about').design.parent = 'staff'; obj(m, 'staff').design.parent = 'about';
  const d = OM.derive(m); OM.faces(m, d, 'staff');
});
test('relations that have no FK column meet the table header, not an arbitrary row', () => {
  const all = LY.computeAll(load()), T = all.er.tableRects;
  all.routes.er.filter(r => r.edge.noFk).forEach(r => {
    const t = T[r.edge.from], y = r.from.y;
    assert.ok(y >= t.y && y <= t.y + LY.ER.head + 6, r.id + ' leaves ' + r.edge.from + ' at y=' + (y - t.y));
  });
});

console.log('\n' + passed + ' passed, ' + failed + ' failed');
process.exit(failed ? 1 : 0);
