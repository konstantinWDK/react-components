'use client';

import KpiStatTile from './KpiStatTile';
import './KpiTrendGrid.css';

/**
 * KpiTrendGrid — Responsive grid of KPI stat tiles with sparklines; the classic
 * top row of an analytics dashboard.
 *
 * @param {Array<{label: string, value: string, change: number, trend?: number[], invert?: boolean}>} metrics - Tiles.
 * @param {string} period - Shared comparison label.
 * @param {string} variant - Tile style (glass|solid|ghost).
 * @param {string} size - Density (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface KpiTrendGridProps {
  title?: string;
  metrics?: Array<{ label: string; value: string; change: number; trend?: number[]; invert?: boolean }>;
  period?: string;
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function KpiTrendGrid({
  title = 'Overview',
  metrics = [
    { label: 'Revenue', value: '$128.4k', change: 9.2, trend: [80, 84, 90, 88, 96, 102, 110, 118, 128] },
    { label: 'Active users', value: '24,812', change: 4.1, trend: [20, 21, 21.5, 22, 22.8, 23.1, 23.9, 24.2, 24.8] },
    { label: 'Churn', value: '2.3%', change: -0.6, invert: true, trend: [3.1, 3, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3] },
    { label: 'Avg. response', value: '182ms', change: 7.8, invert: true, trend: [150, 160, 158, 170, 165, 175, 172, 180, 182] },
  ],
  period = 'vs previous 30 days',
  variant = 'glass',
  size = 'md',
  className = '',
}: KpiTrendGridProps) {
  return (
    <>
      <section className={`kg ${className}`} aria-label={title} data-rk-1cf6fc="">
        {title && <h2 className="kg__title" data-rk-1cf6fc="">{title}</h2>}
        <div className="kg__grid" data-rk-1cf6fc="">
          {metrics.map((mt, __i: number) => (
            <KpiStatTile key={__i} label={mt.label} value={mt.value} change={mt.change} trend={mt.trend} invert={mt.invert} period={period} variant={variant} size={size} />
          ))}
        </div>
      </section>
    </>
  );
}

export default KpiTrendGrid;
