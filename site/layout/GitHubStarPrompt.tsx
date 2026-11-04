'use client';

import { useEffect, useState } from 'react';
import { siteConfig, type Locale } from '../config/site';
import { useTranslations } from '../i18n/translations';
import '../styles/github-star-prompt.css';

const STORAGE_KEY = 'rck_github_star_prompt_dismissed';
const DISMISS_DAYS = 7;

/** Floating "star us on GitHub" card: appears after a delay or on scroll, dismissible for 7 days. */
export function GitHubStarPrompt({ lang, delayMs = 4000 }: { lang: Locale; delayMs?: number }) {
  const t = useTranslations(lang);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const at = Number(localStorage.getItem(STORAGE_KEY) || 0);
      if (at && (Date.now() - at) / 86400_000 < DISMISS_DAYS) return;
    } catch { /* ignore */ }
    const timer = window.setTimeout(() => setVisible(true), delayMs);
    const onScroll = () => {
      if (window.scrollY > 350) {
        window.clearTimeout(timer);
        setVisible(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [delayMs]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && hide(true);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible]);

  function hide(persist: boolean, until = Date.now()) {
    setVisible(false);
    if (persist) try { localStorage.setItem(STORAGE_KEY, String(until)); } catch { /* ignore */ }
  }

  return (
    <aside className={`gh-prompt ${visible ? 'is-visible' : ''}`} role="dialog" aria-labelledby="gh-prompt-title" aria-hidden={!visible}>
      <div className="gh-prompt__glow" aria-hidden="true" />
      <button type="button" className="gh-prompt__close" aria-label={t('gh.close')} onClick={() => hide(true)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
      </button>
      <div className="gh-prompt__header">
        <div className="gh-prompt__icon-wrap">
          <svg className="gh-star-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
        </div>
        <div className="gh-prompt__titles">
          <span className="gh-prompt__badge">{t('gh.badge')}</span>
          <h4 id="gh-prompt-title" className="gh-prompt__title">{t('gh.title')}</h4>
        </div>
      </div>
      <p className="gh-prompt__desc">{t('gh.desc')}</p>
      <div className="gh-prompt__actions">
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="gh-prompt__btn gh-prompt__btn--star"
          tabIndex={visible ? undefined : -1}
          onClick={() => {
            try { localStorage.setItem(STORAGE_KEY, String(Date.now() + 90 * 86400_000)); } catch { /* ignore */ }
            window.setTimeout(() => hide(false), 800);
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
          <span>{t('gh.star')}</span>
        </a>
        <button type="button" className="gh-prompt__btn gh-prompt__btn--later" onClick={() => hide(true)} tabIndex={visible ? undefined : -1}>
          {t('gh.later')}
        </button>
      </div>
    </aside>
  );
}
