'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Info,
  Sparkles,
} from 'lucide-react';
import { SURFACE_LEVELS } from '../brand/system';
import { MATERIAL_COPY, RULE_LABEL, SURFACE_LEVEL_COPY } from '../brand/copy';
import { RuleStrip, SectionIntro, useBrandbook } from '../brand/ui';

export const Material = () => {
  const { language } = useBrandbook();
  const [level, setLevel] = useState<string>('elevado');
  const active =
    SURFACE_LEVELS.find((item) => item.id === level) ?? SURFACE_LEVELS[0];
  const copy = MATERIAL_COPY[language];
  const activeCopy = SURFACE_LEVEL_COPY[active.id];

  return (
    <section id="materia" className="section material">
      <SectionIntro index="07" compact />

      <div className="material-lab">
        <div className="material-stage">
          <div className="material-stage__mesh" aria-hidden="true" />
          <div className={`material-card material-card--${level}`}>
            <div className="material-card__head">
              <span>{copy.project}</span>
              <span className="cell-state cell-state--ok">{copy.verified}</span>
            </div>
            <strong>{copy.envelope}</strong>
            <div className="material-card__trace" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="material-card__foot">
              <code>Mmax −148.6 kN·m</code>
              <span>v4 · {copy.today} 10:15</span>
            </div>
          </div>
        </div>

        <div className="panel material-controls">
          <div className="panel__label">
            <span>{copy.level}</span>
            <code>data-level</code>
          </div>
          <div className="material-picker">
            {SURFACE_LEVELS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={level === item.id ? 'is-active' : ''}
                onClick={() => setLevel(item.id)}
              >
                <strong>{SURFACE_LEVEL_COPY[item.id].name[language]}</strong>
                <small>{SURFACE_LEVEL_COPY[item.id].use[language]}</small>
              </button>
            ))}
          </div>
          <p className="material-controls__rule">{activeCopy.rule[language]}</p>
        </div>
      </div>

      <div className="components">
        <div className="components__head">
          <span className="tag">{copy.components}</span>
          <h3>{copy.geometry}</h3>
          <p>{copy.geometryBody}</p>
        </div>

        <div className="components__row">
          <article className="component-block">
            <div className="component-block__label">
              <span>{copy.buttons}</span>
              <code>36 px</code>
            </div>
            <div className="button-showcase">
              <button type="button" className="ui-button ui-button--primary">
                <Sparkles size={14} /> {copy.analyze}
              </button>
              <button type="button" className="ui-button">
                {copy.compare}
              </button>
              <button type="button" className="ui-button ui-button--quiet">
                {copy.detail} <ArrowUpRight size={13} />
              </button>
              <button type="button" className="ui-button ui-button--danger">
                {copy.delete}
              </button>
              <button type="button" className="ui-button" disabled>
                {copy.noResults}
              </button>
            </div>
            <p>{copy.buttonRule}</p>
          </article>

          <article className="component-block">
            <div className="component-block__label">
              <span>{copy.inputs}</span>
              <code>{copy.visibleUnit}</code>
            </div>
            <div className="field-showcase">
              <label className="field">
                <span>{copy.load}</span>
                <span className="field__control">
                  <input type="text" defaultValue="8.00" inputMode="decimal" />
                  <code>kN/m</code>
                </span>
              </label>
              <label className="field field--warn">
                <span>{copy.length}</span>
                <span className="field__control">
                  <input type="text" defaultValue="12" inputMode="decimal" />
                  <code>?</code>
                </span>
                <small>{copy.unitRule}</small>
              </label>
            </div>
            <p>{copy.fieldRule}</p>
          </article>
        </div>

        <div className="feedback-strip">
          <div className="feedback feedback--ok">
            <CheckCircle2 size={16} />
            <span>
              <strong>{copy.ready}</strong>
              <small>{copy.readyBody}</small>
            </span>
          </div>
          <div className="feedback feedback--warn">
            <AlertTriangle size={16} />
            <span>
              <strong>{copy.review}</strong>
              <small>{copy.reviewBody}</small>
            </span>
          </div>
          <div className="feedback feedback--info">
            <Info size={16} />
            <span>
              <strong>{copy.context}</strong>
              <small>{copy.contextBody}</small>
            </span>
          </div>
        </div>

        <div className="table-demo">
          <div className="table-demo__head">
            <span>{copy.tables}</span>
            <code>{copy.headerUnit}</code>
          </div>
          <div className="table-demo__scroll">
            <table>
              <thead>
                <tr>
                  <th>{copy.member}</th>
                  <th>
                    N <span>kN</span>
                  </th>
                  <th>
                    V <span>kN</span>
                  </th>
                  <th>
                    M <span>kN·m</span>
                  </th>
                  <th>{copy.result}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>B1</td>
                  <td>248.20</td>
                  <td>96.40</td>
                  <td>−148.60</td>
                  <td>
                    <span className="cell-state cell-state--ok">
                      {copy.verified}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>B4</td>
                  <td>112.05</td>
                  <td>44.10</td>
                  <td>−61.30</td>
                  <td>
                    <span className="cell-state cell-state--warn">
                      {copy.check}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>C2</td>
                  <td>−318.44</td>
                  <td>12.80</td>
                  <td>28.90</td>
                  <td>
                    <span className="cell-state cell-state--ok">
                      {copy.verified}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p className="table-demo__note">
        {copy.tableRule} <code>{copy.tableCalculation}</code> {copy.and}{' '}
        <code>{copy.tableReview}</code> {copy.describeCalculation}{' '}
        <code>{copy.moduleAvailable}</code> {copy.and}{' '}
        <code>{copy.moduleExperimental}</code> {copy.describeModule}
      </p>

      <RuleStrip index={`${RULE_LABEL[language]} 07`}>{copy.rule}</RuleStrip>
    </section>
  );
};
