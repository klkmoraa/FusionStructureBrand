'use client';

import { useState } from 'react';
import { BrandMark, Glyph, MarkConstruction, ToolTile } from '../brand/marks';
import { FAMILY_META, TOOLS } from '../brand/catalog';
import { PRODUCT_FAMILY_IDS } from '../brand/generated/palette';
import {
  FAMILY_COPY,
  IDENTITY_COPY,
  RULE_LABEL,
  TOOL_CODE_COPY,
  TOOL_COPY,
} from '../brand/copy';
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
  const familyPreview = TOOLS.filter((tool) =>
    ['fs-a01', 'fs-m01', 'fs-c01', 'fs-p01', 'fs-i01', 'fs-l01'].includes(
      tool.id,
    ),
  );

  return (
    <section id="identidad" className="section identity">
      <SectionIntro
        index="02"
        eyebrow="Identidad · la ménsula"
        title="Una marca que se sostiene sola."
        body="Un miembro vertical y dos voladizos cuyo peralte decrece hacia la punta: la misma forma que toma una sección cuando se dimensiona por el momento que recibe. La marca no ilustra una estructura, está construida como una."
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
            <code>4</code>
          </div>
          <div className="identity__variant-grid">
            <div className="variant variant--signal">
              <BrandMark size={44} tone="signal" />
              <strong>{copy.signal}</strong>
              <small>{copy.signalUse}</small>
            </div>
            <div className="variant variant--mono">
              <BrandMark size={44} tone="inverse" />
              <strong>
                {language === 'es' ? 'Signal · Night' : 'Signal · Night'}
              </strong>
              <small>
                {language === 'es' ? 'sobre carbón' : 'on charcoal'}
              </small>
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

      <div className="family">
        <div className="family__head">
          <div>
            <span className="tag">{copy.familyTag}</span>
            <h3>{copy.familyTitle}</h3>
            <p>{copy.familyBody}</p>
          </div>
          <ul className="family__legend">
            {PRODUCT_FAMILY_IDS.map((id) => {
              const meta = FAMILY_META[id];
              return (
                <li key={id} className={`family__legend-item family--${id}`}>
                  <span className="family__swatch" aria-hidden="true" />
                  <strong>{FAMILY_COPY[id].label[language]}</strong>
                  <code>{meta.prefix}</code>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="family__preview">
          {familyPreview.map((tool) => (
            <figure key={tool.id}>
              <ToolTile glyph={tool.glyph} family={tool.family} size={56} />
              <figcaption>
                <strong>{TOOL_COPY[tool.id].name[language]}</strong>
                <code>
                  {TOOL_CODE_COPY[tool.code]?.[language] ?? tool.code}
                </code>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="family__mono">
          <span className="tag">{copy.noColor}</span>
          <div className="family__mono-row">
            {familyPreview.map((tool) => (
              <Glyph
                key={tool.id}
                id={tool.glyph}
                size={30}
                className="glyph--mono"
              />
            ))}
          </div>
          <p>{copy.noColorBody}</p>
        </div>
      </div>
    </section>
  );
};
