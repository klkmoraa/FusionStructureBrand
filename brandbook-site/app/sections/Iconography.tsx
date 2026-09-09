'use client';

import { Glyph } from '../brand/marks';
import { TOOLS } from '../brand/catalog';
import {
  DRAWING_RULE_COPY,
  EXPLORER_COPY,
  TOOL_CODE_COPY,
  TOOL_COPY,
} from '../brand/copy';
import { SectionIntro, useBrandbook } from '../brand/ui';

const DRAWING_RULES = ['01', '02', '03', '04', '05', '06'] as const;

const FLAGSHIP_IDS = ['solver2d', 'space3d', 'bridge', 'gantt', 'nodes', 'manual'];

export const Iconography = () => {
  const { language } = useBrandbook();
  const flagships = TOOLS.filter((tool) => FLAGSHIP_IDS.includes(tool.id));

  return (
    <section id="iconografia" className="section iconography">
      <SectionIntro index="08" compact />

      <div className="clay-glyph-showcase">
        {flagships.map((tool) => (
          <article key={tool.id} className={`clay-glyph-card family--${tool.family}`}>
            <div className="clay-glyph-card__icon" aria-hidden="true">
              <Glyph id={tool.glyph} size={32} />
            </div>
            <strong style={{ fontSize: 13.5 }}>{TOOL_COPY[tool.id].name[language]}</strong>
            <code style={{ fontSize: 11, color: 'var(--ink-secondary)' }}>
              {TOOL_CODE_COPY[tool.code]?.[language] ?? tool.code}
            </code>
          </article>
        ))}
      </div>

      <details className="content-disclosure">
        <summary>{EXPLORER_COPY[language].glyphs}</summary>
        <ul className="glyph-grid">
          {TOOLS.map((tool) => (
            <li key={tool.id} className={`glyph-cell family--${tool.family}`}>
              <Glyph id={tool.glyph} size={38} />
              <strong>{TOOL_COPY[tool.id].name[language]}</strong>
              <code>{TOOL_CODE_COPY[tool.code]?.[language] ?? tool.code}</code>
            </li>
          ))}
        </ul>
      </details>

      <details className="content-disclosure">
        <summary>{EXPLORER_COPY[language].drawing}</summary>
        <div className="drawing-rules">
          {DRAWING_RULES.map((rule) => (
            <article key={rule}>
              <span>{rule}</span>
              <strong>{DRAWING_RULE_COPY[rule].title[language]}</strong>
              <p>{DRAWING_RULE_COPY[rule].body[language]}</p>
            </article>
          ))}
        </div>
      </details>
    </section>
  );
};
