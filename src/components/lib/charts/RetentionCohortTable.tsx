'use client';

import type { CSSProperties } from 'react';
import ChartFrame from './ChartFrame';
import './RetentionCohortTable.css';

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
 * RetentionCohortTable — Triangular cohort retention matrix. Each row is a
 * signup cohort, each column a period since signup, shaded on a single-hue ramp.
 *
 * @param {Array<{cohort: string, size: number, retention: number[]}>} cohorts - Retention % per period (period 0 = 100).
 * @param {string} periodLabel - Column prefix (e.g. 'Week', 'Month').
 * @param {string} color - Ramp hue.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface RetentionCohortTableProps {
  title?: string;
  subtitle?: string;
  cohorts?: Array<{ cohort: string; size: number; retention: number[] }>;
  periodLabel?: string;
  color?: string;
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function RetentionCohortTable({
  title = 'User retention',
  subtitle = 'Monthly cohorts, % still active',
  cohorts = [
    { cohort: 'May', size: 1240, retention: [100, 62, 48, 41, 37, 35] },
    { cohort: 'Jun', size: 1410, retention: [100, 65, 51, 44, 40] },
    { cohort: 'Jul', size: 1580, retention: [100, 68, 55, 47] },
    { cohort: 'Aug', size: 1720, retention: [100, 71, 57] },
    { cohort: 'Sep', size: 1890, retention: [100, 73] },
    { cohort: 'Oct', size: 2050, retention: [100] },
  ],
  periodLabel = 'M',
  color = 'var(--chart-3, #199e70)',
  variant = 'glass',
  size = 'md',
  className = '',
}: RetentionCohortTableProps) {
  const periods = Math.max(...cohorts.map((c) => c.retention.length));
  const cols = Array.from({ length: periods }, (_, i) => `${periodLabel}${i}`);
  const shade = (v: number) => `color-mix(in srgb, ${color} ${Math.round(10 + (v / 100) * 85)}%, #141416)`;
  const avg = cols.map((_, i) => {
    const vals = cohorts.map((c) => c.retention[i]).filter((v) => v !== undefined);
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  });
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className}>
        <div className="rc" data-rk-14b914="">
          <table className="rc__table" data-rk-14b914="">
            <caption className="sr-only" data-rk-14b914="">{title}: retention percentage by cohort and period</caption>
            <thead data-rk-14b914="">
              <tr data-rk-14b914="">
                <th scope="col" data-rk-14b914="">Cohort</th>
                <th scope="col" data-rk-14b914="">Users</th>
                {cols.map((c, __i: number) => <th key={__i} scope="col" data-rk-14b914="">{c}</th>)}
              </tr>
            </thead>
            <tbody data-rk-14b914="">
              {cohorts.map((c, __i: number) => (
                <tr key={__i} data-rk-14b914="">
                  <th scope="row" data-rk-14b914="">{c.cohort}</th>
                  <td className="rc__size" data-rk-14b914="">{c.size.toLocaleString('en-US')}</td>
                  {cols.map((_, i) => {
                    const v = c.retention[i];
                    return v === undefined
                      ? <td className="rc__empty" aria-label="no data yet" data-rk-14b914=""></td>
                      : <td className="rc__cell" style={st(`background:${shade(v)}`)} data-strong={v > 55 ? '' : undefined} data-rk-14b914="">{v}%</td>;
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot data-rk-14b914="">
              <tr data-rk-14b914="">
                <th scope="row" data-rk-14b914="">Average</th>
                <td data-rk-14b914=""></td>
                {avg.map((a, __i: number) => <td key={__i} className="rc__avg" data-rk-14b914="">{a.toFixed(0)}%</td>)}
              </tr>
            </tfoot>
          </table>
        </div>
      </ChartFrame>
    </>
  );
}

export default RetentionCohortTable;
