// Comprueba que el sitio estático esté completo: cada ruta local citada en
// index.html existe y cada SVG del paquete es un documento <svg> cerrado.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const errors = [];

const html = readFileSync(join(root, 'index.html'), 'utf8');
const refs = [...html.matchAll(/(?:src|href|poster)="([^"#]+)"/g)].map((m) => m[1]);
for (const ref of new Set(refs)) {
  if (/^(?:https?:|mailto:|data:)/.test(ref)) continue;
  if (!existsSync(join(root, ref))) errors.push(`index.html cita ${ref}, que no existe`);
}
if (/\{\{|\/_blob\//.test(html)) errors.push('index.html conserva huecos o blobs del lienzo');

const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});
const svgs = walk(join(root, 'svg')).filter((p) => p.endsWith('.svg'));
for (const file of svgs) {
  const text = readFileSync(file, 'utf8').trim();
  if (!text.startsWith('<svg') || !text.endsWith('</svg>')) errors.push(`${file.slice(root.length)} no es un SVG completo`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`sitio completo · ${refs.length} rutas · ${svgs.length} SVG`);
