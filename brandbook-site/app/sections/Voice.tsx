'use client';

import { useState } from 'react';
import {
  Activity,
  ArrowDown,
  ArrowRight,
  BarChart2,
  Check,
  CheckCircle2,
  Clock,
  Columns,
  FileCode2,
  FlaskConical,
  GitCompare,
  HelpCircle,
  Inbox,
  Layers,
  Play,
  Save,
  Trash2,
  Triangle,
  WifiOff,
  X,
} from 'lucide-react';
import {
  GLOSSARY,
  MICROCOPY,
  VOICE_PRINCIPLES,
  VOICE_REWRITES,
} from '../brand/system';
import {
  GLOSSARY_COPY,
  EXPLORER_COPY,
  MICROCOPY_COPY,
  RULE_LABEL,
  VOICE_COPY,
  VOICE_PRINCIPLE_COPY,
  VOICE_REWRITE_COPY,
  VOICE_SPECIMENS_COPY,
} from '../brand/copy';
import { RuleStrip, SectionIntro, useBrandbook } from '../brand/ui';

export const Voice = () => {
  const { language } = useBrandbook();
  const [rewrite, setRewrite] = useState<string>(VOICE_REWRITES[0].id);
  const [microcopyFilter, setMicrocopyFilter] = useState<
    'todos' | 'botones' | 'estados' | 'avisos'
  >('todos');
  const [hapticClick, setHapticClick] = useState<string | null>(null);

  const active =
    VOICE_REWRITES.find((item) => item.id === rewrite) ?? VOICE_REWRITES[0];
  const copy = VOICE_COPY[language];
  const activeCopy = VOICE_REWRITE_COPY[active.id];
  const specimensCopy = VOICE_SPECIMENS_COPY;

  const triggerHapticFeedback = (buttonLabel: string) => {
    setHapticClick(buttonLabel);
    setTimeout(() => {
      setHapticClick((prev) => (prev === buttonLabel ? null : prev));
    }, 1600);
  };

  const filteredGroups =
    microcopyFilter === 'todos'
      ? MICROCOPY
      : MICROCOPY.filter((group) => group.id === microcopyFilter);

  return (
    <section id="voz" className="section voice">
      <SectionIntro index="11" compact />

      <details className="content-disclosure">
        <summary>{copy.why}</summary>
        <div className="voice-principles">
          {VOICE_PRINCIPLES.map((principle, index) => (
            <article key={principle.id}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>
                {VOICE_PRINCIPLE_COPY[principle.id].title[language]}
              </strong>
              <p>{VOICE_PRINCIPLE_COPY[principle.id].body[language]}</p>
            </article>
          ))}
        </div>
      </details>

      <div className="rewriter">
        <div className="rewriter__head">
          <span className="tag">{copy.rewrite}</span>
          <h3>{copy.title}</h3>
          <p>{copy.body}</p>
        </div>

        <div className="rewriter__body">
          <ul className="rewriter__list" role="tablist" aria-label={copy.tabs}>
            {VOICE_REWRITES.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  role="tab"
                  id={`voice-tab-${item.id}`}
                  aria-controls="voice-panel"
                  aria-selected={rewrite === item.id}
                  className={rewrite === item.id ? 'is-active' : ''}
                  onClick={() => setRewrite(item.id)}
                >
                  <small>{VOICE_REWRITE_COPY[item.id].context[language]}</small>
                  <span>{VOICE_REWRITE_COPY[item.id].before[language]}</span>
                </button>
              </li>
            ))}
          </ul>

          <div
            id="voice-panel"
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`voice-tab-${active.id}`}
            className="rewriter__stage"
          >
            <div className="rewriter__card rewriter__card--before">
              <span className="rewriter__badge">
                <X size={13} /> {copy.promises}
              </span>
              <p>{activeCopy.before[language]}</p>
            </div>
            <ArrowRight
              className="rewriter__arrow"
              size={20}
              aria-hidden="true"
            />
            <div className="rewriter__card rewriter__card--after">
              <span className="rewriter__badge">
                <Check size={13} /> {copy.supports}
              </span>
              <p>{activeCopy.after[language]}</p>
            </div>
            <details className="rewriter__why">
              <summary>{copy.why}</summary>
              <p>{activeCopy.why[language]}</p>
            </details>
          </div>
        </div>
      </div>

      <details className="content-disclosure" open>
        <summary>{EXPLORER_COPY[language].microcopy}</summary>
        <div className="microcopy">
          {/* Selector de categoría para evitar scroll infinito en móvil */}
          <div className="microcopy__nav">
            <fieldset className="segmented segmented--tight microcopy__segmented">
              <legend className="visually-hidden">
                {EXPLORER_COPY[language].microcopy}
              </legend>
              <button
                type="button"
                className={microcopyFilter === 'todos' ? 'is-active' : ''}
                onClick={() => setMicrocopyFilter('todos')}
              >
                {specimensCopy.tabAll[language]}{' '}
                <span className="microcopy__count">12</span>
              </button>
              <button
                type="button"
                className={microcopyFilter === 'botones' ? 'is-active' : ''}
                onClick={() => setMicrocopyFilter('botones')}
              >
                {specimensCopy.tabButtons[language]}{' '}
                <span className="microcopy__count">4</span>
              </button>
              <button
                type="button"
                className={microcopyFilter === 'estados' ? 'is-active' : ''}
                onClick={() => setMicrocopyFilter('estados')}
              >
                {specimensCopy.tabStates[language]}{' '}
                <span className="microcopy__count">4</span>
              </button>
              <button
                type="button"
                className={microcopyFilter === 'avisos' ? 'is-active' : ''}
                onClick={() => setMicrocopyFilter('avisos')}
              >
                {specimensCopy.tabNotices[language]}{' '}
                <span className="microcopy__count">4</span>
              </button>
            </fieldset>
          </div>

          <div className="microcopy__grid">
            {filteredGroups.map((group) => (
              <article
                key={group.id}
                className={`microcopy-group microcopy-group--${group.id}`}
              >
                <div className="microcopy__head">
                  <span className="tag">
                    {MICROCOPY_COPY[group.id].group[language]}
                  </span>
                  {group.id === 'botones' && (
                    <small className="microcopy__hint">
                      {specimensCopy.interactiveHint[language]}
                    </small>
                  )}
                </div>

                <div className="microcopy-items">
                  {group.items.map((item, index) => {
                    const label =
                      MICROCOPY_COPY[group.id].items[index].label[language];
                    const note =
                      MICROCOPY_COPY[group.id].items[index].note[language];

                    // 1. Categoría BOTONES: Componentes táctiles interactivos reales
                    if (group.id === 'botones') {
                      const rationale =
                        specimensCopy.buttonRationales[index]?.[language] ??
                        note;
                      const isClicked = hapticClick === item.label;

                      return (
                        <div
                          key={item.label}
                          className="microcopy-btn-specimen"
                        >
                          <div className="microcopy-btn-specimen__action">
                            {index === 0 && (
                              <button
                                type="button"
                                className="ui-button ui-button--primary microcopy-btn microcopy-btn--solve"
                                onClick={() => triggerHapticFeedback(item.label)}
                              >
                                <Play size={14} fill="currentColor" /> {label}
                              </button>
                            )}
                            {index === 1 && (
                              <button
                                type="button"
                                className="ui-button microcopy-btn microcopy-btn--compare"
                                onClick={() => triggerHapticFeedback(item.label)}
                              >
                                <GitCompare size={14} /> {label}
                              </button>
                            )}
                            {index === 2 && (
                              <button
                                type="button"
                                className="ui-button ui-button--quiet microcopy-btn microcopy-btn--save"
                                onClick={() => triggerHapticFeedback(item.label)}
                              >
                                <Save size={14} /> {label}
                              </button>
                            )}
                            {index === 3 && (
                              <button
                                type="button"
                                className="ui-button ui-button--danger microcopy-btn microcopy-btn--danger"
                                onClick={() => triggerHapticFeedback(item.label)}
                              >
                                <Trash2 size={14} /> {label}
                              </button>
                            )}

                            {isClicked && (
                              <output
                                className="microcopy-btn__toast"
                                aria-live="polite"
                              >
                                {specimensCopy.clickFeedback[language]}
                              </output>
                            )}
                          </div>

                          <div className="microcopy-btn-specimen__meta">
                            <span className="microcopy-btn-specimen__badge">
                              {specimensCopy.ruleBadge[language]}
                            </span>
                            <p className="microcopy-btn-specimen__rationale">
                              “{note}”
                            </p>
                            <small className="microcopy-btn-specimen__sub">
                              {rationale}
                            </small>
                          </div>
                        </div>
                      );
                    }

                    // 2. Categoría ESTADOS VACÍOS: Tarjetas táctiles ilustradas
                    if (group.id === 'estados') {
                      return (
                        <div
                          key={item.label}
                          className="microcopy-empty-specimen"
                        >
                          <div className="microcopy-empty-specimen__icon">
                            {index === 0 && <Inbox size={18} />}
                            {index === 1 && <BarChart2 size={18} />}
                            {index === 2 && <ArrowDown size={18} />}
                            {index === 3 && <FileCode2 size={18} />}
                          </div>
                          <div className="microcopy-empty-specimen__body">
                            <strong>{label}</strong>
                            <span className="microcopy-specimen__pill">
                              • {note}
                            </span>
                          </div>
                        </div>
                      );
                    }

                    // 3. Categoría AVISOS: Notificaciones semánticas con acento técnico
                    return (
                      <div
                        key={item.label}
                        className={`microcopy-alert-specimen microcopy-alert-specimen--${
                          index === 0
                            ? 'info'
                            : index === 1
                            ? 'warning'
                            : index === 2
                            ? 'science'
                            : 'offline'
                        }`}
                      >
                        <div className="microcopy-alert-specimen__icon">
                          {index === 0 && <HelpCircle size={16} />}
                          {index === 1 && <Clock size={16} />}
                          {index === 2 && <FlaskConical size={16} />}
                          {index === 3 && <WifiOff size={16} />}
                        </div>
                        <div className="microcopy-alert-specimen__body">
                          <strong>{label}</strong>
                          <span className="microcopy-specimen__pill">
                            • {note}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </details>

      <div className="glossary">
        <div className="glossary__head">
          <span className="tag">{copy.glossary}</span>
          <p>{copy.glossaryBody}</p>
        </div>
        <dl className="glossary__grid">
          {GLOSSARY.map((entry, index) => (
            <div key={entry.term} className="glossary__card">
              <div className="glossary__card-head">
                <span className="glossary__card-icon">
                  {index === 0 && <Layers size={14} />}
                  {index === 1 && <Columns size={14} />}
                  {index === 2 && <Triangle size={14} />}
                  {index === 3 && <ArrowDown size={14} />}
                  {index === 4 && <Activity size={14} />}
                  {index === 5 && <CheckCircle2 size={14} />}
                </span>
                <dt>{GLOSSARY_COPY[entry.term].term[language]}</dt>
              </div>
              <dd>{GLOSSARY_COPY[entry.term].meaning[language]}</dd>
            </div>
          ))}
        </dl>
      </div>

      <RuleStrip index={`${RULE_LABEL[language]} 04`}>{copy.rule}</RuleStrip>
    </section>
  );
};
