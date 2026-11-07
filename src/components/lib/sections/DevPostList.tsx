'use client';

import { useEffect, useRef } from 'react';
import './DevPostList.css';

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

interface Post { title: string; excerpt: string; href: string; date: string; category?: string; readingTime?: string }

/**
 * DevPostList — Blog index for developer portfolios ("Keycap" design): a featured first post,
 * then a hairline list with date, category, reading time, title, excerpt and a "Read" link, plus
 * category filter keys.
 *
 * @param {Array<{title: string, excerpt: string, href: string, date: string, category?: string, readingTime?: string}>} posts - Posts, newest first. `date` is ISO (YYYY-MM-DD).
 * @param {boolean} featured - Highlight the first post. Default true.
 * @param {boolean} filters - Category filter keys. Default true.
 * @param {string} locale - Date locale. Default 'en-US'.
 * @param {object} labels - { all, read, empty }.
 * @param {string} className - Extra class.
 *
 * Accessibility: each post is an article with a heading link; dates use <time datetime>; filters
 * are toggle buttons and the visible count is announced politely.
 */
export interface DevPostListProps {
  posts?: Post[];
  featured?: boolean;
  filters?: boolean;
  locale?: string;
  labels?: Partial<Record<'all' | 'read' | 'empty', string>>;
  className?: string;
}

export function DevPostList({ posts = [
  { title: 'Instanced meshes for UI: drawing 400 cubes in one call', excerpt: 'How a contribution matrix went from 371 meshes to a single draw call.', href: '#', date: '2026-10-28', category: 'three.js', readingTime: '7 min' },
  { title: 'Damped springs instead of per-frame tweens', excerpt: 'Why a tween per frame makes a slider feel rubbery, and the one-line fix.', href: '#', date: '2026-09-14', category: 'animation', readingTime: '5 min' },
  { title: 'Making 3D sections accessible', excerpt: 'Giving every WebGL block a real HTML counterpart.', href: '#', date: '2026-07-02', category: 'accessibility', readingTime: '6 min' },
], featured = true, filters = true, locale = 'en-US', labels = {}, className = '' }: DevPostListProps) {
  const L = { all: 'All', read: 'Read article', empty: 'No articles yet — come back soon.', ...labels };
  const fmt = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  const date = (iso: string) => fmt.format(new Date(`${iso}T00:00:00Z`));
  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))] as string[];

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-dev-posts]:not([data-bound])').forEach((root) => {
        root.dataset.bound = '';
        const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-filter]'));
        const items = Array.from(root.querySelectorAll<HTMLElement>('[data-category]'));
        const live = root.querySelector<HTMLElement>('[data-live]');
        buttons.forEach((btn) =>
          btn.addEventListener('click', () => {
            const f = btn.dataset.filter ?? '';
            buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
            let n = 0;
            items.forEach((it) => {
              const on = !f || it.dataset.category === f;
              it.hidden = !on;
              if (on) n++;
            });
            if (live) live.textContent = `${n} ${n === 1 ? 'article' : 'articles'}`;
          }),
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={cx(['dvpl', className])} data-dev-posts data-rk-2eeb4e="">
        <div className="dvpl__wrap" data-rk-2eeb4e="">
          {filters && categories.length > 1 && (
            <div className="dvpl__filters" role="group" aria-label="Filter articles" data-rk-2eeb4e="">
              <button type="button" aria-pressed="true" data-filter="" data-rk-2eeb4e="">{L.all}</button>
              {categories.map((c, __i: number) => <button key={__i} type="button" aria-pressed="false" data-filter={c} data-rk-2eeb4e="">/{c}</button>)}
            </div>
          )}
          <p className="dvpl__live" aria-live="polite" data-live data-rk-2eeb4e=""></p>
      
          {posts.length === 0 ? (
            <p className="dvpl__empty" data-rk-2eeb4e="">{L.empty}</p>
          ) : (
            <div className="dvpl__list" data-rk-2eeb4e="">
              {posts.map((p, i) => (
                <article key={i} className={cx(['dvpl__item', { 'dvpl__item--featured': featured && i === 0 }])} data-category={p.category ?? ''} data-rk-2eeb4e="">
                  <p className="dvpl__meta" data-rk-2eeb4e="">
                    <time dateTime={p.date} data-rk-2eeb4e="">{date(p.date)}</time>
                    {p.category && <><span aria-hidden="true" data-rk-2eeb4e="">•</span><span className="dvpl__cat" data-rk-2eeb4e="">/{p.category}</span></>}
                    {p.readingTime && <><span aria-hidden="true" data-rk-2eeb4e="">•</span><span data-rk-2eeb4e="">{p.readingTime}</span></>}
                  </p>
                  <h2 className="dvpl__title" data-rk-2eeb4e=""><a href={p.href} data-rk-2eeb4e="">{p.title}</a></h2>
                  <p className="dvpl__excerpt" data-rk-2eeb4e="">{p.excerpt}</p>
                  <a className="dvpl__read" href={p.href} aria-hidden="true" tabIndex={-1} data-rk-2eeb4e="">{L.read} →</a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default DevPostList;
