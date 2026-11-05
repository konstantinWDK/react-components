'use client';

import type { CSSProperties } from 'react';
import './LinearProgressGauge.css';

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
 * LinearProgressGauge — Multi-segmented horizontal memory or budget progress bar with breakdown legend.
 * 
 * @param {string} title - Gauge header label. Default is 'Resource Allocation'.
 * @param {Array<{label: string, value: number, color: string}>} segments - Proportion breakdown chunks.
 * @param {string} total - Formatted total capacity string (e.g. '16 GB', '100%'). Default is '100%'.
 */
export interface LinearProgressGaugeProps {
  title?: string;
  segments?: Array<{ label: string; value: number; color: string }>;
  total?: string;
}

export function LinearProgressGauge({
  title = 'System Resource Allocation',
  segments = [
    { label: 'SSR Execution', value: 45, color: '#d4a017' },
    { label: 'Asset Caching', value: 25, color: '#38bdf8' },
    { label: 'Edge Worker', value: 15, color: '#a855f7' },
    { label: 'Free Headroom', value: 15, color: 'rgb(var(--ink-rgb, 255 255 255) / 0.1)' },
  ],
  total = '100%',
}: LinearProgressGaugeProps) {
  const totalSum = segments.reduce((acc, s) => acc + s.value, 0) || 100;
  return (
    <>
      <div className="linear-gauge" data-rk-4f95ee="">
        <div className="linear-gauge__header" data-rk-4f95ee="">
          <span className="linear-gauge__title" data-rk-4f95ee="">{title}</span>
          <span className="linear-gauge__total" data-rk-4f95ee="">{total}</span>
        </div>
      
        <div className="linear-gauge__bar" role="progressbar" aria-valuemax={100} aria-valuemin={0} data-rk-4f95ee="">
          {segments.map((seg) => {
            const pct = (seg.value / totalSum) * 100;
            return (
              <div className="linear-gauge__chunk" style={st(`width: ${pct}%; background-color: ${seg.color};`)} title={`${seg.label}: ${seg.value}%`} data-rk-4f95ee="" />
            );
          })}
        </div>
      
        <div className="linear-gauge__legend" data-rk-4f95ee="">
          {segments.map((seg, __i: number) => (
            <div key={__i} className="legend-item" data-rk-4f95ee="">
              <span className="legend-item__dot" style={st(`background-color: ${seg.color};`)} data-rk-4f95ee=""></span>
              <span className="legend-item__name" data-rk-4f95ee="">{seg.label}</span>
              <span className="legend-item__val" data-rk-4f95ee="">{seg.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default LinearProgressGauge;
