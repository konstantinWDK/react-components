'use client';

import KpiStatTile from '../charts/KpiStatTile';
import StackedAreaChart from '../charts/StackedAreaChart';
import HorizontalBarChart from '../charts/HorizontalBarChart';
import './StatsDashboardSection.css';

interface Kpi { label: string; value: string; change: number; trend?: number[]; invert?: boolean }

/**
 * StatsDashboardSection — Complete analytics section: heading, KPI tile row and
 * two charts (trend + ranked breakdown) composed from the kit's SVG charts.
 *
 * @param {string} eyebrow - Small label above the heading.
 * @param {string} title - Section heading.
 * @param {string} subtitle - Section description.
 * @param {Array<{label: string, value: string, change: number, trend?: number[], invert?: boolean}>} kpis - KPI tiles.
 * @param {string} variant - Chart card style (glass|solid|ghost).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface StatsDashboardSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  kpis?: Kpi[];
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatsDashboardSection({
  eyebrow = 'Live metrics',
  title = 'Growth you can see',
  subtitle = 'Real numbers from teams running on the kit, updated every build.',
  kpis = [
    { label: 'Monthly visitors', value: '1.2M', change: 18.4, trend: [60, 64, 70, 72, 80, 88, 95, 104, 120] },
    { label: 'Conversion rate', value: '4.6%', change: 0.9, trend: [3.4, 3.6, 3.7, 3.9, 4, 4.2, 4.3, 4.5, 4.6] },
    { label: 'Avg. load time', value: '0.8s', change: -22, invert: true, trend: [1.3, 1.25, 1.1, 1.05, 1, 0.95, 0.9, 0.85, 0.8] },
    { label: 'Bounce rate', value: '31%', change: -4.2, invert: true, trend: [38, 37, 36, 35, 34, 33, 33, 32, 31] },
  ],
  variant = 'glass',
  size = 'md',
  className = '',
}: StatsDashboardSectionProps) {
  const id = `sds-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <>
      <div className="cq-stats-dashboard-section-cq" data-rk-e3f5a0="">
      <section className={`sds sds--${size} ${className}`} aria-labelledby={id} data-rk-e3f5a0="">
        <div className="sds__inner" data-rk-e3f5a0="">
          <header className="sds__head" data-rk-e3f5a0="">
            <p className="sds__eyebrow" data-rk-e3f5a0=""><span className="sds__live" aria-hidden="true" data-rk-e3f5a0=""></span>{eyebrow}</p>
            <h2 id={id} className="sds__title" data-rk-e3f5a0="">{title}</h2>
            <p className="sds__subtitle" data-rk-e3f5a0="">{subtitle}</p>
          </header>
          <div className="sds__kpis" data-rk-e3f5a0="">
            {kpis.map((k, __i: number) => (
              <KpiStatTile key={__i} label={k.label} value={k.value} change={k.change} trend={k.trend} invert={k.invert} period="vs last quarter" variant={variant} size="sm" />
            ))}
          </div>
          <div className="sds__charts" data-rk-e3f5a0="">
            <StackedAreaChart title="Sessions by channel" subtitle="Thousands per month" variant={variant} />
            <HorizontalBarChart title="Top landing pages" subtitle="Visitors, last 30 days" variant={variant} />
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default StatsDashboardSection;
