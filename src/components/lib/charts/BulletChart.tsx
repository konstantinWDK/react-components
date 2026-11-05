'use client';

import type { CSSProperties } from 'react';
import ChartFrame from './ChartFrame';
import './BulletChart.css';

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

interface Metric {
  label: string;
  value: number;
  target: number;
  ranges: [number, number, number];
  unit?: string;
}

/**
 * BulletChart — Compact KPI-vs-target bars with qualitative bands
 * (poor / ok / good), a measure bar and a target tick. Stack several for a grid.
 *
 * @param {Array<{label: string, value: number, target: number, ranges: [number, number, number], unit?: string}>} metrics
 *   - Each metric with its qualitative band thresholds (ascending).
 * @param {string} color - Measure bar color.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface BulletChartProps {
  title?: string;
  subtitle?: string;
  metrics?: Metric[];
  color?: string;
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BulletChart({
  title = 'Quarterly targets',
  subtitle = 'Measure vs target with performance bands',
  metrics = [
    { label: 'Revenue ($k)', value: 270, target: 250, ranges: [150, 225, 300] },
    { label: 'Profit', value: 23, target: 26, ranges: [20, 25, 30], unit: '%' },
    { label: 'New customers', value: 1650, target: 2100, ranges: [1400, 2000, 2500] },
    { label: 'NPS', value: 54, target: 50, ranges: [30, 50, 70] },
  ],
  color = 'var(--c-text-1, #fff)',
  variant = 'glass',
  size = 'md',
  className = '',
}: BulletChartProps) {
  const pct = (v: number, max: number) => `${Math.min(100, (v / max) * 100)}%`;
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className} table={{ headers: ['Metric', 'Value', 'Target', 'Status'], rows: metrics.map((mt) => [mt.label, `${mt.value}${mt.unit ?? ''}`, `${mt.target}${mt.unit ?? ''}`, mt.value >= mt.target ? 'On target' : 'Below target']) }}>
        <div className="bc" data-rk-d2b72d="">
          {metrics.map((mt) => {
            const max = mt.ranges[2];
            const met = mt.value >= mt.target;
            return (
              <div className="bc__row cf-mark" tabIndex={0} role="meter" aria-valuemin={0} aria-valuemax={max} aria-valuenow={mt.value} aria-label={`${mt.label}: ${mt.value}${mt.unit ?? ''} of target ${mt.target}${mt.unit ?? ''}`} data-tip-title={mt.label} data-tip={`Value: ${mt.value}${mt.unit ?? ''}|Target: ${mt.target}${mt.unit ?? ''}|${met ? 'var(--chart-pos)::On target' : 'var(--chart-neg)::Below target'}`} data-rk-d2b72d="">
                <div className="bc__meta" data-rk-d2b72d="">
                  <span className="bc__label" data-rk-d2b72d="">{mt.label}</span>
                  <span className="bc__value" data-rk-d2b72d="">
                    {mt.value}{mt.unit ?? ''}
                    <span className={`bc__status ${met ? 'bc__status--ok' : 'bc__status--bad'}`} data-rk-d2b72d="">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true" data-rk-d2b72d="">
                        {met ? <path d="M20 6 9 17l-5-5" data-rk-d2b72d="" /> : <><circle cx="12" cy="12" r="9" data-rk-d2b72d="" /><path d="M12 8v4M12 16h.01" data-rk-d2b72d="" /></>}
                      </svg>
                      {met ? 'On target' : 'Below'}
                    </span>
                  </span>
                </div>
                <div className="bc__track" aria-hidden="true" data-rk-d2b72d="">
                  <span className="bc__band" style={st(`width:${pct(mt.ranges[2], max)}; opacity:0.07`)} data-rk-d2b72d=""></span>
                  <span className="bc__band" style={st(`width:${pct(mt.ranges[1], max)}; opacity:0.11`)} data-rk-d2b72d=""></span>
                  <span className="bc__band" style={st(`width:${pct(mt.ranges[0], max)}; opacity:0.16`)} data-rk-d2b72d=""></span>
                  <span className="bc__measure" style={st(`width:${pct(mt.value, max)}; background:${color}`)} data-rk-d2b72d=""></span>
                  <span className="bc__target" style={st(`left:${pct(mt.target, max)}`)} data-rk-d2b72d=""></span>
                </div>
              </div>
            );
          })}
        </div>
      </ChartFrame>
    </>
  );
}

export default BulletChart;
