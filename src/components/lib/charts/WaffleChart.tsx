'use client';

import type { CSSProperties } from 'react';
import ChartFrame from './ChartFrame';
import { colorAt, sum } from './chart-utils';
import './WaffleChart.css';

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
 * WaffleChart — 10×10 grid of squares where each square is 1% of the whole.
 * An intuitive part-to-whole view for percentages.
 *
 * @param {Array<{label: string, value: number}>} parts - Parts of the whole (rounded to 100 cells).
 * @param {number} columns - Cells per row (default 10).
 * @param {string[]} colors - Optional per-part colors.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface WaffleChartProps {
  title?: string;
  subtitle?: string;
  parts?: Array<{ label: string; value: number }>;
  columns?: number;
  colors?: string[];
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function WaffleChart({
  title = 'Device share',
  subtitle = 'Each square = 1% of sessions',
  parts = [
    { label: 'Desktop', value: 54 },
    { label: 'Mobile', value: 38 },
    { label: 'Tablet', value: 8 },
  ],
  columns = 10,
  colors,
  variant = 'glass',
  size = 'md',
  className = '',
}: WaffleChartProps) {
  const total = sum(parts.map((p) => p.value)) || 1;
  // Largest-remainder rounding so cells always add up to exactly 100.
  const raw = parts.map((p) => (p.value / total) * 100);
  const counts = raw.map(Math.floor);
  let remaining = 100 - sum(counts);
  raw
    .map((v, i) => ({ i, r: v - Math.floor(v) }))
    .sort((a, b) => b.r - a.r)
    .forEach(({ i }) => {
      if (remaining > 0) {
        counts[i] += 1;
        remaining -= 1;
      }
    });
  const cells: number[] = counts.flatMap((c, i) => Array.from({ length: c }, () => i));
  const items = parts.slice(0, 8).map((p, i) => ({ ...p, pct: counts[i], color: colorAt(i, colors) }));
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className} table={{ headers: ['Part', 'Share'], rows: items.map((p) => [p.label, `${p.pct}%`]) }}>
        <div className="wf" data-rk-87979e="">
          <div className="wf__grid" style={st(`--wf-cols:${columns}`)} role="img" aria-label={`${title}: ${items.map((p) => `${p.label} ${p.pct}%`).join(', ')}`} data-rk-87979e="">
            {cells.map((pi, idx) => (
              <span key={idx} className="wf__cell" style={st(`background:${items[pi]?.color}; --wf-i:${idx}`)} data-tip-title={items[pi]?.label} data-tip={`${items[pi]?.color}::${items[pi]?.pct}%`} data-rk-87979e=""></span>
            ))}
          </div>
          <ul className="wf__legend" data-rk-87979e="">
            {items.map((p, __i: number) => (
              <li key={__i} data-rk-87979e="">
                <span className="wf__big" data-rk-87979e="">{p.pct}<small data-rk-87979e="">%</small></span>
                <span className="wf__name" data-rk-87979e=""><i style={st(`background:${p.color}`)} aria-hidden="true" data-rk-87979e=""></i>{p.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </ChartFrame>
    </>
  );
}

export default WaffleChart;
