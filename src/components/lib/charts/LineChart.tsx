'use client';

import ChartFrame from './ChartFrame';
import { colorAt, scaleLinear, niceTicks, curvePath, areaPath, formatValue, chartId, type Point } from './chart-utils';
import './LineChart.css';

/**
 * LineChart — Zero-dependency SVG line chart with smooth, linear or step curves,
 * optional area fill, crosshair tooltip and a data-table fallback.
 *
 * @param {string[]} categories - X-axis labels.
 * @param {Array<{name: string, data: number[]}>} series - One or more series (max 8).
 * @param {string} curve - Interpolation (smooth|linear|step).
 * @param {boolean} area - Fill a soft gradient under each line.
 * @param {boolean} dots - Draw point markers.
 * @param {string} prefix - Value prefix (e.g. '$').
 * @param {string} suffix - Value suffix (e.g. '%').
 * @param {number} height - SVG height in viewBox units (width is 640).
 * @param {string[]} colors - Optional color overrides per series.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface LineChartProps {
  title?: string;
  subtitle?: string;
  categories?: string[];
  series?: Array<{ name: string; data: number[] }>;
  curve?: 'smooth' | 'linear' | 'step';
  area?: boolean;
  dots?: boolean;
  prefix?: string;
  suffix?: string;
  height?: number;
  colors?: string[];
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LineChart({
  title = 'Weekly active users',
  subtitle = 'Last 12 weeks, by platform',
  categories = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'],
  series = [
    { name: 'Web', data: [4200, 4580, 4410, 5020, 5390, 5210, 5870, 6120, 6050, 6680, 7010, 7420] },
    { name: 'Mobile', data: [2100, 2350, 2600, 2550, 2980, 3310, 3240, 3620, 3900, 4150, 4080, 4560] },
  ],
  curve = 'smooth',
  area = true,
  dots = false,
  prefix = '',
  suffix = '',
  height = 280,
  colors,
  variant = 'glass',
  size = 'md',
  className = '',
}: LineChartProps) {
  const W = 640;
  const H = height;
  const m = { t: 12, r: 16, b: 28, l: 44 };
  const all = series.flatMap((s) => s.data);
  const ticks = niceTicks(Math.min(0, ...all), Math.max(...all), 4);
  const y = scaleLinear(ticks[0], ticks[ticks.length - 1], H - m.b, m.t);
  const n = categories.length;
  const x = (i: number) => m.l + (n <= 1 ? 0 : (i / (n - 1)) * (W - m.l - m.r));
  const gid = chartId('line');
  const step = n > 1 ? (W - m.l - m.r) / (n - 1) : W;
  const labelEvery = Math.ceil(n / 8);
  
  const lines = series.slice(0, 8).map((s, si) => {
    const pts: Point[] = s.data.map((v, i) => [x(i), y(v)]);
    return {
      name: s.name,
      color: colorAt(si, colors),
      pts,
      d: curvePath(pts, curve),
      area: areaPath(pts, H - m.b, curve),
    };
  });
  
  const fmt = (v: number) => formatValue(v, prefix, suffix);
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className} legend={lines.map((l) => ({ label: l.name, color: l.color }))} table={{
          headers: ['Period', ...series.map((s) => s.name)],
          rows: categories.map((c, i) => [c, ...series.map((s) => fmt(s.data[i]))]),
        }}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${title}: line chart with ${series.length} series over ${n} periods`} data-rk-34cbfe="">
          <defs data-rk-34cbfe="">
            {lines.map((l, i) => (
              <linearGradient key={i} id={`${gid}-g${i}`} x1="0" y1="0" x2="0" y2="1" data-rk-34cbfe="">
                <stop offset="0%" stopColor={l.color} stopOpacity="0.22" data-rk-34cbfe="" />
                <stop offset="100%" stopColor={l.color} stopOpacity="0" data-rk-34cbfe="" />
              </linearGradient>
            ))}
          </defs>
      
          {ticks.map((t, __i: number) => (
            <g key={__i} data-rk-34cbfe="">
              <line className="cf-grid" x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} data-rk-34cbfe="" />
              <text className="cf-label" x={m.l - 8} y={y(t) + 4} textAnchor="end" data-rk-34cbfe="">{fmt(t)}</text>
            </g>
          ))}
      
          {categories.map((c, i) => i % labelEvery === 0 && (
            <text key={i} className="cf-label" x={x(i)} y={H - 8} textAnchor="middle" data-rk-34cbfe="">{c}</text>
          ))}
      
          {area && lines.map((l, i) => <path key={i} d={l.area} fill={`url(#${gid}-g${i})`} aria-hidden="true" data-rk-34cbfe="" />)}
          {lines.map((l, __i: number) => (
            <path key={__i} className="lc__line" d={l.d} fill="none" stroke={l.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true" data-rk-34cbfe="" />
          ))}
          {dots && lines.flatMap((l, li) => l.pts.map(([px, py], __i: number) => (
            <circle key={`${li}-${__i}`} cx={px} cy={py} r="4" fill={l.color} stroke="var(--chart-surface, #0d0d0f)" strokeWidth="2" aria-hidden="true" data-rk-34cbfe="" />
          )))}
      
          {categories.map((c, i) => (
            <g key={i} className="cf-hit-group" data-rk-34cbfe="">
              <line className="cf-cross" x1={x(i)} x2={x(i)} y1={m.t} y2={H - m.b} data-rk-34cbfe="" />
              {lines.map((l, __i: number) => (
                <circle key={__i} className="cf-cross" cx={l.pts[i]?.[0]} cy={l.pts[i]?.[1]} r="4.5" fill={l.color} stroke="#fff" strokeWidth="1.5" data-rk-34cbfe="" />
              ))}
              <rect className="cf-hit" x={x(i) - step / 2} y={m.t} width={step} height={H - m.t - m.b} tabIndex={0} role="img" aria-label={`${c}: ${series.map((s) => `${s.name} ${fmt(s.data[i])}`).join(', ')}`} data-tip-title={c} data-tip={lines.map((l, si) => `${l.color}::${l.name}: ${fmt(series[si].data[i])}`).join('|')} data-rk-34cbfe="" />
            </g>
          ))}
        </svg>
      </ChartFrame>
    </>
  );
}

export default LineChart;
