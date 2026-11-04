'use client';

import { useEffect, useState } from 'react';
import { siteConfig, type Locale } from '../config/site';
import '../styles/star-goal-banner.css';

/**
 * StarGoalBanner — dismissible bar: "1 GitHub star = 1 new component", with the live star count.
 * The count is fetched in the browser only (GitHub API, cached for an hour in sessionStorage).
 */
const COPY = {
  en: { lead: '1 GitHub star = 1 new component.', count: (n: string) => [`We’re at `, n, ` — help us unlock the next one.`], labels: { one: 'star', other: 'stars' } as Record<string, string>, cta: 'Star the repo', close: 'Dismiss announcement' },
  es: { lead: '1 estrella en GitHub = 1 componente nuevo.', count: (n: string) => ['Llevamos ', n, ': ayúdanos a desbloquear el siguiente.'], labels: { one: 'estrella', other: 'estrellas' } as Record<string, string>, cta: 'Dar una estrella', close: 'Cerrar aviso' },
  ru: { lead: '1 звезда на GitHub = 1 новый компонент.', count: (n: string) => ['Уже ', n, ' — помогите открыть следующий.'], labels: { one: 'звезда', few: 'звёзды', many: 'звёзд', other: 'звезды' } as Record<string, string>, cta: 'Поставить звезду', close: 'Закрыть объявление' },
};

const DISMISS_KEY = 'rck_star_goal_dismissed_until';
const CACHE_KEY = 'rck_star_goal_count';
const repo = siteConfig.github.replace('https://github.com/', '');

export function StarGoalBanner({ lang }: { lang: Locale }) {
  const copy = COPY[lang];
  const [hidden, setHidden] = useState(false);
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    try {
      if (Number(localStorage.getItem(DISMISS_KEY) || 0) > Date.now()) return setHidden(true);
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
      if (cached && Date.now() - cached.t < 3600_000) return setStars(cached.n);
    } catch { /* storage unavailable */ }
    fetch(`https://api.github.com/repos/${repo}`, { headers: { Accept: 'application/vnd.github+json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d || typeof d.stargazers_count !== 'number') return;
        setStars(d.stargazers_count);
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ n: d.stargazers_count, t: Date.now() })); } catch { /* ignore */ }
      })
      .catch(() => {});
  }, []);

  if (hidden) return null;

  const dismiss = () => {
    setHidden(true);
    try { localStorage.setItem(DISMISS_KEY, String(Date.now() + 14 * 86400_000)); } catch { /* ignore */ }
  };

  const label = stars === null ? '' : copy.labels[new Intl.PluralRules(lang).select(stars)] || copy.labels.other;
  const [before, , after] = copy.count('');

  return (
    <div className="star-goal" role="region" aria-label={copy.lead}>
      <div className="star-goal__inner">
        <svg className="star-goal__icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
        </svg>
        <p className="star-goal__text">
          <strong>{copy.lead}</strong>{' '}
          {!!stars && (
            <span className="star-goal__count">
              {before}<b>{stars.toLocaleString(lang)}</b>&nbsp;<span>{label}</span>{after}
            </span>
          )}
        </p>
        <a className="star-goal__cta" href={siteConfig.github} target="_blank" rel="noopener noreferrer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />
          </svg>
          {copy.cta}
          <span aria-hidden="true">→</span>
        </a>
        <button type="button" className="star-goal__close" aria-label={copy.close} onClick={dismiss}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
}
