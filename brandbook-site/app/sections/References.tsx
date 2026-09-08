'use client';

import { Box, Monitor, Smartphone } from 'lucide-react';
import { ClayRelief } from '../brand/ClayRelief';
import { BrandMark } from '../brand/marks';
import { RuleStrip, SectionIntro, useBrandbook } from '../brand/ui';
import {
  CLAY_VIEWPORT_COPY,
  MOCKUP_COPY,
  REFERENCE_COPY,
  RULE_LABEL,
} from '../brand/copy';

const CLAY_REFERENCES = [
  {
    id: 'cover',
    label: '01 / relief',
    title: { es: 'Marca como estructura', en: 'Mark as structure' },
    note: {
      es: 'La ménsula se vuelve materia sin perder su silueta ni su función.',
      en: 'The cantilever becomes material without losing its silhouette or function.',
    },
    proof: { es: 'demuestra identidad', en: 'proves identity' },
    viewport: '1440 · día',
    token: '--fs-radius-lg · --fs-shadow-elevated',
    scene: 'relief',
  },
  {
    id: 'spread',
    label: '02 / field',
    title: { es: 'Campo editorial', en: 'Editorial field' },
    note: {
      es: 'Cotas, retícula y aire ordenan la información antes que el volumen.',
      en: 'Dimensions, grid, and air organize information before volume does.',
    },
    proof: { es: 'demuestra jerarquía', en: 'proves hierarchy' },
    viewport: '768 · día',
    token: '--fs-space-4 · --fs-color-neutral-paper',
    scene: 'editorial',
  },
  {
    id: 'product',
    label: '03 / product',
    title: { es: 'Materia en producto', en: 'Material in product' },
    note: {
      es: 'El modo cambia; la semántica, el dato y la procedencia permanecen.',
      en: 'The mode changes; semantics, data, and provenance remain.',
    },
    proof: { es: 'demuestra modo + estado', en: 'proves mode + status' },
    viewport: '390 · noche',
    token: '--fs-motion-base · --fs-signal-blue',
    scene: 'product',
  },
] as const;

const MOCKUPS = [
  { id: 'day-analysis', mode: 'dia', format: 'landscape', kind: 'analysis' },
  { id: 'day-projects', mode: 'dia', format: 'landscape', kind: 'project' },
  { id: 'day-model', mode: 'dia', format: 'landscape', kind: 'model' },
  { id: 'day-compare', mode: 'dia', format: 'landscape', kind: 'compare' },
  { id: 'day-field', mode: 'dia', format: 'portrait', kind: 'field' },
  { id: 'night-model', mode: 'noche', format: 'landscape', kind: 'model' },
  { id: 'night-results', mode: 'noche', format: 'landscape', kind: 'results' },
  { id: 'night-trace', mode: 'noche', format: 'landscape', kind: 'trace' },
  { id: 'night-report', mode: 'noche', format: 'landscape', kind: 'report' },
  { id: 'night-mobile', mode: 'noche', format: 'portrait', kind: 'mobile' },
] as const;

const StructuralCanvas = ({ kind }: { kind: string }) => (
  <div className="product-canvas" data-kind={kind} aria-hidden="true">
    <span className="product-canvas__axis product-canvas__axis--x" />
    <span className="product-canvas__axis product-canvas__axis--y" />
    <span className="product-canvas__column product-canvas__column--a" />
    <span className="product-canvas__column product-canvas__column--b" />
    <span className="product-canvas__beam" />
    <span className="product-canvas__curve" />
    <span className="product-canvas__node product-canvas__node--a" />
    <span className="product-canvas__node product-canvas__node--b" />
    <span className="product-canvas__station" />
  </div>
);

const ProductMockup = ({ kind, compact = false }: { kind: string; compact?: boolean }) => (
  <div className={`product-mockup ${compact ? 'product-mockup--compact' : ''}`}>
    <div className="product-mockup__top">
      <BrandMark size={compact ? 12 : 14} />
      <span>pórtico-04</span>
      <code>v4</code>
    </div>
    <div className="product-mockup__body">
      <div className="product-mockup__rail" aria-hidden="true">
        <span className="is-active" /><span /><span /><span />
      </div>
      <StructuralCanvas kind={kind} />
      <div className="product-mockup__inspector" aria-hidden="true">
        <span /><strong>−148.6</strong><small>kN·m</small><i /><i /><i />
      </div>
    </div>
    <div className="product-mockup__foot">
      <span>equilibrio verificado</span><code>1e−6</code>
    </div>
  </div>
);

const EditorialScene = () => (
  <div className="editorial-scene" aria-hidden="true">
    <span className="editorial-scene__rule" />
    <strong>Make<br />complexity<br /><em>legible.</em></strong>
    <div><span>modelo</span><span>resultado</span><span>decisión</span></div>
    <code>8u / 48u</code>
  </div>
);

const DeviceStudy = ({ mode }: { mode: 'dia' | 'noche' }) => (
  <div className={`device-study device-study--${mode}`} aria-hidden="true">
    <div className="device-study__monitor">
      <span className="device-study__camera" />
      <ProductMockup kind={mode === 'dia' ? 'analysis' : 'results'} compact />
      <span className="device-study__stand" />
    </div>
    <div className="device-study__phone">
      <span className="device-study__speaker" />
      <ProductMockup kind={mode === 'dia' ? 'field' : 'mobile'} compact />
    </div>
    <span className="device-study__shadow" />
  </div>
);

export const References = () => {
  const { language } = useBrandbook();
  const copy = REFERENCE_COPY[language];

  return (
    <section id="referencias" className="section references">
      <SectionIntro index="10" eyebrow={copy.eyebrow} title={copy.title} body={copy.body} />

      <div className="clay-atlas" aria-label={copy.atlasAria}>
        <div className="clay-atlas__head">
          <span className="tag">Atlas Clay–Minimal</span>
          <p>{copy.atlasNote}</p>
        </div>
        <div className="clay-atlas__grid">
          {CLAY_REFERENCES.map((item) => (
            <figure className="clay-reference" key={item.id}>
              <div className="clay-reference__image">
                {item.scene === 'relief' ? (
                  <ClayRelief label={`${item.title[language]} · ${copy.mockupAlt}`} />
                ) : item.scene === 'editorial' ? <EditorialScene /> : <ProductMockup kind="results" compact />}
              </div>
              <figcaption>
                <code>{item.label}</code>
                <strong>{item.title[language]}</strong>
                <span>{item.note[language]}</span>
                <span className="clay-reference__proof">
                  {item.proof[language]}
                  <code>{CLAY_VIEWPORT_COPY[item.viewport][language]}</code>
                </span>
                <code className="clay-reference__token">{item.token}</code>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="device-references">
        {(['dia', 'noche'] as const).map((mode) => (
          <figure className={`device-reference device-reference--${mode}`} key={mode}>
            <div className="device-reference__head">
              <span>{mode === 'dia' ? copy.deviceDayLabel : copy.deviceNightLabel}</span>
              <strong>{mode === 'dia' ? copy.deviceDayTitle : copy.deviceNightTitle}</strong>
            </div>
            <DeviceStudy mode={mode} />
          </figure>
        ))}
      </div>

      {(['dia', 'noche'] as const).map((mode) => (
        <div className={`mockup-group mockup-group--${mode}`} key={mode}>
          <div className="mockup-group__head">
            <span>{mode === 'dia' ? copy.dayGroup : copy.nightGroup}</span>
            <code>{copy.referenceCount}</code>
          </div>
          <div className="mockup-gallery">
            {MOCKUPS.filter((item) => item.mode === mode).map((item) => (
              <figure className={`mockup-frame mockup-frame--${item.format}`} key={item.id}>
                <div className="mockup-frame__bar">
                  <span>
                    {item.format === 'portrait' ? <Smartphone size={12} /> : <Monitor size={12} />}
                    {item.format === 'portrait' ? copy.mobile : copy.desktop}
                  </span>
                  <code>{item.id}</code>
                </div>
                <div className="mockup-frame__scene">
                  <span className="mockup-frame__material"><Box size={14} /></span>
                  <ProductMockup kind={item.kind} compact={item.format === 'portrait'} />
                </div>
                <figcaption>
                  <strong>{MOCKUP_COPY[item.id].title[language]}</strong>
                  <span>{MOCKUP_COPY[item.id].note[language]}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      ))}

      <RuleStrip index={`${RULE_LABEL[language]} 10`}>{copy.rule}</RuleStrip>
    </section>
  );
};
