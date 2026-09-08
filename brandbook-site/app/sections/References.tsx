'use client';

import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { RuleStrip, SectionIntro, useBrandbook } from '../brand/ui';
import {
  CLAY_VIEWPORT_COPY,
  MOCKUP_COPY,
  REFERENCE_COPY,
  RULE_LABEL,
} from '../brand/copy';
import { publicAsset } from '../brand/paths';

const CLAY_REFERENCES = [
  {
    src: '/proposals/clay/cover.png',
    label: '01 / cover',
    title: { es: 'Portada de orientación', en: 'Orientation cover' },
    note: {
      es: 'La marca entra como brújula: aire, papel y un foco Clay funcional.',
      en: 'The mark enters as a compass: air, paper, and one functional Clay focus.',
    },
    proof: { es: 'demuestra orientación', en: 'proves orientation' },
    viewport: '1440 · día',
    token: '--fs-radius-lg · --fs-shadow-elevated',
  },
  {
    src: '/proposals/clay/spread.png',
    label: '02 / spread',
    title: { es: 'Pliego editorial', en: 'Editorial spread' },
    note: {
      es: 'La retícula sostiene la profundidad sin convertirla en decoración.',
      en: 'The grid carries depth without turning it into decoration.',
    },
    proof: { es: 'demuestra densidad editorial', en: 'proves editorial density' },
    viewport: '768 · día',
    token: '--fs-space-4 · --fs-color-neutral-paper',
  },
  {
    src: '/proposals/clay/landing.png',
    label: '03 / landing',
    title: { es: 'Atlas en producto', en: 'Atlas in product' },
    note: {
      es: 'La superficie funcional cambia de modo sin perder semántica.',
      en: 'The functional surface changes mode without losing semantics.',
    },
    proof: { es: 'demuestra responsive + estado', en: 'proves responsive + status' },
    viewport: '390 · noche',
    token: '--fs-motion-base · --fs-signal-blue',
  },
] as const;

const MOCKUPS = [
  {
    id: 'day-analysis',
    mode: 'dia',
    format: 'landscape',
    src: '/mockups/fusionstructure-desktop-day.png',
    title: 'Mesa de análisis',
    note: 'Modelo, resultados e inspector comparten un solo campo de trabajo.',
  },
  {
    id: 'day-projects',
    mode: 'dia',
    format: 'landscape',
    src: '/mockups/day-project-hub.png',
    title: 'Continuidad de proyecto',
    note: 'Fases, versiones y siguiente acción sin convertir el inicio en un tablero genérico.',
  },
  {
    id: 'day-model',
    mode: 'dia',
    format: 'landscape',
    src: '/mockups/day-model-loads.png',
    title: 'Modelado directo',
    note: 'La carga nace del elemento seleccionado y la profundidad explica la relación.',
  },
  {
    id: 'day-compare',
    mode: 'dia',
    format: 'landscape',
    src: '/mockups/day-results-compare.png',
    title: 'Comparación estructural',
    note: 'Las señales se alinean por significado: comparar no obliga a traducir.',
  },
  {
    id: 'day-field',
    mode: 'dia',
    format: 'portrait',
    src: '/mockups/day-mobile-field-review.png',
    title: 'Revisión de campo',
    note: 'Una incidencia, su evidencia y un siguiente paso visible en móvil.',
  },
  {
    id: 'night-model',
    mode: 'noche',
    format: 'landscape',
    src: '/mockups/night-model-editor.png',
    title: 'Modelo en carbón',
    note: 'Carbón neutro con superficies elevadas y señal de alta legibilidad.',
  },
  {
    id: 'night-results',
    mode: 'noche',
    format: 'landscape',
    src: '/mockups/night-results-explorer.png',
    title: 'Explorador de resultados',
    note: 'Diagramas sincronizados, estación seleccionada y deformada vinculada.',
  },
  {
    id: 'night-trace',
    mode: 'noche',
    format: 'landscape',
    src: '/mockups/night-decision-trace.png',
    title: 'Traza de decisión',
    note: 'Modelo, análisis, incidencia y evidencia dentro de una secuencia reversible.',
  },
  {
    id: 'night-report',
    mode: 'noche',
    format: 'landscape',
    src: '/mockups/night-report-evidence.png',
    title: 'Reporte y procedencia',
    note: 'El documento conserva vínculos visibles con modelo, resultado y versión.',
  },
  {
    id: 'night-mobile',
    mode: 'noche',
    format: 'portrait',
    src: '/mockups/night-mobile-results.png',
    title: 'Resultados móviles',
    note: 'Foco táctil y significado estructural en poco espacio.',
  },
] as const;

export const References = () => {
  const { language } = useBrandbook();
  const copy = REFERENCE_COPY[language];

  return (
  <section id="referencias" className="section references">
    <SectionIntro
      index="10"
      eyebrow="Referencias · el sistema en producto"
      title="Una identidad, cualquier superficie."
      body="Estas piezas fijan proporción, densidad, jerarquía y profundidad. No son pantallas finales ni evidencia de capacidades: son el criterio con el que se diseñan las siguientes."
    />

    <div
      className="clay-atlas"
      aria-label={copy.atlasAria}
    >
      <div className="clay-atlas__head">
        <span className="tag">Atlas Clay–Minimal</span>
        <p>
          {copy.atlasNote}
        </p>
      </div>
      <div className="clay-atlas__grid">
        {CLAY_REFERENCES.map((item) => (
          <figure className="clay-reference" key={item.src}>
            <div className="clay-reference__image">
              <Image
                unoptimized
                src={publicAsset(item.src)}
                alt={`${item.title[language]} · ${copy.mockupAlt}`}
                width={1200}
                height={800}
                loading="eager"
                sizes="(max-width: 720px) 100vw, 33vw"
              />
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
      <figure className="device-reference">
        <div className="device-reference__head">
          <span>{copy.deviceDayLabel}</span>
          <strong>{copy.deviceDayTitle}</strong>
        </div>
        <Image
          unoptimized
          src={publicAsset('/mockups/device-day-studio.png')}
          alt={copy.deviceDayAlt}
          width={1584}
          height={992}
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </figure>
      <figure className="device-reference device-reference--night">
        <div className="device-reference__head">
          <span>{copy.deviceNightLabel}</span>
          <strong>{copy.deviceNightTitle}</strong>
        </div>
        <Image
          unoptimized
          src={publicAsset('/mockups/device-night-studio.png')}
          alt={copy.deviceNightAlt}
          width={1584}
          height={992}
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </figure>
    </div>

    {(['dia', 'noche'] as const).map((mode) => (
      <div className={`mockup-group mockup-group--${mode}`} key={mode}>
        <div className="mockup-group__head">
          <span>
            {mode === 'dia' ? copy.dayGroup : copy.nightGroup}
          </span>
          <code>{copy.referenceCount}</code>
        </div>
        <div className="mockup-gallery">
          {MOCKUPS.filter((item) => item.mode === mode).map((item) => (
            <figure
              className={`mockup-frame mockup-frame--${item.format}`}
              key={item.id}
            >
              <div className="mockup-frame__bar">
                <span>
                  <ImageIcon size={12} />{' '}
                  {item.format === 'portrait' ? copy.mobile : copy.desktop}
                </span>
                <code>{item.id}</code>
              </div>
              <Image
                unoptimized
                src={publicAsset(item.src)}
                alt={`${copy.mockupAlt}: ${MOCKUP_COPY[item.id].title[language]}`}
                width={item.format === 'portrait' ? 943 : 1584}
                height={item.format === 'portrait' ? 1677 : 992}
                sizes={
                  item.format === 'portrait'
                    ? '(max-width: 620px) 100vw, 420px'
                    : '(max-width: 900px) 100vw, 50vw'
                }
              />
              <figcaption>
                <strong>{MOCKUP_COPY[item.id].title[language]}</strong>
                <span>{MOCKUP_COPY[item.id].note[language]}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    ))}

    <RuleStrip index={`${RULE_LABEL[language]} 10`}>
      {copy.rule}
    </RuleStrip>
  </section>
  );
};
