'use client';

import type { CSSProperties } from 'react';
import ChartFrame from './ChartFrame';
import SparklineChart from './SparklineChart';
import { formatValue } from './chart-utils';
import './MetricDeltaTable.css';

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

interface Row { label: string; current: number; previous: number; invert?: boolean; trend?: number[] }

/**
 * MetricDeltaTable — Comparison table with inline bars, current vs previous
 * values and signed deltas with direction icons. A "table + chart" hybrid.
 *
 * @param {Array<{label: string, current: number, previous: number, invert?: boolean}>} rows - Metrics.
 * @param {string} currentLabel - Header for current values.
 * @param {string} previousLabel - Header for previous values.
 * @param {string} prefix - Value prefix.
 * @param {string} suffix - Value suffix.
 * @param {string} color - Inline bar color.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface MetricDeltaTableProps {
  title?: string;
  subtitle?: string;
  rows?: Row[];
  currentLabel?: string;
  previousLabel?: string;
  prefix?: string;
  suffix?: string;
  color?: string;
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MetricDeltaTable({
  title = 'Channel performance',
  subtitle = 'Signups this month vs last month',
  rows = [
    { label: 'Organic search', current: 4820, previous: 4310, trend: [30, 34, 33, 38, 41, 44, 48] },
    { label: 'Direct', current: 3120, previous: 3290, trend: [36, 35, 34, 33, 33, 32, 31] },
    { label: 'Newsletter', current: 1840, previous: 1220, trend: [10, 12, 13, 14, 16, 17, 18] },
    { label: 'Paid social', current: 1310, previous: 1480, trend: [16, 15, 15, 14, 14, 13, 13] },
    { label: 'Partners', current: 960, previous: 710, trend: [6, 7, 7, 8, 8, 9, 10] },
  ],
  currentLabel = 'This month',
  previousLabel = 'Last month',
  prefix = '',
  suffix = '',
  color = 'var(--chart-1, #3987e5)',
  variant = 'glass',
  size = 'md',
  className = '',
}: MetricDeltaTableProps) {
  const max = Math.max(...rows.map((r) => r.current)) || 1;
  const fmt = (v: number) => formatValue(v, prefix, suffix, false);
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className}>
        <div className="md" data-rk-df9b34="">
          <table className="md__table" data-rk-df9b34="">
            <thead data-rk-df9b34="">
              <tr data-rk-df9b34="">
                <th scope="col" data-rk-df9b34="">Metric</th>
                <th scope="col" className="md__num" data-rk-df9b34="">{currentLabel}</th>
                <th scope="col" className="md__num md__hide-sm" data-rk-df9b34="">{previousLabel}</th>
                <th scope="col" className="md__num" data-rk-df9b34="">Change</th>
                <th scope="col" className="md__hide-sm" data-rk-df9b34=""><span className="sr-only" data-rk-df9b34="">Trend</span></th>
              </tr>
            </thead>
            <tbody data-rk-df9b34="">
              {rows.map((r) => {
                const d = r.previous ? ((r.current - r.previous) / r.previous) * 100 : 0;
                const up = d >= 0;
                const good = r.invert ? !up : up;
                return (
                  <tr data-rk-df9b34="">
                    <th scope="row" data-rk-df9b34="">
                      <span className="md__label" data-rk-df9b34="">{r.label}</span>
                      <span className="md__bar" aria-hidden="true" data-rk-df9b34=""><span style={st(`width:${(r.current / max) * 100}%; background:${color}`)} data-rk-df9b34=""></span></span>
                    </th>
                    <td className="md__num md__strong" data-rk-df9b34="">{fmt(r.current)}</td>
                    <td className="md__num md__hide-sm" data-rk-df9b34="">{fmt(r.previous)}</td>
                    <td className="md__num" data-rk-df9b34="">
                      <span className={`md__delta ${good ? 'md__delta--good' : 'md__delta--bad'}`} data-rk-df9b34="">
                        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" data-rk-df9b34=""><path d={up ? 'M5 1 L9 7 H1 Z' : 'M5 9 L9 3 H1 Z'} fill="currentColor" data-rk-df9b34="" /></svg>
                        <span className="sr-only" data-rk-df9b34="">{up ? 'up' : 'down'}</span>
                        {Math.abs(d).toFixed(1)}%
                      </span>
                    </td>
                    <td className="md__hide-sm" data-rk-df9b34="">{r.trend && <SparklineChart data={r.trend} size="sm" variant="line" label={`${r.label} trend`} color={good ? 'var(--chart-pos, #34c38f)' : 'var(--chart-neg, #f06a6a)'} />}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ChartFrame>
    </>
  );
}

export default MetricDeltaTable;
