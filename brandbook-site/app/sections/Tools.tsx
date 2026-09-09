'use client';

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { StatusPill, ToolTile } from '../brand/marks';
import { TOOLS, type StatusId, type Tool } from '../brand/catalog';
import {
  MOTHER_BRAND_ID,
  PRODUCT_FAMILY_IDS,
  type FamilyId,
} from '../brand/generated/palette';
import {
  FAMILY_COPY,
  RULE_LABEL,
  STATUS_COPY,
  STATUS_MEANING_COPY,
  STATUS_RULE_COPY,
  TOOLS_COPY,
  TOOL_CODE_COPY,
  TOOL_COPY,
} from '../brand/copy';
import { RuleStrip, SectionIntro, useBrandbook } from '../brand/ui';

type FamilyFilter = FamilyId | 'todas';
type StatusFilter = StatusId | 'todos';

const STATUS_ORDER: readonly StatusId[] = [
  'disponible',
  'experimental',
  'planeado',
  'no-comprometido',
];

const ToolDetail = ({
  tool,
  onClose,
  language,
}: {
  tool: Tool;
  onClose: () => void;
  language: 'es' | 'en';
}) => {
  const panel = useRef<HTMLElement | null>(null);
  const toolCopy = TOOL_COPY[tool.id];
  const copy = TOOLS_COPY[language];

  useEffect(() => {
    panel.current?.focus();
  }, [tool.id]);

  return (
    <aside
      ref={panel}
      tabIndex={-1}
      className={`tool-detail family--${tool.family}`}
      aria-label={`${copy.detail} ${toolCopy.name[language]}`}
    >
      <div className="tool-detail__head">
        <ToolTile glyph={tool.glyph} family={tool.family} size={54} />
        <div>
          <code>{TOOL_CODE_COPY[tool.code]?.[language] ?? tool.code}</code>
          <h3>{toolCopy.name[language]}</h3>
          <p>{toolCopy.summary[language]}</p>
        </div>
        <button
          type="button"
          className="icon-button"
          onClick={onClose}
          aria-label={copy.close}
        >
          <X size={16} />
        </button>
      </div>
      <dl className="tool-detail__body">
        <div>
          <dt>{copy.today}</dt>
          <dd>{toolCopy.today[language]}</dd>
        </div>
        <div>
          <dt>{copy.next}</dt>
          <dd>{toolCopy.next[language]}</dd>
        </div>
        <div>
          <dt>{copy.gate}</dt>
          <dd>{toolCopy.gate[language]}</dd>
        </div>
        <div>
          <dt>{copy.category}</dt>
          <dd>
            {toolCopy.reference[language]}
            <small>{copy.note}</small>
          </dd>
        </div>
      </dl>
      <footer className="tool-detail__foot">
        <StatusPill status={tool.status} language={language} />
        <span>{STATUS_RULE_COPY[tool.status][language]}</span>
      </footer>
    </aside>
  );
};

export const Tools = () => {
  const { language } = useBrandbook();
  const [family, setFamily] = useState<FamilyFilter>('todas');
  const [status, setStatus] = useState<StatusFilter>('todos');
  const [query, setQuery] = useState('');
  const [openTool, setOpenTool] = useState<string | null>(null);
  const copy = TOOLS_COPY[language];

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      if (family !== 'todas' && tool.family !== family) return false;
      if (status !== 'todos' && tool.status !== status) return false;
      if (!needle) return true;
      const localized = TOOL_COPY[tool.id];
      return [
        tool.name,
        tool.code,
        tool.role,
        tool.summary,
        tool.reference,
        localized.name[language],
        localized.role[language],
        localized.summary[language],
        localized.reference[language],
      ]
        .join(' ')
        .toLowerCase()
        .includes(needle);
    });
  }, [family, language, status, query]);

  const selected = visible.find((tool) => tool.id === openTool) ?? null;

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenTool(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <section id="herramientas" className="section tools">
      <SectionIntro
        index="03"
        eyebrow="Herramientas · catálogo"
        title="Seis familias, una marca madre."
        body="Análisis, modelo, civil, proyecto, conexiones y aprendizaje comparten una estructura visual. Las herramientas permanecen trazables y declaran su estado sin convertirse en una séptima identidad."
      />

      <div className="tools__controls">
        <fieldset className="filter-row">
          <legend className="visually-hidden">{copy.familyFilter}</legend>
          <button
            type="button"
            className={`chip ${family === 'todas' ? 'is-active' : ''}`}
            onClick={() => setFamily('todas')}
          >
            {copy.all} <span>{TOOLS.length}</span>
          </button>
          <button
            type="button"
            className={`chip family--${MOTHER_BRAND_ID} ${family === MOTHER_BRAND_ID ? 'is-active' : ''}`}
            onClick={() => setFamily(MOTHER_BRAND_ID)}
          >
            <span className="chip__swatch" aria-hidden="true" />
            {FAMILY_COPY[MOTHER_BRAND_ID].label[language]}
            <span>
              {TOOLS.filter((tool) => tool.family === MOTHER_BRAND_ID).length}
            </span>
          </button>
          {PRODUCT_FAMILY_IDS.map((id) => (
            <button
              key={id}
              type="button"
              className={`chip family--${id} ${family === id ? 'is-active' : ''}`}
              onClick={() => setFamily(id)}
            >
              <span className="chip__swatch" aria-hidden="true" />
              {FAMILY_COPY[id].label[language]}
              <span>{TOOLS.filter((tool) => tool.family === id).length}</span>
            </button>
          ))}
        </fieldset>

        <div className="tools__controls-row">
          <fieldset className="filter-row filter-row--status">
            <legend className="visually-hidden">{copy.statusFilter}</legend>
            <button
              type="button"
              className={`chip chip--quiet ${status === 'todos' ? 'is-active' : ''}`}
              onClick={() => setStatus('todos')}
            >
              {copy.anyStatus}
            </button>
            {STATUS_ORDER.map((id) => {
              const count = TOOLS.filter((tool) => tool.status === id).length;
              return (
                <button
                  key={id}
                  type="button"
                  disabled={count === 0}
                  className={`chip chip--status status--${id} ${status === id ? 'is-active' : ''}`}
                  onClick={() => setStatus(id)}
                >
                  <span className="status__dot" aria-hidden="true" />
                  {STATUS_COPY[id][language]} <span>{count}</span>
                </button>
              );
            })}
          </fieldset>

          <label className="search">
            <Search size={15} aria-hidden="true" />
            <input
              type="search"
              value={query}
              placeholder={copy.search}
              onChange={(event) => setQuery(event.target.value)}
            />
            <span className="visually-hidden">{copy.searchLabel}</span>
          </label>
        </div>
      </div>

      <p className="tools__count" aria-live="polite">
        {visible.length === TOOLS.length
          ? `${TOOLS.length} ${copy.surfaces}`
          : `${visible.length} ${copy.of} ${TOOLS.length} ${copy.surfaces}`}
      </p>

      <ul className="tool-grid">
        {visible.map((tool) => {
          const toolCopy = TOOL_COPY[tool.id];
          return (
            <Fragment key={tool.id}>
              <li>
                <button
                  type="button"
                  className={`tool-card family--${tool.family} ${openTool === tool.id ? 'is-open' : ''}`}
                  onClick={() =>
                    setOpenTool(openTool === tool.id ? null : tool.id)
                  }
                  aria-expanded={openTool === tool.id}
                >
                  <span className="tool-card__top">
                    <ToolTile
                      glyph={tool.glyph}
                      family={tool.family}
                      size={48}
                    />
                    <code>
                      {TOOL_CODE_COPY[tool.code]?.[language] ?? tool.code}
                    </code>
                  </span>
                  <span className="tool-card__name">
                    <strong>{toolCopy.name[language]}</strong>
                    <small>{toolCopy.role[language]}</small>
                  </span>
                  <span className="tool-card__summary">
                    {toolCopy.summary[language]}
                  </span>
                  <span className="tool-card__reference">
                    <small>{copy.category}</small>
                    {toolCopy.reference[language]}
                  </span>
                  <span className="tool-card__foot">
                    <StatusPill
                      status={tool.status}
                      language={language}
                      compact
                    />
                    <span className="tool-card__more">{copy.viewGate}</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </button>
              </li>
              {selected?.id === tool.id ? (
                <li className="tool-grid__detail">
                  <ToolDetail
                    tool={selected}
                    onClose={() => setOpenTool(null)}
                    language={language}
                  />
                </li>
              ) : null}
            </Fragment>
          );
        })}
      </ul>

      {visible.length === 0 ? (
        <p className="empty-state">{copy.empty}</p>
      ) : null}

      <div className="status-board">
        <div className="status-board__head">
          <span className="tag">{copy.vocabulary}</span>
          <p>{copy.vocabularyBody}</p>
        </div>
        {STATUS_ORDER.map((id) => (
          <div key={id} className="status-board__row">
            <StatusPill status={id} language={language} />
            <p>{STATUS_MEANING_COPY[id][language]}</p>
            <small>{STATUS_RULE_COPY[id][language]}</small>
          </div>
        ))}
      </div>

      <RuleStrip index={`${RULE_LABEL[language]} 03`}>{copy.rule}</RuleStrip>
    </section>
  );
};
