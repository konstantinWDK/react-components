'use client';

import type { CSSProperties } from 'react';
import './StatsTrendCard.css';

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
 * StatsTrendCard — Compact KPI metric card featuring delta percentages, trend directions, and mini activity bars.
 * 
 * @param {string} label - Metric name (e.g. 'Active Users').
 * @param {string} value - Formatted value figure (e.g. '42,850').
 * @param {string} change - Delta percentage string (e.g. '+18.4%').
 * @param {'up' | 'down' | 'neutral'} trend - Direction of the trend. Default is 'up'.
 * @param {string} timeframe - Timeframe subtitle (e.g. 'vs last month').
 */
export interface StatsTrendCardProps {
  label: string;
  value: string;
  change: string;
  trend?: 'up' | 'down' | 'neutral';
  timeframe?: string;
}

export function StatsTrendCard({
  label = 'Monthly Active Builders',
  value = '14,290',
  change = '+18.4%',
  trend = 'up',
  timeframe = 'vs last 30 days',
}: StatsTrendCardProps) {
  const bars = [35, 55, 40, 75, 60, 90, 80, 100];
  return (
    <>
      <div className="trend-card" data-rk-0bf6d9="">
        <div className="trend-card__top" data-rk-0bf6d9="">
          <span className="trend-card__label" data-rk-0bf6d9="">{label}</span>
          <span className={cx(['trend-card__badge', `trend-card__badge--${trend}`])} data-rk-0bf6d9="">
            {trend === 'up' && '↑'}
            {trend === 'down' && '↓'}
            {change}
          </span>
        </div>
      
        <div className="trend-card__value" data-rk-0bf6d9="">{value}</div>
      
        <div className="trend-card__bottom" data-rk-0bf6d9="">
          <span className="trend-card__timeframe" data-rk-0bf6d9="">{timeframe}</span>
          <div className="trend-card__chart" aria-hidden="true" data-rk-0bf6d9="">
            {bars.map((h, __i: number) => (
              <span key={__i} className="bar" style={st(`height: ${h}%;`)} data-rk-0bf6d9=""></span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default StatsTrendCard;
