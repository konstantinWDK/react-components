'use client';

import SparklineChart from './SparklineChart';
import './KpiStatTile.css';

/**
 * KpiStatTile — Hero-number statistic tile: label, big value, change vs previous
 * period (icon + text, never color alone) and an optional sparkline.
 *
 * @param {string} label - Metric name.
 * @param {string} value - Formatted value.
 * @param {number} change - Percentage change vs comparison period.
 * @param {string} period - Comparison period label (e.g. 'vs last month').
 * @param {boolean} invert - Treat a decrease as good (e.g. churn, latency).
 * @param {number[]} trend - Optional sparkline data.
 * @param {string} variant - Visual style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface KpiStatTileProps {
  label?: string;
  value?: string;
  change?: number;
  period?: string;
  invert?: boolean;
  trend?: number[];
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function KpiStatTile({
  label = 'Monthly recurring revenue',
  value = '$84,210',
  change = 12.4,
  period = 'vs last month',
  invert = false,
  trend = [52, 55, 54, 60, 63, 61, 68, 72, 70, 76, 80, 84],
  variant = 'glass',
  size = 'md',
  className = '',
}: KpiStatTileProps) {
  const up = change >= 0;
  const good = invert ? !up : up;
  return (
    <>
      <article className={`kpi kpi--${variant} kpi--${size} ${className}`} aria-label={`${label}: ${value}, ${up ? 'up' : 'down'} ${Math.abs(change)}% ${period}`} data-rk-727d83="">
        <header className="kpi__head" data-rk-727d83="">
          <h3 className="kpi__label" data-rk-727d83="">{label}</h3>
          <span className={`kpi__chip ${good ? 'kpi__chip--good' : 'kpi__chip--bad'}`} data-rk-727d83="">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-727d83="">
              {up ? <path d="M7 17 17 7M9 7h8v8" data-rk-727d83="" /> : <path d="M7 7l10 10M17 9v8H9" data-rk-727d83="" />}
            </svg>
            {up ? '+' : '−'}{Math.abs(change)}%
          </span>
        </header>
        <p className="kpi__value" data-rk-727d83="">{value}</p>
        <div className="kpi__foot" data-rk-727d83="">
          <span className="kpi__period" data-rk-727d83="">{period}</span>
          {trend.length > 1 && (
            <SparklineChart data={trend} size={size === 'lg' ? 'lg' : 'md'} color={good ? 'var(--chart-pos, #34c38f)' : 'var(--chart-neg, #f06a6a)'} label={`${label} trend`} />
          )}
        </div>
      </article>
    </>
  );
}

export default KpiStatTile;
