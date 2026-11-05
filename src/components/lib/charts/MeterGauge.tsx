'use client';

import type { CSSProperties } from 'react';
import ChartFrame from './ChartFrame';
import { arcStroke, polar } from './chart-utils';
import './MeterGauge.css';

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

interface Zone { to: number; label: string; tone: 'good' | 'warn' | 'bad' }

/**
 * MeterGauge — Speedometer-style dial with labelled threshold zones and a
 * needle. Zones use status colors and every zone is named in text.
 *
 * @param {number} value - Current reading.
 * @param {number} min - Scale minimum.
 * @param {number} max - Scale maximum.
 * @param {Array<{to: number, label: string, tone: 'good'|'warn'|'bad'}>} zones - Ascending zones.
 * @param {string} unit - Unit label.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface MeterGaugeProps {
  title?: string;
  subtitle?: string;
  value?: number;
  min?: number;
  max?: number;
  zones?: Zone[];
  unit?: string;
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MeterGauge({
  title = 'CPU load',
  subtitle = 'Cluster average, live',
  value = 68,
  min = 0,
  max = 100,
  zones = [
    { to: 60, label: 'Healthy', tone: 'good' },
    { to: 85, label: 'Elevated', tone: 'warn' },
    { to: 100, label: 'Critical', tone: 'bad' },
  ],
  unit = '%',
  variant = 'glass',
  size = 'md',
  className = '',
}: MeterGaugeProps) {
  const toneColor = { good: 'var(--chart-pos, #34c38f)', warn: 'var(--chart-4, #c98500)', bad: 'var(--chart-neg, #f06a6a)' };
  const W = 280;
  const H = 170;
  const cx = W / 2;
  const cy = 150;
  const r = 112;
  const span = (Math.PI * 4) / 3; // 240°
  const start = -span / 2;
  const ang = (v: number) => start + ((Math.min(max, Math.max(min, v)) - min) / (max - min || 1)) * span;
  let prev = min;
  const arcs = zones.map((z) => {
    const d = arcStroke(cx, cy - 20, r, ang(prev) + 0.015, ang(z.to) - 0.015);
    prev = z.to;
    return { ...z, d };
  });
  const current = zones.find((z) => value <= z.to) ?? zones[zones.length - 1];
  const [nx, ny] = polar(cx, cy - 20, r - 24, ang(value));
  const ticks = [min, min + (max - min) / 2, max];
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className} table={{ headers: ['Zone', 'Up to'], rows: zones.map((z) => [z.label, `${z.to}${unit}`]) }}>
        <div className="mg" role="meter" aria-valuemin={min} aria-valuemax={max} aria-valuenow={value} aria-valuetext={`${value}${unit}, ${current.label}`} aria-label={title} data-rk-fff4b2="">
          <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" data-rk-fff4b2="">
            {arcs.map((a, __i: number) => <path key={__i} d={a.d} fill="none" stroke={toneColor[a.tone]} strokeWidth="14" strokeLinecap="butt" opacity={a.label === current.label ? 1 : 0.3} data-rk-fff4b2="" />)}
            {ticks.map((t) => {
              const [tx, ty] = polar(cx, cy - 20, r + 18, ang(t));
              return <text className="cf-label" x={tx} y={ty + 4} textAnchor="middle" data-rk-fff4b2="">{t}</text>;
            })}
            <line className="mg__needle" x1={cx} y1={cy - 20} x2={nx} y2={ny} stroke="var(--c-text-1, #fff)" strokeWidth="3" strokeLinecap="round" data-rk-fff4b2="" />
            <circle cx={cx} cy={cy - 20} r="7" fill="var(--c-text-1, #fff)" data-rk-fff4b2="" />
            <circle cx={cx} cy={cy - 20} r="3" fill="var(--chart-surface, #0d0d0f)" data-rk-fff4b2="" />
          </svg>
          <div className="mg__readout" data-rk-fff4b2="">
            <span className="mg__value" data-rk-fff4b2="">{value}<small data-rk-fff4b2="">{unit}</small></span>
            <span className="mg__zone" style={st(`--mg-c:${toneColor[current.tone]}`)} data-rk-fff4b2="">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true" data-rk-fff4b2="">
                {current.tone === 'good' ? <path d="M20 6 9 17l-5-5" data-rk-fff4b2="" /> : <><circle cx="12" cy="12" r="9" data-rk-fff4b2="" /><path d="M12 8v4M12 16h.01" data-rk-fff4b2="" /></>}
              </svg>
              {current.label}
            </span>
          </div>
        </div>
      </ChartFrame>
    </>
  );
}

export default MeterGauge;
