/* Generado por scripts/build-brand-assets.mjs. No editar a mano. */
import type { GlyphId } from './glyphs';

export type FamilyId =
  | 'nucleo'
  | 'analisis'
  | 'modelo'
  | 'civil'
  | 'proyecto'
  | 'interop'
  | 'aprendizaje';

export const FAMILY_COLORS: Record<
  FamilyId,
  { day: string; night: string; label: string }
> = {
  nucleo: { day: '#1AA57A', night: '#1AA57A', label: 'FusionStructure' },
  analisis: { day: '#ED4B46', night: '#FF8E80', label: 'Análisis' },
  modelo: { day: '#7657D5', night: '#A990FF', label: 'Modelo' },
  civil: { day: '#468C09', night: '#72CF4A', label: 'Civil' },
  proyecto: { day: '#D9720A', night: '#F3C553', label: 'Proyecto' },
  interop: { day: '#3A72E3', night: '#72A1FF', label: 'Conexiones' },
  aprendizaje: { day: '#C94A8F', night: '#F07DB5', label: 'Aprendizaje' },
};

export const MOTHER_BRAND_ID: FamilyId = 'nucleo';

export const PRODUCT_FAMILY_IDS = [
  'analisis',
  'modelo',
  'civil',
  'proyecto',
  'interop',
  'aprendizaje',
] as const satisfies readonly FamilyId[];

export type ProductFamilyId = (typeof PRODUCT_FAMILY_IDS)[number];

export const TOOL_BINDINGS: Record<
  string,
  { glyph: GlyphId; family: FamilyId }
> = {
  proyecto: { glyph: 'project', family: 'nucleo' },
  calidad: { glyph: 'quality', family: 'nucleo' },
  memoria: { glyph: 'memo', family: 'nucleo' },
  intercambio: { glyph: 'exchange', family: 'nucleo' },
  biblioteca: { glyph: 'library', family: 'nucleo' },
  offline: { glyph: 'offline', family: 'nucleo' },
  asistencia: { glyph: 'assist', family: 'nucleo' },
  'fs-a01': { glyph: 'solver2d', family: 'analisis' },
  'fs-a02': { glyph: 'solver3d', family: 'analisis' },
  'fs-a03': { glyph: 'fem', family: 'analisis' },
  'fs-a04': { glyph: 'materials', family: 'analisis' },
  'fs-m01': { glyph: 'cad', family: 'modelo' },
  'fs-m02': { glyph: 'bim', family: 'modelo' },
  'fs-m03': { glyph: 'detail', family: 'modelo' },
  'fs-c01': { glyph: 'terrain', family: 'civil' },
  'fs-c02': { glyph: 'geotech', family: 'civil' },
  'fs-c03': { glyph: 'water', family: 'civil' },
  'fs-p01': { glyph: 'docs', family: 'proyecto' },
  'fs-p02': { glyph: 'cost', family: 'proyecto' },
  'fs-p03': { glyph: 'schedule', family: 'proyecto' },
  'fs-i01': { glyph: 'connectors', family: 'interop' },
  'fs-l01': { glyph: 'classroom', family: 'aprendizaje' },
  'fs-l02': { glyph: 'research', family: 'aprendizaje' },
  'fs-l03': { glyph: 'lab', family: 'aprendizaje' },
  'fs-l04': { glyph: 'mentoring', family: 'aprendizaje' },
};
