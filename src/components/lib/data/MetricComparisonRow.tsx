'use client';

import type { CSSProperties } from 'react';
import './MetricComparisonRow.css';

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
 * MetricComparisonRow — Horizontal gauge comparing actual performance vs target benchmark with percentage badge.
 * 
 * @param {string} title - Benchmark description (e.g. 'Monthly Revenue Target').
 * @param {number} current - Current numeric value figure.
 * @param {number} target - Goal target value.
 * @param {string} unit - Unit prefix or suffix (e.g. '$', 'ms', 'users'). Default is '$'.
 * @param {string} color - Progress bar accent color. Default is '#d4a017'.
 */
export interface MetricComparisonRowProps {
  title: string;
  current: number;
  target: number;
  unit?: string;
  color?: string;
}

export function MetricComparisonRow({
  title = 'Quarterly Revenue Target',
  current = 8450,
  target = 10000,
  unit = '$',
  color = '#d4a017',
}: MetricComparisonRowProps) {
  const safeCurrent = current ?? 0;
  const safeTarget = (target && target > 0) ? target : 1;
  const percent = Math.min(100, Math.round((safeCurrent / safeTarget) * 100));
  return (
    <>
      <div className="metric-row" style={st(`--metric-accent: ${color};`)} data-rk-4ef0f8="">
        <div className="metric-row__header" data-rk-4ef0f8="">
          <div className="metric-row__title-wrap" data-rk-4ef0f8="">
            <h5 className="metric-row__title" data-rk-4ef0f8="">{title}</h5>
            <span className="metric-row__ratio" data-rk-4ef0f8="">{unit}{safeCurrent.toLocaleString()} of {unit}{safeTarget.toLocaleString()}</span>
          </div>
          <span className="metric-row__badge" data-rk-4ef0f8="">{percent}%</span>
        </div>
      
        <div className="metric-row__track" role="progressbar" aria-valuenow={safeCurrent} aria-valuemax={safeTarget} aria-valuemin={0} data-rk-4ef0f8="">
          <div className="metric-row__fill" style={st(`width: ${percent}%;`)} data-rk-4ef0f8=""></div>
        </div>
      </div>
    </>
  );
}

export default MetricComparisonRow;
