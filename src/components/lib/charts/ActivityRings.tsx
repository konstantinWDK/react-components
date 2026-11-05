'use client';

import type { CSSProperties } from 'react';
import ChartFrame from './ChartFrame';
import { arcStroke, colorAt } from './chart-utils';
import './ActivityRings.css';

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
 * ActivityRings — Concentric closed rings tracking daily goals (move, exercise,
 * stand style). Values over 100% wrap with a stronger overlap stroke.
 *
 * @param {Array<{label: string, value: number, goal: number, unit?: string}>} rings - Up to 4 goals.
 * @param {string[]} colors - Optional per-ring colors.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface ActivityRingsProps {
  title?: string;
  subtitle?: string;
  rings?: Array<{ label: string; value: number; goal: number; unit?: string }>;
  colors?: string[];
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ActivityRings({
  title = 'Today',
  subtitle = 'Daily goals',
  rings = [
    { label: 'Focus time', value: 5.2, goal: 6, unit: 'h' },
    { label: 'Tasks done', value: 11, goal: 8 },
    { label: 'Reviews', value: 3, goal: 5 },
  ],
  colors = ['var(--chart-5, #d55181)', 'var(--chart-3, #199e70)', 'var(--chart-1, #3987e5)'],
  variant = 'glass',
  size = 'md',
  className = '',
}: ActivityRingsProps) {
  const S = 220;
  const c = S / 2;
  const stroke = 20;
  const items = rings.slice(0, 4).map((r, i) => {
    const radius = c - stroke / 2 - 4 - i * (stroke + 4);
    const pct = r.value / (r.goal || 1);
    return { ...r, radius, pct, color: colorAt(i, colors) };
  });
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className} table={{ headers: ['Goal', 'Value', 'Target', 'Progress'], rows: items.map((r) => [r.label, `${r.value}${r.unit ?? ''}`, `${r.goal}${r.unit ?? ''}`, `${Math.round(r.pct * 100)}%`]) }}>
        <div className="ar" data-rk-2006ec="">
          <svg viewBox={`0 0 ${S} ${S}`} role="img" aria-label={`${title}: ${items.map((r) => `${r.label} ${Math.round(r.pct * 100)}%`).join(', ')}`} data-rk-2006ec="">
            {items.map((r, __i: number) => {
              const main = Math.min(r.pct, 0.9999);
              const extra = r.pct > 1 ? Math.min(r.pct - 1, 0.9999) : 0;
              return (
                <g key={__i} data-rk-2006ec="">
                  <circle cx={c} cy={c} r={r.radius} fill="none" stroke={r.color} strokeOpacity="0.16" strokeWidth={stroke} data-rk-2006ec="" />
                  {main > 0 && <path className="ar__arc" d={arcStroke(c, c, r.radius, 0, Math.PI * 2 * main)} fill="none" stroke={r.color} strokeWidth={stroke} strokeLinecap="round" data-rk-2006ec="" />}
                  {extra > 0 && <path d={arcStroke(c, c, r.radius, 0, Math.PI * 2 * extra)} fill="none" stroke={r.color} strokeWidth={stroke} strokeLinecap="round" style={{ filter: "drop-shadow(0 0 3px rgba(0,0,0,0.6)) brightness(1.15)" }} data-rk-2006ec="" />}
                </g>
              );
            })}
          </svg>
          <ul className="ar__list" data-rk-2006ec="">
            {items.map((r, __i: number) => (
              <li key={__i} data-rk-2006ec="">
                <span className="ar__label" data-rk-2006ec=""><i style={st(`background:${r.color}`)} aria-hidden="true" data-rk-2006ec=""></i>{r.label}</span>
                <span className="ar__value" data-rk-2006ec="">{r.value}{r.unit ?? ''}<small data-rk-2006ec="">/{r.goal}{r.unit ?? ''}</small></span>
                <span className="ar__pct" data-rk-2006ec="">{Math.round(r.pct * 100)}%{r.pct >= 1 && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-label="goal met" data-rk-2006ec=""><path d="M20 6 9 17l-5-5" data-rk-2006ec="" /></svg>}</span>
              </li>
            ))}
          </ul>
        </div>
      </ChartFrame>
    </>
  );
}

export default ActivityRings;
