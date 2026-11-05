'use client';

import ChartFrame from './ChartFrame';
import { colorAt, scaleLinear, niceTicks, formatValue } from './chart-utils';
import './GroupedBarChart.css';

/**
 * GroupedBarChart — Side-by-side vertical bars for comparing several series
 * across categories. Bars have rounded data-ends anchored to the baseline.
 *
 * @param {string[]} categories - X-axis groups.
 * @param {Array<{name: string, data: number[]}>} series - Series per group (max 8).
 * @param {string} prefix - Value prefix.
 * @param {string} suffix - Value suffix.
 * @param {number} height - SVG height in viewBox units (width is 640).
 * @param {string[]} colors - Optional per-series colors.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface GroupedBarChartProps {
  title?: string;
  subtitle?: string;
  categories?: string[];
  series?: Array<{ name: string; data: number[] }>;
  prefix?: string;
  suffix?: string;
  height?: number;
  colors?: string[];
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function GroupedBarChart({
  title = 'Revenue by region',
  subtitle = 'This year vs last year',
  categories = ['NA', 'EMEA', 'LATAM', 'APAC', 'ANZ'],
  series = [
    { name: '2025', data: [420, 310, 120, 260, 90] },
    { name: '2026', data: [510, 365, 168, 340, 112] },
  ],
  prefix = '$',
  suffix = 'k',
  height = 280,
  colors,
  variant = 'glass',
  size = 'md',
  className = '',
}: GroupedBarChartProps) {
  const W = 640;
  const H = height;
  const m = { t: 12, r: 12, b: 28, l: 48 };
  const ticks = niceTicks(0, Math.max(...series.flatMap((s) => s.data)), 4);
  const y = scaleLinear(0, ticks[ticks.length - 1], H - m.b, m.t);
  const groupW = (W - m.l - m.r) / categories.length;
  const inner = groupW * 0.72;
  const gap = 2;
  const barW = (inner - gap * (series.length - 1)) / series.length;
  const R = Math.min(4, barW / 2);
  const fmt = (v: number) => formatValue(v, prefix, suffix);
  
  /** Bar with rounded top corners only (data-end), square at the baseline. */
  const barPath = (bx: number, top: number, w: number, base: number) => {
    const h = base - top;
    if (h <= 0) return '';
    const r = Math.min(R, h);
    return `M${bx},${base} V${top + r} Q${bx},${top} ${bx + r},${top} H${bx + w - r} Q${bx + w},${top} ${bx + w},${top + r} V${base} Z`;
  };
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className} legend={series.map((s, i) => ({ label: s.name, color: colorAt(i, colors) }))} table={{ headers: ['Category', ...series.map((s) => s.name)], rows: categories.map((c, i) => [c, ...series.map((s) => fmt(s.data[i]))]) }}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${title}: grouped bar chart`} data-rk-1a0e25="">
          {ticks.map((t, __i: number) => (
            <g key={__i} data-rk-1a0e25="">
              <line className={t === 0 ? 'cf-axis' : 'cf-grid'} x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} data-rk-1a0e25="" />
              <text className="cf-label" x={m.l - 8} y={y(t) + 4} textAnchor="end" data-rk-1a0e25="">{fmt(t)}</text>
            </g>
          ))}
          {categories.map((c, ci) => {
            const gx = m.l + ci * groupW + (groupW - inner) / 2;
            return (
              <g key={ci} data-rk-1a0e25="">
                <text className="cf-label" x={m.l + ci * groupW + groupW / 2} y={H - 8} textAnchor="middle" data-rk-1a0e25="">{c}</text>
                {series.slice(0, 8).map((s, si) => {
                  const bx = gx + si * (barW + gap);
                  const v = s.data[ci] ?? 0;
                  return (
                    <path key={si} className="cf-mark cf-dim gb__bar" d={barPath(bx, y(v), barW, y(0))} fill={colorAt(si, colors)} tabIndex={0} role="img" aria-label={`${c}, ${s.name}: ${fmt(v)}`} data-tip-title={c} data-tip={`${colorAt(si, colors)}::${s.name}: ${fmt(v)}`} data-rk-1a0e25="" />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </ChartFrame>
    </>
  );
}

export default GroupedBarChart;
