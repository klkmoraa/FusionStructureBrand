'use client';

import { useMemo, useState } from 'react';
import { MiniDiagram, StatusPill } from '../brand/marks';
import { BRAND_COLORS, NEUTRALS, SIGNALS } from '../brand/system';
import {
  FAMILY_COLORS,
  MOTHER_BRAND_ID,
  PRODUCT_FAMILY_IDS,
} from '../brand/generated/palette';
import {
  COLOR_COPY,
  EXPLORER_COPY,
  STATUS_COPY,
  STATUS_MEANING_COPY,
  STATUS_RULE_COPY,
  FAMILY_COPY,
  NEUTRAL_ROLE_COPY,
  RULE_LABEL,
  SIGNAL_COPY,
  SIGNAL_UNIT_COPY,
} from '../brand/copy';
import { CopyChip, RuleStrip, SectionIntro, useBrandbook } from '../brand/ui';

const STATUS_ORDER = [
  'disponible',
  'experimental',
  'planeado',
  'no-comprometido',
] as const;

const channel = (value: number) => {
  const srgb = value / 255;
  return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex: string) => {
  const clean = hex.replace('#', '');
  const r = Number.parseInt(clean.slice(0, 2), 16);
  const g = Number.parseInt(clean.slice(2, 4), 16);
  const b = Number.parseInt(clean.slice(4, 6), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

/** Contraste WCAG 2.1 entre dos colores sólidos. */
export const contrastRatio = (a: string, b: string) => {
  const first = luminance(a);
  const second = luminance(b);
  const light = Math.max(first, second);
  const dark = Math.min(first, second);
  return (light + 0.05) / (dark + 0.05);
};

export const Color = () => {
  const { theme, activeSignal, setActiveSignal, language } = useBrandbook();
  const isNight = theme === 'noche';
  const paper = isNight ? '#14171A' : '#F7F6F1';

  const signal = SIGNALS.find((item) => item.id === activeSignal) ?? SIGNALS[0];
  const signalHex = isNight ? signal.night : signal.day;
  const motherBrandHex = isNight ? BRAND_COLORS.night : BRAND_COLORS.day;
  const copy = COLOR_COPY[language];
  const controls = EXPLORER_COPY[language];
  const [scale, setScale] = useState<'signals' | 'families' | 'status'>(
    'signals',
  );
  const [status, setStatus] =
    useState<(typeof STATUS_ORDER)[number]>('experimental');
  const contrastLabel = (ratio: number) => {
    if (ratio >= 7) return 'AAA';
    if (ratio >= 4.5) return 'AA';
    if (ratio >= 3) return copy.graphic;
    return copy.insufficient;
  };

  const families = useMemo(
    () =>
      PRODUCT_FAMILY_IDS.map((id) => {
        const hex = isNight ? FAMILY_COLORS[id].night : FAMILY_COLORS[id].day;
        return { id, hex, ratio: contrastRatio(hex, paper) };
      }),
    [isNight, paper],
  );

  return (
    <section id="color" className="section color">
      <SectionIntro index="04" compact />

      <fieldset className="segmented scale-picker">
        <legend className="visually-hidden">{controls.scales}</legend>
        {(['signals', 'families', 'status'] as const).map((id) => (
          <button
            key={id}
            type="button"
            className={scale === id ? 'is-active' : ''}
            aria-pressed={scale === id}
            onClick={() => setScale(id)}
          >
            {controls[id]}
          </button>
        ))}
      </fieldset>
      {scale === 'signals' ? (
        <div className="signal-lab">
          <div className="signal-list" role="tablist" aria-label={copy.signals}>
            {SIGNALS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`signal-tab-${item.id}`}
                aria-controls="signal-panel"
                aria-selected={activeSignal === item.id}
                className={`signal-row signal-row--${item.id} ${activeSignal === item.id ? 'is-active' : ''}`}
                onClick={() => setActiveSignal(item.id)}
              >
                <span className="signal-row__swatch" aria-hidden="true" />
                <span className="signal-row__copy">
                  <strong>{SIGNAL_COPY[item.id].name[language]}</strong>
                  <small>{SIGNAL_COPY[item.id].use[language]}</small>
                </span>
                <code>{item.short}</code>
              </button>
            ))}
          </div>

          <div
            id="signal-panel"
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`signal-tab-${signal.id}`}
            className={`signal-stage signal--${signal.id}`}
          >
            <div className="signal-stage__top">
              <span>
                {copy.active} · {SIGNAL_COPY[signal.id].name[language]}{' '}
                <code>{SIGNAL_UNIT_COPY[signal.id][language]}</code>
              </span>
              <div className="signal-stage__chips">
                <CopyChip value={signal.token} />
                <CopyChip value={signalHex} />
              </div>
            </div>

            <div className="signal-stage__plot">
              <MiniDiagram type={signal.id} />
            </div>

            <p className="signal-stage__description">
              {SIGNAL_COPY[signal.id].description[language]}
            </p>

            <dl className="signal-stage__rules">
              <div>
                <dt>{copy.use}</dt>
                <dd>{copy.usageValue}</dd>
              </div>
              <div>
                <dt>{copy.avoid}</dt>
                <dd>{copy.avoidValue}</dd>
              </div>
              <div>
                <dt>{copy.contrast}</dt>
                <dd>
                  {contrastRatio(signalHex, paper).toFixed(2)}:1 ·{' '}
                  {contrastLabel(contrastRatio(signalHex, paper))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ) : null}

      {scale === 'families' ? (
        <>
          <div className="palette-block">
            <div className="palette-block__head">
              <span className="tag">{copy.motherBrand}</span>
              <p>{copy.motherBrandBody}</p>
            </div>
            <ul className="family-palette">
              <li className={`family--${MOTHER_BRAND_ID}`}>
                <span className="family-palette__chip" aria-hidden="true" />
                <div>
                  <strong>
                    {FAMILY_COPY[MOTHER_BRAND_ID].label[language]}
                  </strong>
                  <small>
                    {FAMILY_COPY[MOTHER_BRAND_ID].purpose[language]}
                  </small>
                </div>
                <div className="family-palette__data">
                  <CopyChip value={motherBrandHex} />
                  <span
                    className={
                      contrastRatio(motherBrandHex, paper) >= 4.5
                        ? 'is-pass'
                        : contrastRatio(motherBrandHex, paper) >= 3
                          ? 'is-warn'
                          : 'is-fail'
                    }
                  >
                    {contrastRatio(motherBrandHex, paper).toFixed(2)}:1 ·{' '}
                    {contrastLabel(contrastRatio(motherBrandHex, paper))}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="palette-block">
            <div className="palette-block__head">
              <span className="tag">{copy.families}</span>
              <p>{copy.familyBody}</p>
            </div>
            <ul className="family-palette">
              {families.map((item) => (
                <li key={item.id} className={`family--${item.id}`}>
                  <span className="family-palette__chip" aria-hidden="true" />
                  <div>
                    <strong>{FAMILY_COPY[item.id].label[language]}</strong>
                    <small>{FAMILY_COPY[item.id].purpose[language]}</small>
                  </div>
                  <div className="family-palette__data">
                    <CopyChip value={item.hex} />
                    <span
                      className={
                        item.ratio >= 4.5
                          ? 'is-pass'
                          : item.ratio >= 3
                            ? 'is-warn'
                            : 'is-fail'
                      }
                    >
                      {item.ratio.toFixed(2)}:1 · {contrastLabel(item.ratio)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
      {scale === 'status' ? (
        <div className="status-board">
          <fieldset className="segmented">
            <legend className="visually-hidden">{controls.status}</legend>
            {STATUS_ORDER.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={status === id}
                className={status === id ? 'is-active' : ''}
                onClick={() => setStatus(id)}
              >
                {STATUS_COPY[id][language]}
              </button>
            ))}
          </fieldset>
          <div className="status-board__row">
            <StatusPill status={status} language={language} />
            <p>{STATUS_MEANING_COPY[status][language]}</p>
          </div>
          <details className="content-disclosure">
            <summary>{controls.details}</summary>
            {STATUS_ORDER.map((id) => (
              <div key={id} className="status-board__row">
                <StatusPill status={id} language={language} />
                <p>{STATUS_MEANING_COPY[id][language]}</p>
                <small>{STATUS_RULE_COPY[id][language]}</small>
              </div>
            ))}
          </details>
        </div>
      ) : null}
      <details className="content-disclosure">
        <summary>{copy.neutrals}</summary>
        <div className="palette-block">
          <div className="palette-block__head">
            <span className="tag">{copy.neutrals}</span>
            <p>{copy.neutralBody}</p>
          </div>
          <ul className="neutral-ramp">
            {NEUTRALS.map((step) => (
              <li key={step.step}>
                <span
                  className="neutral-ramp__swatch"
                  style={{ background: isNight ? step.night : step.day }}
                  aria-hidden="true"
                />
                <code>{step.step}</code>
                <small>{NEUTRAL_ROLE_COPY[step.step][language]}</small>
                <CopyChip value={isNight ? step.night : step.day} />
              </li>
            ))}
          </ul>
        </div>
      </details>
      <RuleStrip index={`${RULE_LABEL[language]} 03`}>{copy.rule}</RuleStrip>
    </section>
  );
};
