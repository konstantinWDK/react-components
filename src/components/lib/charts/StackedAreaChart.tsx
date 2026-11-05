'use client';

import ChartFrame from './ChartFrame';
import { colorAt, scaleLinear, niceTicks, bandPath, curvePath, formatValue, type Point } from './chart-utils';

/**
 * StackedAreaChart — Stacked (or 100% normalised) SVG area chart for showing how
 * parts contribute to a changing total over time.
 *
 * @param {string[]} categories - X-axis labels.
 * @param {Array<{name: string, data: number[]}>} series - Stacked layers, bottom first (max 8).
 * @param {boolean} normalized - Show each period as 100% share instead of absolute totals.
 * @param {string} curve - Interpolation (smooth|linear|step).
 * @param {string} prefix - Value prefix.
 * @param {string} suffix - Value suffix.
 * @param {number} height - SVG height in viewBox units (width is 640).
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface StackedAreaChartProps {
  title?: string;
  subtitle?: string;
  categories?: string[];
  series?: Array<{ name: string; data: number[] }>;
  normalized?: boolean;
  curve?: 'smooth' | 'linear' | 'step';
  prefix?: string;
  suffix?: string;
  height?: number;
  colors?: string[];
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StackedAreaChart({
  title = 'Traffic by channel',
  subtitle = 'Sessions per month, stacked',
  categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  series = [
    { name: 'Organic', data: [320, 340, 390, 420, 460, 480, 530, 560, 610] },
    { name: 'Paid', data: [180, 210, 200, 240, 260, 250, 270, 300, 290] },
    { name: 'Referral', data: [90, 110, 120, 130, 125, 150, 170, 160, 190] },
  ],
  normalized = false,
  curve = 'smooth',
  prefix = '',
  suffix = '',
  height = 280,
  colors,
  variant = 'glass',
  size = 'md',
  className = '',
}: StackedAreaChartProps) {
  const W = 640;
  const H = height;
  const m = { t: 12, r: 16, b: 28, l: 44 };
  const n = categories.length;
  const totals = categories.map((_, i) => series.reduce((a, s) => a + (s.data[i] ?? 0), 0));
  const val = (si: number, i: number) => {
    const v = series[si].data[i] ?? 0;
    return normalized ? (v / (totals[i] || 1)) * 100 : v;
  };
  const ticks = normalized ? [0, 25, 50, 75, 100] : niceTicks(0, Math.max(...totals), 4);
  const y = scaleLinear(0, ticks[ticks.length - 1], H - m.b, m.t);
  const x = (i: number) => m.l + (n <= 1 ? 0 : (i / (n - 1)) * (W - m.l - m.r));
  const step = n > 1 ? (W - m.l - m.r) / (n - 1) : W;
  
  const running = categories.map(() => 0);
  const layers = series.slice(0, 8).map((s, si) => {
    const lower: Point[] = categories.map((_, i) => [x(i), y(running[i])]);
    categories.forEach((_, i) => { running[i] += val(si, i); });
    const upper: Point[] = categories.map((_, i) => [x(i), y(running[i])]);
    return { name: s.name, color: colorAt(si, colors), d: bandPath(upper, lower, curve), top: curvePath(upper, curve) };
  });
  
  const fmt = (v: number) => (normalized ? `${v.toFixed(0)}%` : formatValue(v, prefix, suffix));
  const fmtRaw = (v: number) => formatValue(v, prefix, suffix);
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className} legend={layers.map((l) => ({ label: l.name, color: l.color }))} table={{
          headers: ['Period', ...series.map((s) => s.name), 'Total'],
          rows: categories.map((c, i) => [c, ...series.map((s) => fmtRaw(s.data[i])), fmtRaw(totals[i])]),
        }}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${title}: stacked area chart`}>
          {ticks.map((t, __i: number) => (
            <g key={__i}>
              <line className="cf-grid" x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} />
              <text className="cf-label" x={m.l - 8} y={y(t) + 4} textAnchor="end">{fmt(t)}</text>
            </g>
          ))}
          {categories.map((c, i) => <text key={i} className="cf-label" x={x(i)} y={H - 8} textAnchor="middle">{c}</text>)}
      
          {layers.map((l, __i: number) => (
            <g key={__i} aria-hidden="true">
              <path d={l.d} fill={l.color} fillOpacity="0.32" />
              <path d={l.top} fill="none" stroke={l.color} strokeWidth="2" />
            </g>
          ))}
      
          {categories.map((c, i) => (
            <g key={i} className="cf-hit-group">
              <line className="cf-cross" x1={x(i)} x2={x(i)} y1={m.t} y2={H - m.b} />
              <rect className="cf-hit" x={x(i) - step / 2} y={m.t} width={step} height={H - m.t - m.b} tabIndex={0} role="img" aria-label={`${c}: ${series.map((s) => `${s.name} ${fmtRaw(s.data[i])}`).join(', ')}; total ${fmtRaw(totals[i])}`} data-tip-title={`${c} · ${fmtRaw(totals[i])}`} data-tip={[...layers].reverse().map((l, ri) => {
                  const si = layers.length - 1 - ri;
                  return `${l.color}::${l.name}: ${fmtRaw(series[si].data[i])}${normalized ? ` (${val(si, i).toFixed(0)}%)` : ''}`;
                }).join('|')} />
            </g>
          ))}
        </svg>
      </ChartFrame>
    </>
  );
}

export default StackedAreaChart;
