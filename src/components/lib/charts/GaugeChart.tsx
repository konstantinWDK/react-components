'use client';

import ChartFrame from './ChartFrame';
import { arcStroke, formatValue } from './chart-utils';
import './GaugeChart.css';

/**
 * GaugeChart — Semicircular progress gauge for a single KPI against a goal,
 * with the number and % of goal always shown as text.
 *
 * @param {number} value - Current value.
 * @param {number} max - Goal / maximum.
 * @param {string} label - Caption under the number.
 * @param {string} prefix - Value prefix.
 * @param {string} suffix - Value suffix.
 * @param {string} color - Arc color.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface GaugeChartProps {
  title?: string;
  subtitle?: string;
  value?: number;
  max?: number;
  label?: string;
  prefix?: string;
  suffix?: string;
  color?: string;
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function GaugeChart({
  title = 'Monthly sales goal',
  subtitle = 'November',
  value = 73400,
  max = 100000,
  label = 'of $100k goal',
  prefix = '$',
  suffix = '',
  color = 'var(--chart-1, #3987e5)',
  variant = 'glass',
  size = 'md',
  className = '',
}: GaugeChartProps) {
  const W = 260;
  const H = 150;
  const cx = W / 2;
  const cy = 132;
  const r = 108;
  const pct = Math.max(0, Math.min(1, value / (max || 1)));
  const a0 = -Math.PI / 2;
  const a1 = Math.PI / 2;
  const fmt = (v: number) => formatValue(v, prefix, suffix);
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className} table={{ headers: ['Metric', 'Value', 'Goal', '% of goal'], rows: [[title, fmt(value), fmt(max), `${(pct * 100).toFixed(1)}%`]] }}>
        <div className="gc" role="meter" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-label={`${title}: ${fmt(value)} ${label}, ${(pct * 100).toFixed(0)}%`} data-rk-f7ded1="">
          <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" data-rk-f7ded1="">
            <path d={arcStroke(cx, cy, r, a0, a1)} fill="none" stroke="rgb(var(--ink-rgb, 255 255 255) / 0.07)" strokeWidth="18" strokeLinecap="round" data-rk-f7ded1="" />
            {pct > 0 && <path className="gc__arc" d={arcStroke(cx, cy, r, a0, a0 + Math.PI * pct)} fill="none" stroke={color} strokeWidth="18" strokeLinecap="round" data-rk-f7ded1="" />}
            <text className="cf-label" x={cx - r} y={H - 2} textAnchor="middle" data-rk-f7ded1="">0</text>
            <text className="cf-label" x={cx + r} y={H - 2} textAnchor="middle" data-rk-f7ded1="">{fmt(max)}</text>
          </svg>
          <div className="gc__center" data-rk-f7ded1="">
            <span className="gc__value" data-rk-f7ded1="">{fmt(value)}</span>
            <span className="gc__label" data-rk-f7ded1="">{(pct * 100).toFixed(0)}% {label}</span>
          </div>
        </div>
      </ChartFrame>
    </>
  );
}

export default GaugeChart;
