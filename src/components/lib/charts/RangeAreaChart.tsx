'use client';

import ChartFrame from './ChartFrame';
import { scaleLinear, niceTicks, bandPath, smoothPath, formatValue, type Point } from './chart-utils';

/**
 * RangeAreaChart — Min/max band with an average line. Ideal for temperatures,
 * latency percentiles or price ranges.
 *
 * @param {string[]} categories - X-axis labels.
 * @param {number[]} min - Lower bound per period.
 * @param {number[]} max - Upper bound per period.
 * @param {number[]} avg - Central value per period.
 * @param {string} bandLabel - Legend label for the band.
 * @param {string} lineLabel - Legend label for the line.
 * @param {string} suffix - Value suffix.
 * @param {string} color - Hue for band and line.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface RangeAreaChartProps {
  title?: string;
  subtitle?: string;
  categories?: string[];
  min?: number[];
  max?: number[];
  avg?: number[];
  bandLabel?: string;
  lineLabel?: string;
  prefix?: string;
  suffix?: string;
  height?: number;
  color?: string;
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function RangeAreaChart({
  title = 'API latency',
  subtitle = 'p10–p90 band with median, last 10 days',
  categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'],
  min = [42, 45, 40, 48, 52, 38, 36, 44, 47, 41],
  max = [120, 135, 118, 160, 172, 98, 90, 126, 140, 115],
  avg = [74, 80, 70, 92, 101, 62, 58, 78, 86, 72],
  bandLabel = 'p10–p90',
  lineLabel = 'Median',
  prefix = '',
  suffix = 'ms',
  height = 260,
  color = 'var(--chart-1, #3987e5)',
  variant = 'glass',
  size = 'md',
  className = '',
}: RangeAreaChartProps) {
  const W = 640;
  const H = height;
  const m = { t: 12, r: 16, b: 28, l: 48 };
  const n = categories.length;
  const ticks = niceTicks(Math.min(...min), Math.max(...max), 4);
  const y = scaleLinear(ticks[0], ticks[ticks.length - 1], H - m.b, m.t);
  const x = (i: number) => m.l + (n <= 1 ? 0 : (i / (n - 1)) * (W - m.l - m.r));
  const step = n > 1 ? (W - m.l - m.r) / (n - 1) : W;
  const upper: Point[] = max.map((v, i) => [x(i), y(v)]);
  const lower: Point[] = min.map((v, i) => [x(i), y(v)]);
  const mid: Point[] = avg.map((v, i) => [x(i), y(v)]);
  const fmt = (v: number) => formatValue(v, prefix, suffix);
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className} legend={[{ label: bandLabel, color: `color-mix(in srgb, ${color} 35%, transparent)` }, { label: lineLabel, color }]} table={{
          headers: ['Period', 'Min', lineLabel, 'Max'],
          rows: categories.map((c, i) => [c, fmt(min[i]), fmt(avg[i]), fmt(max[i])]),
        }}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${title}: range band chart`}>
          {ticks.map((t, __i: number) => (
            <g key={__i}>
              <line className="cf-grid" x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} />
              <text className="cf-label" x={m.l - 8} y={y(t) + 4} textAnchor="end">{fmt(t)}</text>
            </g>
          ))}
          {categories.map((c, i) => <text key={i} className="cf-label" x={x(i)} y={H - 8} textAnchor="middle">{c}</text>)}
      
          <path d={bandPath(upper, lower)} fill={color} fillOpacity="0.18" aria-hidden="true" />
          <path d={smoothPath(mid)} fill="none" stroke={color} strokeWidth="2" aria-hidden="true" />
      
          {categories.map((c, i) => (
            <g key={i} className="cf-hit-group">
              <line className="cf-cross" x1={x(i)} x2={x(i)} y1={y(max[i])} y2={y(min[i])} />
              <circle className="cf-cross" cx={x(i)} cy={y(avg[i])} r="4.5" fill={color} stroke="#fff" strokeWidth="1.5" />
              <rect className="cf-hit" x={x(i) - step / 2} y={m.t} width={step} height={H - m.t - m.b} tabIndex={0} role="img" aria-label={`${c}: min ${fmt(min[i])}, ${lineLabel} ${fmt(avg[i])}, max ${fmt(max[i])}`} data-tip-title={c} data-tip={`Max: ${fmt(max[i])}|${color}::${lineLabel}: ${fmt(avg[i])}|Min: ${fmt(min[i])}`} />
            </g>
          ))}
        </svg>
      </ChartFrame>
    </>
  );
}

export default RangeAreaChart;
