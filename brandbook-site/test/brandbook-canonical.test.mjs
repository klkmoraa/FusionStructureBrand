import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import * as glyphLibrary from '../scripts/glyph-library.mjs';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

const BRANDBOOK_BLOCK_IDS = [
  'norte',
  'identidad',
  'sistema',
  'lenguaje',
  'interaccion',
  'patrones',
  'casos',
  'entrega',
];

const LEGACY_TOPIC_IDS = [
  'norte',
  'identidad',
  'herramientas',
  'color',
  'tipografia',
  'movimiento',
  'materia',
  'iconografia',
  'patrones',
  'referencias',
  'voz',
  'entrega',
];

const shadowLayers = (source) =>
  [...source.matchAll(/--(?:fs-)?shadow-[\w-]+:\s*([^;]+);/g)].flatMap(
    ([, value]) => value.split(/,(?![^()]*\))/).map((layer) => layer.trim()),
  );

const blurLength = (layer) => {
  const lengths = [...layer.matchAll(/-?\d*\.?\d+(?:px|rem)/g)].map(
    (match) => match[0],
  );
  return lengths[layer.startsWith('inset') ? 2 : 2] ?? '0px';
};

test('publishes the canonical 2026 mint and family architecture', async () => {
  const [system, glyphLibrary, assetBuilder] = await Promise.all([
    read('../app/brand/system.ts'),
    read('../scripts/glyph-library.mjs'),
    read('../scripts/build-brand-assets.mjs'),
  ]);

  assert.match(system, /day: '#1AA57A'/);
  assert.match(system, /night: '#53E0B2'/);
  assert.match(system, /detail: '6 familias de producto'/);
  assert.match(glyphLibrary, /analisis: \{ day: '#ED4B46'/);
  assert.match(glyphLibrary, /modelo: \{ day: '#7657D5'/);
  assert.match(glyphLibrary, /interop: \{ day: '#3A72E3'/);
  assert.match(assetBuilder, /const BRAND_DAY = '#1AA57A'/);
});

test('keeps the mother brand separate from the six product families', () => {
  assert.deepEqual(glyphLibrary.PRODUCT_FAMILY_IDS, [
    'analisis',
    'modelo',
    'civil',
    'proyecto',
    'interop',
    'aprendizaje',
  ]);
  assert.equal(glyphLibrary.FAMILY_COLORS.nucleo.label, 'FusionStructure');
  assert.equal(glyphLibrary.FAMILY_COLORS.interop.label, 'Conexiones');
});

test('keeps eight visual blocks around twelve deep-linkable topics', async () => {
  const [system, page] = await Promise.all([
    read('../app/brand/system.ts'),
    read('../app/page.tsx'),
  ]);

  const blockIds = [
    ...system.matchAll(/\{ id: '([\w]+)', index: '\d{2}', sectionIds:/g),
  ].map(([, id]) => id);
  const topicIds = [
    ...system.matchAll(/\{ id: '([\w]+)',\s*index: '\d{2}',\s*label:/g),
  ].map(([, id]) => id);

  assert.deepEqual(blockIds, BRANDBOOK_BLOCK_IDS);
  assert.deepEqual(topicIds, LEGACY_TOPIC_IDS);
  assert.match(page, /BRANDBOOK_BLOCKS/);
  assert.match(page, /id=\{`bloque-\$\{block\.id\}`\}/);
});

test('prunes duplicated Hero controls', async () => {
  const hero = await read('../app/sections/Hero.tsx');

  assert.doesNotMatch(hero, /hero__actions/);
  assert.doesNotMatch(hero, /hero__ledger/);
});

test('removes the reference mockup wall', async () => {
  const references = await read('../app/sections/References.tsx');

  assert.doesNotMatch(references, /MOCKUPS/);
  assert.doesNotMatch(references, /brandbook\/clay|publicAsset\(/);
});

test('lets SectionIntro render compact supporting topics', async () => {
  const ui = await read('../app/brand/ui.tsx');

  assert.match(ui, /compact\?: boolean/);
  assert.match(ui, /compact\s*=\s*false/);
});

test('keeps the concise handoff preview while copying its complete sheet', async () => {
  const handoff = await read('../app/sections/Handoff.tsx');

  assert.match(
    handoff,
    /const preview = sheet\.split\('\\n'\)\.slice\(0, 12\)\.join\('\\n'\);/,
  );
  assert.match(handoff, /<code>\{preview\}<\/code>/);
  assert.match(handoff, /onClick=\{\(\) => copyValue\(sheet, copy\.tokens\)\}/);
});

test('keeps every hard-clay shadow layer unblurred', async () => {
  const [atlas, globals] = await Promise.all([
    read('../app/atlas.css'),
    read('../app/globals.css'),
  ]);

  for (const layer of shadowLayers(`${atlas}\n${globals}`)) {
    assert.match(blurLength(layer), /^0(?:px|rem)$/);
  }
  assert.doesNotMatch(
    `${atlas}\n${globals}`,
    /(?:backdrop-filter|filter:\s*[^n]|\bblur\(|scale\(0\.99\))/i,
  );
});
