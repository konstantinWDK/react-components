'use client';

import { useEffect, useRef, useState } from 'react';
import { LOCALES, SUPPORTED_LOCALES, type Locale } from '../config/site';
import { getLocalizedPath, useTranslations } from '../i18n/translations';
import '../styles/language-picker.css';

export function LanguagePicker({ lang, path }: { lang: Locale; path: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const t = useTranslations(lang);
  const current = LOCALES[lang];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btn.current?.focus();
      }
    };
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={`lang-picker ${open ? 'is-open' : ''}`} ref={ref}>
      <button ref={btn} className="lang-picker__trigger" type="button" aria-expanded={open} aria-haspopup="true" aria-label={t('a11y.selectLanguage')} onClick={() => setOpen(!open)}>
        <span className="lang-picker__flag">{current.flag}</span>
        <span className="lang-picker__code">{current.code.toUpperCase()}</span>
        <svg className="lang-picker__arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      <div className="lang-picker__menu" role="menu">
        {SUPPORTED_LOCALES.map((code) => {
          const l = LOCALES[code];
          const selected = code === lang;
          return (
            <a key={code} href={getLocalizedPath(path, code)} className={`lang-picker__item ${selected ? 'is-active' : ''}`} role="menuitem" hrefLang={code}>
              <span className="lang-picker__flag">{l.flag}</span>
              <span className="lang-picker__name">{l.nativeName}</span>
              {selected && (
                <svg className="lang-picker__check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
