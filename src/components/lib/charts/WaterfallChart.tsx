'use client';

import ChartFrame from './ChartFrame';
import { scaleLinear, niceTicks, formatValue, POSITIVE, NEGATIVE } from './chart-utils';

/**
 * WaterfallChart — Shows how a starting value is built up or eroded by a
 * sequence of positive and negative steps, ending in a total.
 *
 * @param {string} startLabel - Label for the opening bar.
 * @param {number} start - Opening value.
 * @param {Array<{label: string, value: number}>} steps - Signed changes.
 * @param {string} endLabel - Label for the closing total bar.
 * @param {string} prefix - Value prefix.
 * @param {string} suffix - Value suffix.
 * @param {string} variant - Card style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 */
export interface WaterfallChartProps {
  title?: string;
  subtitle?: string;
  startLabel?: string;
  start?: number;
  steps?: Array<{ label: string; value: number }>;
  endLabel?: string;
  prefix?: string;
  suffix?: string;
  height?: number;
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function WaterfallChart({
  title = 'ARR bridge',
  subtitle = 'From January to June',
  startLabel = 'Jan ARR',
  start = 1200000,
  steps = [
    { label: 'New', value: 380000 },
    { label: 'Expansion', value: 210000 },
    { label: 'Contraction', value: -90000 },
    { label: 'Churn', value: -160000 },
    { label: 'Reactivation', value: 45000 },
  ],
  endLabel = 'Jun ARR',
  prefix = '$',
  suffix = '',
  height = 290,
  variant = 'glass',
  size = 'md',
  className = '',
}: WaterfallChartProps) {
  const W = 640;
  const H = height;
  const m = { t: 22, r: 12, b: 30, l: 52 };
  let run = start;
  const bars = [
    { label: startLabel, from: 0, to: start, kind: 'total' as const, value: start },
    ...steps.map((s) => {
      const from = run;
      run += s.value;
      return { label: s.label, from, to: run, kind: s.value >= 0 ? ('up' as const) : ('down' as const), value: s.value };
    }),
    { label: endLabel, from: 0, to: run, kind: 'total' as const, value: run },
  ];
  const ticks = niceTicks(0, Math.max(...bars.map((b) => Math.max(b.from, b.to))), 4);
  const y = scaleLinear(0, ticks[ticks.length - 1], H - m.b, m.t);
  const band = (W - m.l - m.r) / bars.length;
  const bw = band * 0.62;
  const colorOf = (k: string) => (k === 'up' ? POSITIVE : k === 'down' ? NEGATIVE : 'var(--chart-1, #3987e5)');
  const fmt = (v: number) => formatValue(v, prefix, suffix);
  const fmtSigned = (v: number) => `${v >= 0 ? '+' : '−'}${formatValue(Math.abs(v), prefix, suffix)}`;
  return (
    <>
      <ChartFrame title={title} subtitle={subtitle} variant={variant} size={size} className={className} legend={[
          { label: 'Total', color: 'var(--chart-1, #3987e5)' },
          { label: 'Increase', color: POSITIVE },
          { label: 'Decrease', color: NEGATIVE },
        ]} table={{ headers: ['Step', 'Change', 'Running total'], rows: bars.map((b) => [b.label, b.kind === 'total' ? '—' : fmtSigned(b.value), fmt(b.to)]) }}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${title}: waterfall chart from ${fmt(start)} to ${fmt(run)}`}>
          {ticks.map((t, __i: number) => (
            <g key={__i}>
              <line className={t === 0 ? 'cf-axis' : 'cf-grid'} x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} />
              <text className="cf-label" x={m.l - 8} y={y(t) + 4} textAnchor="end">{fmt(t)}</text>
            </g>
          ))}
          {bars.map((b, i) => {
            const bx = m.l + i * band + (band - bw) / 2;
            const top = y(Math.max(b.from, b.to));
            const h = Math.max(1, Math.abs(y(b.from) - y(b.to)));
            const c = colorOf(b.kind);
            const next = bars[i + 1];
            return (
              <g>
                {next && <line className="cf-axis" x1={bx + bw} x2={bx + band} y1={y(b.to)} y2={y(b.to)} opacity="0.7" />}
                <rect className="cf-mark cf-dim" x={bx} y={top} width={bw} height={h} rx="3" fill={c} tabIndex={0} role="img" aria-label={`${b.label}: ${b.kind === 'total' ? fmt(b.value) : fmtSigned(b.value)}, total ${fmt(b.to)}`} data-tip-title={b.label} data-tip={b.kind === 'total' ? `${c}::Total: ${fmt(b.value)}` : `${c}::Change: ${fmtSigned(b.value)}|Running: ${fmt(b.to)}`} />
                <text className="cf-label cf-label--strong" x={bx + bw / 2} y={top - 6} textAnchor="middle">
                  {b.kind === 'total' ? fmt(b.value) : fmtSigned(b.value)}
                </text>
                <text className="cf-label" x={bx + bw / 2} y={H - 10} textAnchor="middle">{b.label}</text>
              </g>
            );
          })}
        </svg>
      </ChartFrame>
    </>
  );
}

export default WaterfallChart;
