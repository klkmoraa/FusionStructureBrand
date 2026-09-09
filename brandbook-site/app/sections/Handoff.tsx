'use client';

import { Check, Download, FileDown } from 'lucide-react';
import {
  EASINGS,
  ATLAS_MOTION_TOKENS,
  HANDOFF_CHECKS,
  MATERIAL_TOKENS,
  MOTION_TOKENS,
  NEUTRALS,
  SIGNALS,
} from '../brand/system';
import {
  FAMILY_COLORS,
  MOTHER_BRAND_ID,
  PRODUCT_FAMILY_IDS,
  type FamilyId,
} from '../brand/generated/palette';
import { TOOLS } from '../brand/catalog';
import { CopyChip, SectionIntro, useBrandbook } from '../brand/ui';
import {
  BRAND_ASSET_COPY,
  FAMILY_COPY,
  HANDOFF_CHECK_COPY,
  HANDOFF_COPY,
  SYSTEM_MATURITY,
  type Language,
} from '../brand/copy';
import { publicAsset } from '../brand/paths';

const BRAND_ASSETS = [
  {
    id: 'signal',
    href: publicAsset('/brand/fusionstructure-mark.svg'),
  },
  {
    id: 'mono',
    href: publicAsset('/brand/fusionstructure-mark-mono.svg'),
  },
  {
    id: 'inverse',
    href: publicAsset('/brand/fusionstructure-mark-inverse.svg'),
  },
  {
    id: 'icon',
    href: publicAsset('/brand/fusionstructure-app-icon.svg'),
  },
  {
    id: 'lockup',
    href: publicAsset('/brand/fusionstructure-lockup.svg'),
  },
  {
    id: 'favicon',
    href: publicAsset('/favicon.svg'),
  },
] as const;

const CHECK_BLOCKS = [
  'sistema',
  'sistema',
  'lenguaje',
  'interaccion',
  'patrones',
  'lenguaje',
  'interaccion',
] as const;

const buildTokenSheet = (language: Language) => {
  const lines: string[] = [':root {'];
  const nightLabel = language === 'es' ? 'noche' : 'night';
  for (const signal of SIGNALS) {
    lines.push(
      `  ${signal.token}: ${signal.day}; /* ${nightLabel} ${signal.night} */`,
    );
  }
  for (const step of NEUTRALS) {
    lines.push(
      `  --fs-neutral-${step.step}: ${step.day}; /* ${nightLabel} ${step.night} */`,
    );
  }
  for (const id of Object.keys(FAMILY_COLORS) as FamilyId[]) {
    lines.push(
      `  --fs-family-${id}: ${FAMILY_COLORS[id].day}; /* ${nightLabel} ${FAMILY_COLORS[id].night} */`,
    );
  }
  for (const token of MOTION_TOKENS) {
    lines.push(`  ${token.token}: ${token.value};`);
  }
  for (const token of ATLAS_MOTION_TOKENS) {
    lines.push(`  ${token.token}: ${token.value};`);
  }
  for (const easing of EASINGS) {
    lines.push(`  ${easing.token}: ${easing.value};`);
  }
  for (const material of MATERIAL_TOKENS) {
    const night =
      'night' in material ? ` /* ${nightLabel} ${material.night} */` : '';
    lines.push(`  ${material.token}: ${material.value};${night}`);
  }
  lines.push('}');
  return lines.join('\n');
};

export const Handoff = () => {
  const { copyValue, language } = useBrandbook();
  const sheet = buildTokenSheet(language);
  const preview = sheet.split('\n').slice(0, 12).join('\n');
  const copy = HANDOFF_COPY[language];

  return (
    <section id="entrega" className="section handoff">
      <SectionIntro index="12" />

      <div className="handoff__grid">
        <article className="panel handoff__tokens">
          <div className="panel__label">
            <span>{copy.tokens}</span>
            <code>css</code>
          </div>
          <pre>
            <code>{preview}</code>
          </pre>
          <button
            type="button"
            className="action action--primary"
            onClick={() => copyValue(sheet, copy.tokens)}
          >
            <Download size={15} /> {copy.copySheet}
          </button>
          <p className="handoff__tokens-note">
            {copy.tokensNote} <code>src/design-system/tokens.css</code>{' '}
            {copy.tokensRest}
          </p>
        </article>

        <article className="panel handoff__checks">
          <div className="panel__label">
            <span>{copy.checks}</span>
            <code>{HANDOFF_CHECKS.length}</code>
          </div>
          <ul>
            {HANDOFF_CHECKS.map((check, index) => (
              <li key={check}>
                <Check size={15} aria-hidden="true" />
                <a href={`#bloque-${CHECK_BLOCKS[index]}`}>
                  {HANDOFF_CHECK_COPY[index][language]}
                </a>
              </li>
            ))}
          </ul>
          <p>
            {copy.checksNote} (<code>npm run check</code>) {copy.checksRest}
          </p>
        </article>

        <article className="panel handoff__assets">
          <div className="panel__label">
            <span>{copy.assets}</span>
            <code>svg</code>
          </div>
          <ul>
            {BRAND_ASSETS.map((asset) => (
              <li key={asset.href}>
                <a href={asset.href} download>
                  <FileDown size={14} aria-hidden="true" />
                  <span>
                    <strong>{BRAND_ASSET_COPY[asset.id].name[language]}</strong>
                    <small>{BRAND_ASSET_COPY[asset.id].note[language]}</small>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p>
            {copy.assetNote} <code>/brand/tools/</code> {copy.assetRest}{' '}
            <code>npm run brand:assets</code>
            {copy.assetEnd}
          </p>
        </article>

        <article className="panel handoff__inventory">
          <div className="panel__label">
            <span>{copy.inventory}</span>
            <code>
              {TOOLS.length} {copy.surfaces}
            </code>
          </div>
          <ul>
            {[MOTHER_BRAND_ID, ...PRODUCT_FAMILY_IDS].map((id) => (
              <li key={id} className={`family--${id}`}>
                <span className="handoff__swatch" aria-hidden="true" />
                <strong>{FAMILY_COPY[id].label[language]}</strong>
                <small>{FAMILY_COPY[id].purpose[language]}</small>
                <code>{TOOLS.filter((tool) => tool.family === id).length}</code>
              </li>
            ))}
          </ul>
          <div className="handoff__chips">
            <CopyChip
              value="brandbook-site/app/brand/system.ts"
              label="system.ts"
            />
            <CopyChip
              value="brandbook-site/scripts/glyph-library.mjs"
              label="glyph-library.mjs"
            />
          </div>
        </article>
      </div>

      <div className="handoff__governance">
        <article className="panel handoff__maturity">
          <div className="panel__label">
            <span>{copy.maturity}</span>
            <code>draft → stable</code>
          </div>
          <ul className="maturity-scale">
            {SYSTEM_MATURITY.map((item, index) => (
              <li
                className={`maturity-step maturity-step--${item.id}`}
                key={item.id}
              >
                <span className="maturity-step__index">0{index + 1}</span>
                <strong>{item.label[language]}</strong>
                <small>{item.detail[language]}</small>
              </li>
            ))}
          </ul>
        </article>
        <article className="panel handoff__metadata">
          <div className="panel__label">
            <span>{copy.ownership}</span>
            <code>2026.1</code>
          </div>
          <dl>
            <div>
              <dt>{copy.owner}</dt>
              <dd>FusionStructure / core team</dd>
            </div>
            <div>
              <dt>{copy.source}</dt>
              <dd>DTCG-ready tokens → CSS / TS / Figma</dd>
            </div>
            <div>
              <dt>{copy.changelog}</dt>
              <dd>{copy.changelogValue}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
};
