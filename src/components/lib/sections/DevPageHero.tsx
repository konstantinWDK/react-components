'use client';

import type { ReactNode } from 'react';
import './DevPageHero.css';

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
 * DevPageHero — Inner-page hero for developer portfolios ("Keycap" design): a HUD badge or mono
 * label, a two-line title that slides up line by line, an intro and an optional slot on the right
 * (e.g. a DevMonitor or stats).
 *
 * @param {string} label - Mono label above the title.
 * @param {string} title - First title line.
 * @param {string} titleAccent - Second title line (muted). Optional.
 * @param {string} text - Intro paragraph.
 * @param {Array<{label: string, href?: string}>} breadcrumb - Optional breadcrumb.
 * @param {boolean} hud - Wrap the label in [ HUD ] brackets. Default true.
 * @param {string} className - Extra class.
 *
 * Accessibility: single h1; breadcrumb is a labelled nav with aria-current on the last item;
 * reduced motion disables the slide-up.
 */
export interface DevPageHeroProps {
  label?: string;
  title?: string;
  titleAccent?: string;
  text?: string;
  breadcrumb?: Array<{ label: string; href?: string }>;
  hud?: boolean;
  className?: string;
  children?: ReactNode;
}

export function DevPageHero({ label = 'PROJECTS // INDEX', title = "Things I've", titleAccent = 'built & shipped.', text = 'Products, libraries and experiments — each one with a short case study.', breadcrumb = [], hud = true, className = '',
  children
}: DevPageHeroProps) {
  const hasAside = (children != null);
  return (
    <>
      <header className={cx(['dvph', { 'dvph--split': hasAside }, className])} data-rk-b52a8b="">
        <div className="dvph__wrap" data-rk-b52a8b="">
          <div className="dvph__text" data-rk-b52a8b="">
            {breadcrumb.length > 0 && (
              <nav className="dvph__crumbs" aria-label="Breadcrumb" data-rk-b52a8b="">
                <ol data-rk-b52a8b="">
                  {breadcrumb.map((b, i) => (
                    <li key={i} data-rk-b52a8b="">
                      {b.href && i < breadcrumb.length - 1 ? <a href={b.href} data-rk-b52a8b="">{b.label}</a> : <span aria-current={i === breadcrumb.length - 1 ? 'page' : undefined} data-rk-b52a8b="">{b.label}</span>}
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            {label && <p className="dvph__label" data-rk-b52a8b="">{hud ? <><b data-rk-b52a8b="">[</b>{` ${label} `}<b data-rk-b52a8b="">]</b></> : label}</p>}
            <h1 className="dvph__title" data-rk-b52a8b="">
              <span className="dvph__line" data-rk-b52a8b="">{title}</span>
              {titleAccent && <span className={cx(['dvph__line', 'dvph__line--accent', { 'dvph__line--long': titleAccent.length > 22 }])} data-rk-b52a8b="">{titleAccent}</span>}
            </h1>
            {text && <p className="dvph__intro" data-rk-b52a8b="">{text}</p>}
          </div>
          {hasAside && <div className="dvph__aside" data-rk-b52a8b="">{children}</div>}
        </div>
      </header>
    </>
  );
}

export default DevPageHero;
