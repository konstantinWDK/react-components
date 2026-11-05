'use client';

import type { CSSProperties } from 'react';
import ChartFrame from './ChartFrame';
import { formatValue } from './chart-utils';
import './HorizontalBarChart.css';

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
 * HorizontalBarChart — Ranked horizontal bars with labels on the left and values
 * on the right. One series → one color; optionally highlight a single bar.
 *
 * @param {Array<{label: string, value: number}>} items - Bars to draw.
 * @param {boolean} sort - Sort descending by value.
 * @param {string} highlight - Label to emphasise; other bars recede.
 * @param {string} prefix - Value prefix.
 * @param {string} suffix - Value suffix.
 * @param {string} color - Bar color.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface HorizontalBarChartProps {
  title?: string;
  subtitle?: string;
  items?: Array<{ label: string; value: number }>;
  sort?: boolean;
  highlight?: string;
  prefix?: string;
  suffix?: string;
  color?: string;
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function HorizontalBarChart({
  title = 'Top pages',
  subtitle = 'Unique visitors, last 30 days',
  items = [
    { label: '/pricing', value: 18420 },
    { label: '/docs/getting-started', value: 15210 },
    { label: '/', value: 12980 },
    { label: '/blog/astro-5', value: 9340 },
    { label: '/components', value: 7120 },
    { label: '/changelog', value: 4310 },
  ],
  sort = true,
  highlight,
  prefix = '',
  suffix = '',
  color = 'var(--chart-1, #3987e5)',
  variant = 'glass',
  size = 'md',
  className = '',
}: HorizontalBarChartProps) {
  const rows = sort ? [...items].sort((a, b) => b.value - a.value) : items;
  const max = Math.max(...rows.map((r) => r.value)) || 1;
  const fmt = (v: number) => formatValue(v, prefix, suffix);
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className} table={{ headers: ['Item', 'Value'], rows: rows.map((r) => [r.label, fmt(r.value)]) }}>
        <ol className="hb" aria-label={title} data-rk-344822="">
          {rows.map((r, i) => {
            const dim = highlight && highlight !== r.label;
            return (
              <li className="hb__row cf-mark" tabIndex={0} style={st(`--hb-w:${(r.value / max) * 100}%; --hb-c:${color}; --hb-o:${dim ? 0.35 : 1}; --hb-i:${i}`)} data-tip-title={r.label} data-tip={`${color}::${fmt(r.value)} · ${((r.value / max) * 100).toFixed(0)}% of top`} aria-label={`${i + 1}. ${r.label}: ${fmt(r.value)}`} data-rk-344822="">
                <span className="hb__label" data-rk-344822="">{r.label}</span>
                <span className="hb__track" aria-hidden="true" data-rk-344822=""><span className="hb__bar" data-rk-344822=""></span></span>
                <span className="hb__value" data-rk-344822="">{fmt(r.value)}</span>
              </li>
            );
          })}
        </ol>
      </ChartFrame>
    </>
  );
}

export default HorizontalBarChart;
