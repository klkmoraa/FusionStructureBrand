'use client';

import { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import {
  EASINGS,
  MOTION_DEMOS,
  MOTION_TOKENS,
  SURFACE_LEVELS,
  type SurfaceLevel,
  type MotionDemoId,
} from '../brand/system';
import {
  EASING_COPY,
  MATERIAL_COPY,
  SURFACE_LEVEL_COPY,
  UI_COPY,
  MOTION_COPY,
  MOTION_DEMO_COPY,
  MOTION_TOKEN_COPY,
} from '../brand/copy';
import { publicAsset } from '../brand/paths';
import { CopyChip, SectionIntro, useBrandbook } from '../brand/ui';

const DEMO_TIMING: Record<MotionDemoId, { duration: string; easing: string }> =
  {
    llegar: { duration: '280ms', easing: 'cubic-bezier(.2,.8,.2,1)' },
    conectar: { duration: '520ms', easing: 'cubic-bezier(.2,.8,.2,1)' },
    confirmar: { duration: '420ms', easing: 'cubic-bezier(.2,.8,.2,1)' },
    comparar: { duration: '620ms', easing: 'cubic-bezier(.2,.8,.2,1)' },
    deshacer: { duration: '900ms', easing: 'cubic-bezier(.65,0,.35,1)' },
    esperar: { duration: '1400ms', easing: 'cubic-bezier(.65,0,.35,1)' },
  };

export const Motion = () => {
  const { motionMode, language, theme } = useBrandbook();
  const [demo, setDemo] = useState<MotionDemoId>('llegar');
  const [level, setLevel] = useState<SurfaceLevel>('elevado');
  const [replay, setReplay] = useState(0);
  const copy = MOTION_COPY[language];
  const activeCopy = MOTION_DEMO_COPY[demo];
  const timing = DEMO_TIMING[demo];

  return (
    <section id="movimiento" className="section motion">
      <SectionIntro index="06" />

      <div className="motion-lab">
        <div className="material-stage interaction-stage">
          <div
            className={`motion-screen motion-screen--${demo} material-card--${level}`}
            data-level={level}
            key={`${demo}-${replay}`}
          >
            <div className="motion-screen__bar">
              <span>
                <span className="live-dot" aria-hidden="true" />
                {motionMode === 'calma' ? copy.calm : copy.active} ·{' '}
                {theme === 'dia'
                  ? UI_COPY[language].day
                  : UI_COPY[language].night}
              </span>
              <code>{activeCopy.label[language].toLowerCase()}</code>
            </div>

            <div className="motion-screen__canvas">
              <div className="motion-panel motion-panel--base">
                <span>{copy.model}</span>
                <div className="motion-panel__lines" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="motion-panel motion-panel--incoming">
                <span>{copy.inspector}</span>
                <strong>−148.6 kN·m</strong>
                <small>{copy.joint} B4 · v4</small>
              </div>
              <svg
                className="motion-link"
                viewBox="0 0 240 120"
                aria-hidden="true"
              >
                <path d="M20 92C90 92 120 30 220 30" />
              </svg>
              <div className="motion-confirm">
                <span aria-hidden="true">✓</span>
                {copy.saved}
              </div>
              <div className="motion-compare" aria-hidden="true">
                <i className="motion-compare__a" />
                <i className="motion-compare__b" />
              </div>
              <div className="motion-progress" aria-hidden="true">
                <i />
              </div>
            </div>

            <div className="interaction-timing">
              <code>
                <span className="interaction-timing__active">
                  {timing.duration}
                </span>
                <span className="interaction-timing__calm">0ms</span> ·{' '}
                {timing.easing}
              </code>
              <span>{SURFACE_LEVEL_COPY[level].name[language]}</span>
            </div>
            <p className="motion-screen__rule">{activeCopy.rule[language]}</p>
          </div>
        </div>
        <div className="panel motion-controls">
          <div className="panel__label">
            <span>{copy.messages}</span>
            <code>{copy.oneAtTime}</code>
          </div>
          <div className="motion-picker">
            {MOTION_DEMOS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={demo === item.id}
                className={demo === item.id ? 'is-active' : ''}
                onClick={() => {
                  setDemo(item.id);
                  setReplay((value) => value + 1);
                }}
              >
                <strong>{MOTION_DEMO_COPY[item.id].label[language]}</strong>
                <small>{MOTION_DEMO_COPY[item.id].note[language]}</small>
              </button>
            ))}
          </div>
          <fieldset className="material-picker interaction-levels">
            <legend>{MATERIAL_COPY[language].level}</legend>
            {SURFACE_LEVELS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={level === item.id}
                className={level === item.id ? 'is-active' : ''}
                onClick={() => setLevel(item.id)}
              >
                <strong>{SURFACE_LEVEL_COPY[item.id].name[language]}</strong>
              </button>
            ))}
          </fieldset>
          <p className="material-controls__rule">
            {SURFACE_LEVEL_COPY[level].rule[language]}
          </p>
          <button
            type="button"
            className="action action--quiet"
            onClick={() => setReplay((value) => value + 1)}
          >
            <RotateCcw size={14} /> {copy.replay}
          </button>
        </div>
      </div>

      <details className="content-disclosure">
        <summary>{copy.format} · CSS</summary>
        <div className="token-grid">
          {MOTION_TOKENS.map((token) => (
            <article key={token.name} className="motion-token">
              <span>{MOTION_TOKEN_COPY[token.token].name[language]}</span>
              <strong>{token.value}</strong>
              <small>{MOTION_TOKEN_COPY[token.token].use[language]}</small>
              <CopyChip value={token.token} />
            </article>
          ))}
        </div>

        <div className="easing-row">
          {EASINGS.map((easing) => (
            <article key={easing.name}>
              <div className="easing-row__track" aria-hidden="true">
                <i style={{ transitionTimingFunction: easing.value }} />
              </div>
              <strong>{EASING_COPY[easing.token].name[language]}</strong>
              <code>{easing.value}</code>
              <small>{EASING_COPY[easing.token].use[language]}</small>
            </article>
          ))}
        </div>
      </details>

      <p className="motion-contract">{copy.rule}</p>

      <details className="content-disclosure">
        <summary>{copy.filmLabel}</summary>
        <div className="brand-film">
          <div className="brand-film__copy">
            <span className="tag">{copy.piece}</span>
            <h3>{copy.title}</h3>
            <p>{copy.body}</p>
            <dl>
              <div>
                <dt>{copy.format}</dt>
                <dd>1920 × 1080 · 30 fps</dd>
              </div>
              <div>
                <dt>{copy.use}</dt>
                <dd>{copy.usageValue}</dd>
              </div>
            </dl>
          </div>
          <figure className="brand-film__player">
            <div className="brand-film__bar">
              <span>
                <Play size={12} /> {copy.filmLabel}
              </span>
              <code>10.8s</code>
            </div>
            <video
              controls
              muted
              loop
              playsInline
              preload="metadata"
              poster={publicAsset(
                '/motion/fusionstructure-brand-motion-poster.png',
              )}
              aria-label={copy.animation}
            >
              <source
                src={publicAsset('/motion/fusionstructure-brand-motion.mp4')}
                type="video/mp4"
              />
            </video>
          </figure>
        </div>
      </details>
    </section>
  );
};
