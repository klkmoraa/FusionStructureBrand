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
import { PATTERN_COPY, PATTERN_STATE_COPY, RULE_LABEL } from '../brand/copy';

type LayoutMode = 'escritorio' | 'movil';

const STATES = ['vacio', 'proceso', 'error', 'exito'] as const;

export const Patterns = () => {
  const { language } = useBrandbook();
  const [mode, setMode] = useState<LayoutMode>('escritorio');
  const [state, setState] = useState<(typeof STATES)[number]>('exito');
  const copy = PATTERN_COPY[language];
  const stateCopy = PATTERN_STATE_COPY[state];

  return (
    <section id="patrones" className="section patterns">
      <SectionIntro index="09" />

      <div className="layout-toolbar">
        <div>
          <span className="tag">{copy.field}</span>
          <strong>{mode === 'escritorio' ? copy.desktop : copy.mobile}</strong>
        </div>
        <fieldset className="segmented">
          <legend className="visually-hidden">{copy.view}</legend>
          <button
            type="button"
            className={mode === 'escritorio' ? 'is-active' : ''}
            onClick={() => setMode('escritorio')}
          >
            <Monitor size={14} /> {copy.desktop}
          </button>
          <button
            type="button"
            className={mode === 'movil' ? 'is-active' : ''}
            onClick={() => setMode('movil')}
          >
            <Smartphone size={14} /> {copy.mobile}
          </button>
        </fieldset>
      </div>

      <fieldset className="segmented segmented--tight workbench-state-picker">
        <legend className="visually-hidden">{copy.stateLegend}</legend>
        {STATES.map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={state === id}
            className={state === id ? 'is-active' : ''}
            onClick={() => setState(id)}
          >
            {PATTERN_STATE_COPY[id].label[language]}
          </button>
        ))}
      </fieldset>

      <div className={`workbench workbench--${mode}`} data-state={state}>
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
          <div
            className={`workbench__state workbench__state--${state}`}
            aria-live="polite"
          >
            <strong>{stateCopy.title[language]}</strong>
            <p>{stateCopy.body[language]}</p>
          </div>
          <div className="workbench__inspector-head">
            <strong>{copy.inspector}</strong>
            <StatusPill status="disponible" language={language} compact />
          </div>
          {state === 'exito' ? (
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
          ) : null}
          <button type="button" className="ui-button ui-button--primary">
            {stateCopy.action[language]} <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <RuleStrip index={`${RULE_LABEL[language]} 06`}>{copy.rule}</RuleStrip>
    </section>
  );
};
