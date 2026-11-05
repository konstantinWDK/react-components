'use client';

import './SparklineStatCard.css';

/** SparklineStatCard — ported from astro-component-kit. */
export interface SparklineStatCardProps {
}

export function SparklineStatCard({}: SparklineStatCardProps) {
  return (
    <>
      <div className="spark-card" data-rk-37980c="">
        <div className="top" data-rk-37980c=""><span data-rk-37980c="">Sessions</span><h3 data-rk-37980c="">2,415</h3></div>
        <div className="graph" data-rk-37980c="">
          <svg viewBox="0 0 100 30" data-rk-37980c="">
            <path d="M0 25 L10 20 L20 22 L30 15 L40 18 L50 25 L60 10 L70 12 L80 5 L90 8 L100 2" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" data-rk-37980c="" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default SparklineStatCard;
