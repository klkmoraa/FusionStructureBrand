'use client';

import {
  useCallback,
  useEffect,
  Fragment,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import {
  ChevronRight,
  Gauge,
  Languages,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import { BrandMark } from './brand/marks';
import {
  BRANDBOOK_BLOCKS,
  type BrandbookBlockId,
  type SectionId,
  type SignalId,
} from './brand/system';
import { BLOCK_COPY, UI_COPY, type Language } from './brand/copy';
import { BrandbookContext, type MotionMode, type Theme } from './brand/ui';
import { Hero } from './sections/Hero';
import { Identity } from './sections/Identity';
import { Tools } from './sections/Tools';
import { Color } from './sections/Color';
import { Typography } from './sections/Typography';
import { Motion } from './sections/Motion';
import { Material } from './sections/Material';
import { Iconography } from './sections/Iconography';
import { Patterns } from './sections/Patterns';
import { References } from './sections/References';
import { Voice } from './sections/Voice';
import { Handoff } from './sections/Handoff';

/** Consulta una media query sin sincronizar estado dentro de un efecto. */
const subscribeToQuery = (query: string) => (onChange: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
};

const useMediaQuery = (query: string) =>
  useSyncExternalStore(
    subscribeToQuery(query),
    () => window.matchMedia(query).matches,
    () => false,
  );

export default function Brandbook() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersCalm = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [themeChoice, setThemeChoice] = useState<Theme | null>(null);
  const [motionChoice, setMotionChoice] = useState<MotionMode | null>(null);
  const [language, setLanguage] = useState<Language>('es');
  const theme: Theme = themeChoice ?? (prefersDark ? 'noche' : 'dia');
  const motionMode: MotionMode =
    motionChoice ?? (prefersCalm ? 'calma' : 'activo');
  const copy = UI_COPY[language];
  const [activeBlock, setActiveBlock] = useState<BrandbookBlockId>('norte');
  const [activeSignal, setActiveSignal] = useState<SignalId>('axial');
  const [copiedValue, setCopiedValue] = useState('');
  const [copiedLabel, setCopiedLabel] = useState('');
  const [copyFailed, setCopyFailed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const copyTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id)
          setActiveBlock(
            visible.target.id.replace('bloque-', '') as BrandbookBlockId,
          );
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.02, 0.15, 0.4] },
    );
    for (const { id } of BRANDBOOK_BLOCKS) {
      const node = document.getElementById(`bloque-${id}`);
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            reveal.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.06 },
    );
    // Solo se oculta lo que está debajo del pliegue: si alguien llega con un
    // enlace directo, el contenido anterior ya está visible.
    for (const node of document.querySelectorAll('.section > *')) {
      if (node.getBoundingClientRect().top <= window.innerHeight) continue;
      node.classList.add('reveal');
      reveal.observe(node);
    }
    return () => reveal.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(1, window.scrollY / height) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(
    () => () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    },
    [],
  );

  const goTo = useCallback(
    (id: BrandbookBlockId) => {
      setMenuOpen(false);
      document.getElementById(`bloque-${id}`)?.scrollIntoView({
        behavior: motionMode === 'calma' ? 'auto' : 'smooth',
        block: 'start',
      });
    },
    [motionMode],
  );

  const renderTopic = (id: SectionId) => {
    switch (id) {
      case 'norte':
        return <Hero />;
      case 'identidad':
        return <Identity />;
      case 'herramientas':
        return <Tools />;
      case 'color':
        return <Color />;
      case 'tipografia':
        return <Typography />;
      case 'movimiento':
        return <Motion />;
      case 'materia':
        return <Material />;
      case 'iconografia':
        return <Iconography />;
      case 'patrones':
        return <Patterns />;
      case 'referencias':
        return <References />;
      case 'voz':
        return <Voice />;
      case 'entrega':
        return <Handoff />;
    }
  };

  // El aviso muestra una etiqueta corta; el portapapeles se queda con el
  // contenido completo, que puede ser una hoja de tokens entera. Si el
  // navegador rechaza la escritura, el aviso lo dice en lugar de confirmar
  // una copia que no ocurrió.
  const copyValue = useCallback((value: string, label?: string) => {
    const announce = (ok: boolean) => {
      setCopiedValue(ok ? value : '');
      setCopiedLabel(ok ? (label ?? value) : 'No se pudo copiar');
      setCopyFailed(!ok);
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => {
        setCopiedValue('');
        setCopiedLabel('');
        setCopyFailed(false);
      }, 1900);
    };

    const write = navigator.clipboard?.writeText(value);
    if (!write) {
      announce(false);
      return;
    }
    write.then(() => announce(true)).catch(() => announce(false));
  }, []);

  const contextValue = useMemo(
    () => ({
      theme,
      motionMode,
      language,
      activeSignal,
      copiedValue,
      copiedLabel,
      setActiveSignal,
      setLanguage,
      copyValue,
    }),
    [
      theme,
      motionMode,
      language,
      activeSignal,
      copiedValue,
      copiedLabel,
      copyValue,
    ],
  );

  return (
    <BrandbookContext.Provider value={contextValue}>
      <div
        className={`brandbook atlas brandbook--${theme} ${motionMode === 'calma' ? 'brandbook--calma' : ''}`}
      >
        <a className="skip-link" href="#bloque-norte">
          {copy.skip}
        </a>

        <header className="topbar">
          <button
            type="button"
            className="topbar__brand"
            onClick={() => goTo('norte')}
          >
            <BrandMark size={26} />
            <span className="topbar__name">FusionStructure</span>
            <span className="topbar__slash">/</span>
            <span className="topbar__sub">Brandbook</span>
          </button>

          <p className="topbar__center">
            <span className="live-dot" aria-hidden="true" />
            {copy.edition} · <code>01—08</code>
          </p>

          <div className="topbar__actions">
            <button
              type="button"
              className="top-control"
              aria-label={copy.changeLanguage}
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            >
              <Languages size={14} />
              <span>{language.toUpperCase()}</span>
            </button>
            <button
              type="button"
              className="top-control"
              aria-pressed={motionMode === 'calma'}
              aria-label={
                motionMode === 'calma' ? copy.enableMotion : copy.reduceMotion
              }
              onClick={() =>
                setMotionChoice(motionMode === 'activo' ? 'calma' : 'activo')
              }
            >
              <Gauge size={14} />
              <span>{motionMode === 'calma' ? copy.calm : copy.active}</span>
            </button>
            <button
              type="button"
              className="top-control"
              onClick={() => setThemeChoice(theme === 'dia' ? 'noche' : 'dia')}
              aria-label={`${copy.themeToggle ?? (language === 'es' ? 'Cambiar a tema' : 'Change theme')} ${theme === 'dia' ? copy.night : copy.day}`}
            >
              {theme === 'dia' ? <Moon size={14} /> : <Sun size={14} />}
              <span>{theme === 'dia' ? copy.day : copy.night}</span>
            </button>
            <button
              type="button"
              className="top-control top-control--menu"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? copy.closeIndex : copy.openIndex}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>

          <span
            className="topbar__progress"
            style={{ transform: `scaleX(${progress})` }}
          />
        </header>

        <div className="frame">
          <aside className={`index-rail ${menuOpen ? 'is-open' : ''}`}>
            <div className="index-rail__head">
              <span>{copy.index}</span>
              <code>{BRANDBOOK_BLOCKS.length}</code>
            </div>
            <nav aria-label={copy.indexAria}>
              {BRANDBOOK_BLOCKS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`index-link ${activeBlock === item.id ? 'is-active' : ''}`}
                  aria-current={
                    activeBlock === item.id ? 'location' : undefined
                  }
                  onClick={() => goTo(item.id)}
                >
                  <span className="index-link__number">{item.index}</span>
                  <span className="index-link__copy">
                    <strong>{BLOCK_COPY[item.id].label[language]}</strong>
                    <small>{BLOCK_COPY[item.id].detail[language]}</small>
                  </span>
                  <ChevronRight size={13} aria-hidden="true" />
                </button>
              ))}
            </nav>
            <div className="index-rail__foot">
              <p>{copy.indexDescription}</p>
              <span>
                FS · {copy.direction} 04 · {copy.experimental}
              </span>
            </div>
          </aside>

          <main className="content">
            {BRANDBOOK_BLOCKS.map((block) => (
              <div
                id={`bloque-${block.id}`}
                className="atlas-block"
                key={block.id}
              >
                {block.sectionIds.map((sectionId) => (
                  <Fragment key={sectionId}>{renderTopic(sectionId)}</Fragment>
                ))}
              </div>
            ))}

            <footer className="footer">
              <div className="footer__brand">
                <BrandMark size={30} />
                <strong>FusionStructure</strong>
              </div>
              <p>Make complexity legible.</p>
              <span>Brandbook 2026 · {copy.footerLine}</span>
            </footer>
          </main>
        </div>

        <output
          className={`toast ${copiedLabel ? 'is-visible' : ''} ${copyFailed ? 'toast--error' : ''}`}
          aria-live="polite"
        >
          {copyFailed ? (
            <span>{copy.copyFailed}</span>
          ) : (
            <span>
              {copy.copied} <code>{copiedLabel}</code>
            </span>
          )}
        </output>
      </div>
    </BrandbookContext.Provider>
  );
}
