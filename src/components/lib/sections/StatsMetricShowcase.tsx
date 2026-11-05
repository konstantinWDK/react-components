'use client';

import type { CSSProperties } from 'react';
import './StatsMetricShowcase.css';

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
 * StatsMetricShowcase — Full-page data and numbers showcase section with KPIs, sparklines, and live telemetry indicators.
 * 
 * @param {string} badge - Eyebrow badge text.
 * @param {string} title - Section main heading.
 * @param {string} subtitle - Description text.
 */
export interface StatsMetricShowcaseProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function StatsMetricShowcase({
  badge = "Global Scale",
  title = "Built for Production at Enterprise Scale",
  subtitle = "Powering millions of monthly page views with flawless reliability, instant static caching, and ultra-low latency.",
  className = ""
}: StatsMetricShowcaseProps) {
  const stats = [
    {
      value: "200+",
      label: "Handcrafted UI Components",
      change: "+45 this quarter",
      positive: true,
      desc: "From atomic buttons to full landing sections."
    },
    {
      value: "99.99%",
      label: "Uptime & Reliability",
      change: "Zero incidents",
      positive: true,
      desc: "Hosted on global edge CDN distribution networks."
    },
    {
      value: "< 50ms",
      label: "Time to First Byte (TTFB)",
      change: "3.2x faster",
      positive: true,
      desc: "Pre-rendered static HTML with immutable cache."
    },
    {
      value: "10k+",
      label: "Active Developers",
      change: "+120% YoY growth",
      positive: true,
      desc: "Deploying production React apps worldwide."
    }
  ];
  return (
    <>
      <div className="cq-stats-metric-showcase-cq" data-rk-edcafc="">
      <section className={`stats-section ${className}`} aria-labelledby="stats-title" data-rk-edcafc="">
        <div className="stats-bg" aria-hidden="true" data-rk-edcafc="">
          <div className="stats-glow" data-rk-edcafc=""></div>
        </div>
      
        <div className="container" data-rk-edcafc="">
          {/* Header */}
          <div className="section-header" data-rk-edcafc="">
            {badge && <span className="section-badge" data-rk-edcafc="">{badge}</span>}
            <h2 id="stats-title" className="section-title" data-rk-edcafc="">{title}</h2>
            <p className="section-subtitle" data-rk-edcafc="">{subtitle}</p>
          </div>
      
          {/* Stats Grid */}
          <div className="stats-grid" data-rk-edcafc="">
            {stats.map((stat, i) => (
              <article key={i} className="stat-card" data-rk-edcafc="">
                <div className="stat-top" data-rk-edcafc="">
                  <span className="stat-num" data-rk-edcafc="">{stat.value}</span>
                  <span className="stat-badge" data-rk-edcafc="">{stat.change}</span>
                </div>
                <h3 className="stat-label" data-rk-edcafc="">{stat.label}</h3>
                <p className="stat-desc" data-rk-edcafc="">{stat.desc}</p>
                <div className="stat-chart-bar" aria-hidden="true" data-rk-edcafc="">
                  <div className="chart-progress" style={st(`width: ${75 + i * 8}%;`)} data-rk-edcafc=""></div>
                </div>
              </article>
            ))}
          </div>
      
          {/* Live Telemetry Banner */}
          <div className="telemetry-banner" data-rk-edcafc="">
            <div className="telemetry-live" data-rk-edcafc="">
              <span className="live-dot" data-rk-edcafc=""></span>
              <span className="live-label" data-rk-edcafc="">LIVE NETWORK TELEMETRY</span>
            </div>
            <div className="telemetry-items" data-rk-edcafc="">
              <div className="telemetry-item" data-rk-edcafc="">
                <span className="tel-name" data-rk-edcafc="">Edge POPs:</span>
                <span className="tel-val" data-rk-edcafc="">310 Cities</span>
              </div>
              <div className="telemetry-item" data-rk-edcafc="">
                <span className="tel-name" data-rk-edcafc="">Global CDN Latency:</span>
                <span className="tel-val" data-rk-edcafc="">18ms avg</span>
              </div>
              <div className="telemetry-item" data-rk-edcafc="">
                <span className="tel-name" data-rk-edcafc="">Asset Compression:</span>
                <span className="tel-val" data-rk-edcafc="">Brotli / Gzip Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default StatsMetricShowcase;
