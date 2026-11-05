'use client';

import { useId } from 'react';
import LineChart from '../charts/LineChart';
import KpiStatTile from '../charts/KpiStatTile';
import './HeroDashboardPreview.css';

/**
 * HeroDashboardPreview — SaaS hero with headline, CTAs and a live-rendered
 * product dashboard mockup built from the kit's own SVG charts.
 *
 * @param {string} badge - Eyebrow badge.
 * @param {string} title - Headline.
 * @param {string} subtitle - Supporting paragraph.
 * @param {{label: string, href: string}} primary - Primary CTA.
 * @param {{label: string, href: string}} secondary - Secondary CTA.
 * @param {string} variant - Mockup frame (browser|floating|flat).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface HeroDashboardPreviewProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  variant?: 'browser' | 'floating' | 'flat';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function HeroDashboardPreview({
  badge = 'Analytics, reimagined',
  title = 'See every metric that matters, in real time',
  subtitle = 'Unified revenue, product and infrastructure dashboards. Set up in minutes, no SQL required.',
  primary = { label: 'Start free trial', href: '#' },
  secondary = { label: 'Book a demo', href: '#' },
  variant = 'browser',
  size = 'md',
  className = '',
}: HeroDashboardPreviewProps) {
  const id = `hdp-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <>
      <div className="cq-hero-dashboard-preview-cq" data-rk-d7155c="">
      <section className={`hdp hdp--${variant} hdp--${size} ${className}`} aria-labelledby={id} data-rk-d7155c="">
        <div className="hdp__glow" aria-hidden="true" data-rk-d7155c=""></div>
        <div className="hdp__copy" data-rk-d7155c="">
          <span className="hdp__badge" data-rk-d7155c="">{badge}</span>
          <h1 id={id} className="hdp__title" data-rk-d7155c="">{title}</h1>
          <p className="hdp__subtitle" data-rk-d7155c="">{subtitle}</p>
          <div className="hdp__actions" data-rk-d7155c="">
            <a className="hdp__btn hdp__btn--primary" href={primary.href} data-rk-d7155c="">{primary.label}</a>
            <a className="hdp__btn hdp__btn--ghost" href={secondary.href} data-rk-d7155c="">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" data-rk-d7155c=""><circle cx="12" cy="12" r="10" data-rk-d7155c="" /><path d="m10 8 6 4-6 4V8z" fill="currentColor" data-rk-d7155c="" /></svg>
              {secondary.label}
            </a>
          </div>
        </div>
      
        <div className="hdp__mock" role="group" aria-label="Product dashboard preview" data-rk-d7155c="">
          {variant === 'browser' && (
            <div className="hdp__chrome" aria-hidden="true" data-rk-d7155c="">
              <span data-rk-d7155c=""></span><span data-rk-d7155c=""></span><span data-rk-d7155c=""></span>
              <p data-rk-d7155c="">app.example.com/overview</p>
            </div>
          )}
          <div className="hdp__screen" data-rk-d7155c="">
            <div className="hdp__kpis" data-rk-d7155c="">
              <KpiStatTile label="Revenue" value="$128.4k" change={9.2} period="vs last month" size="sm" variant="solid" trend={[80, 84, 90, 88, 96, 102, 110, 118, 128]} />
              <KpiStatTile label="Active users" value="24,812" change={4.1} period="vs last month" size="sm" variant="solid" trend={[20, 21, 21.5, 22, 22.8, 23.1, 23.9, 24.2, 24.8]} />
              <KpiStatTile label="Churn" value="2.3%" change={-0.6} invert period="vs last month" size="sm" variant="solid" trend={[3.1, 3, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3]} />
            </div>
            <LineChart title="Revenue by channel" subtitle="Last 12 weeks" variant="solid" size="sm" height={220} />
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default HeroDashboardPreview;
