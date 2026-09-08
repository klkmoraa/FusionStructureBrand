'use client';

import { useState } from 'react';
import { NUMBER_RULES, TYPE_SCALE } from '../brand/system';
import {
  NUMBER_RULE_COPY,
  RULE_LABEL,
  TYPE_SCALE_COPY,
  TYPOGRAPHY_COPY,
} from '../brand/copy';
import { CopyChip, RuleStrip, SectionIntro, useBrandbook } from '../brand/ui';

const WEIGHTS = [400, 500, 600, 700] as const;

export const Typography = () => {
  const { language } = useBrandbook();
  const [weight, setWeight] = useState<number>(600);
  const copy = TYPOGRAPHY_COPY[language];

  return (
    <section id="tipografia" className="section typography">
      <SectionIntro
        index="05"
        eyebrow="Tipografía · dos voces"
        title="La jerarquía se entiende antes de leerse."
        body="Una sans geométrica para orientar y actuar; una monoespaciada para todo lo que se compara: unidades, coordenadas, versiones, hashes y procedencia. Si un dato se puede alinear en columna, va en mono."
      />

      <div className="type-lab">
        <div className="type-canvas">
          <span className="type-canvas__label">Space Grotesk · display</span>
          <p className="type-display" style={{ fontWeight: weight }}>
            One clear
            <br />
            <em>next step.</em>
          </p>
          <div className="type-canvas__foot">
            <span>{copy.character}</span>
            <code>wght {weight}</code>
          </div>
        </div>

        <div className="panel type-panel">
          <div className="panel__label">
            <span>{copy.weight}</span>
            <code>400—700</code>
          </div>
          <fieldset className="segmented segmented--tight">
            <legend className="visually-hidden">{copy.weightLegend}</legend>
            {WEIGHTS.map((value) => (
              <button
                key={value}
                type="button"
                className={weight === value ? 'is-active' : ''}
                onClick={() => setWeight(value)}
              >
                {value}
              </button>
            ))}
          </fieldset>
          <ul className="type-stack">
            <li>
              <strong>{copy.displayLabel}</strong>
              <small>{copy.display}</small>
            </li>
            <li>
              <strong>{copy.interfaceLabel}</strong>
              <small>{copy.interface}</small>
            </li>
            <li>
              <strong>{copy.dataLabel}</strong>
              <small>{copy.data}</small>
            </li>
          </ul>
          <p className="type-panel__note">
            {copy.fallback}
          </p>
        </div>
      </div>

      <div className="type-scale">
        {TYPE_SCALE.map((step) => (
          <article key={step.role}>
            <span>{TYPE_SCALE_COPY[step.role].role[language]}</span>
            <strong>{step.size}</strong>
            <code>{copy.line} {step.line}</code>
            <small>{TYPE_SCALE_COPY[step.role].use[language]}</small>
          </article>
        ))}
      </div>

      <div className="numbers">
        <div className="numbers__head">
          <span className="tag">{copy.numbers}</span>
          <h3>{copy.numbersTitle}</h3>
          <p>{copy.numbersBody}</p>
        </div>
        <ul className="numbers__list">
          {NUMBER_RULES.map((rule, index) => (
            <li key={rule.rule}>
              <strong>{NUMBER_RULE_COPY[String(index)].rule[language]}</strong>
              <span className="numbers__good">
                <code>{NUMBER_RULE_COPY[String(index)].good[language]}</code> {copy.yes}
              </span>
              <span className="numbers__bad">
                <code>{NUMBER_RULE_COPY[String(index)].bad[language]}</code> {copy.no}
              </span>
            </li>
          ))}
        </ul>
        <div className="numbers__tokens">
          <CopyChip value="font-variant-numeric: tabular-nums" />
          <CopyChip value="--fs-font-data" />
        </div>
      </div>

      <RuleStrip index={`${RULE_LABEL[language]} 05`}>{copy.rule}</RuleStrip>
    </section>
  );
};
