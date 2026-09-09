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

test('centralizes concise section introductions and the fixed signature', async () => {
  const copy = await read('../app/brand/copy.ts');
  const ui = await read('../app/brand/ui.tsx');
  assert.doesNotMatch(
    ui,
    /section-intro__meta|eyebrow\?: string|body\?: string/,
  );
  const intros = copy
    .split('export const SECTION_INTROS:')[1]
    .split('export const UI_COPY')[0];
  const bodies = [
    ...intros.matchAll(/body: \{\s*es: '([^']*)',\s*en: '([^']*)'/g),
  ];
  assert.equal(bodies.length, 12);
  for (const [, es, en] of bodies) {
    for (const body of [es, en]) {
      assert.ok(body.length <= 180, body);
      assert.ok(body.split(/[.!?](?:\s|$)/).filter(Boolean).length <= 2, body);
    }
  }
  assert.match(copy, /language that does not overpromise/);
  assert.match(copy, /Make complexity legible\./);
  for (const name of [
    'Identity',
    'Tools',
    'Typography',
    'Motion',
    'Patterns',
    'Handoff',
    'References',
  ]) {
    const section = await read(`../app/sections/${name}.tsx`);
    assert.doesNotMatch(
      section,
      /<SectionIntro[^>]*\b(?:eyebrow|title|body)=/s,
    );
  }
});

test('keeps collapsed tools concise and normative status definitions accessible', async () => {
  const tools = await read('../app/sections/Tools.tsx');
  const card = tools.split('className={`tool-card ')[1].split('</button>')[0];
  assert.doesNotMatch(
    card,
    /toolCopy\.(?:role|summary|reference)|tool-card__more/,
  );
  assert.match(card, /FAMILY_COPY\[tool.family\]/);
  assert.match(tools, /if \(count === 0\) return null/);
  const color = await read('../app/sections/Color.tsx');
  assert.match(color, /STATUS_MEANING_COPY/);
  assert.match(color, /<details/);
});

test('prunes duplicate inventories and embeds pattern states in the workbench', async () => {
  const [identity, icons, material, patterns] = await Promise.all(
    ['Identity', 'Iconography', 'Material', 'Patterns'].map((name) =>
      read(`../app/sections/${name}.tsx`),
    ),
  );
  assert.match(identity, /<code>5<\/code>/);
  assert.equal(
    [...identity.matchAll(/className="variant variant--/g)].length,
    5,
  );
  assert.doesNotMatch(identity, /familyPreview|family__preview/);
  assert.doesNotMatch(icons, /SIGNALS|diagram-grid|SIGNAL_COPY/);
  assert.doesNotMatch(material, /button-showcase|table-demo/);
  assert.doesNotMatch(patterns, /className="states"|className=\{`state-card/);
  assert.match(patterns, /workbench__state/);
});

test('renders one of at most four references with scene, viewport and theme controls', async () => {
  const source = await read('../app/sections/References.tsx');
  const definitions = source
    .split('const CLAY_REFERENCES = [')[1]
    .split('] as const;')[0];
  const scenes = [...definitions.matchAll(/scene: '/g)];
  assert.ok(scenes.length > 0 && scenes.length <= 4);
  assert.equal([...source.matchAll(/<figure\b/g)].length, 1);
  assert.match(source, /setActiveScene/);
  assert.match(source, /setViewport/);
  assert.match(source, /setSceneTheme/);
  assert.doesNotMatch(source, /DeviceStudy|\b(?:es|en):/);
});

test('combines motion and six depth levels in one active interaction specimen', async () => {
  const [motion, material] = await Promise.all([
    read('../app/sections/Motion.tsx'),
    read('../app/sections/Material.tsx'),
  ]);
  assert.match(motion, /SURFACE_LEVELS\.map/);
  assert.match(motion, /data-level=\{level\}/);
  assert.match(motion, /interaction-timing/);
  assert.match(motion, /id="movimiento"/);
  assert.match(material, /id="materia"/);
  assert.doesNotMatch(material, /material-stage|material-lab|useState/);
  assert.match(material, /SURFACE_LEVELS\.map/);
});

test('isolates reference signal and foreground colors from the global theme', async () => {
  const [references, css] = await Promise.all([
    read('../app/sections/References.tsx'),
    read('../app/globals.css'),
  ]);
  assert.match(references, /SIGNALS\.map\(\(signal\) =>/);
  assert.match(
    references,
    /signal\.token,\s*sceneTheme === 'noche' \? signal\.night : signal\.day/,
  );
  assert.match(references, /signal\.id === activeSignal/);
  assert.match(
    references,
    /'--active-signal':\s*sceneTheme === 'noche' \? selectedSignal\.night : selectedSignal\.day/,
  );
  assert.match(references, /style=\{scenePalette as CSSProperties\}/);
  for (const theme of ['dia', 'noche']) {
    const palette = css
      .split(`.reference-explorer [data-theme='${theme}'] {`)[1]
      .split('}')[0];
    for (const name of [
      'ink',
      'ink-muted',
      'ink-faint',
      'ink-strong',
      'line-strong',
      'success',
    ]) {
      assert.match(palette, new RegExp(`--${name}:`));
    }
  }
  assert.match(
    css,
    /\.reference-explorer \.product-mockup__inspector strong,\s*\.reference-explorer \.clay-reference figcaption code\s*\{\s*color: var\(--ink\)/,
  );
});
