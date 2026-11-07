'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import './DevArticle.css';

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

/**
 * DevArticle — Blog post layout for developer portfolios ("Keycap" design): back link, meta line,
 * title, lead, tags, a reading-progress bar and monochrome prose styles for headings, lists, quotes
 * and code blocks, followed by previous / next article keys.
 *
 * @param {string} title - Post title (h1).
 * @param {string} excerpt - Lead paragraph.
 * @param {string} date - ISO date (YYYY-MM-DD).
 * @param {string} category - Category.
 * @param {string} readingTime - e.g. "6 min".
 * @param {string} author - Optional author name.
 * @param {string[]} tags - Tags.
 * @param {string} html - Trusted HTML body. Alternatively pass the body in the default slot.
 * @param {{label: string, href: string}} back - Back link. Default 'All articles' → '/blog/'.
 * @param {{title: string, href: string}} prev - Previous article.
 * @param {{title: string, href: string}} next - Next article.
 * @param {string} locale - Date locale. Default 'en-US'.
 * @param {string} className - Extra class.
 *
 * Accessibility: article landmark with one h1; the progress bar is decorative (aria-hidden);
 * code blocks scroll horizontally and are focusable; pager is a labelled nav.
 */
export interface DevArticleProps {
  title?: string;
  excerpt?: string;
  date?: string;
  category?: string;
  readingTime?: string;
  author?: string;
  tags?: string[];
  html?: string;
  back?: { label: string; href: string };
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
  locale?: string;
  className?: string;
  children?: ReactNode;
}

export function DevArticle({
  title = 'Damped springs instead of per-frame tweens',
  excerpt = 'Why calling a tween library every frame makes a 3D slider feel rubbery, and the one-line function that fixes it.',
  date = '2026-09-14',
  category = 'animation',
  readingTime = '5 min',
  author,
  tags = ['animation', 'javascript'],
  html: htmlProp,
  back = { label: 'All articles', href: '/blog/' }, prev, next, locale = 'en-US', className = '',
  children
}: DevArticleProps) {
  const DEMO_HTML = '<p>Compute where each card <em>should</em> be and move it a fraction of the way every frame:</p><pre><code>const damp = (a, b, k, dt) =&gt; a + (b - a) * (1 - Math.exp(-k * dt));</code></pre><h2>Continuous layouts</h2><p>Smoothstep between the centre and its neighbours, and the card no longer jumps when it crosses the middle.</p>';
  const html = htmlProp ?? (children != null ? undefined : DEMO_HTML);
  const formatted = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));

  // Reading progress bar + focusable code blocks (scoped to this article, cleaned up on unmount).
  const rootRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>('[data-prose] pre').forEach((pre) => pre.setAttribute('tabindex', '0'));
    const bar = root.querySelector<HTMLElement>('[data-progress]');
    if (!bar) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = root.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      bar.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [html]);

  return (
    <>
      <article ref={rootRef} className={cx(['dvar', className])} data-dev-article data-rk-6a1464="">
        <div className="dvar__progress" aria-hidden="true" data-rk-6a1464=""><span data-progress data-rk-6a1464=""></span></div>
        <header className="dvar__head" data-rk-6a1464="">
          <a className="dvar__back" href={back.href} data-rk-6a1464="">← {back.label}</a>
          <p className="dvar__meta" data-rk-6a1464="">
            <time dateTime={date} data-rk-6a1464="">{formatted}</time>
            {author && <><span aria-hidden="true" data-rk-6a1464="">•</span><span data-rk-6a1464="">{author}</span></>}
            {category && <><span aria-hidden="true" data-rk-6a1464="">•</span><span data-rk-6a1464="">/{category}</span></>}
            {readingTime && <><span aria-hidden="true" data-rk-6a1464="">•</span><span data-rk-6a1464="">{readingTime}</span></>}
          </p>
          <h1 className="dvar__title" data-rk-6a1464="">{title}</h1>
          {excerpt && <p className="dvar__lead" data-rk-6a1464="">{excerpt}</p>}
          {tags.length > 0 && <ul className="dvar__tags" data-rk-6a1464="">{tags.map((t, __i: number) => <li key={__i} data-rk-6a1464="">#{t}</li>)}</ul>}
        </header>
      
        {html
          ? <div className="dvar__prose" data-prose data-rk-6a1464="" dangerouslySetInnerHTML={{ __html: html }} />
          : <div className="dvar__prose" data-prose data-rk-6a1464="">{children}</div>}
      
        {(prev || next) && (
          <nav className="dvar__pager" aria-label="More articles" data-rk-6a1464="">
            {prev ? <a href={prev.href} rel="prev" data-rk-6a1464=""><span data-rk-6a1464="">← Previous</span><strong data-rk-6a1464="">{prev.title}</strong></a> : <span data-rk-6a1464=""></span>}
            {next && <a className="dvar__next" href={next.href} rel="next" data-rk-6a1464=""><span data-rk-6a1464="">Next →</span><strong data-rk-6a1464="">{next.title}</strong></a>}
          </nav>
        )}
      </article>
    </>
  );
}

export default DevArticle;
