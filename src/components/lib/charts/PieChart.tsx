'use client';

import type { CSSProperties } from 'react';
import ChartFrame from './ChartFrame';
import { arcPath, colorAt, formatValue, sum } from './chart-utils';
import './PieChart.css';

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
 * PieChart — Pure SVG pie or donut with a 2px surface gap between slices,
 * centre total, and a side breakdown with values. Best for ≤ 6 slices.
 *
 * @param {Array<{label: string, value: number}>} slices - Parts of the whole.
 * @param {boolean} donut - Render as a donut with centre label.
 * @param {string} centerLabel - Caption under the centre total.
 * @param {string} prefix - Value prefix.
 * @param {string} suffix - Value suffix.
 * @param {string[]} colors - Optional per-slice colors.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface PieChartProps {
  title?: string;
  subtitle?: string;
  slices?: Array<{ label: string; value: number }>;
  donut?: boolean;
  centerLabel?: string;
  prefix?: string;
  suffix?: string;
  colors?: string[];
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PieChart({
  title = 'Revenue by plan',
  subtitle = 'Share of MRR',
  slices = [
    { label: 'Enterprise', value: 48200 },
    { label: 'Team', value: 31400 },
    { label: 'Pro', value: 18900 },
    { label: 'Starter', value: 7600 },
  ],
  donut = true,
  centerLabel = 'Total MRR',
  prefix = '$',
  suffix = '',
  colors,
  variant = 'glass',
  size = 'md',
  className = '',
}: PieChartProps) {
  const S = 240;
  const c = S / 2;
  const rO = S / 2 - 4;
  const rI = donut ? rO * 0.62 : 0;
  const total = sum(slices.map((s) => s.value)) || 1;
  const GAP = 0.012; // radians of surface gap between slices
  let a = 0;
  const arcs = slices.slice(0, 8).map((s, i) => {
    const sweep = (s.value / total) * Math.PI * 2;
    const a0 = a + (slices.length > 1 ? GAP / 2 : 0);
    const a1 = a + sweep - (slices.length > 1 ? GAP / 2 : 0);
    a += sweep;
    return { ...s, d: arcPath(c, c, rO, rI, a0, Math.max(a0, a1)), pct: (s.value / total) * 100, color: colorAt(i, colors) };
  });
  const fmt = (v: number) => formatValue(v, prefix, suffix);
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className} table={{ headers: ['Slice', 'Value', 'Share'], rows: arcs.map((s) => [s.label, fmt(s.value), `${s.pct.toFixed(1)}%`]) }}>
        <div className="pc" data-rk-991c0e="">
          <svg viewBox={`0 0 ${S} ${S}`} role="img" aria-label={`${title}: ${donut ? 'donut' : 'pie'} chart, total ${fmt(total)}`} data-rk-991c0e="">
            {arcs.map((s, __i: number) => (
              <path key={__i} className="cf-mark cf-dim pc__slice" d={s.d} fill={s.color} tabIndex={0} role="img" aria-label={`${s.label}: ${fmt(s.value)} (${s.pct.toFixed(1)}%)`} data-tip-title={s.label} data-tip={`${s.color}::${fmt(s.value)} · ${s.pct.toFixed(1)}%`} data-rk-991c0e="" />
            ))}
            {donut && (
              <g aria-hidden="true" data-rk-991c0e="">
                <text x={c} y={c + 2} textAnchor="middle" className="pc__total" data-rk-991c0e="">{fmt(total)}</text>
                <text x={c} y={c + 22} textAnchor="middle" className="cf-label" data-rk-991c0e="">{centerLabel}</text>
              </g>
            )}
          </svg>
          <ul className="pc__list" data-rk-991c0e="">
            {arcs.map((s, __i: number) => (
              <li key={__i} data-rk-991c0e="">
                <span className="pc__dot" style={st(`background:${s.color}`)} aria-hidden="true" data-rk-991c0e=""></span>
                <span className="pc__name" data-rk-991c0e="">{s.label}</span>
                <span className="pc__pct" data-rk-991c0e="">{s.pct.toFixed(0)}%</span>
                <span className="pc__val" data-rk-991c0e="">{fmt(s.value)}</span>
              </li>
            ))}
          </ul>
        </div>
      </ChartFrame>
    </>
  );
}

export default PieChart;
