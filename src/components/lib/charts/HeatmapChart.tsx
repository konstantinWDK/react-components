'use client';

import type { CSSProperties } from 'react';
import ChartFrame from './ChartFrame';
import './HeatmapChart.css';

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
 * HeatmapChart — Matrix of cells colored on a single-hue sequential ramp
 * (light = low, saturated = high), with a scale legend.
 *
 * @param {string[]} rows - Row labels.
 * @param {string[]} columns - Column labels.
 * @param {number[][]} values - values[row][col].
 * @param {boolean} showValues - Print values inside cells.
 * @param {string} suffix - Value suffix.
 * @param {string} color - Ramp hue.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface HeatmapChartProps {
  title?: string;
  subtitle?: string;
  rows?: string[];
  columns?: string[];
  values?: number[][];
  showValues?: boolean;
  suffix?: string;
  color?: string;
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function HeatmapChart({
  title = 'Error rate by service',
  subtitle = 'Per weekday, % of requests',
  rows = ['auth', 'billing', 'search', 'uploads', 'webhooks'],
  columns = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  values = [
    [0.2, 0.3, 0.2, 0.4, 0.6, 0.1, 0.1],
    [0.8, 1.2, 0.9, 1.6, 2.4, 0.4, 0.3],
    [0.4, 0.5, 0.7, 0.6, 0.9, 0.3, 0.2],
    [1.1, 1.4, 1.9, 2.8, 3.2, 0.9, 0.6],
    [0.3, 0.2, 0.4, 0.5, 0.4, 0.2, 0.1],
  ],
  showValues = true,
  suffix = '%',
  color = 'var(--chart-1, #3987e5)',
  variant = 'glass',
  size = 'md',
  className = '',
}: HeatmapChartProps) {
  const flat = values.flat();
  const min = Math.min(...flat);
  const max = Math.max(...flat);
  const t = (v: number) => (max === min ? 1 : (v - min) / (max - min));
  const fill = (v: number) => `color-mix(in srgb, ${color} ${Math.round(12 + t(v) * 88)}%, #141416)`;
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className} table={{ headers: ['', ...columns], rows: rows.map((r, ri) => [r, ...values[ri].map((v) => `${v}${suffix}`)]) }}>
        <div className="hm" style={st(`--hm-cols:${columns.length}`)} data-rk-9ca6f8="">
          <div className="hm__grid" role="grid" aria-label={title} data-rk-9ca6f8="">
            <div className="hm__row" role="row" data-rk-9ca6f8="">
              <span className="hm__corner" role="columnheader" data-rk-9ca6f8=""></span>
              {columns.map((c, __i: number) => <span key={__i} className="hm__col" role="columnheader" data-rk-9ca6f8="">{c}</span>)}
            </div>
            {rows.map((r, ri) => (
              <div key={ri} className="hm__row" role="row" data-rk-9ca6f8="">
                <span className="hm__rowlabel" role="rowheader" data-rk-9ca6f8="">{r}</span>
                {columns.map((c, ci) => {
                  const v = values[ri]?.[ci] ?? 0;
                  return (
                    <span key={ci} className="hm__cell cf-mark" role="gridcell" tabIndex={0} style={st(`background:${fill(v)}`)} aria-label={`${r}, ${c}: ${v}${suffix}`} data-tip-title={`${r} · ${c}`} data-tip={`${v}${suffix}`} data-rk-9ca6f8="">
                      {showValues && <span className={t(v) > 0.55 ? 'hm__v hm__v--strong' : 'hm__v'} data-rk-9ca6f8="">{v}</span>}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="hm__scale" aria-hidden="true" data-rk-9ca6f8="">
            <span data-rk-9ca6f8="">{min}{suffix}</span>
            <span className="hm__ramp" style={st(`background:linear-gradient(90deg, ${fill(min)}, ${fill(max)})`)} data-rk-9ca6f8=""></span>
            <span data-rk-9ca6f8="">{max}{suffix}</span>
          </div>
        </div>
      </ChartFrame>
    </>
  );
}

export default HeatmapChart;
