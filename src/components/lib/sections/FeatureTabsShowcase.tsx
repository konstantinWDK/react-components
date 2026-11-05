'use client';

import { useEffect, useRef, useId } from 'react';
import './FeatureTabsShowcase.css';

interface Tab { label: string; title: string; text: string; points: string[]; stat: string; statLabel: string }

/**
 * FeatureTabsShowcase — Interactive feature section using the WAI-ARIA tabs
 * pattern (arrow keys, Home/End) to switch between product capabilities.
 *
 * @param {string} title - Section heading.
 * @param {string} subtitle - Section description.
 * @param {Array<{label: string, title: string, text: string, points: string[], stat: string, statLabel: string}>} tabs - Tab panels.
 * @param {string} variant - Tab style (pills|underline|cards).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface FeatureTabsShowcaseProps {
  title?: string;
  subtitle?: string;
  tabs?: Tab[];
  variant?: 'pills' | 'underline' | 'cards';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FeatureTabsShowcase({
  title = 'One platform, every workflow',
  subtitle = 'Switch between capabilities to see how teams use the kit.',
  tabs = [
    { label: 'Marketing', title: 'Launch pages in an afternoon', text: 'Assemble hero, features, pricing and FAQ sections into conversion-ready landing pages.', points: ['24 new section blocks', 'SEO-friendly markup', 'Instant static builds'], stat: '3.4×', statLabel: 'faster page launches' },
    { label: 'Product', title: 'In-app analytics without a chart library', text: 'Render KPI tiles, funnels and cohort tables straight from your data at build time.', points: ['45 SVG charts', 'Tooltips & table view', 'Zero client JS'], stat: '0 kB', statLabel: 'chart runtime shipped' },
    { label: 'Engineering', title: 'Accessible components you can trust', text: 'Every component is keyboard navigable and screen-reader tested, with visible focus states.', points: ['WCAG 2.2 AA', 'Typed props', 'Reduced-motion aware'], stat: '100', statLabel: 'Lighthouse accessibility' },
  ],
  variant = 'pills',
  size = 'md',
  className = '',
}: FeatureTabsShowcaseProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = `fts-${uid}`;

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-fts]').forEach((root) => {
        const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
        const select = (next: HTMLButtonElement, focus = true) => {
          tabs.forEach((t) => {
            const on = t === next;
            t.setAttribute('aria-selected', String(on));
            t.tabIndex = on ? 0 : -1;
            const panel = document.getElementById(t.getAttribute('aria-controls') || '');
            if (panel) panel.hidden = !on;
          });
          if (focus) next.focus();
        };
        tabs.forEach((tab, i) => {
          tab.addEventListener('click', () => select(tab, false));
          tab.addEventListener('keydown', (e) => {
            const map: Record<string, number> = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
            if (!(e.key in map)) return;
            e.preventDefault();
            select(tabs[(map[e.key] + tabs.length) % tabs.length]);
          });
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="cq-feature-tabs-showcase-cq" data-rk-6565e6="">
      <section className={`fts fts--${variant} fts--${size} ${className}`} aria-labelledby={id} data-rk-6565e6="">
        <div className="fts__inner" data-rk-6565e6="">
          <header className="fts__head" data-rk-6565e6="">
            <h2 id={id} className="fts__title" data-rk-6565e6="">{title}</h2>
            <p className="fts__subtitle" data-rk-6565e6="">{subtitle}</p>
          </header>
      
          <div className="fts__tabs" data-fts data-rk-6565e6="">
            <div className="fts__list" role="tablist" aria-label={title} data-rk-6565e6="">
              {tabs.map((t, i) => (
                <button key={i} type="button" role="tab" className="fts__tab" id={`${id}-tab-${i}`} aria-controls={`${id}-panel-${i}`} aria-selected={i === 0 ? 'true' : 'false'} tabIndex={i === 0 ? 0 : -1} data-rk-6565e6="">{t.label}</button>
              ))}
            </div>
      
            {tabs.map((t, i) => (
              <div key={i} className="fts__panel" role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} tabIndex={0} hidden={i !== 0} data-rk-6565e6="">
                <div className="fts__copy" data-rk-6565e6="">
                  <h3 className="fts__panel-title" data-rk-6565e6="">{t.title}</h3>
                  <p className="fts__text" data-rk-6565e6="">{t.text}</p>
                  <ul className="fts__points" data-rk-6565e6="">
                    {t.points.map((p, __i: number) => (
                      <li key={__i} data-rk-6565e6=""><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-6565e6=""><path d="M20 6 9 17l-5-5" data-rk-6565e6="" /></svg>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className="fts__stat" data-rk-6565e6="">
                  <span className="fts__stat-value" data-rk-6565e6="">{t.stat}</span>
                  <span className="fts__stat-label" data-rk-6565e6="">{t.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default FeatureTabsShowcase;
