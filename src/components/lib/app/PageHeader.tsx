'use client';

import { useEffect, useRef } from 'react';
import { appIcon } from './app-icons';
import './PageHeader.css';

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
 * PageHeader — App page heading: breadcrumb, title, description, period switcher and action
 * buttons, with optional underline tabs below.
 *
 * @param {string} title - Page title. Default 'Dashboard'.
 * @param {string} description - Supporting text.
 * @param {Array<{label: string, href?: string}>} breadcrumb - Trail (optional).
 * @param {Array<{label: string, href?: string, icon?: string, primary?: boolean}>} actions - Buttons on the right.
 * @param {string[]} periods - Segmented period options (e.g. ['Today','7d','30d']); empty hides it.
 * @param {number} activePeriod - Selected period index. Default 0.
 * @param {Array<{label: string, href: string, count?: number}>} tabs - Underline tabs (optional).
 * @param {string} currentTab - href of the active tab.
 * @param {string} size - Title scale (sm|md|lg). Default 'md'.
 * @param {string} className - Extra class.
 *
 * Accessibility: h1 title; the period switcher is a radio group (arrow keys) that dispatches
 * `app:period` with `{ index, label }`; tabs are links with aria-current.
 */
export interface PageHeaderProps {
  title?: string;
  description?: string;
  breadcrumb?: Array<{ label: string; href?: string }>;
  actions?: Array<{ label: string; href?: string; icon?: string; primary?: boolean }>;
  periods?: string[];
  activePeriod?: number;
  tabs?: Array<{ label: string; href: string; count?: number }>;
  currentTab?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PageHeader({
  title = 'Dashboard',
  description = 'Good morning, Lucía — here is what is happening at Hotel Mirador today.',
  breadcrumb = [],
  actions = [{ label: 'Export', icon: 'download' }, { label: 'New booking', icon: 'plus', primary: true, href: '#' }],
  periods = ['Today', '7 days', '30 days', 'Year'],
  activePeriod = 2,
  tabs = [],
  currentTab,
  size = 'md',
  className = '',
}: PageHeaderProps) {

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-periods]:not([data-bound])').forEach((group) => {
        group.dataset.bound = '';
        const radios = Array.from(group.querySelectorAll<HTMLButtonElement>('[role="radio"]'));
        const select = (i: number, focus = false) => {
          radios.forEach((r, n) => { r.setAttribute('aria-checked', String(n === i)); r.tabIndex = n === i ? 0 : -1; });
          if (focus) radios[i].focus();
          group.dispatchEvent(new CustomEvent('app:period', { bubbles: true, detail: { index: i, label: radios[i].textContent } }));
        };
        radios.forEach((r, i) => {
          r.addEventListener('click', () => select(i));
          r.addEventListener('keydown', (e) => {
            const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
            if (!d) return;
            e.preventDefault();
            select((i + d + radios.length) % radios.length, true);
          });
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={cx(['app-ph', `app-ph--${size}`, className])} data-rk-7bc64d="">
        {breadcrumb.length > 0 && (
          <nav className="app-ph__crumbs" aria-label="Breadcrumb" data-rk-7bc64d="">
            <ol data-rk-7bc64d="">{breadcrumb.map((b, i) => <li key={i} data-rk-7bc64d="">{b.href && i < breadcrumb.length - 1 ? <a href={b.href} data-rk-7bc64d="">{b.label}</a> : <span aria-current="page" data-rk-7bc64d="">{b.label}</span>}</li>)}</ol>
          </nav>
        )}
        <div className="app-ph__row" data-rk-7bc64d="">
          <div className="app-ph__text" data-rk-7bc64d="">
            <h1 className="app-ph__title" data-rk-7bc64d="">{title}</h1>
            {description && <p className="app-ph__desc" data-rk-7bc64d="">{description}</p>}
          </div>
          <div className="app-ph__tools" data-rk-7bc64d="">
            {periods.length > 0 && (
              <div className="app-ph__periods" role="radiogroup" aria-label="Period" data-periods data-rk-7bc64d="">
                {periods.map((p, i) => (
                  <button key={i} type="button" role="radio" aria-checked={i === activePeriod ? 'true' : 'false'} tabIndex={i === activePeriod ? 0 : -1} data-i={i} data-rk-7bc64d="">{p}</button>
                ))}
              </div>
            )}
            {actions.map((a) => {
              const Tag = a.href ? 'a' : 'button';
              return (
                <Tag className={cx(['app-ph__btn', { 'app-ph__btn--primary': a.primary }])} href={a.href} type={a.href ? undefined : 'button'} data-rk-7bc64d="">
                  {a.icon && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-7bc64d=""><g dangerouslySetInnerHTML={{ __html: appIcon(a.icon) }} data-rk-7bc64d="" /></svg>}
                  {a.label}
                </Tag>
              );
            })}
          </div>
        </div>
        {tabs.length > 0 && (
          <nav className="app-ph__tabs" aria-label="Sections" data-rk-7bc64d="">
            {tabs.map((tab, __i: number) => (
              <a key={__i} href={tab.href} aria-current={tab.href === currentTab ? 'page' : undefined} data-rk-7bc64d="">
                {tab.label}{tab.count !== undefined && <span data-rk-7bc64d="">{tab.count}</span>}
              </a>
            ))}
          </nav>
        )}
      </div>
    </>
  );
}

export default PageHeader;
