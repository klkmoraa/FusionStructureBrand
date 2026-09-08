'use client';

import { useState } from 'react';
import {
  ChevronRight,
  Layers,
  Monitor,
  Ruler,
  Smartphone,
  SlidersHorizontal,
  Terminal,
} from 'lucide-react';
import { BrandMark, StatusPill } from '../brand/marks';
import { RuleStrip, SectionIntro, useBrandbook } from '../brand/ui';
import {
  PATTERN_COPY,
  PATTERN_STATE_COPY,
  RULE_LABEL,
} from '../brand/copy';

type LayoutMode = 'escritorio' | 'movil';

const STATES = [
  {
    id: 'vacio',
    label: 'Vacío',
    title: 'Sin resultados todavía',
    body: 'Analiza el modelo para ver reacciones, diagramas y deformada.',
    action: 'Analizar',
  },
  {
    id: 'proceso',
    label: 'En proceso',
    title: 'Resolviendo 148 grados de libertad',
    body: 'Se puede seguir editando; el resultado quedará marcado como desactualizado.',
    action: 'Cancelar',
  },
  {
    id: 'error',
    label: 'Error',
    title: 'El nudo B4 no tiene apoyo ni continuidad',
    body: 'La estructura es un mecanismo. Revisa B4 antes de volver a analizar.',
    action: 'Ir a B4',
  },
  {
    id: 'exito',
    label: 'Resuelto',
    title: 'Equilibrio verificado',
    body: 'Tolerancia 1e−6. Revisión v4 guardada localmente.',
    action: 'Abrir traza',
  },
] as const;

export const Patterns = () => {
  const { language } = useBrandbook();
  const [mode, setMode] = useState<LayoutMode>('escritorio');
  const [state, setState] = useState<string>('exito');
  const activeState = STATES.find((item) => item.id === state) ?? STATES[0];
  const copy = PATTERN_COPY[language];
  const stateCopy = PATTERN_STATE_COPY[activeState.id];

  return (
    <section id="patrones" className="section patterns">
      <SectionIntro
        index="09"
        eyebrow="Patrones · composición"
        title="Consola, lienzo e instrumento."
        body="La consola orienta, el lienzo trabaja y el instrumento confirma. En móvil la misma lógica se convierte en una secuencia enfocada: una decisión por pantalla, sin esconder el estado."
      />

      <div className="layout-toolbar">
        <div>
          <span className="tag">{copy.field}</span>
          <strong>
            {mode === 'escritorio'
              ? copy.desktop
              : copy.mobile}
          </strong>
        </div>
        <fieldset className="segmented">
          <legend className="visually-hidden">{copy.view}</legend>
          <button
            type="button"
            className={mode === 'escritorio' ? 'is-active' : ''}
            onClick={() => setMode('escritorio')}
          >
            <Monitor size={14} /> {language === 'es' ? 'Escritorio' : 'Desktop'}
          </button>
          <button
            type="button"
            className={mode === 'movil' ? 'is-active' : ''}
            onClick={() => setMode('movil')}
          >
            <Smartphone size={14} /> {language === 'es' ? 'Móvil' : 'Mobile'}
          </button>
        </fieldset>
      </div>

      <div className={`workbench workbench--${mode}`}>
        <div className="workbench__console">
          <span className="workbench__brand">
            <BrandMark size={22} />
          </span>
          <button type="button" className="workbench__tool is-active">
            <Ruler size={14} />
            <span>{copy.model}</span>
          </button>
          <button type="button" className="workbench__tool">
            <SlidersHorizontal size={14} />
            <span>{copy.loads}</span>
          </button>
          <button type="button" className="workbench__tool">
            <Layers size={14} />
            <span>{copy.results}</span>
          </button>
          <button type="button" className="workbench__tool">
            <Terminal size={14} />
            <span>{copy.trace}</span>
          </button>
        </div>

        <div className="workbench__canvas">
          <div className="workbench__canvas-bar">
            <span>{copy.project}</span>
            <code>12.00 × 4.20 m · kN</code>
          </div>
          <div className="workbench__scene" aria-hidden="true">
            <span className="workbench__beam" />
            <span className="workbench__column workbench__column--a" />
            <span className="workbench__column workbench__column--b" />
            <span className="workbench__curve" />
            <span className="workbench__node workbench__node--a" />
            <span className="workbench__node workbench__node--b" />
          </div>
          <div className="workbench__canvas-foot">
            <span>{copy.selected}</span>
            <span>{copy.snap}</span>
          </div>
        </div>

        <div className="workbench__inspector">
          <div className="workbench__inspector-head">
            <strong>{copy.inspector}</strong>
            <StatusPill status="disponible" language={language} compact />
          </div>
          <dl>
            <div>
              <dt>{copy.section}</dt>
              <dd>IPE 300</dd>
            </div>
            <div>
              <dt>{copy.moment}</dt>
              <dd>−148.60 kN·m</dd>
            </div>
            <div>
              <dt>{copy.deformed}</dt>
              <dd>11.70 mm</dd>
            </div>
          </dl>
          <button type="button" className="ui-button ui-button--primary">
            {copy.openTrace} <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="states">
        <div className="states__head">
          <span className="tag">{copy.states}</span>
          <p>{copy.statesBody}</p>
        </div>
        <fieldset className="segmented segmented--tight">
          <legend className="visually-hidden">{copy.stateLegend}</legend>
          {STATES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={state === item.id ? 'is-active' : ''}
              onClick={() => setState(item.id)}
            >
              {PATTERN_STATE_COPY[item.id].label[language]}
            </button>
          ))}
        </fieldset>
        <article className={`state-card state-card--${activeState.id}`}>
          <strong>{stateCopy.title[language]}</strong>
          <p>{stateCopy.body[language]}</p>
          <button type="button" className="ui-button">
            {stateCopy.action[language]}
          </button>
        </article>
      </div>

      <RuleStrip index={`${RULE_LABEL[language]} 09`}>
        {copy.rule}
      </RuleStrip>
    </section>
  );
};
