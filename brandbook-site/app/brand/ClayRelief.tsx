'use client';

import { BrandMark } from './marks';

type ClayReliefProps = {
  label: string;
  compact?: boolean;
};

/** Maqueta material editable del gesto de marca, sin fotografía ni raster. */
export const ClayRelief = ({ label, compact = false }: ClayReliefProps) => (
  <section
    className={`clay-relief ${compact ? 'clay-relief--compact' : ''}`}
    aria-label={label}
  >
    <div className="clay-relief__datum" aria-hidden="true">
      <span>x</span>
      <span>y</span>
    </div>
    <div className="clay-relief__object" aria-hidden="true">
      <span className="clay-relief__member clay-relief__member--column" />
      <span className="clay-relief__member clay-relief__member--beam" />
      <span className="clay-relief__member clay-relief__member--arm" />
      <span className="clay-relief__joint clay-relief__joint--a" />
      <span className="clay-relief__joint clay-relief__joint--b" />
      <span className="clay-relief__diagram" />
    </div>
    <span className="clay-relief__stamp" aria-hidden="true">
      <BrandMark size={compact ? 20 : 28} tone="mono" />
    </span>
  </section>
);
