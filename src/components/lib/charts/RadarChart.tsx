'use client';

import ChartFrame from './ChartFrame';
import { polar, linePath, colorAt, type Point } from './chart-utils';
import './RadarChart.css';

/**
 * RadarChart — Pure SVG spider chart comparing up to 3 entities across 5–8
 * axes on a shared 0–max scale, with value tooltips on every vertex.
 *
 * @param {string[]} axes - Attribute names (5–8 recommended).
 * @param {Array<{name: string, data: number[]}>} series - Entities (max 3).
 * @param {number} max - Scale maximum.
 * @param {string[]} colors - Optional per-series colors.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface RadarChartProps {
  title?: string;
  subtitle?: string;
  axes?: string[];
  series?: Array<{ name: string; data: number[] }>;
  max?: number;
  colors?: string[];
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function RadarChart({
  title = 'Framework comparison',
  subtitle = 'Scored 0–10 by the team',
  axes = ['Performance', 'DX', 'Ecosystem', 'SEO', 'Learning curve', 'Flexibility'],
  series = [
    { name: 'Astro', data: [9.5, 8.5, 7, 9.5, 8.5, 8] },
    { name: 'Next', data: [7.5, 8, 9.5, 8, 6.5, 8.5] },
  ],
  max = 10,
  colors,
  variant = 'glass',
  size = 'md',
  className = '',
}: RadarChartProps) {
  const S = 340;
  const c = S / 2;
  const R = S / 2 - 54;
  const n = axes.length;
  const ang = (i: number) => (i / n) * Math.PI * 2;
  const levels = [0.25, 0.5, 0.75, 1];
  const shapes = series.slice(0, 3).map((s, si) => {
    const pts: Point[] = s.data.map((v, i) => polar(c, c, R * Math.max(0, Math.min(1, v / max)), ang(i)));
    return { ...s, pts, d: `${linePath(pts)} Z`, color: colorAt(si, colors) };
  });
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className} legend={shapes.map((s) => ({ label: s.name, color: s.color }))} table={{ headers: ['Axis', ...series.map((s) => s.name)], rows: axes.map((a, i) => [a, ...series.map((s) => s.data[i])]) }}>
        <div className="rd" data-rk-b100db="">
          <svg viewBox={`0 0 ${S} ${S}`} role="img" aria-label={`${title}: radar chart across ${n} axes`} data-rk-b100db="">
            {levels.map((l, __i: number) => (
              <path key={__i} className="cf-grid" fill="none" d={`${linePath(axes.map((_, i) => polar(c, c, R * l, ang(i))))} Z`} data-rk-b100db="" />
            ))}
            {axes.map((a, i) => {
              const [x, y] = polar(c, c, R, ang(i));
              const [lx, ly] = polar(c, c, R + 18, ang(i));
              const anchor = 4 > Math.abs(lx - c) ? 'middle' : lx > c ? 'start' : 'end';
              return (
                <g key={i} data-rk-b100db="">
                  <line className="cf-grid" x1={c} y1={c} x2={x} y2={y} data-rk-b100db="" />
                  <text className="cf-label" x={lx} y={ly + 4} textAnchor={anchor} data-rk-b100db="">{a}</text>
                </g>
              );
            })}
            {shapes.map((s, __i: number) => (
              <path key={__i} d={s.d} fill={s.color} fillOpacity="0.18" stroke={s.color} strokeWidth="2" strokeLinejoin="round" aria-hidden="true" data-rk-b100db="" />
            ))}
            {shapes.map((s) => s.pts.map(([x, y], i) => (
              <circle key={i} className="cf-mark" cx={x} cy={y} r="4.5" fill={s.color} stroke="var(--chart-surface, #0d0d0f)" strokeWidth="2" tabIndex={0} role="img" aria-label={`${s.name}, ${axes[i]}: ${s.data[i]} of ${max}`} data-tip-title={axes[i]} data-tip={shapes.map((o) => `${o.color}::${o.name}: ${o.data[i]}`).join('|')} data-rk-b100db="" />
            )))}
          </svg>
        </div>
      </ChartFrame>
    </>
  );
}

export default RadarChart;
