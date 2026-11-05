'use client';

import type { CSSProperties } from 'react';
import ChartFrame from './ChartFrame';
import { colorAt, formatValue, sum } from './chart-utils';
import './SegmentedBarChart.css';

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
 * SegmentedBarChart — A single tall part-to-whole bar with labelled segments
 * and a breakdown list. A clearer alternative to a pie for ≤ 6 parts.
 *
 * @param {Array<{label: string, value: number}>} segments - Parts of the whole.
 * @param {string} total - Optional formatted total for the header.
 * @param {string} prefix - Value prefix.
 * @param {string} suffix - Value suffix.
 * @param {string[]} colors - Optional per-segment colors.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface SegmentedBarChartProps {
  title?: string;
  subtitle?: string;
  segments?: Array<{ label: string; value: number }>;
  total?: string;
  prefix?: string;
  suffix?: string;
  colors?: string[];
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SegmentedBarChart({
  title = 'Storage usage',
  subtitle = '512 GB plan',
  segments = [
    { label: 'Media', value: 182 },
    { label: 'Backups', value: 96 },
    { label: 'Databases', value: 64 },
    { label: 'Logs', value: 38 },
    { label: 'Other', value: 22 },
  ],
  total,
  prefix = '',
  suffix = ' GB',
  colors,
  variant = 'glass',
  size = 'md',
  className = '',
}: SegmentedBarChartProps) {
  const tot = sum(segments.map((s) => s.value)) || 1;
  const fmt = (v: number) => formatValue(v, prefix, suffix, false);
  const segs = segments.slice(0, 8).map((s, i) => ({ ...s, pct: (s.value / tot) * 100, color: colorAt(i, colors) }));
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} value={total ?? fmt(tot)} variant={variant} size={size} className={className} table={{ headers: ['Segment', 'Value', 'Share'], rows: segs.map((s) => [s.label, fmt(s.value), `${s.pct.toFixed(1)}%`]) }}>
        <div className="sb__bar" role="list" aria-label={`${title} breakdown`} data-rk-740040="">
          {segs.map((s, __i: number) => (
            <span key={__i} className="sb__seg cf-mark" role="listitem" tabIndex={0} style={st(`flex-grow:${s.value}; background:${s.color}`)} aria-label={`${s.label}: ${fmt(s.value)} (${s.pct.toFixed(1)}%)`} data-tip-title={s.label} data-tip={`${s.color}::${fmt(s.value)} · ${s.pct.toFixed(1)}%`} data-rk-740040="">
              {s.pct >= 9 && <span className="sb__pct" data-rk-740040="">{s.pct.toFixed(0)}%</span>}
            </span>
          ))}
        </div>
        <ul className="sb__list" data-rk-740040="">
          {segs.map((s, __i: number) => (
            <li key={__i} data-rk-740040="">
              <span className="sb__dot" style={st(`background:${s.color}`)} aria-hidden="true" data-rk-740040=""></span>
              <span className="sb__name" data-rk-740040="">{s.label}</span>
              <span className="sb__val" data-rk-740040="">{fmt(s.value)}</span>
            </li>
          ))}
        </ul>
      </ChartFrame>
    </>
  );
}

export default SegmentedBarChart;
