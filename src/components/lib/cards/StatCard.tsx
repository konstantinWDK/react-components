'use client';

import './StatCard.css';

/**
 * StatCard — Compact card for displaying key metrics with an icon.
 * 
 * @param {string} label - The metric name (e.g., "Total Revenue").
 * @param {string} value - The primary statistic value (e.g., "$124,590").
 * @param {string} icon - The emoji or text character representing the stat.
 */
export interface StatCardProps {
  label: string;
  value: string;
  icon: string;
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <>
      <div className="stat-card" data-rk-913005="">
        <div className="stat-card__icon" aria-hidden="true" data-rk-913005="">{icon}</div>
        <div className="stat-card__info" data-rk-913005="">
          <span className="stat-card__label" data-rk-913005="">{label}</span>
          <span className="stat-card__value" data-rk-913005="">{value}</span>
        </div>
      </div>
    </>
  );
}

export default StatCard;
