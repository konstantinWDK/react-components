'use client';

import type { CSSProperties } from 'react';
import ChartFrame from './ChartFrame';
import { arcStroke, colorAt } from './chart-utils';
import './RadialBarChart.css';

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
 * RadialBarChart — Concentric progress arcs (one per item) sharing a 0–100%
 * scale. Labels sit at each arc's start so identity never relies on color.
 *
 * @param {Array<{label: string, value: number, max?: number}>} items - Values (default max 100).
 * @param {number} sweep - Arc sweep in degrees (180–360).
 * @param {string[]} colors - Optional per-item colors.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface RadialBarChartProps {
  title?: string;
  subtitle?: string;
  items?: Array<{ label: string; value: number; max?: number }>;
  sweep?: number;
  colors?: string[];
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function RadialBarChart({
  title = 'Feature adoption',
  subtitle = 'Share of active workspaces',
  items = [
    { label: 'Dashboards', value: 86 },
    { label: 'Alerts', value: 64 },
    { label: 'API', value: 47 },
    { label: 'SSO', value: 29 },
  ],
  sweep = 270,
  colors,
  variant = 'glass',
  size = 'md',
  className = '',
}: RadialBarChartProps) {
  const S = 300;
  const cx = S / 2;
  const cy = S / 2;
  const stroke = 16;
  const gap = 8;
  const outer = S / 2 - 14;
  const sweepRad = (Math.min(360, Math.max(180, sweep)) * Math.PI) / 180;
  const start = -sweepRad / 2 - (sweep === 360 ? 0 : 0);
  const rings = items.slice(0, 8).map((it, i) => {
    const r = outer - i * (stroke + gap);
    const pct = Math.max(0, Math.min(1, it.value / (it.max ?? 100)));
    return { ...it, r, pct, color: colorAt(i, colors) };
  });
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className} table={{ headers: ['Item', 'Value'], rows: items.map((i) => [i.label, `${i.value}${i.max ? ` / ${i.max}` : '%'}`]) }}>
        <div className="rb" data-rk-fa001b="">
          <svg viewBox={`0 0 ${S} ${S}`} role="img" aria-label={`${title}: radial bar chart`} data-rk-fa001b="">
            {rings.map((r, __i: number) => (
              <g key={__i} className="cf-mark cf-dim" tabIndex={0} role="img" aria-label={`${r.label}: ${Math.round(r.pct * 100)}%`} data-tip-title={r.label} data-tip={`${r.color}::${r.value}${r.max ? ` / ${r.max}` : '%'}`} data-rk-fa001b="">
                <path d={arcStroke(cx, cy, r.r, start, start + sweepRad)} fill="none" stroke="rgb(var(--ink-rgb, 255 255 255) / 0.06)" strokeWidth={stroke} strokeLinecap="round" data-rk-fa001b="" />
                {r.pct > 0 && (
                  <path className="rb__arc" d={arcStroke(cx, cy, r.r, start, start + sweepRad * r.pct)} fill="none" stroke={r.color} strokeWidth={stroke} strokeLinecap="round" data-rk-fa001b="" />
                )}
              </g>
            ))}
          </svg>
          <ul className="rb__labels" aria-hidden="true" data-rk-fa001b="">
            {rings.map((r, __i: number) => (
              <li key={__i} data-rk-fa001b=""><span style={st(`background:${r.color}`)} data-rk-fa001b=""></span>{r.label}<b data-rk-fa001b="">{Math.round(r.pct * 100)}%</b></li>
            ))}
          </ul>
        </div>
      </ChartFrame>
    </>
  );
}

export default RadialBarChart;
