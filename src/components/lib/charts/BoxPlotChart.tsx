'use client';

import ChartFrame from './ChartFrame';
import { scaleLinear, niceTicks, quantile } from './chart-utils';

const rand = (seed: number, n: number, mean: number, spread: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = Math.sin((i + 1) * seed) * 9999;
    const b = Math.sin((i + 3) * seed * 1.7) * 9999;
    return Math.round(mean + ((a - Math.floor(a)) + (b - Math.floor(b)) - 1) * spread);
  });

/**
 * BoxPlotChart — Distribution summary per group: median, interquartile box,
 * 1.5×IQR whiskers and outlier dots. Computes stats from raw values.
 *
 * @param {Array<{label: string, values: number[]}>} groups - Raw observations per group.
 * @param {string} suffix - Value suffix.
 * @param {string} color - Box color.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface BoxPlotChartProps {
  title?: string;
  subtitle?: string;
  groups?: Array<{ label: string; values: number[] }>;
  suffix?: string;
  height?: number;
  color?: string;
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BoxPlotChart({
  title = 'Response time by region',
  subtitle = 'Distribution of p50 latency, ms',
  groups = [
    { label: 'us-east', values: [...rand(1.3, 40, 82, 40), 190] },
    { label: 'us-west', values: rand(2.7, 40, 95, 45) },
    { label: 'eu-central', values: [...rand(4.1, 40, 70, 30), 160, 172] },
    { label: 'ap-south', values: rand(5.9, 40, 140, 70) },
    { label: 'sa-east', values: rand(8.3, 40, 160, 55) },
  ],
  suffix = 'ms',
  height = 290,
  color = 'var(--chart-1, #3987e5)',
  variant = 'glass',
  size = 'md',
  className = '',
}: BoxPlotChartProps) {
  const stats = groups.map((g) => {
    const s = [...g.values].sort((a, b) => a - b);
    const q1 = quantile(s, 0.25);
    const med = quantile(s, 0.5);
    const q3 = quantile(s, 0.75);
    const iqr = q3 - q1;
    const lo = s.find((v) => v >= q1 - 1.5 * iqr) ?? s[0];
    const hi = [...s].reverse().find((v) => v <= q3 + 1.5 * iqr) ?? s[s.length - 1];
    const outliers = s.filter((v) => v < lo || v > hi);
    return { label: g.label, q1, med, q3, lo, hi, outliers, n: s.length };
  });
  
  const W = 640;
  const H = height;
  const m = { t: 14, r: 12, b: 30, l: 48 };
  const allV = groups.flatMap((g) => g.values);
  const ticks = niceTicks(Math.min(...allV), Math.max(...allV), 4);
  const y = scaleLinear(ticks[0], ticks[ticks.length - 1], H - m.b, m.t);
  const band = (W - m.l - m.r) / groups.length;
  const bw = Math.min(56, band * 0.45);
  const f = (v: number) => `${Math.round(v)}${suffix}`;
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className} table={{ headers: ['Group', 'Min', 'Q1', 'Median', 'Q3', 'Max', 'Outliers'], rows: stats.map((s) => [s.label, f(s.lo), f(s.q1), f(s.med), f(s.q3), f(s.hi), s.outliers.length]) }}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${title}: box plot of ${groups.length} groups`}>
          {ticks.map((t, __i: number) => (
            <g key={__i}>
              <line className="cf-grid" x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} />
              <text className="cf-label" x={m.l - 8} y={y(t) + 4} textAnchor="end">{f(t)}</text>
            </g>
          ))}
          {stats.map((s, i) => {
            const cx = m.l + i * band + band / 2;
            return (
              <g className="cf-mark cf-dim" tabIndex={0} role="img" aria-label={`${s.label}: median ${f(s.med)}, IQR ${f(s.q1)}–${f(s.q3)}, range ${f(s.lo)}–${f(s.hi)}, ${s.outliers.length} outliers`} data-tip-title={s.label} data-tip={`Max: ${f(s.hi)}|Q3: ${f(s.q3)}|${color}::Median: ${f(s.med)}|Q1: ${f(s.q1)}|Min: ${f(s.lo)}${s.outliers.length ? `|Outliers: ${s.outliers.length}` : ''}`}>
                <rect x={cx - band / 2} y={m.t} width={band} height={H - m.t - m.b} fill="transparent" />
                <line x1={cx} x2={cx} y1={y(s.hi)} y2={y(s.q3)} stroke="var(--c-text-2, #a3a3a3)" strokeWidth="1.5" />
                <line x1={cx} x2={cx} y1={y(s.q1)} y2={y(s.lo)} stroke="var(--c-text-2, #a3a3a3)" strokeWidth="1.5" />
                <line x1={cx - bw / 4} x2={cx + bw / 4} y1={y(s.hi)} y2={y(s.hi)} stroke="var(--c-text-2, #a3a3a3)" strokeWidth="1.5" />
                <line x1={cx - bw / 4} x2={cx + bw / 4} y1={y(s.lo)} y2={y(s.lo)} stroke="var(--c-text-2, #a3a3a3)" strokeWidth="1.5" />
                <rect x={cx - bw / 2} y={y(s.q3)} width={bw} height={Math.max(1, y(s.q1) - y(s.q3))} rx="4" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
                <line x1={cx - bw / 2} x2={cx + bw / 2} y1={y(s.med)} y2={y(s.med)} stroke="var(--c-text-1, #fff)" strokeWidth="2.5" />
                {s.outliers.map((o, __i: number) => <circle key={__i} cx={cx} cy={y(o)} r="3.5" fill="none" stroke={color} strokeWidth="1.5" />)}
                <text className="cf-label" x={cx} y={H - 10} textAnchor="middle">{s.label}</text>
              </g>
            );
          })}
        </svg>
      </ChartFrame>
    </>
  );
}

export default BoxPlotChart;
