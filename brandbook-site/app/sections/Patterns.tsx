'use client';

import { useState } from 'react';
import {
  Activity,
  AlertCircle,
  ArrowDown,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock,
  Columns,
  Layers,
  Minus,
  Monitor,
  Play,
  Ruler,
  Smartphone,
  Triangle,
} from 'lucide-react';
import { BrandMark, StatusPill } from '../brand/marks';
import { RuleStrip, SectionIntro, useBrandbook } from '../brand/ui';
import { PATTERN_COPY, PATTERN_STATE_COPY, RULE_LABEL } from '../brand/copy';

type LayoutMode = 'escritorio' | 'movil';
type LayerMode = 'modelo' | 'cargas' | 'momento' | 'deformada';
type ModelingTool = 'nudo' | 'miembro' | 'apoyo' | 'cargas' | 'seccion' | 'resolver';

const STATES = ['vacio', 'proceso', 'error', 'exito'] as const;

export const Patterns = () => {
  const { language } = useBrandbook();
  const [mode, setMode] = useState<LayoutMode>('escritorio');
  const [state, setState] = useState<(typeof STATES)[number]>('exito');
  const [activeLayer, setActiveLayer] = useState<LayerMode>('momento');
  const [activeTool, setActiveTool] = useState<ModelingTool>('miembro');
  const copy = PATTERN_COPY[language];
  const stateCopy = PATTERN_STATE_COPY[state];

  const tools: { id: ModelingTool; label: string; icon: typeof CircleDot }[] = [
    { id: 'nudo', label: copy.node, icon: CircleDot },
    { id: 'miembro', label: copy.member, icon: Minus },
    { id: 'apoyo', label: copy.support, icon: Triangle },
    { id: 'cargas', label: copy.loads, icon: ArrowDown },
    { id: 'seccion', label: copy.sectionTool, icon: Columns },
    { id: 'resolver', label: copy.solve, icon: Play },
  ];

  const layers: { id: LayerMode; label: string }[] = [
    { id: 'modelo', label: copy.layerModel },
    { id: 'cargas', label: copy.layerLoads },
    { id: 'momento', label: copy.layerMoment },
    { id: 'deformada', label: copy.layerDeformed },
  ];

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
        {/* Barra de herramientas estructurales Solver2D */}
        <div className="workbench__console" role="toolbar" aria-label={copy.solverTitle}>
          <span className="workbench__brand" title="FusionStructure Solver2D">
            <BrandMark size={22} />
          </span>
          {tools.map((t) => {
            const Icon = t.icon;
            const isResolver = t.id === 'resolver';
            return (
              <button
                key={t.id}
                type="button"
                className={`workbench__tool ${activeTool === t.id ? 'is-active' : ''} ${
                  isResolver ? 'workbench__tool--solve' : ''
                }`}
                onClick={() => {
                  setActiveTool(t.id);
                  if (isResolver) setState('exito');
                }}
                title={t.label}
              >
                <Icon size={15} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Lienzo CAD de Pórtico Plano Solver2D */}
        <div className="workbench__canvas">
          <div className="workbench__canvas-bar">
            <div className="workbench__title-group">
              <span className="workbench__file-tag">FS-A01</span>
              <strong className="workbench__file-name">{copy.project}.f2d</strong>
            </div>

            {/* Selector de capas de análisis */}
            <div className="workbench__layer-switch" role="tablist">
              {layers.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  role="tab"
                  aria-selected={activeLayer === l.id}
                  className={`workbench__layer-btn ${activeLayer === l.id ? 'is-active' : ''}`}
                  onClick={() => setActiveLayer(l.id)}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <code className="workbench__model-dims">12.00 × 4.20 m · IPE 300</code>
          </div>

          <div className="workbench__scene" aria-hidden="true">
            <svg
              className="workbench__svg"
              viewBox="0 0 520 280"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <pattern
                  id="workbench-grid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="10" cy="10" r="0.9" className="workbench__grid-dot" />
                </pattern>
                <marker
                  id="arrow-dim"
                  viewBox="0 0 6 6"
                  refX="3"
                  refY="3"
                  markerWidth="4"
                  markerHeight="4"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 4.5 3 L 0 4.5 z" fill="var(--ink-faint)" />
                </marker>
                <marker
                  id="arrow-load"
                  viewBox="0 0 6 6"
                  refX="3"
                  refY="3"
                  markerWidth="4"
                  markerHeight="4"
                  orient="auto"
                >
                  <path d="M 0 1.5 L 4.5 3 L 0 4.5 z" fill="#ed4b46" />
                </marker>
              </defs>

              {/* Fondo con rejilla CAD */}
              <rect width="100%" height="100%" fill="url(#workbench-grid)" />

              {/* Ejes de referencia en el origen */}
              <g className="workbench__axes" transform="translate(30, 255)">
                <line x1="0" y1="0" x2="22" y2="0" stroke="var(--ink-faint)" strokeWidth="1.2" />
                <line x1="0" y1="0" x2="0" y2="-22" stroke="var(--ink-faint)" strokeWidth="1.2" />
                <text x="26" y="3" fontSize="8" fill="var(--ink-faint)" fontFamily="var(--fs-font-data)">X</text>
                <text x="-3" y="-26" fontSize="8" fill="var(--ink-faint)" fontFamily="var(--fs-font-data)">Y</text>
              </g>

              {/* Cotas de geometría (L = 12.00m, H = 4.20m) */}
              <g className="workbench__dims">
                {/* Cota horizontal L = 12.00 m */}
                <line x1="90" y1="46" x2="430" y2="46" stroke="var(--ink-faint)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="90" y1="42" x2="90" y2="50" stroke="var(--ink-faint)" strokeWidth="1" />
                <line x1="430" y1="42" x2="430" y2="50" stroke="var(--ink-faint)" strokeWidth="1" />
                <text x="260" y="42" textAnchor="middle" fontSize="9" fill="var(--ink-faint)" fontFamily="var(--fs-font-data)">
                  L = 12.00 m
                </text>

                {/* Cota vertical H = 4.20 m */}
                <line x1="62" y1="80" x2="62" y2="220" stroke="var(--ink-faint)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="58" y1="80" x2="66" y2="80" stroke="var(--ink-faint)" strokeWidth="1" />
                <line x1="58" y1="220" x2="66" y2="220" stroke="var(--ink-faint)" strokeWidth="1" />
                <text x="54" y="154" textAnchor="middle" fontSize="9" fill="var(--ink-faint)" fontFamily="var(--fs-font-data)" transform="rotate(-90 54 154)">
                  H = 4.20 m
                </text>
              </g>

              {/* DIAGRAMA DE MOMENTOS FLECTORES (Capa Momento) */}
              {(activeLayer === 'momento' || state === 'exito') && state !== 'vacio' && (
                <g className="workbench__diagram-moment" opacity={state === 'error' ? 0.3 : 0.85}>
                  {/* Parábola del dintel M-02 */}
                  <path
                    d="M 90 80 Q 260 148 430 80"
                    fill="none"
                    stroke="#ed4b46"
                    strokeWidth="2"
                  />
                  <path
                    d="M 90 80 Q 260 148 430 80 L 430 80 L 90 80 Z"
                    fill="color-mix(in srgb, #ed4b46 12%, transparent)"
                  />
                  <text x="260" y="132" textAnchor="middle" fontSize="8.5" fill="#ed4b46" fontFamily="var(--fs-font-data)" fontWeight="600">
                    Mmax = −148.60 kN·m
                  </text>
                </g>
              )}

              {/* DEFORMADA ELÁSTICA (Capa Deformada) */}
              {(activeLayer === 'deformada' || state === 'exito') && state !== 'vacio' && (
                <g className="workbench__diagram-deformed" opacity={activeLayer === 'deformada' ? 1 : 0.45}>
                  <path
                    d="M 90 80 Q 260 102 430 80"
                    fill="none"
                    stroke="#7657d5"
                    strokeWidth="1.8"
                    strokeDasharray="4 3"
                  />
                  <text x="260" y="100" textAnchor="middle" fontSize="8" fill="#7657d5" fontFamily="var(--fs-font-data)">
                    Δ = 11.7 mm
                  </text>
                </g>
              )}

              {/* CARGAS APLICADAS (Capa Cargas) */}
              {(activeLayer === 'cargas' || state === 'exito' || state === 'proceso') && (
                <g className="workbench__loads">
                  {/* Carga distribuida uniforme en el dintel q = 28.5 kN/m */}
                  <line x1="90" y1="62" x2="430" y2="62" stroke="#ed4b46" strokeWidth="1.2" />
                  {[110, 150, 190, 230, 270, 310, 350, 390, 410].map((x) => (
                    <line
                      key={x}
                      x1={x}
                      y1="62"
                      x2={x}
                      y2="77"
                      stroke="#ed4b46"
                      strokeWidth="1.2"
                      markerEnd="url(#arrow-load)"
                    />
                  ))}
                  <text x="260" y="58" textAnchor="middle" fontSize="8.5" fill="#ed4b46" fontFamily="var(--fs-font-data)" fontWeight="600">
                    q = 28.5 kN/m
                  </text>

                  {/* Carga puntual lateral de viento en nudo N2 */}
                  <line x1="45" y1="80" x2="84" y2="80" stroke="#0f95d1" strokeWidth="1.5" markerEnd="url(#arrow-dim)" />
                  <text x="48" y="74" fontSize="8.5" fill="#0f95d1" fontFamily="var(--fs-font-data)" fontWeight="600">
                    Fx = 15 kN
                  </text>
                </g>
              )}

              {/* BASTIDOR ESTRUCTURAL (Columnas M-01, M-03 y Dintel M-02) */}
              <g className="workbench__members">
                {/* Columna izquierda M-01 */}
                <line
                  x1="90"
                  y1="220"
                  x2="90"
                  y2="80"
                  className="workbench__member-line"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <text x="76" y="150" fontSize="8" fill="var(--ink-muted)" fontFamily="var(--fs-font-data)">M-01</text>

                {/* Columna derecha M-03 */}
                <line
                  x1="430"
                  y1="220"
                  x2="430"
                  y2="80"
                  className="workbench__member-line"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <text x="438" y="150" fontSize="8" fill="var(--ink-muted)" fontFamily="var(--fs-font-data)">M-03</text>

                {/* Dintel viga M-02 (Seleccionado / Activo) */}
                <line
                  x1="90"
                  y1="80"
                  x2="430"
                  y2="80"
                  className="workbench__member-line workbench__member-line--selected"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <g transform="translate(260, 72)">
                  <rect x="-32" y="-12" width="64" height="15" rx="4" fill="var(--surface)" stroke="#1aa57a" strokeWidth="1" />
                  <text x="0" y="-2" textAnchor="middle" fontSize="8" fill="#1aa57a" fontFamily="var(--fs-font-data)" fontWeight="bold">
                    M-02 · IPE 300
                  </text>
                </g>
              </g>

              {/* APOYOS ESTRUCTURALES EN BASE */}
              {/* Apoyo N1: Fijo / Empotramiento o articulado (Triángulo con rayado de tierra) */}
              <g className="workbench__support" transform="translate(90, 220)">
                <polygon points="0,0 -9,14 9,14" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.4" />
                <line x1="-12" y1="14" x2="12" y2="14" stroke="var(--ink)" strokeWidth="1.4" />
                <line x1="-10" y1="17" x2="-6" y2="14" stroke="var(--ink-faint)" strokeWidth="1" />
                <line x1="-4" y1="17" x2="0" y2="14" stroke="var(--ink-faint)" strokeWidth="1" />
                <line x1="2" y1="17" x2="6" y2="14" stroke="var(--ink-faint)" strokeWidth="1" />
                <line x1="8" y1="17" x2="12" y2="14" stroke="var(--ink-faint)" strokeWidth="1" />
                <circle cx="0" cy="0" r="2" fill="#1aa57a" />
              </g>

              {/* Apoyo N4: Móvil / Deslizante (Triángulo sobre rodillos) */}
              <g className="workbench__support" transform="translate(430, 220)">
                <polygon points="0,0 -9,12 9,12" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.4" />
                <circle cx="-5" cy="15" r="2" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
                <circle cx="5" cy="15" r="2" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
                <line x1="-12" y1="18" x2="12" y2="18" stroke="var(--ink)" strokeWidth="1.4" />
                <circle cx="0" cy="0" r="2" fill="#1aa57a" />
              </g>

              {/* NUDOS DE LA ESTRUCTURA */}
              {/* N1 (0,0) */}
              <g className="workbench__node-marker" transform="translate(90, 220)">
                <circle cx="0" cy="0" r="4.5" className="workbench__node-dot" />
                <text x="-16" y="2" fontSize="8" fill="var(--ink-muted)" fontFamily="var(--fs-font-data)">N1</text>
              </g>
              {/* N2 (0, 4.20) */}
              <g className="workbench__node-marker" transform="translate(90, 80)">
                <circle cx="0" cy="0" r="5" className="workbench__node-dot workbench__node-dot--joint" />
                <text x="-16" y="-3" fontSize="8" fill="var(--ink-muted)" fontFamily="var(--fs-font-data)">N2</text>
              </g>
              {/* N3 (12.00, 4.20) */}
              <g className="workbench__node-marker" transform="translate(430, 80)">
                <circle
                  cx="0"
                  cy="0"
                  r={state === 'error' ? 7 : 5}
                  className={`workbench__node-dot ${state === 'error' ? 'workbench__node-dot--error' : 'workbench__node-dot--joint'}`}
                />
                <text x="10" y="-3" fontSize="8" fill={state === 'error' ? '#d9720a' : 'var(--ink-muted)'} fontFamily="var(--fs-font-data)">
                  N3
                </text>
              </g>
              {/* N4 (12.00, 0) */}
              <g className="workbench__node-marker" transform="translate(430, 220)">
                <circle cx="0" cy="0" r="4.5" className="workbench__node-dot" />
                <text x="10" y="2" fontSize="8" fill="var(--ink-muted)" fontFamily="var(--fs-font-data)">N4</text>
              </g>

              {/* ESTADO EN PROCESO: Animación de barrido de resolución */}
              {state === 'proceso' && (
                <g className="workbench__overlay-process" transform="translate(260, 140)">
                  <rect x="-95" y="-16" width="190" height="32" rx="8" fill="var(--surface)" stroke="#0f95d1" strokeWidth="1.2" />
                  <text x="0" y="4" textAnchor="middle" fontSize="9.5" fill="#0f95d1" fontFamily="var(--fs-font-data)" fontWeight="600">
                    [K] u = F · Resolviendo 148 GDL...
                  </text>
                </g>
              )}

              {/* ESTADO VACÍO: Guía inicial */}
              {state === 'vacio' && (
                <g className="workbench__overlay-empty" transform="translate(260, 140)">
                  <rect x="-110" y="-16" width="220" height="32" rx="8" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
                  <text x="0" y="4" textAnchor="middle" fontSize="9" fill="var(--ink-muted)" fontFamily="var(--fs-font-data)">
                    {copy.canvasPrompt ?? 'Geometría lista · Ejecuta el solver para resultados'}
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className="workbench__canvas-foot">
            <span className="workbench__coord-readout">X: 6.000 m · Y: 4.200 m</span>
            <span className="workbench__selection-badge">{copy.selected}</span>
            <span className="workbench__snap-status">{copy.snap}</span>
          </div>
        </div>

        {/* Panel Inspector de Solver2D */}
        <div className="workbench__inspector">
          {/* Contenedor obligatorio de estado de patrón */}
          <div
            className={`workbench__state workbench__state--${state}`}
            aria-live="polite"
          >
            <div className="workbench__state-indicator">
              {state === 'exito' && <CheckCircle2 size={16} className="state-icon state-icon--success" />}
              {state === 'error' && <AlertCircle size={16} className="state-icon state-icon--error" />}
              {state === 'proceso' && <Activity size={16} className="state-icon state-icon--process" />}
              {state === 'vacio' && <Clock size={16} className="state-icon state-icon--empty" />}
              <strong>{stateCopy.title[language]}</strong>
            </div>
            <p>{stateCopy.body[language]}</p>
          </div>

          <div className="workbench__inspector-head">
            <strong>{copy.inspector}</strong>
            <StatusPill status="disponible" language={language} compact />
          </div>

          <div className="workbench__element-card">
            <div className="workbench__element-title">
              <strong>{copy.elementTitle}</strong>
              <code className="workbench__chip-profile">IPE 300</code>
            </div>
            <small className="workbench__connectivity">{copy.connectivity}</small>
          </div>

          {state === 'exito' ? (
            <div className="workbench__results-box">
              <dl className="workbench__metrics">
                <div>
                  <dt>{copy.length}</dt>
                  <dd>12.00 m</dd>
                </div>
                <div>
                  <dt>{copy.section}</dt>
                  <dd>IPE 300 · A992</dd>
                </div>
                <div>
                  <dt>{copy.moment}</dt>
                  <dd className="is-highlight-moment">−148.60 kN·m</dd>
                </div>
                <div>
                  <dt>{copy.shear}</dt>
                  <dd>+85.50 kN</dd>
                </div>
                <div>
                  <dt>{copy.axial}</dt>
                  <dd>−24.30 kN</dd>
                </div>
                <div>
                  <dt>{copy.deformed}</dt>
                  <dd className="is-highlight-deformed">11.70 mm <small>(L/1025)</small></dd>
                </div>
              </dl>

              <div className="workbench__capacity">
                <div className="workbench__capacity-head">
                  <span>{copy.capacityRatio}</span>
                  <strong>0.68 · OK</strong>
                </div>
                <div className="workbench__capacity-bar">
                  <span className="workbench__capacity-fill" style={{ width: '68%' }} />
                </div>
              </div>
            </div>
          ) : (
            <div className="workbench__pending-state">
              <span className="workbench__pending-note">
                {state === 'proceso'
                  ? 'Calculando matriz de rigidez global...'
                  : state === 'error'
                  ? 'Verifica las restricciones en el nudo N3'
                  : 'Pulsa Resolver para obtener diagramas y ratios'}
              </span>
            </div>
          )}

          <button
            type="button"
            className="ui-button ui-button--primary workbench__action-btn"
            onClick={() => setState('exito')}
          >
            {stateCopy.action[language]} <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <RuleStrip index={`${RULE_LABEL[language]} 06`}>{copy.rule}</RuleStrip>
    </section>
  );
};

