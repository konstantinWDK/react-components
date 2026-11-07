'use client';

import { useEffect, useRef, useId } from 'react';
import type { CSSProperties } from 'react';
import './DevRepoList.css';

/** class:list → className */
function cx(...args: unknown[]): string {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (!v) return;
    if (typeof v === 'string' || typeof v === 'number') out.push(String(v));
    else if (Array.isArray(v)) v.forEach(walk);
    else if (typeof v === 'object') for (const [k, on] of Object.entries(v as Record<string, unknown>)) if (on) out.push(k);
  };
  args.forEach(walk);
  return out.join(' ');
}

/** "a: b; --c: d" → style object */
function st(css: string | undefined): CSSProperties {
  const o: Record<string, string> = {};
  for (const decl of String(css ?? '').split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const k = decl.slice(0, i).trim();
    if (k) o[k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = decl.slice(i + 1).trim();
  }
  return o as CSSProperties;
}

interface Repo {
  name: string;
  description: string;
  language?: string;
  color?: string;
  stars?: number;
  url: string;
  homepage?: string;
}

/**
 * DevRepoList — Frosted-glass list of open-source repositories ("Keycap" design): profile link,
 * one row per repo with language dot, stars, description, a source link and a live-site link whose
 * eye opens on hover. Shows the first rows and reveals the rest with "Show all".
 *
 * @param {Array<{name: string, description: string, language?: string, color?: string, stars?: number, url: string, homepage?: string}>} repos - Repositories, in display order.
 * @param {{label: string, href: string}} profile - Profile link in the header (e.g. github.com/user).
 * @param {number} visible - Rows shown before "Show all". Default 7.
 * @param {string} moreLabel - Expand button text. Default 'Show all repositories'.
 * @param {string} title - Optional heading.
 * @param {boolean} glass - Frosted panel (for use over DevKeyboard). Default true.
 * @param {string} className - Extra class.
 *
 * Accessibility: a real list; icon links have aria-labels with the repo name; the expand button is
 * a disclosure (aria-expanded / aria-controls) and moves focus to the first revealed repo.
 */
export interface DevRepoListProps {
  repos: Repo[];
  profile?: { label: string; href: string };
  visible?: number;
  moreLabel?: string;
  title?: string;
  glass?: boolean;
  className?: string;
}

export function DevRepoList({
  repos = [
    { name: 'orbit-ui', description: 'Accessible, typed React component kit', language: 'TypeScript', color: '#3178c6', stars: 1240, url: '#', homepage: '#' },
    { name: 'tidy', description: 'Reclaim disk space from stale developer caches', language: 'Rust', color: '#dea584', stars: 486, url: '#' },
    { name: 'waveform', description: 'Batch audio converter that runs in the browser', language: 'TypeScript', color: '#3178c6', stars: 212, url: '#', homepage: '#' },
    { name: 'pg-snap', description: 'Point-in-time Postgres snapshots for local development', language: 'Go', color: '#00add8', stars: 41, url: '#' },
  ],
  profile,
  visible = 7, moreLabel = 'Show all repositories', title, glass = true, className = '',
}: DevRepoListProps) {
  const listId = `dvrl-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-dev-repos]:not([data-bound])').forEach((root) => {
        root.dataset.bound = '';
        const btn = root.querySelector<HTMLButtonElement>('[data-more]');
        btn?.addEventListener('click', () => {
          const extra = Array.from(root.querySelectorAll<HTMLElement>('[data-extra]'));
          extra.forEach((row, i) => {
            row.hidden = false;
            row.classList.add('is-new');
            row.style.animationDelay = `${Math.min(i, 10) * 35}ms`;
          });
          btn.setAttribute('aria-expanded', 'true');
          btn.closest('.dvrl__more')?.remove();
          extra[0]?.querySelector<HTMLElement>('a')?.focus();
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={cx(['dvrl', { 'dvrl--glass': glass }, className])} data-dev-repos aria-label={title ?? profile?.label ?? 'Repositories'} data-rk-3e428a="">
        {(profile || title) && (
          <div className="dvrl__head" data-rk-3e428a="">
            {title && <h2 className="dvrl__title" data-rk-3e428a="">{title}</h2>}
            {profile && (
              <a className="dvrl__profile" href={profile.href} target="_blank" rel="noopener noreferrer" data-rk-3e428a="">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-rk-3e428a=""><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" data-rk-3e428a="" /></svg>
                <span data-rk-3e428a="">{profile.label}</span>
                <svg className="dvrl__ext" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-3e428a=""><path d="M7 17 17 7M7 7h10v10" data-rk-3e428a="" /></svg>
              </a>
            )}
          </div>
        )}
      
        <ul className="dvrl__list" id={listId} data-rk-3e428a="">
          {repos.map((r, i) => (
            <li key={i} className="dvrl__row" hidden={i >= visible ? true : undefined} data-extra={i >= visible ? '' : undefined} data-rk-3e428a="">
              <div className="dvrl__main" data-rk-3e428a="">
                <p className="dvrl__line" data-rk-3e428a="">
                  <a className="dvrl__name" href={r.url} target="_blank" rel="noopener noreferrer" data-rk-3e428a="">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-3e428a=""><line x1="6" y1="3" x2="6" y2="15" data-rk-3e428a="" /><circle cx="18" cy="6" r="3" data-rk-3e428a="" /><circle cx="6" cy="18" r="3" data-rk-3e428a="" /><path d="M18 9a9 9 0 0 1-9 9" data-rk-3e428a="" /></svg>
                    <span data-rk-3e428a="">{r.name}</span>
                  </a>
                  {r.language && <span className="dvrl__lang" data-rk-3e428a=""><span className="dvrl__dot" style={st(`background:${r.color ?? 'currentColor'}`)} aria-hidden="true" data-rk-3e428a=""></span>{r.language}</span>}
                  {!!r.stars && <span className="dvrl__stars" aria-label={`${r.stars} stars`} data-rk-3e428a="">★ {r.stars.toLocaleString('en')}</span>}
                </p>
                {r.description && <p className="dvrl__desc" data-rk-3e428a="">{r.description}</p>}
              </div>
              <div className="dvrl__actions" data-rk-3e428a="">
                <a className="dvrl__icon" href={r.url} target="_blank" rel="noopener noreferrer" aria-label={`Source code of ${r.name}`} data-rk-3e428a="">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-rk-3e428a=""><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" data-rk-3e428a="" /></svg>
                </a>
                {r.homepage && (
                  <a className="dvrl__icon dvrl__live" href={r.homepage} target="_blank" rel="noopener noreferrer" aria-label={`Live site of ${r.name}`} data-rk-3e428a="">
                    <svg className="dvrl__eye-closed" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-3e428a=""><path d="M2 12s3 7 10 7 10-7 10-7" data-rk-3e428a="" /><path d="m15 18-.72-3.25M20 15l-1.73-2.05M4 15l1.73-2.05M9 18l.72-3.25" data-rk-3e428a="" /></svg>
                    <svg className="dvrl__eye-open" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-3e428a=""><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" data-rk-3e428a="" /><circle cx="12" cy="12" r="3" data-rk-3e428a="" /></svg>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      
        {repos.length > visible && (
          <div className="dvrl__more" data-rk-3e428a="">
            <button className="dvrl__more-btn" type="button" data-more aria-expanded="false" aria-controls={listId} data-rk-3e428a="">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-3e428a=""><path d="m6 9 6 6 6-6" data-rk-3e428a="" /></svg>
              {moreLabel}
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default DevRepoList;
