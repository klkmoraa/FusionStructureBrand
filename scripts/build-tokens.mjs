// tokens/tokens.json → tokens/tokens.css. Sin dependencias.
// `node scripts/build-tokens.mjs --check` falla si el CSS versionado no está al día.
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const t = JSON.parse(readFileSync(new URL('tokens/tokens.json', root), 'utf8'));
const out = new URL('tokens/tokens.css', root);

const resolve = (value) => {
  if (!value.includes('.')) return value;
  const [group, key] = value.split('.');
  return t[group]?.[key] ? `var(--fs-${group}-${key})` : value;
};

const themed = (side) => {
  const lines = [];
  const pairs = (group, prefix = group) => {
    // Orden léxico: sin él, JS pone 100…900 antes que 000 y 050.
    for (const [key, pair] of Object.entries(t[group]).sort(([a], [b]) => a.localeCompare(b))) lines.push(`--fs-${prefix}-${key}: ${resolve(pair[side])};`);
  };
  pairs('neutral');
  for (const [key, pair] of Object.entries(t.semantic)) lines.push(`--fs-${key}: ${resolve(pair[side])};`);
  pairs('brand');
  pairs('family');
  pairs('signal');
  pairs('status');
  for (const [key, pair] of Object.entries(t.light)) lines.push(`--fs-light-${key}: ${pair[side]};`);
  for (const [key, recipe] of Object.entries(t.shadow)) {
    lines.push(`--fs-shadow-${key}: ${recipe.replace(/\{([a-z-]+)\}/g, (_, name) => `var(--fs-light-${name})`)};`);
  }
  return lines;
};

const fixed = [
  ...Object.entries(t.font).map(([k, v]) => `--fs-font-${k}: ${v};`),
  ...Object.entries(t.text).flatMap(([k, [size, lh]]) => [`--fs-text-${k}: ${size};`, `--fs-leading-${k}: ${lh};`]),
  ...Object.entries(t.space).map(([k, v]) => `--fs-space-${k}: ${v};`),
  ...Object.entries(t.radius).map(([k, v]) => `--fs-radius-${k}: ${v};`),
  ...Object.entries(t.duration).map(([k, v]) => `--fs-${k}: ${v};`),
  ...Object.entries(t.ease).map(([k, v]) => `--fs-ease-${k}: ${v};`),
];

const block = (selector, lines) => `${selector} {\n${lines.map((l) => `  ${l}`).join('\n')}\n}`;
const night = themed(1);
const calm = Object.keys(t.duration).map((k) => `--fs-${k}: 1ms;`);

const css = `/* FusionStructure · tokens ${t.version}
 * Generado por scripts/build-tokens.mjs desde tokens/tokens.json. No editar a mano.
 * Día por defecto; Noche con data-theme="noche" o con el sistema en oscuro.
 * Calma (data-motion="calma") y reduced-motion bajan todas las duraciones a 1 ms. */

${block(':root', ['color-scheme: light;', ...fixed, ...themed(0)])}

${block(':root[data-theme="noche"]', ['color-scheme: dark;', ...night])}

@media (prefers-color-scheme: dark) {
${block(':root:not([data-theme="dia"])', ['color-scheme: dark;', ...night]).replace(/^/gm, '  ')}
}

${block(':root[data-motion="calma"]', calm)}

@media (prefers-reduced-motion: reduce) {
${block(':root', calm).replace(/^/gm, '  ')}
}
`;

if (process.argv.includes('--check')) {
  if (readFileSync(out, 'utf8') !== css) {
    console.error('tokens/tokens.css no coincide con tokens.json: corre `npm run tokens`.');
    process.exit(1);
  }
  console.log('tokens.css al día');
} else {
  writeFileSync(out, css);
  console.log('tokens/tokens.css escrito');
}
