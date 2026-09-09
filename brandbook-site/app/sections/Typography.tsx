'use client';

import { useState } from 'react';
import { Glyph } from '../brand/marks';
import { NUMBER_RULES, TYPE_SCALE } from '../brand/system';
import {
  NUMBER_RULE_COPY,
  EXPLORER_COPY,
  TYPE_SCALE_COPY,
  TYPOGRAPHY_COPY,
} from '../brand/copy';
import { CopyChip, SectionIntro, useBrandbook } from '../brand/ui';

const WEIGHTS = [400, 500, 600, 700] as const;

export const Typography = () => {
  const { language } = useBrandbook();
  const [weight, setWeight] = useState<number>(600);
  const [fontFamily, setFontFamily] = useState<'space' | 'jakarta'>('space');
  const copy = TYPOGRAPHY_COPY[language];
  const controls = EXPLORER_COPY[language];
  const [iconSize, setIconSize] = useState(24);
  const [mono, setMono] = useState(false);

  return (
    <section id="tipografia" className="section typography">
      <SectionIntro index="05" />

      <div className="type-lab">
        <div className="type-canvas">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span className="type-canvas__label">
              {fontFamily === 'space' ? 'Space Grotesk · display' : 'Plus Jakarta Sans · editorial'}
            </span>
            <fieldset className="segmented segmented--tight" style={{ margin: 0 }}>
              <legend className="visually-hidden">Familia tipográfica</legend>
              <button
                type="button"
                className={fontFamily === 'space' ? 'is-active' : ''}
                onClick={() => setFontFamily('space')}
              >
                Space Grotesk
              </button>
              <button
                type="button"
                className={fontFamily === 'jakarta' ? 'is-active' : ''}
                onClick={() => setFontFamily('jakarta')}
              >
                Plus Jakarta Sans
              </button>
            </fieldset>
          </div>

          <p
            className="type-display"
            style={{
              fontWeight: weight,
              fontFamily: fontFamily === 'space' ? 'var(--fs-font-display)' : 'var(--fs-font-editorial)',
            }}
          >
            One clear
            <br />
            <em>next step.</em>
          </p>
          <div className="type-canvas__foot">
            <span>{copy.character}</span>
            <code>{fontFamily === 'space' ? 'Space Grotesk' : 'Plus Jakarta Sans'} · wght {weight}</code>
          </div>
        </div>

        <div className="panel type-panel inspector-specimen">
          <div className="panel__label">
            <span>{controls.inspector}</span>
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
          <div className="inspector-specimen__data">
            <Glyph
              id="solver2d"
              size={iconSize}
              className={mono ? 'glyph--mono' : 'family--analisis'}
            />
            <span>
              −148.60 kN·m
              <br />
              <small>v4 · 1e−6</small>
            </span>
          </div>
          <fieldset className="segmented">
            <legend className="visually-hidden">{controls.iconSize}</legend>
            {[20, 24, 32].map((size) => (
              <button
                key={size}
                type="button"
                aria-pressed={iconSize === size}
                className={iconSize === size ? 'is-active' : ''}
                onClick={() => setIconSize(size)}
              >
                {size} px
              </button>
            ))}
          </fieldset>
          <button
            type="button"
            className="chip"
            aria-pressed={mono}
            onClick={() => setMono(!mono)}
          >
            {mono ? controls.mono : controls.color}
          </button>
          <ul className="type-stack">
            <li>
              <strong>{copy.displayLabel}</strong>
              <small>{copy.display}</small>
            </li>
            <li>
              <strong>Editorial</strong>
              <small>Plus Jakarta Sans · Acentos de marca y fichas</small>
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
          <p className="type-panel__note">{copy.fallback}</p>
        </div>
      </div>

      <div className="type-scale">
        {TYPE_SCALE.map((step) => (
          <article key={step.role}>
            <span>{TYPE_SCALE_COPY[step.role].role[language]}</span>
            <strong>{step.size}</strong>
            <code>
              {copy.line} {step.line}
            </code>
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
                <code>{NUMBER_RULE_COPY[String(index)].good[language]}</code>{' '}
                {copy.yes}
              </span>
              <span className="numbers__bad">
                <code>{NUMBER_RULE_COPY[String(index)].bad[language]}</code>{' '}
                {copy.no}
              </span>
            </li>
          ))}
        </ul>
        <div className="numbers__tokens">
          <CopyChip value="font-variant-numeric: tabular-nums" />
          <CopyChip value="--fs-font-data" />
        </div>
      </div>
    </section>
  );
};
