'use client';

import { useEffect, useRef } from 'react';
import './DevProjectGrid.css';

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

interface Project {
  title: string;
  tagline: string;
  category: string;
  href: string;
  technologies?: string[];
  status?: string;
  year?: string;
  stars?: number;
}

/**
 * DevProjectGrid — Project index for developer portfolios ("Keycap" design): keycap-like cards
 * (ink outline, hard offset shadow that "presses" on hover) with number, category, title, tagline,
 * stack chips, status and stars, plus category filter keys.
 *
 * @param {Array<{title: string, tagline: string, category: string, href: string, technologies?: string[], status?: string, year?: string, stars?: number}>} projects - Projects.
 * @param {boolean} filters - Show category filter keys. Default true.
 * @param {string} allLabel - "All" filter label. Default 'All'.
 * @param {string} emptyLabel - Shown when a filter has no results. Default 'No projects in this category yet.'
 * @param {string} className - Extra class.
 *
 * Accessibility: filters are toggle buttons (aria-pressed) and the result count is announced in a
 * polite live region; each card is one link with the title as its name.
 */
export interface DevProjectGridProps {
  projects?: Project[];
  filters?: boolean;
  allLabel?: string;
  emptyLabel?: string;
  className?: string;
}

export function DevProjectGrid({ projects = [
  { title: 'Orbit UI', tagline: 'Accessible component kit for React', category: 'Frontend', href: '#', technologies: ['React', 'TypeScript', 'CSS'], status: 'Live', year: '2026', stars: 1240 },
  { title: 'Tidy', tagline: 'Reclaims disk space from dev caches', category: 'Tools', href: '#', technologies: ['Rust', 'CLI'], status: 'Live', year: '2025', stars: 486 },
  { title: 'Relay', tagline: 'Declarative API mocks in minutes', category: 'Backend', href: '#', technologies: ['Node.js', 'OpenAPI'], status: 'In progress', year: '2026', stars: 57 },
], filters = true, allLabel = 'All', emptyLabel = 'No projects in this category yet.', className = '' }: DevProjectGridProps) {
  const categories = [...new Set(projects.map((p) => p.category))];
  const pad = (n: number) => String(n).padStart(2, '0');

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-dev-grid]:not([data-bound])').forEach((root) => {
        root.dataset.bound = '';
        const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-filter]'));
        const items = Array.from(root.querySelectorAll<HTMLElement>('li[data-category]'));
        const live = root.querySelector<HTMLElement>('[data-live]');
        const empty = root.querySelector<HTMLElement>('[data-empty]');
        buttons.forEach((btn) =>
          btn.addEventListener('click', () => {
            const f = btn.dataset.filter ?? '';
            buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
            let shown = 0;
            items.forEach((li) => {
              const on = !f || li.dataset.category === f;
              li.hidden = !on;
              if (on) shown++;
            });
            if (empty) empty.hidden = shown > 0;
            if (live) live.textContent = `${shown} ${shown === 1 ? 'project' : 'projects'}`;
          }),
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={cx(['dvpg', className])} data-dev-grid data-rk-31046f="">
        <div className="dvpg__wrap" data-rk-31046f="">
          {filters && categories.length > 1 && (
            <div className="dvpg__filters" role="group" aria-label="Filter projects" data-rk-31046f="">
              <button type="button" className="dvpg__filter" aria-pressed="true" data-filter="" data-rk-31046f="">{allLabel} <span data-rk-31046f="">{projects.length}</span></button>
              {categories.map((c, __i: number) => (
                <button key={__i} type="button" className="dvpg__filter" aria-pressed="false" data-filter={c} data-rk-31046f="">{c} <span data-rk-31046f="">{projects.filter((p) => p.category === c).length}</span></button>
              ))}
            </div>
          )}
          <p className="dvpg__live" aria-live="polite" data-live data-rk-31046f=""></p>
      
          <ul className="dvpg__grid" data-rk-31046f="">
            {projects.map((p, i) => (
              <li key={i} data-category={p.category} data-rk-31046f="">
                <a className="dvpg__card" href={p.href} data-rk-31046f="">
                  <span className="dvpg__top" data-rk-31046f="">
                    <span className="dvpg__num" data-rk-31046f="">{pad(i + 1)}</span>
                    <span className="dvpg__cat" data-rk-31046f="">{p.category}</span>
                    {p.year && <span className="dvpg__year" data-rk-31046f="">{p.year}</span>}
                  </span>
                  <span className="dvpg__title" data-rk-31046f="">{p.title}</span>
                  <span className="dvpg__tagline" data-rk-31046f="">{p.tagline}</span>
                  {p.technologies && p.technologies.length > 0 && (
                    <span className="dvpg__chips" data-rk-31046f="">{p.technologies.slice(0, 4).map((t, __i: number) => <span key={__i} data-rk-31046f="">{t}</span>)}</span>
                  )}
                  <span className="dvpg__foot" data-rk-31046f="">
                    {p.status && <span className="dvpg__status" data-status={p.status.toLowerCase().replace(/\s+/g, '-')} data-rk-31046f=""><i aria-hidden="true" data-rk-31046f=""></i>{p.status}</span>}
                    {!!p.stars && <span className="dvpg__stars" data-rk-31046f="">★ {p.stars.toLocaleString('en')}</span>}
                    <span className="dvpg__arrow" aria-hidden="true" data-rk-31046f="">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="dvpg__empty" data-empty hidden data-rk-31046f="">{emptyLabel}</p>
        </div>
      </section>
    </>
  );
}

export default DevProjectGrid;
