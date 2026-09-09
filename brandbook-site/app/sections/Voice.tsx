'use client';

import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
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
} from '../brand/copy';
import { RuleStrip, SectionIntro, useBrandbook } from '../brand/ui';

export const Voice = () => {
  const { language } = useBrandbook();
  const [rewrite, setRewrite] = useState<string>(VOICE_REWRITES[0].id);
  const active =
    VOICE_REWRITES.find((item) => item.id === rewrite) ?? VOICE_REWRITES[0];
  const copy = VOICE_COPY[language];
  const activeCopy = VOICE_REWRITE_COPY[active.id];

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

      <details className="content-disclosure">
        <summary>{EXPLORER_COPY[language].microcopy}</summary>
        <div className="microcopy">
          {MICROCOPY.map((group) => (
            <article key={group.id}>
              <div className="microcopy__head">
                <span className="tag">
                  {MICROCOPY_COPY[group.id].group[language]}
                </span>
              </div>
              <ul>
                {group.items.map((item, index) => (
                  <li key={item.label}>
                    <strong>
                      {MICROCOPY_COPY[group.id].items[index].label[language]}
                    </strong>
                    <small>
                      {MICROCOPY_COPY[group.id].items[index].note[language]}
                    </small>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </details>

      <div className="glossary">
        <div className="glossary__head">
          <span className="tag">{copy.glossary}</span>
          <p>{copy.glossaryBody}</p>
        </div>
        <dl>
          {GLOSSARY.map((entry) => (
            <div key={entry.term}>
              <dt>{GLOSSARY_COPY[entry.term].term[language]}</dt>
              <dd>{GLOSSARY_COPY[entry.term].meaning[language]}</dd>
            </div>
          ))}
        </dl>
      </div>

      <RuleStrip index={`${RULE_LABEL[language]} 04`}>{copy.rule}</RuleStrip>
    </section>
  );
};
