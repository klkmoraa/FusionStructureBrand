'use client';

import { useState } from 'react';
import { BrandMark, MarkConstruction } from '../brand/marks';
import { IDENTITY_COPY, RULE_LABEL } from '../brand/copy';
import { RuleStrip, SectionIntro, useBrandbook } from '../brand/ui';

const MISUSES = [
  'girar',
  'estirar',
  'recolorear',
  'contorno',
  'sombra',
  'ruido',
] as const;
const LOCKUPS = ['horizontal', 'apilado', 'compacto'] as const;

export const Identity = () => {
  const { theme, language } = useBrandbook();
  const copy = IDENTITY_COPY[language];
  const [lockup, setLockup] = useState<(typeof LOCKUPS)[number]>('horizontal');

  return (
    <section id="identidad" className="section identity">
      <SectionIntro
        index="02"
        aside={
          <figure className="identity__hero-mark">
            <BrandMark size={140} title={copy.mark} />
            <figcaption>
              <strong>{copy.markCaption}</strong>
              <span>{copy.markEdition}</span>
            </figcaption>
          </figure>
        }
      />

      <div className="identity__grid">
        <article className="panel identity__construction">
          <div className="panel__label">
            <span>{copy.construction}</span>
            <code>{copy.grid}</code>
          </div>
          <MarkConstruction language={language} />
          <p>{copy.constructionBody}</p>
        </article>

        <article className="panel identity__sizes">
          <div className="panel__label">
            <span>{copy.minimumSizes}</span>
            <code>px</code>
          </div>
          <div className="identity__size-row">
            {[96, 48, 32, 24, 16].map((size) => (
              <div key={size} className="identity__size">
                <BrandMark size={size} />
                <small>{size}</small>
              </div>
            ))}
          </div>
          <p>{copy.sizeBody}</p>
        </article>

        <article className="panel identity__clearspace">
          <div className="panel__label">
            <span>{copy.clearspace}</span>
            <code>{copy.clearspaceUnit}</code>
          </div>
          <div className="clearspace">
            <span className="clearspace__pad" aria-hidden="true" />
            <BrandMark size={64} />
          </div>
          <p>{copy.clearspaceBody}</p>
        </article>

        <article className="panel identity__variants">
          <div className="panel__label">
            <span>{copy.variants}</span>
            <code>5</code>
          </div>
          <div className="identity__variant-grid">
            <div className="variant variant--signal">
              <BrandMark size={44} tone="signal" />
              <strong>{copy.signal}</strong>
              <small>{copy.signalUse}</small>
            </div>
            <div className="variant variant--mono">
              <BrandMark size={44} tone="inverse" />
              <strong>{copy.signalNight}</strong>
              <small>{copy.signalNightUse}</small>
            </div>
            <div className="variant variant--mono">
              <BrandMark size={44} tone="mono" />
              <strong>{copy.mono}</strong>
              <small>{copy.monoUse}</small>
            </div>
            <div className="variant variant--inverse">
              <BrandMark size={44} tone="inverse" />
              <strong>{copy.inverse}</strong>
              <small>{copy.inverseUse}</small>
            </div>
            <div className="variant variant--icon">
              <span className="app-icon">
                <BrandMark size={30} tone="inverse" />
              </span>
              <strong>{copy.icon}</strong>
              <small>{copy.iconUse}</small>
            </div>
          </div>
        </article>
      </div>

      <div className="lockups">
        <div className="lockups__head">
          <div>
            <span className="tag">{copy.lockups}</span>
            <h3>{copy.lockupTitle}</h3>
          </div>
          <div
            className="segmented"
            role="tablist"
            aria-label={copy.lockupAria}
          >
            {LOCKUPS.map((id) => (
              <button
                key={id}
                type="button"
                role="tab"
                id={`lockup-tab-${id}`}
                aria-controls="lockup-panel"
                aria-selected={lockup === id}
                className={lockup === id ? 'is-active' : ''}
                onClick={() => setLockup(id)}
              >
                {copy.lockupLabels[id]}
              </button>
            ))}
          </div>
        </div>
        <div
          id="lockup-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`lockup-tab-${lockup}`}
          className={`lockup-stage lockup-stage--${lockup}`}
        >
          <div className="lockup">
            <BrandMark size={lockup === 'compacto' ? 34 : 52} />
            <span className="lockup__text">
              <strong>FusionStructure</strong>
              {lockup === 'compacto' ? null : (
                <small>{copy.lockupTagline}</small>
              )}
            </span>
          </div>
          <p className="lockup-stage__note">{copy.lockupUses[lockup]}</p>
        </div>
      </div>

      <div className="misuse">
        <div className="misuse__head">
          <span className="tag">{copy.misuseTag}</span>
          <p>{copy.misuseIntro}</p>
        </div>
        <ul className="misuse__grid">
          {MISUSES.map((id) => (
            <li key={id} className={`misuse__item misuse__item--${id}`}>
              <span className="misuse__frame">
                <BrandMark
                  size={40}
                  tone={theme === 'noche' ? 'inverse' : 'signal'}
                />
              </span>
              <strong>{copy.misuse[id].label}</strong>
              <small>{copy.misuse[id].note}</small>
            </li>
          ))}
        </ul>
      </div>

      <RuleStrip index={`${RULE_LABEL[language]} 02`}>{copy.rule}</RuleStrip>
    </section>
  );
};
