'use client';

import type { CSSProperties } from 'react';
import ChartFrame from './ChartFrame';
import { formatValue } from './chart-utils';
import './FunnelChart.css';

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
 * FunnelChart — Conversion funnel with tapered stages, stage-to-stage drop-off
 * and overall conversion. Uses an ordinal single-hue ramp (stages are ordered).
 *
 * @param {Array<{label: string, value: number}>} stages - Ordered stages, widest first.
 * @param {string} color - Base hue for the ordinal ramp.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface FunnelChartProps {
  title?: string;
  subtitle?: string;
  stages?: Array<{ label: string; value: number }>;
  color?: string;
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FunnelChart({
  title = 'Signup funnel',
  subtitle = 'Last 30 days',
  stages = [
    { label: 'Visited site', value: 48200 },
    { label: 'Viewed pricing', value: 19800 },
    { label: 'Started trial', value: 6400 },
    { label: 'Activated', value: 3900 },
    { label: 'Paid', value: 1240 },
  ],
  color = 'var(--chart-1, #3987e5)',
  variant = 'glass',
  size = 'md',
  className = '',
}: FunnelChartProps) {
  const top = stages[0]?.value || 1;
  const overall = ((stages[stages.length - 1]?.value ?? 0) / top) * 100;
  const fmt = (v: number) => formatValue(v);
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} value={`${overall.toFixed(1)}%`} delta="overall conversion" variant={variant} size={size} className={className} table={{
          headers: ['Stage', 'Users', '% of top', 'Step conversion'],
          rows: stages.map((s, i) => [s.label, fmt(s.value), `${((s.value / top) * 100).toFixed(1)}%`, i ? `${((s.value / stages[i - 1].value) * 100).toFixed(1)}%` : '—']),
        }}>
        <ol className="fn" data-rk-9aefa4="">
          {stages.map((s, i) => {
            const pct = (s.value / top) * 100;
            const step = i ? (s.value / stages[i - 1].value) * 100 : 100;
            const shade = 100 - i * (55 / Math.max(1, stages.length - 1));
            return (
              <li className="fn__stage" data-rk-9aefa4="">
                <div className="fn__meta" data-rk-9aefa4="">
                  <span className="fn__label" data-rk-9aefa4="">{s.label}</span>
                  <span className="fn__value" data-rk-9aefa4="">{fmt(s.value)}</span>
                </div>
                <div className="fn__track" data-rk-9aefa4="">
                  <span className="fn__bar cf-mark" tabIndex={0} style={st(`width:${Math.max(2, pct)}%; background:color-mix(in srgb, ${color} ${shade}%, #0d0d0f)`)} aria-label={`${s.label}: ${fmt(s.value)}, ${pct.toFixed(1)}% of top${i ? `, ${step.toFixed(1)}% from previous stage` : ''}`} data-tip-title={s.label} data-tip={`${fmt(s.value)} users|${pct.toFixed(1)}% of top${i ? `|${step.toFixed(1)}% from previous` : ''}`} data-rk-9aefa4=""></span>
                </div>
                {i > 0 && (
                  <span className="fn__drop" aria-hidden="true" data-rk-9aefa4="">
                    <svg width="10" height="10" viewBox="0 0 10 10" data-rk-9aefa4=""><path d="M5 9 L9 3 H1 Z" fill="currentColor" data-rk-9aefa4="" /></svg>
                    {(100 - step).toFixed(0)}% drop
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </ChartFrame>
    </>
  );
}

export default FunnelChart;
