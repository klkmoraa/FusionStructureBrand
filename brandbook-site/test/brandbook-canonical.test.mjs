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
  [
    ...source.matchAll(/(?:--(?:fs-)?shadow-[\w-]+|box-shadow):\s*([^;]+);/g),
  ].flatMap(([, value]) => {
    // Ignore function arguments so color channels and variable names cannot
    // be mistaken for lengths; commas inside color-mix are not layers.
    let geometry = value;
    while (/\([^()]*\)/.test(geometry)) {
      geometry = geometry.replace(/[\w-]+\([^()]*\)/g, '');
    }
    return geometry.split(',').map((layer) => layer.trim());
  });

const blurLength = (layer) => {
  const lengths = [...layer.matchAll(/-?\d*\.?\d+(?:px|rem)?/g)].map(
    (match) => match[0],
  );
  return lengths[2] ?? '0';
};

test('publishes the canonical 2026 mint and family architecture', async () => {
  const [system, glyphLibrary, assetBuilder] = await Promise.all([
    read('../app/brand/system.ts'),
    read('../scripts/glyph-library.mjs'),
    read('../scripts/build-brand-assets.mjs'),
  ]);

  assert.match(system, /day: '#1AA57A'/);
  assert.match(system, /night: '#1AA57A'/);
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

test('keeps every clay shadow layer controlled and tactile without excessive blur or diffuse filter', async () => {
  const [atlas, globals, system] = await Promise.all([
    read('../app/atlas.css'),
    read('../app/globals.css'),
    read('../app/brand/system.ts'),
  ]);

  for (const layer of shadowLayers(`${atlas}\n${globals}`)) {
    const rawBlur = blurLength(layer);
    const blur = Number.parseFloat(rawBlur);
    assert.ok(
      Number.isNaN(blur) || blur <= 16,
      `Shadow layer "${layer}" exceeds controlled blur threshold (max 16px, got ${blur}px)`,
    );
  }
  assert.doesNotMatch(
    `${atlas}\n${globals}`,
    /(?:backdrop-filter|text-shadow|\bblur\(|scale\(0\.99\))/i,
  );
  // The copied handoff must reproduce the same material as the live page.
  const exported = [
    ...system.matchAll(/token: '(--shadow-[\w-]+)',\s*value:\s*'([^']+)'/g),
  ];
  assert.ok(exported.length >= 6);
  for (const [, token, value] of exported) {
    const declarations = [
      ...globals.matchAll(new RegExp(`${token}:\\s*([^;]+);`, 'g')),
    ];
    assert.equal(
      declarations.length,
      1,
      `${token} must have one geometry for both themes`,
    );
    assert.equal(declarations[0][1].replace(/\s+/g, ' ').trim(), value);
  }
  for (const [alias, canonical] of [
    ['interior', 'inset'],
    ['elevated', 'raised'],
    ['floating', 'float'],
  ]) {
    assert.match(
      globals,
      new RegExp(`--fs-shadow-${alias}: var\\(--shadow-${canonical}\\);`),
    );
    assert.doesNotMatch(atlas, new RegExp(`--fs-shadow-${alias}:`));
  }
  assert.doesNotMatch(atlas, /\.segmented label/);
});

test('primary hover preserves the signal fill and contrast ink in both themes', async () => {
  const [atlas, globals] = await Promise.all([
    read('../app/atlas.css'),
    read('../app/globals.css'),
  ]);
  // Resolve the simple class/hover rules in actual import order. This catches
  // a later legacy hover tying Atlas specificity and replacing the fill.
  const css = `${atlas}\n${globals}`.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const theme of ['dia', 'noche']) {
    for (const control of ['action', 'ui-button']) {
      const applicable = new Set([
        '.atlas',
        '.brandbook',
        `.brandbook--${theme}`,
        `.${control}`,
        `.${control}--primary`,
        ':hover',
      ]);
      const resolved = new Map();
      for (const [, selectors, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
        for (const selector of selectors.split(',')) {
          if (!/^(?:\s*(?:\.[\w-]+|:hover))+\s*$/.test(selector)) continue;
          const parts = selector.match(/\.[\w-]+|:hover/g);
          if (!parts.every((part) => applicable.has(part))) continue;
          for (const [, property, value] of body.matchAll(
            /(?:^|;)\s*(background|color):\s*([^;]+)(?=;)/g,
          )) {
            if (parts.length >= (resolved.get(property)?.specificity ?? -1)) {
              resolved.set(property, {
                value: value.trim(),
                specificity: parts.length,
              });
            }
          }
        }
      }
      assert.equal(
        resolved.get('background')?.value,
        'var(--active-signal)',
        `${theme} ${control} hover fill`,
      );
      assert.equal(
        resolved.get('color')?.value,
        'var(--fs-contrast-on-signal)',
        `${theme} ${control} hover ink`,
      );
    }
  }
});

test('copied material recipes export every custom-property dependency', async () => {
  const system = await read('../app/brand/system.ts');
  const material = system
    .split('export const MATERIAL_TOKENS = [')[1]
    .split('] as const;')[0];
  const tokens = new Map(
    [...material.matchAll(/token: '(--[\w-]+)',\s*value:\s*'([^']+)'/g)].map(
      ([, token, value]) => [token, value],
    ),
  );
  for (const [token, value] of tokens) {
    for (const [, dependency] of value.matchAll(/var\((--[\w-]+)\)/g)) {
      assert.ok(
        tokens.has(dependency),
        `${token} depends on unpublished ${dependency}`,
      );
    }
  }
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
  const [identity, icons, patterns] = await Promise.all(
    ['Identity', 'Iconography', 'Patterns'].map((name) =>
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
