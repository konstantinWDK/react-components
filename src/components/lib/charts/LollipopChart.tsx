'use client';

import ChartFrame from './ChartFrame';
import { scaleLinear, niceTicks, formatValue } from './chart-utils';

/**
 * LollipopChart — Lightweight alternative to a bar chart: a thin stem with a dot
 * at the value. Optionally draws a target/benchmark line.
 *
 * @param {Array<{label: string, value: number}>} items - Values to plot.
 * @param {number} target - Optional benchmark value.
 * @param {string} targetLabel - Label for the benchmark line.
 * @param {string} prefix - Value prefix.
 * @param {string} suffix - Value suffix.
 * @param {string} color - Stem/dot color.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface LollipopChartProps {
  title?: string;
  subtitle?: string;
  items?: Array<{ label: string; value: number }>;
  target?: number;
  targetLabel?: string;
  prefix?: string;
  suffix?: string;
  height?: number;
  color?: string;
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LollipopChart({
  title = 'Lighthouse performance',
  subtitle = 'Score per page template',
  items = [
    { label: 'Home', value: 98 },
    { label: 'Docs', value: 96 },
    { label: 'Blog', value: 91 },
    { label: 'Pricing', value: 88 },
    { label: 'Dashboard', value: 74 },
    { label: 'Checkout', value: 81 },
    { label: 'Search', value: 69 },
  ],
  target = 90,
  targetLabel = 'Goal',
  prefix = '',
  suffix = '',
  height = 270,
  color = 'var(--chart-1, #3987e5)',
  variant = 'glass',
  size = 'md',
  className = '',
}: LollipopChartProps) {
  const W = 640;
  const H = height;
  const m = { t: 16, r: 12, b: 30, l: 40 };
  const ticks = niceTicks(0, Math.max(...items.map((i) => i.value), target ?? 0), 4);
  const y = scaleLinear(0, ticks[ticks.length - 1], H - m.b, m.t);
  const band = (W - m.l - m.r) / items.length;
  const fmt = (v: number) => formatValue(v, prefix, suffix);
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className} table={{ headers: ['Item', 'Value', targetLabel], rows: items.map((i) => [i.label, fmt(i.value), target !== undefined ? (i.value >= target ? 'Met' : 'Below') : '—']) }}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${title}: lollipop chart`}>
          {ticks.map((t, __i: number) => (
            <g key={__i}>
              <line className={t === 0 ? 'cf-axis' : 'cf-grid'} x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} />
              <text className="cf-label" x={m.l - 8} y={y(t) + 4} textAnchor="end">{fmt(t)}</text>
            </g>
          ))}
          {target !== undefined && (
            <g aria-hidden="true">
              <line x1={m.l} x2={W - m.r} y1={y(target)} y2={y(target)} stroke="var(--c-text-1, #fff)" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="4 4" />
              <text className="cf-label" x={W - m.r} y={y(target) - 6} textAnchor="end">{targetLabel} {fmt(target)}</text>
            </g>
          )}
          {items.map((it, i) => {
            const cx = m.l + i * band + band / 2;
            const below = target !== undefined && target > it.value;
            return (
              <g className="cf-mark cf-dim" tabIndex={0} role="img" aria-label={`${it.label}: ${fmt(it.value)}${below ? ', below goal' : ''}`} data-tip-title={it.label} data-tip={`${color}::${fmt(it.value)}${target !== undefined ? `|${below ? 'Below' : 'Meets'} ${targetLabel.toLowerCase()}` : ''}`}>
                <line x1={cx} x2={cx} y1={y(0)} y2={y(it.value)} stroke={color} strokeWidth="2" strokeOpacity={below ? 0.5 : 1} />
                <circle cx={cx} cy={y(it.value)} r="7" fill={below ? 'var(--chart-surface, #0d0d0f)' : color} stroke={color} strokeWidth="2.5" />
                <rect x={cx - band / 2} y={m.t} width={band} height={H - m.t - m.b} fill="transparent" />
                <text className="cf-label" x={cx} y={H - 10} textAnchor="middle">{it.label}</text>
              </g>
            );
          })}
        </svg>
      </ChartFrame>
    </>
  );
}

export default LollipopChart;
