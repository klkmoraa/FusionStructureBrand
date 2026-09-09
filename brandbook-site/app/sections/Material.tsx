'use client';

import { SURFACE_LEVELS } from '../brand/system';
import {
  EXPLORER_COPY,
  MATERIAL_COPY,
  RULE_LABEL,
  SURFACE_LEVEL_COPY,
} from '../brand/copy';
import { RuleStrip, SectionIntro, useBrandbook } from '../brand/ui';

export const Material = () => {
  const { language } = useBrandbook();
  return (
    <section id="materia" className="section material">
      <SectionIntro index="07" compact />
      <details className="content-disclosure">
        <summary>{EXPLORER_COPY[language].details}</summary>
        <dl className="material-definitions">
          {SURFACE_LEVELS.map((item) => (
            <div key={item.id}>
              <dt>{SURFACE_LEVEL_COPY[item.id].name[language]}</dt>
              <dd>
                {SURFACE_LEVEL_COPY[item.id].use[language]} ·{' '}
                {SURFACE_LEVEL_COPY[item.id].rule[language]}
              </dd>
            </div>
          ))}
        </dl>
      </details>
      <RuleStrip index={`${RULE_LABEL[language]} 05`}>
        {MATERIAL_COPY[language].rule}
      </RuleStrip>
    </section>
  );
};
