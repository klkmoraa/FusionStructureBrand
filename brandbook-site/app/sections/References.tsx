'use client';

import { useState, type CSSProperties } from 'react';
import { SIGNALS } from '../brand/system';
import { ClayRelief } from '../brand/ClayRelief';
import { BrandMark } from '../brand/marks';
import { RuleStrip, SectionIntro, useBrandbook } from '../brand/ui';
import {
  CLAY_SCENE_COPY,
  EXPLORER_COPY,
  REFERENCE_COPY,
  RULE_LABEL,
  UI_COPY,
  type Language,
} from '../brand/copy';

const CLAY_REFERENCES = [
  {
    id: 'cover',
    scene: 'relief',
    token: '--fs-radius-lg · --fs-shadow-elevated',
  },
  {
    id: 'spread',
    scene: 'editorial',
    token: '--fs-space-4 · --fs-color-neutral-paper',
  },
  {
    id: 'product',
    scene: 'product',
    token: '--fs-motion-base · --fs-signal-blue',
  },
] as const;

const StructuralCanvas = ({ kind }: { kind: string }) => (
  <div className="product-canvas" data-kind={kind} aria-hidden="true">
    <span className="product-canvas__axis product-canvas__axis--x" />
    <span className="product-canvas__axis product-canvas__axis--y" />
    <span className="product-canvas__column product-canvas__column--a" />
    <span className="product-canvas__column product-canvas__column--b" />
    <span className="product-canvas__beam" />
    <span className="product-canvas__curve" />
    <span className="product-canvas__node product-canvas__node--a" />
    <span className="product-canvas__node product-canvas__node--b" />
    <span className="product-canvas__station" />
  </div>
);

const ProductScene = ({ language }: { language: Language }) => {
  const copy = EXPLORER_COPY[language];
  return (
    <div className="product-mockup">
      <div className="product-mockup__top">
        <BrandMark size={14} />
        <span>{copy.project}</span>
        <code>v4</code>
      </div>
      <div className="product-mockup__body">
        <div className="product-mockup__rail" aria-hidden="true">
          <span className="is-active" />
          <span />
          <span />
          <span />
        </div>
        <StructuralCanvas kind="results" />
        <div className="product-mockup__inspector">
          <strong>−148.6</strong>
          <small>kN·m</small>
        </div>
      </div>
      <div className="product-mockup__foot">
        <span>{copy.verified}</span>
        <code>1e−6</code>
      </div>
    </div>
  );
};

const EditorialScene = ({ language }: { language: Language }) => {
  const copy = EXPLORER_COPY[language];
  return (
    <div className="editorial-scene">
      <span className="editorial-scene__rule" aria-hidden="true" />
      <strong>
        Make
        <br />
        complexity
        <br />
        <em>legible.</em>
      </strong>
      <div>
        <span>{copy.model}</span>
        <span>{copy.result}</span>
        <span>{copy.decision}</span>
      </div>
      <code>8u / 48u</code>
    </div>
  );
};

export const References = () => {
  const { language, theme, activeSignal } = useBrandbook();
  const [activeScene, setActiveScene] =
    useState<(typeof CLAY_REFERENCES)[number]['id']>('cover');
  const [viewport, setViewport] = useState(1440);
  const [sceneTheme, setSceneTheme] = useState(theme);
  const selectedSignal =
    SIGNALS.find((signal) => signal.id === activeSignal) ?? SIGNALS[0];
  const scenePalette = {
    ...Object.fromEntries(
      SIGNALS.map((signal) => [
        signal.token,
        sceneTheme === 'noche' ? signal.night : signal.day,
      ]),
    ),
    '--active-signal':
      sceneTheme === 'noche' ? selectedSignal.night : selectedSignal.day,
  };
  const copy = REFERENCE_COPY[language];
  const controls = EXPLORER_COPY[language];
  const item =
    CLAY_REFERENCES.find((scene) => scene.id === activeScene) ??
    CLAY_REFERENCES[0];
  const sceneCopy = CLAY_SCENE_COPY[item.id];

  return (
    <section id="referencias" className="section references">
      <SectionIntro index="10" />
      <div
        className="clay-atlas reference-explorer"
        aria-label={copy.atlasAria}
      >
        <div className="reference-explorer__controls">
          <fieldset className="segmented">
            <legend className="visually-hidden">{controls.scene}</legend>
            {CLAY_REFERENCES.map((scene) => (
              <button
                key={scene.id}
                type="button"
                aria-pressed={activeScene === scene.id}
                className={activeScene === scene.id ? 'is-active' : ''}
                onClick={() => setActiveScene(scene.id)}
              >
                {CLAY_SCENE_COPY[scene.id].title[language]}
              </button>
            ))}
          </fieldset>
          <label>
            {controls.viewport}
            <select
              value={viewport}
              onChange={(event) => setViewport(Number(event.target.value))}
            >
              {[390, 768, 1440].map((width) => (
                <option key={width} value={width}>
                  {width} px
                </option>
              ))}
            </select>
          </label>
          <fieldset className="segmented">
            <legend className="visually-hidden">{controls.theme}</legend>
            {(['dia', 'noche'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                aria-pressed={sceneTheme === mode}
                className={sceneTheme === mode ? 'is-active' : ''}
                onClick={() => setSceneTheme(mode)}
              >
                {mode === 'dia'
                  ? UI_COPY[language].day
                  : UI_COPY[language].night}
              </button>
            ))}
          </fieldset>
        </div>
        <figure
          className="clay-reference"
          data-theme={sceneTheme}
          style={scenePalette as CSSProperties}
          data-viewport={viewport}
        >
          <div className="clay-reference__image" style={{ maxWidth: viewport }}>
            {item.scene === 'relief' ? (
              <ClayRelief label={sceneCopy.title[language]} />
            ) : item.scene === 'editorial' ? (
              <EditorialScene language={language} />
            ) : (
              <ProductScene language={language} />
            )}
          </div>
          <figcaption aria-live="polite">
            <strong>{sceneCopy.title[language]}</strong>
            <span>{sceneCopy.note[language]}</span>
            <span className="clay-reference__proof">
              {sceneCopy.proof[language]}
              <code>{viewport} px</code>
            </span>
            <code className="clay-reference__token">{item.token}</code>
          </figcaption>
        </figure>
      </div>
      <RuleStrip index={`${RULE_LABEL[language]} 07`}>{copy.rule}</RuleStrip>
    </section>
  );
};
