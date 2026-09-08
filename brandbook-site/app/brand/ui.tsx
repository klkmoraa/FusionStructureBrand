'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';
import type { SignalId } from './system';
import { SECTION_INTROS, type Language } from './copy';

export type Theme = 'dia' | 'noche';
export type MotionMode = 'activo' | 'calma';

type BrandbookState = {
  theme: Theme;
  motionMode: MotionMode;
  language: Language;
  activeSignal: SignalId;
  copiedValue: string;
  copiedLabel: string;
  setActiveSignal: (signal: SignalId) => void;
  setLanguage: (language: Language) => void;
  copyValue: (value: string, label?: string) => void;
};

const noop = () => {};

export const BrandbookContext = createContext<BrandbookState>({
  theme: 'dia',
  motionMode: 'activo',
  language: 'es',
  activeSignal: 'axial',
  copiedValue: '',
  copiedLabel: '',
  setActiveSignal: noop,
  setLanguage: noop,
  copyValue: noop,
});

export const useBrandbook = () => useContext(BrandbookContext);

export const SectionIntro = ({
  index,
  eyebrow,
  title,
  body,
  aside,
}: {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  aside?: ReactNode;
}) => {
  const { language } = useBrandbook();
  const localized = SECTION_INTROS[index];
  const copy = localized
    ? {
        eyebrow: localized.eyebrow[language],
        title: localized.title[language],
        body: localized.body[language],
      }
    : { eyebrow, title, body };

  return (
    <header className="section-intro">
      <div className="section-intro__meta">
        <span>{index}</span>
        <span>{copy.eyebrow}</span>
      </div>
      <div className="section-intro__body">
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
      </div>
      {aside ? <div className="section-intro__aside">{aside}</div> : null}
    </header>
  );
};

export const RuleStrip = ({
  index,
  children,
}: {
  index: string;
  children: ReactNode;
}) => (
  <p className="rule-strip">
    <span className="rule-strip__index">{index}</span>
    <span className="rule-strip__text">{children}</span>
    <span className="rule-strip__line" aria-hidden="true" />
  </p>
);

export const CopyChip = ({
  value,
  label,
}: {
  value: string;
  label?: string;
}) => {
  const { copyValue, copiedValue, language } = useBrandbook();
  const copied = copiedValue === value;
  const labelText = label ?? value;
  return (
    <button
      type="button"
      className={`copy-chip ${copied ? 'is-copied' : ''}`}
      onClick={() => copyValue(value)}
      title={`${language === 'es' ? 'Copiar' : 'Copy'} ${labelText}`}
    >
      <code>{labelText}</code>
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  );
};

export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="eyebrow">
    <span className="eyebrow__marker" aria-hidden="true" />
    {children}
  </p>
);
