'use client';

import { useState } from 'react';
import { SURFACE_LEVELS } from '../brand/system';
import {
  EXPLORER_COPY,
  MATERIAL_COPY,
  RULE_LABEL,
  SURFACE_LEVEL_COPY,
} from '../brand/copy';
import { RuleStrip, SectionIntro, useBrandbook } from '../brand/ui';

export const Material = () => {
  const { language } = useBrandbook();
  const copy = MATERIAL_COPY[language];
  const [pressCount, setPressCount] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<'lineal' | 'pdelta' | 'no-lineal'>('lineal');

  return (
    <section id="materia" className="section material">
      <SectionIntro index="07" compact />

      <div className="clay-bench">
        <div className="clay-bench__deck">
          {/* Tarjeta 1: Botones de Arcilla Táctil */}
          <article className="clay-bench__card">
            <div className="clay-bench__card-header">
              <span>{copy.buttons}</span>
              <code>StructureCo · Clay v2</code>
            </div>

            <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-secondary)' }}>
              {copy.buttonRule}
            </p>

            <div className="clay-bench__button-row">
              <button
                type="button"
                className="ui-button ui-button--primary"
                onMouseDown={() => setIsPressing(true)}
                onMouseUp={() => setIsPressing(false)}
                onClick={() => setPressCount((c) => c + 1)}
              >
                {copy.analyze}
              </button>

              <button
                type="button"
                className="ui-button"
                onClick={() => setPressCount((c) => c + 1)}
              >
                {copy.compare}
              </button>

              <button
                type="button"
                className="ui-button ui-button--danger"
                onClick={() => setPressCount((c) => c + 1)}
              >
                {copy.delete}
              </button>

              <button
                type="button"
                className="ui-button ui-button--quiet"
              >
                {copy.detail}
              </button>

              <button
                type="button"
                className="ui-button"
                disabled
              >
                {copy.noResults}
              </button>
            </div>

            <div className="clay-bench__haptic-meter">
              <span>
                <strong>{isPressing ? copy.pressStatus : copy.restStatus}</strong>
              </span>
              <code>
                {copy.pressCount}: {pressCount}
              </code>
            </div>
          </article>

          {/* Tarjeta 2: Controles y Hendiduras */}
          <article className="clay-bench__card">
            <div className="clay-bench__card-header">
              <span>{copy.inputs}</span>
              <code>Cavidad · Inset</code>
            </div>

            <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-secondary)' }}>
              {copy.fieldRule}
            </p>

            <fieldset className="segmented" style={{ width: '100%' }}>
              <legend className="visually-hidden">Selector de análisis</legend>
              <button
                type="button"
                className={selectedSegment === 'lineal' ? 'is-active' : ''}
                onClick={() => setSelectedSegment('lineal')}
              >
                1er Orden
              </button>
              <button
                type="button"
                className={selectedSegment === 'pdelta' ? 'is-active' : ''}
                onClick={() => setSelectedSegment('pdelta')}
              >
                P-Delta
              </button>
              <button
                type="button"
                className={selectedSegment === 'no-lineal' ? 'is-active' : ''}
                onClick={() => setSelectedSegment('no-lineal')}
              >
                No Lineal
              </button>
            </fieldset>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span className="chip is-active" style={{ cursor: 'default' }}>
                <span className="live-dot" aria-hidden="true" style={{ width: 6, height: 6 }} />
                {copy.ready}: 1e−6
              </span>
              <span className="chip" style={{ cursor: 'default' }}>
                {copy.review}: v4
              </span>
            </div>
          </article>
        </div>

        {/* 4 Niveles Visuales de Profundidad */}
        <div className="clay-bench__levels-grid">
          <div className="clay-level-tile clay-level-tile--plano">
            <span style={{ fontFamily: 'var(--fs-font-data)', fontSize: 10, color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
              01 · Plano
            </span>
            <strong style={{ fontSize: 14 }}>Dato técnico</strong>
            <code style={{ fontSize: 11, color: 'var(--ink-secondary)' }}>
              box-shadow: none;
            </code>
            <div style={{ padding: '8px 10px', background: 'var(--surface-sunken)', borderRadius: 4, fontSize: 12, fontFamily: 'var(--fs-font-data)' }}>
              M_max = −148.60 kN·m
            </div>
          </div>

          <div className="clay-level-tile clay-level-tile--interior">
            <span style={{ fontFamily: 'var(--fs-font-data)', fontSize: 10, color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
              02 · Interior
            </span>
            <strong style={{ fontSize: 14 }}>Cavidad activa</strong>
            <code style={{ fontSize: 11, color: 'var(--ink-secondary)' }}>
              --shadow-inset
            </code>
            <div style={{ padding: '8px 10px', background: 'var(--surface)', borderRadius: 8, fontSize: 12, fontFamily: 'var(--fs-font-data)', boxShadow: 'var(--shadow-inset)' }}>
              L = 12.00 m
            </div>
          </div>

          <div className="clay-level-tile clay-level-tile--elevado">
            <span style={{ fontFamily: 'var(--fs-font-data)', fontSize: 10, color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
              03 · Elevado
            </span>
            <strong style={{ fontSize: 14 }}>Un escalón</strong>
            <code style={{ fontSize: 11, color: 'var(--ink-secondary)' }}>
              --shadow-raised
            </code>
            <button type="button" className="ui-button ui-button--primary" style={{ minHeight: 32, padding: '4px 12px', fontSize: 12 }}>
              {copy.analyze}
            </button>
          </div>

          <div className="clay-level-tile clay-level-tile--flotante">
            <span style={{ fontFamily: 'var(--fs-font-data)', fontSize: 10, color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
              04 · Flotante
            </span>
            <strong style={{ fontSize: 14 }}>Dos escalones</strong>
            <code style={{ fontSize: 11, color: 'var(--ink-secondary)' }}>
              --shadow-float
            </code>
            <div style={{ padding: '6px 10px', background: 'var(--surface)', borderRadius: 8, fontSize: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-float)' }}>
              <span>Inspector</span>
              <span className="live-dot" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <details className="content-disclosure">
        <summary>{EXPLORER_COPY[language].details}</summary>
        <dl className="material-definitions">
          {SURFACE_LEVELS.map((item) => (
            <div key={item.id}>
              <dt>{SURFACE_LEVEL_COPY[item.id].name[language]}</dt>
              <dd>
                {SURFACE_LEVEL_COPY[item.id].use[language]} ·{' '}
                {SURFACE_LEVEL_COPY[item.id].rule[language]}
              </dd>
            </div>
          ))}
        </dl>
      </details>
      <RuleStrip index={`${RULE_LABEL[language]} 05`}>
        {MATERIAL_COPY[language].rule}
      </RuleStrip>
    </section>
  );
};
