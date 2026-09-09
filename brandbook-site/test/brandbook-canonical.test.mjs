import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
import * as glyphLibrary from '../scripts/glyph-library.mjs';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

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

test('publishes local clay references without visual blur', async () => {
  const [references, copy, atlas, globals] = await Promise.all([
    read('../app/sections/References.tsx'),
    read('../app/brand/copy.ts'),
    read('../app/atlas.css'),
    read('../app/globals.css'),
  ]);
  const assets = [
    '../public/brandbook/clay/mark-relief-day.avif',
    '../public/brandbook/clay/field-editorial-day.avif',
    '../public/brandbook/clay/results-console-night.avif',
  ];

  await Promise.all(assets.map((asset) => access(new URL(asset, import.meta.url))));
  assert.match(references, /import \{ publicAsset \} from '..\/brand\/paths';/);
  assert.match(references, /publicAsset\(item\.image\)/);
  assert.match(references, /loading="lazy"/);
  assert.match(references, /decoding="async"/);
  assert.match(copy, /clayAlt:/);
  assert.doesNotMatch(`${atlas}\n${globals}`, /(?:backdrop-filter|filter:\s*[^n]|\bblur\()/i);
});
