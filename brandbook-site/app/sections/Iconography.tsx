'use client';

import { Glyph, MiniDiagram } from '../brand/marks';
import { TOOLS } from '../brand/catalog';
import { SIGNALS } from '../brand/system';
import {
  DRAWING_RULE_COPY,
  ICONOGRAPHY_COPY,
  RULE_LABEL,
  SIGNAL_COPY,
  SIGNAL_UNIT_COPY,
  TOOL_CODE_COPY,
  TOOL_COPY,
} from '../brand/copy';
import { RuleStrip, SectionIntro, useBrandbook } from '../brand/ui';

const DRAWING_RULES = [
  {
    index: '01',
    title: 'Retícula de 48',
    body: 'Todo glifo se dibuja en 48u con 8u de aire. Las líneas caen en múltiplos de 1u.',
  },
  {
    index: '02',
    title: 'Trazo 2.6',
    body: 'Un solo grosor, extremos redondos y uniones a inglete. El peso no jerarquiza: lo hace la posición.',
  },
  {
    index: '03',
    title: 'Dos tintas',
    body: 'Color de familia para la estructura del glifo; grafito para el dato que la ocupa.',
  },
  {
    index: '04',
    title: 'Nudo visible',
    body: 'Donde dos miembros se encuentran hay un punto. El encuentro es información.',
  },
  {
    index: '05',
    title: 'Sin metáforas prestadas',
    body: 'Nada de estetoscopios, libros ni cascos: el glifo dibuja el objeto real del dominio.',
  },
  {
    index: '06',
    title: 'Prueba a 20 px',
    body: 'Si a 20 px dos glifos se confunden, se rediseña el que llegó después.',
  },
] as const;

export const Iconography = () => {
  const { language } = useBrandbook();
  const copy = ICONOGRAPHY_COPY[language];
  return (
    <section id="iconografia" className="section iconography">
      <SectionIntro index="08" compact />

      <ul className="glyph-grid">
        {TOOLS.map((tool) => (
          <li key={tool.id} className={`glyph-cell family--${tool.family}`}>
            <Glyph id={tool.glyph} size={38} />
            <strong>{TOOL_COPY[tool.id].name[language]}</strong>
            <code>{TOOL_CODE_COPY[tool.code]?.[language] ?? tool.code}</code>
          </li>
        ))}
      </ul>

      <div className="drawing-rules">
        {DRAWING_RULES.map((rule) => (
          <article key={rule.index}>
            <span>{rule.index}</span>
            <strong>{DRAWING_RULE_COPY[rule.index].title[language]}</strong>
            <p>{DRAWING_RULE_COPY[rule.index].body[language]}</p>
          </article>
        ))}
      </div>

      <div className="diagram-language">
        <div className="diagram-language__head">
          <span className="tag">{copy.diagrams}</span>
          <h3>{copy.title}</h3>
          <p>{copy.body}</p>
        </div>
        <div className="diagram-grid">
          {SIGNALS.map((signal) => (
            <figure key={signal.id} className={`signal--${signal.id}`}>
              <figcaption>
                <strong>{SIGNAL_COPY[signal.id].name[language]}</strong>
                <code>
                  {signal.short} · {SIGNAL_UNIT_COPY[signal.id][language]}
                </code>
              </figcaption>
              <MiniDiagram type={signal.id} />
              <small>{SIGNAL_COPY[signal.id].description[language]}</small>
            </figure>
          ))}
        </div>
      </div>

      <RuleStrip index={`${RULE_LABEL[language]} 08`}>{copy.rule}</RuleStrip>
    </section>
  );
};
