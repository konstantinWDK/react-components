'use client';

import { useId } from 'react';
import type { CSSProperties } from 'react';
import './FeatureAlternatingRows.css';

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

interface Row { eyebrow: string; title: string; text: string; bullets: string[]; visual: 'chart' | 'code' | 'stack' }

/**
 * FeatureAlternatingRows — Zig-zag feature section: text and a visual alternate
 * sides on each row. Visuals are pure-CSS illustrations (no images to load).
 *
 * @param {string} title - Section heading (visually hidden if empty-styled).
 * @param {Array<{eyebrow: string, title: string, text: string, bullets: string[], visual: 'chart'|'code'|'stack'}>} rows - Feature rows.
 * @param {boolean} startReversed - Put the visual on the left in the first row.
 * @param {string} variant - Visual frame (glass|outline|plain).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface FeatureAlternatingRowsProps {
  title?: string;
  rows?: Row[];
  startReversed?: boolean;
  variant?: 'glass' | 'outline' | 'plain';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FeatureAlternatingRows({
  title = 'How the kit helps your team',
  rows = [
    {
      eyebrow: 'Insights',
      title: 'Dashboards your stakeholders actually read',
      text: 'Drop-in SVG charts with tooltips, legends and table fallbacks. No chart library to configure.',
      bullets: ['45 chart types', 'Colorblind-safe palette', 'Keyboard-accessible marks'],
      visual: 'chart',
    },
    {
      eyebrow: 'Developer experience',
      title: 'Typed props, sensible defaults',
      text: 'Every component ships a TypeScript Props interface and renders beautifully with zero configuration.',
      bullets: ['Strict TypeScript', 'JSDoc on every prop', 'Copy-paste friendly'],
      visual: 'code',
    },
    {
      eyebrow: 'Design system',
      title: 'One token file to re-theme everything',
      text: 'Swap colors, radii and spacing in global.css and every section updates consistently.',
      bullets: ['CSS custom properties', 'Dark-first', '8pt spacing grid'],
      visual: 'stack',
    },
  ],
  startReversed = false,
  variant = 'glass',
  size = 'md',
  className = '',
}: FeatureAlternatingRowsProps) {
  const id = `far-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const bars = [38, 62, 48, 80, 66, 92, 74];
  return (
    <>
      <div className="cq-feature-alternating-rows-cq" data-rk-43b840="">
      <section className={`far far--${variant} far--${size} ${className}`} aria-labelledby={id} data-rk-43b840="">
        <h2 id={id} className="far__sr" data-rk-43b840="">{title}</h2>
        <div className="far__inner" data-rk-43b840="">
          {rows.map((r, i) => {
            const reversed = startReversed ? i % 2 === 0 : i % 2 === 1;
            return (
              <article key={i} className={`far__row ${reversed ? 'far__row--rev' : ''}`} data-rk-43b840="">
                <div className="far__copy" data-rk-43b840="">
                  <p className="far__eyebrow" data-rk-43b840="">{r.eyebrow}</p>
                  <h3 className="far__title" data-rk-43b840="">{r.title}</h3>
                  <p className="far__text" data-rk-43b840="">{r.text}</p>
                  <ul className="far__bullets" data-rk-43b840="">
                    {r.bullets.map((b, __i: number) => (
                      <li key={__i} data-rk-43b840="">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-43b840=""><path d="M20 6 9 17l-5-5" data-rk-43b840="" /></svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="far__visual" aria-hidden="true" data-rk-43b840="">
                  {r.visual === 'chart' && (
                    <div className="far__chart" data-rk-43b840="">
                      {bars.map((h, bi) => <span key={bi} style={st(`--h:${h}%; --d:${bi * 80}ms`)} data-rk-43b840=""></span>)}
                    </div>
                  )}
                  {r.visual === 'code' && (
                    <pre className="far__code" data-rk-43b840=""><code data-rk-43b840=""><span className="k" data-rk-43b840="">interface</span> <span className="t" data-rk-43b840="">Props</span> {'{'}
        title?: <span className="t" data-rk-43b840="">string</span>;
        variant?: <span className="s" data-rk-43b840="">'glass'</span> | <span className="s" data-rk-43b840="">'solid'</span>;
        size?: <span className="s" data-rk-43b840="">'sm'</span> | <span className="s" data-rk-43b840="">'md'</span> | <span className="s" data-rk-43b840="">'lg'</span>;
      {'}'}
      
      <span className="c" data-rk-43b840="">// Sensible defaults, zero config</span>
      &lt;<span className="t" data-rk-43b840="">LineChart</span> /&gt;</code></pre>
                  )}
                  {r.visual === 'stack' && (
                    <div className="far__stack" data-rk-43b840="">
                      <span style={{ '--c': "var(--chart-1, #3987e5)" } as CSSProperties} data-rk-43b840="">--chart-1</span>
                      <span style={{ '--c': "var(--c-primary-light, #d4a017)" } as CSSProperties} data-rk-43b840="">--c-primary</span>
                      <span style={{ '--c': "var(--chart-3, #199e70)" } as CSSProperties} data-rk-43b840="">--chart-pos</span>
                      <span style={{ '--c': "var(--chart-7, #9085e9)" } as CSSProperties} data-rk-43b840="">--r-lg: 20px</span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
      </div>
    </>
  );
}

export default FeatureAlternatingRows;
