'use client';

import { useState } from 'react';
import {
  Activity,
  AlertCircle,
  ArrowDown,
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowUp,
  Award,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock,
  Columns,
  Crosshair,
  Info,
  Layers,
  Minus,
  Monitor,
  MousePointer,
  Play,
  RotateCw,
  Ruler,
  ShieldCheck,
  Smartphone,
  Triangle,
  X,
} from 'lucide-react';
import { BrandMark, StatusPill } from '../brand/marks';
import { RuleStrip, SectionIntro, useBrandbook } from '../brand/ui';
import {
  PATTERN_COPY,
  PATTERN_STATE_COPY,
  RESULT_CARDS_COPY,
  RULE_LABEL,
} from '../brand/copy';

type LayoutMode = 'escritorio' | 'movil';
type LayerMode = 'modelo' | 'cargas' | 'momento' | 'deformada';
type ModelingTool = 'nudo' | 'miembro' | 'apoyo' | 'cargas' | 'seccion' | 'resolver';
type InspectorTab = 'modelo' | 'deformada' | 'n' | 'v' | 'm';
type ShowcaseCategory = 'm' | 'v' | 'n' | 'deformada';

const STATES = ['vacio', 'proceso', 'error', 'exito'] as const;

export const Patterns = () => {
  const { language, theme } = useBrandbook();
  const [mode, setMode] = useState<LayoutMode>('escritorio');
  const [state, setState] = useState<(typeof STATES)[number]>('exito');
  const [activeLayer, setActiveLayer] = useState<LayerMode>('momento');
  const [activeTool, setActiveTool] = useState<ModelingTool>('miembro');
  const [inspectorTab, setInspectorTab] = useState<InspectorTab>('m');
  const [showcaseCat, setShowcaseCat] = useState<ShowcaseCategory>('m');
  const [cardsTheme, setCardsTheme] = useState<'dia' | 'noche'>(theme);
  const copy = PATTERN_COPY[language];
  const stateCopy = PATTERN_STATE_COPY[state];
  const cardsCopy = RESULT_CARDS_COPY[language];

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
              {/* Selector de sub-hojas de resultados */}
              <div className="sheet-subtabs" role="tablist">
                {(['modelo', 'deformada', 'n', 'v', 'm'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={inspectorTab === t}
                    className={`sheet-subtab ${inspectorTab === t ? 'is-active' : ''} sheet-subtab--${t}`}
                    onClick={() => {
                      setInspectorTab(t);
                      if (t === 'm') setActiveLayer('momento');
                      else if (t === 'v') setActiveLayer('cargas');
                      else if (t === 'deformada') setActiveLayer('deformada');
                      else if (t === 'modelo') setActiveLayer('modelo');
                    }}
                  >
                    {t === 'modelo' ? 'Mod' : t === 'deformada' ? 'Def' : t.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Lista de tarjetas táctiles de resultados */}
              <div className="sheet-cards">
                {inspectorTab === 'm' && (
                  <>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--moment">
                        <Activity size={15} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.moment.card1Title}</span>
                        <strong className="sheet-card__value sheet-card__value--moment">−148.60 kN·m</strong>
                        <small className="sheet-card__note">• A 6.00 m en centro de vano (L/2)</small>
                      </div>
                    </div>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--success">
                        <ShieldCheck size={15} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.moment.card2Title}</span>
                        <strong className="sheet-card__value sheet-card__value--success">Controlado · OK</strong>
                        <small className="sheet-card__note">• Cumple AISC 360-22 (D/C 0.68)</small>
                      </div>
                    </div>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--warn">
                        <Award size={15} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.moment.card3Title}</span>
                        <strong className="sheet-card__value sheet-card__value--warn">Alta confiabilidad</strong>
                        <small className="sheet-card__note">• Tolerancia elástica 1e-6 verificada</small>
                      </div>
                    </div>
                  </>
                )}

                {inspectorTab === 'v' && (
                  <>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--shear">
                        <ArrowUp size={15} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.shear.card1Title}</span>
                        <strong className="sheet-card__value sheet-card__value--shear">+85.50 kN</strong>
                        <small className="sheet-card__note">• En el nudo interior N2</small>
                      </div>
                    </div>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--shear">
                        <ArrowDown size={15} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.shear.card2Title}</span>
                        <strong className="sheet-card__value sheet-card__value--shear">−85.50 kN</strong>
                        <small className="sheet-card__note">• En el nudo de esquina N3</small>
                      </div>
                    </div>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--shear">
                        <CircleDot size={15} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.shear.card3Title}</span>
                        <strong className="sheet-card__value">0.00 kN</strong>
                        <small className="sheet-card__note">• En x = 6.00 m (corte nulo en L/2)</small>
                      </div>
                    </div>
                  </>
                )}

                {inspectorTab === 'n' && (
                  <div className="sheet-card-triple">
                    <div className="sheet-card-col">
                      <span className="sheet-card__label">{cardsCopy.axial.maxTitle}</span>
                      <strong className="sheet-card__value">0.00 kN</strong>
                      <small className="sheet-card__note">{cardsCopy.axial.maxNote}</small>
                    </div>
                    <div className="sheet-card-col">
                      <span className="sheet-card__label">{cardsCopy.axial.minTitle}</span>
                      <strong className="sheet-card__value sheet-card__value--axial">−24.30 kN</strong>
                      <span className="sheet-chip sheet-chip--axial">{cardsCopy.axial.minBadge}</span>
                    </div>
                    <div className="sheet-card-col">
                      <span className="sheet-card__label">{cardsCopy.axial.signTitle}</span>
                      <strong className="sheet-card__value">← █ →</strong>
                      <span className="sheet-chip">{cardsCopy.axial.signBadge}</span>
                    </div>
                  </div>
                )}

                {inspectorTab === 'deformada' && (
                  <>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--deformed">
                        <ArrowDownToLine size={15} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.deformed.card1Title}</span>
                        <strong className="sheet-card__value sheet-card__value--deformed">11.70 mm</strong>
                        <small className="sheet-card__note">• En el centro de vano (L/1025)</small>
                      </div>
                    </div>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--deformed">
                        <Crosshair size={15} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.deformed.card2Title}</span>
                        <strong className="sheet-card__value">6.00 m</strong>
                        <small className="sheet-card__note">• Desde el nudo inicial N2</small>
                      </div>
                    </div>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--deformed">
                        <RotateCw size={15} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.deformed.card3Title}</span>
                        <strong className="sheet-card__value">−0.0042 rad</strong>
                        <small className="sheet-card__note">• Giro simétrico en apoyos</small>
                      </div>
                    </div>
                  </>
                )}

                {inspectorTab === 'modelo' && (
                  <>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--model">
                        <Columns size={15} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">Perfil y acero</span>
                        <strong className="sheet-card__value">IPE 300 · Acero A992</strong>
                        <small className="sheet-card__note">• fy = 345 MPa · E = 200 GPa</small>
                      </div>
                    </div>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--model">
                        <Ruler size={15} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">Longitud de barra</span>
                        <strong className="sheet-card__value">12.00 m</strong>
                        <small className="sheet-card__note">• N2 (0, 4.20) → N3 (12.00, 4.20)</small>
                      </div>
                    </div>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--model">
                        <Layers size={15} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">Inercia principal</span>
                        <strong className="sheet-card__value">Ix = 8356 cm⁴</strong>
                        <small className="sheet-card__note">• Módulo plástico Wx = 557 cm³</small>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Medidor de capacidad D/C */}
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

      {/* Apartado dedicado: Sistema de Tarjetas de Resultados */}
      <div className="cards-showcase">
        <div className="cards-showcase__head">
          <div>
            <span className="tag">{cardsCopy.sectionTag}</span>
            <h3>{cardsCopy.sectionTitle}</h3>
            <p>{cardsCopy.sectionDescription}</p>
          </div>
          <div className="cards-showcase__actions">
            <fieldset className="segmented segmented--tight">
              <legend className="visually-hidden">{cardsCopy.specimenTitle}</legend>
              <button
                type="button"
                className={cardsTheme === 'dia' ? 'is-active' : ''}
                onClick={() => setCardsTheme('dia')}
              >
                {cardsCopy.dayClay}
              </button>
              <button
                type="button"
                className={cardsTheme === 'noche' ? 'is-active' : ''}
                onClick={() => setCardsTheme('noche')}
              >
                {cardsCopy.nightClay}
              </button>
            </fieldset>
          </div>
        </div>

        {/* Selector de categoría de tarjeta */}
        <fieldset className="segmented cards-showcase__picker">
          <legend className="visually-hidden">{cardsCopy.sectionTitle}</legend>
          <button
            type="button"
            className={showcaseCat === 'm' ? 'is-active' : ''}
            onClick={() => setShowcaseCat('m')}
          >
            {cardsCopy.tabMoment}
          </button>
          <button
            type="button"
            className={showcaseCat === 'v' ? 'is-active' : ''}
            onClick={() => setShowcaseCat('v')}
          >
            {cardsCopy.tabShear}
          </button>
          <button
            type="button"
            className={showcaseCat === 'n' ? 'is-active' : ''}
            onClick={() => setShowcaseCat('n')}
          >
            {cardsCopy.tabAxial}
          </button>
          <button
            type="button"
            className={showcaseCat === 'deformada' ? 'is-active' : ''}
            onClick={() => setShowcaseCat('deformada')}
          >
            {cardsCopy.tabDeformed}
          </button>
        </fieldset>

        {/* Escenario con la tarjeta táctil en modo móvil/hoja modal */}
        <div className="cards-showcase__stage" data-theme={cardsTheme}>
          <div className="sheet-device">
            {/* Cabecera superior del móvil */}
            <div className="sheet-device__bar">
              <span>9:41</span>
              <span className="sheet-device__pill" />
            </div>

            {/* Sub-barra de proyecto */}
            <div className="sheet-device__nav">
              <span className="sheet-device__back">‹ Viga en voladizo — ala oeste</span>
              <span className="sheet-device__badge">
                <AlertCircle size={11} /> Confiabilidad limitada
              </span>
              <span className="sheet-device__run-btn">
                <Play size={10} />
              </span>
            </div>

            {/* Vista previa gráfica del diagrama de barra */}
            <div className="sheet-device__diagram">
              <svg viewBox="0 0 320 120" className="sheet-device__svg">
                {/* Empotramiento en pared izquierda */}
                <rect x="18" y="24" width="8" height="72" fill="var(--ink-faint)" rx="2" />
                <line x1="14" y1="20" x2="14" y2="100" stroke="var(--ink-muted)" strokeWidth="2" />
                {[26, 38, 50, 62, 74, 86, 98].map((y) => (
                  <line key={y} x1="14" y1={y} x2="8" y2={y - 6} stroke="var(--ink-faint)" strokeWidth="1.2" />
                ))}

                {/* Viga estructural horizontal */}
                <rect x="26" y="56" width="240" height="8" rx="2" fill="var(--ink)" />
                <circle cx="266" cy="60" r="4" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />

                {/* Diagrama según la categoría activa */}
                {showcaseCat === 'm' && (
                  <g>
                    <path
                      d="M 26 60 Q 120 12 210 60 Q 240 76 266 60"
                      fill="color-mix(in srgb, #ed4b46 16%, transparent)"
                      stroke="#ed4b46"
                      strokeWidth="2"
                    />
                    <rect x="70" y="8" width="84" height="18" rx="5" fill="var(--surface)" stroke="#ed4b46" strokeWidth="1" />
                    <text x="112" y="20" textAnchor="middle" fontSize="9" fill="#ed4b46" fontFamily="var(--fs-font-data)" fontWeight="bold">
                      +24.36 kN·m
                    </text>
                    <text x="250" y="86" fontSize="8" fill="#ed4b46" fontFamily="var(--fs-font-data)">−8.12 kN·m</text>
                  </g>
                )}

                {showcaseCat === 'v' && (
                  <g>
                    <polygon
                      points="26,26 146,60 266,60 266,94 146,60 26,60"
                      fill="color-mix(in srgb, #1aa57a 16%, transparent)"
                      stroke="#1aa57a"
                      strokeWidth="1.8"
                    />
                    <text x="32" y="22" fontSize="9" fill="#1aa57a" fontFamily="var(--fs-font-data)" fontWeight="bold">
                      +12.80 kN
                    </text>
                    <text x="146" y="78" fontSize="8" fill="#1aa57a" fontFamily="var(--fs-font-data)">
                      −12.80 kN
                    </text>
                    <text x="240" y="54" fontSize="8" fill="var(--ink-muted)" fontFamily="var(--fs-font-data)">
                      0.00 kN
                    </text>
                  </g>
                )}

                {showcaseCat === 'n' && (
                  <g>
                    <polygon
                      points="26,36 266,60 26,60"
                      fill="color-mix(in srgb, #0f95d1 16%, transparent)"
                      stroke="#0f95d1"
                      strokeWidth="1.8"
                    />
                    <text x="32" y="32" fontSize="9" fill="#0f95d1" fontFamily="var(--fs-font-data)" fontWeight="bold">
                      −18.40 kN (Compresión)
                    </text>
                    <text x="236" y="52" fontSize="8" fill="var(--ink-muted)" fontFamily="var(--fs-font-data)">
                      0.00 kN
                    </text>
                  </g>
                )}

                {showcaseCat === 'deformada' && (
                  <g>
                    <path
                      d="M 26 60 Q 146 64 266 88"
                      fill="none"
                      stroke="#7657d5"
                      strokeWidth="3"
                      strokeDasharray="4 3"
                    />
                    <circle cx="266" cy="88" r="4" fill="#7657d5" />
                    <rect x="230" y="94" width="60" height="16" rx="4" fill="#7657d5" />
                    <text x="260" y="105" textAnchor="middle" fontSize="8.5" fill="#ffffff" fontFamily="var(--fs-font-data)" fontWeight="bold">
                      −12.80 mm
                    </text>
                  </g>
                )}

                {/* Cota horizontal */}
                <line x1="26" y1="112" x2="266" y2="112" stroke="var(--ink-faint)" strokeWidth="1" strokeDasharray="3 3" />
                <text x="146" y="110" textAnchor="middle" fontSize="8" fill="var(--ink-faint)" fontFamily="var(--fs-font-data)">
                  3.00 m
                </text>
              </svg>
            </div>

            {/* Hoja modal inferior táctil "Resultados" */}
            <div className="sheet-modal">
              <div className="sheet-modal__handle" />

              <div className="sheet-modal__head">
                <div>
                  <h4>{cardsCopy.inspectorTitle}</h4>
                  <p>
                    {showcaseCat === 'm' && cardsCopy.moment.subtitle}
                    {showcaseCat === 'v' && cardsCopy.shear.subtitle}
                    {showcaseCat === 'n' && cardsCopy.axial.subtitle}
                    {showcaseCat === 'deformada' && cardsCopy.deformed.subtitle}
                  </p>
                </div>
                <button type="button" className="sheet-modal__close" title={cardsCopy.closeCard}>
                  <X size={14} />
                </button>
              </div>

              {/* Subtabs de navegación de la hoja */}
              <div className="sheet-subtabs sheet-subtabs--modal" role="tablist">
                {(['modelo', 'deformada', 'n', 'v', 'm'] as const).map((t) => {
                  const isActive =
                    (t === 'm' && showcaseCat === 'm') ||
                    (t === 'v' && showcaseCat === 'v') ||
                    (t === 'n' && showcaseCat === 'n') ||
                    (t === 'deformada' && showcaseCat === 'deformada');
                  return (
                    <button
                      key={t}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`sheet-subtab ${isActive ? 'is-active' : ''} sheet-subtab--${t}`}
                      onClick={() => {
                        if (t === 'm' || t === 'v' || t === 'n' || t === 'deformada') {
                          setShowcaseCat(t);
                        }
                      }}
                    >
                      {t === 'modelo' ? 'Modelo' : t === 'deformada' ? 'Deformada' : t.toUpperCase()}
                    </button>
                  );
                })}
              </div>

              {/* Tarjetas táctiles hápticas */}
              <div className="sheet-cards sheet-cards--modal">
                {showcaseCat === 'm' && (
                  <>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--moment">
                        <Activity size={16} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.moment.card1Title}</span>
                        <strong className="sheet-card__value sheet-card__value--moment">
                          {cardsCopy.moment.card1Value} <span className="sheet-card__dot">•</span>
                        </strong>
                        <small className="sheet-card__note">{cardsCopy.moment.card1Note}</small>
                      </div>
                    </div>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--moment">
                        <ShieldCheck size={16} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.moment.card2Title}</span>
                        <strong className="sheet-card__value sheet-card__value--moment">
                          {cardsCopy.moment.card2Value} <span className="sheet-card__dot">•</span>
                        </strong>
                        <small className="sheet-card__note">{cardsCopy.moment.card2Note}</small>
                      </div>
                    </div>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--warn">
                        <Award size={16} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.moment.card3Title}</span>
                        <strong className="sheet-card__value sheet-card__value--warn">
                          {cardsCopy.moment.card3Value} <span className="sheet-card__dot">•</span>
                        </strong>
                        <small className="sheet-card__note">{cardsCopy.moment.card3Note}</small>
                      </div>
                    </div>
                  </>
                )}

                {showcaseCat === 'v' && (
                  <>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--shear">
                        <ArrowUp size={16} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.shear.card1Title}</span>
                        <strong className="sheet-card__value sheet-card__value--shear">
                          {cardsCopy.shear.card1Value} <span className="sheet-card__dot">•</span>
                        </strong>
                      </div>
                    </div>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--shear">
                        <ArrowDown size={16} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.shear.card2Title}</span>
                        <strong className="sheet-card__value sheet-card__value--shear">
                          {cardsCopy.shear.card2Value} <span className="sheet-card__dot">•</span>
                        </strong>
                      </div>
                    </div>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--shear">
                        <CircleDot size={16} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.shear.card3Title}</span>
                        <strong className="sheet-card__value">
                          {cardsCopy.shear.card3Value} <span className="sheet-card__dot">•</span>
                        </strong>
                      </div>
                    </div>
                  </>
                )}

                {showcaseCat === 'n' && (
                  <>
                    <div className="sheet-card-triple">
                      <div className="sheet-card-col">
                        <span className="sheet-card__label">{cardsCopy.axial.maxTitle}</span>
                        <strong className="sheet-card__value">{cardsCopy.axial.maxValue}</strong>
                        <small className="sheet-card__note">{cardsCopy.axial.maxNote}</small>
                      </div>
                      <div className="sheet-card-col">
                        <span className="sheet-card__label">{cardsCopy.axial.minTitle}</span>
                        <strong className="sheet-card__value sheet-card__value--axial">{cardsCopy.axial.minValue}</strong>
                        <span className="sheet-chip sheet-chip--tension">{cardsCopy.axial.minBadge}</span>
                      </div>
                      <div className="sheet-card-col">
                        <span className="sheet-card__label">{cardsCopy.axial.signTitle}</span>
                        <strong className="sheet-card__value">{cardsCopy.axial.signValue}</strong>
                        <span className="sheet-chip sheet-chip--tension">{cardsCopy.axial.signBadge}</span>
                      </div>
                    </div>
                    <div className="sheet-note-box">
                      <Info size={13} />
                      <span>{cardsCopy.axial.note}</span>
                    </div>
                  </>
                )}

                {showcaseCat === 'deformada' && (
                  <>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--deformed">
                        <ArrowDownToLine size={16} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.deformed.card1Title}</span>
                        <strong className="sheet-card__value sheet-card__value--deformed">
                          {cardsCopy.deformed.card1Value}
                        </strong>
                        <small className="sheet-card__note">• {cardsCopy.deformed.card1Note}</small>
                      </div>
                    </div>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--deformed">
                        <Crosshair size={16} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.deformed.card2Title}</span>
                        <strong className="sheet-card__value">{cardsCopy.deformed.card2Value}</strong>
                        <small className="sheet-card__note">• {cardsCopy.deformed.card2Note}</small>
                      </div>
                    </div>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--deformed">
                        <RotateCw size={16} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.deformed.card3Title}</span>
                        <strong className="sheet-card__value">{cardsCopy.deformed.card3Value}</strong>
                        <small className="sheet-card__note">• {cardsCopy.deformed.card3Note}</small>
                      </div>
                    </div>
                    <div className="sheet-card">
                      <span className="sheet-card__icon sheet-card__icon--shear">
                        <ArrowUp size={16} />
                      </span>
                      <div className="sheet-card__content">
                        <span className="sheet-card__label">{cardsCopy.deformed.card4Title}</span>
                        <strong className="sheet-card__value sheet-card__value--shear">
                          {cardsCopy.deformed.card4Value}
                        </strong>
                        <small className="sheet-card__note">• {cardsCopy.deformed.card4Note}</small>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Tira inferior de metadatos */}
              <div className="sheet-meta-bar">
                <div>
                  <Ruler size={12} />
                  <span>3.00 m</span>
                </div>
                <div>
                  <ArrowLeftRight size={12} />
                  <span>{showcaseCat === 'm' ? '+ tracción inf.' : showcaseCat === 'v' ? '+ arriba' : '+ tensión'}</span>
                </div>
                <div>
                  <Layers size={12} />
                  <span>kN, m, mm</span>
                </div>
              </div>

              {/* Barra inferior de acciones móviles */}
              <div className="sheet-actions-bar">
                <button type="button" className="sheet-action-item is-active">
                  <MousePointer size={14} />
                  <span>Seleccionar</span>
                </button>
                <button type="button" className="sheet-action-item">
                  <CircleDot size={14} />
                  <span>Geometría</span>
                </button>
                <button type="button" className="sheet-action-item">
                  <ArrowDown size={14} />
                  <span>Cargas</span>
                </button>
                <button type="button" className="sheet-action-item">
                  <Ruler size={14} />
                  <span>Acotar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RuleStrip index={`${RULE_LABEL[language]} 06`}>{copy.rule}</RuleStrip>
    </section>
  );
};

