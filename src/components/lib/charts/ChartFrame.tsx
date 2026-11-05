'use client';

import { useEffect, useRef, useId } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import './ChartFrame.css';

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

/**
 * ChartFrame — Shared accessible shell for every SVG chart in the kit.
 * Renders the card surface, header, legend, hover tooltip and a
 * "View data" table fallback so no chart relies on color or hover alone.
 *
 * @param {string} title - Chart heading (names the series when there is only one).
 * @param {string} subtitle - Supporting description under the title.
 * @param {string} value - Optional headline figure shown on the right of the header.
 * @param {string} delta - Optional change label next to the headline figure.
 * @param {boolean} deltaPositive - Good news (green ▲) or bad (red ▼); omit for a neutral caption.
 * @param {Array<{label: string, color: string}>} legend - Legend items (shown when ≥ 2 series).
 * @param {{headers: string[], rows: Array<Array<string|number>>}} table - Data for the table view.
 * @param {string} variant - Surface style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 * @param {string} className - Extra CSS class.
 *
 * Accessibility: the figure is labelled by its title, every mark is focusable via
 * the chart itself, and a native <details> data table is always available.
 */
export interface ChartFrameProps {
  title?: string;
  subtitle?: string;
  value?: string;
  delta?: string;
  deltaPositive?: boolean;
  legend?: Array<{ label: string; color: string }>;
  table?: { headers: string[]; rows: Array<Array<string | number>> };
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: ReactNode;
  footer?: ReactNode;
}

export function ChartFrame({
  title,
  subtitle,
  value,
  delta,
  deltaPositive,
  legend = [],
  table,
  variant = 'glass',
  size = 'md',
  className = '',
  children,
  footer
}: ChartFrameProps) {
  const titleId = `cf-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    import('./chart-tooltip').then((m) => m.initChartTooltips());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <figure className={`cf cf--${variant} cf--${size} ${className}`} data-chart aria-labelledby={title ? titleId : undefined} data-rk-0ca607="">
        {(title || value) && (
          <header className="cf__header" data-rk-0ca607="">
            <div className="cf__heading" data-rk-0ca607="">
              {title && <figcaption id={titleId} className="cf__title" data-rk-0ca607="">{title}</figcaption>}
              {subtitle && <p className="cf__subtitle" data-rk-0ca607="">{subtitle}</p>}
            </div>
            {value && (
              <div className="cf__headline" data-rk-0ca607="">
                <span className="cf__value" data-rk-0ca607="">{value}</span>
                {delta && (
                  <span className={cx(['cf__delta', { 'cf__delta--pos': deltaPositive === true, 'cf__delta--neg': deltaPositive === false, 'cf__delta--neutral': deltaPositive === undefined }])} data-rk-0ca607="">
                    {deltaPositive !== undefined && (
                      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" data-rk-0ca607="">
                        <path d={deltaPositive ? 'M5 1 L9 7 H1 Z' : 'M5 9 L9 3 H1 Z'} fill="currentColor" data-rk-0ca607="" />
                      </svg>
                    )}
                    {delta}
                  </span>
                )}
              </div>
            )}
          </header>
        )}
      
        {legend.length > 1 && (
          <ul className="cf__legend" aria-label="Legend" data-rk-0ca607="">
            {legend.map((item, __i: number) => (
              <li key={__i} className="cf__legend-item" data-rk-0ca607="">
                <span className="cf__swatch" style={st(`background:${item.color}`)} aria-hidden="true" data-rk-0ca607=""></span>
                {item.label}
              </li>
            ))}
          </ul>
        )}
      
        <div className="cf__plot" data-rk-0ca607="">
          {children}
        </div>
      
        {footer}
      
        {table && table.rows.length > 0 && (
          <details className="cf__data" data-rk-0ca607="">
            <summary data-rk-0ca607="">View data</summary>
            <div className="cf__table-wrap" data-rk-0ca607="">
              <table data-rk-0ca607="">
                <thead data-rk-0ca607="">
                  <tr data-rk-0ca607="">{table.headers.map((h, __i: number) => <th key={__i} scope="col" data-rk-0ca607="">{h}</th>)}</tr>
                </thead>
                <tbody data-rk-0ca607="">
                  {table.rows.map((row, __i: number) => (
                    <tr key={__i} data-rk-0ca607="">{row.map((cell, i) => (i === 0 ? <th key={i} scope="row" data-rk-0ca607="">{cell}</th> : <td key={i} data-rk-0ca607="">{cell}</td>))}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        )}
      
        <div className="cf__tip" data-chart-tip aria-hidden="true" data-rk-0ca607=""></div>
      </figure>
    </>
  );
}

export default ChartFrame;
