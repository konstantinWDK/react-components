'use client';

import './ActivityHeatmapGrid.css';

/** class:list → className */
function cx(...args: unknown[]): string {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (!v) return;
    if (typeof v === 'string' || typeof v === 'number') out.push(String(v));
    else if (Array.isArray(v)) v.forEach(walk);
    else if (typeof v === 'object') for (const [k, on] of Object.entries(v as Record<string, unknown>)) if (on) out.push(k);
  };
  args.forEach(walk);
  return out.join(' ');
}

/**
 * ActivityHeatmapGrid — GitHub-style activity contribution matrix with intensity color levels and month labels.
 * 
 * @param {string} title - Section header label. Default is 'Commit Activity'.
 * @param {number} totalCount - Total activity events recorded. Default is 1428.
 */
export interface ActivityHeatmapGridProps {
  title?: string;
  totalCount?: number;
}

export function ActivityHeatmapGrid({
  title = 'Contribution Activity',
  totalCount = 1428,
}: ActivityHeatmapGridProps) {
  // Mock 16 weeks of 7 days
  const weeks = Array.from({ length: 16 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      // Generate pseudo-random intensity 0 to 4
      const seed = (w * 7 + d * 13 + 5) % 17;
      if (seed < 4) return 0;
      if (seed < 8) return 1;
      if (seed < 12) return 2;
      if (seed < 15) return 3;
      return 4;
    })
  );
  
  const months = ['Jul', 'Aug', 'Sep', 'Oct'];
  return (
    <>
      <div className="heatmap-card" data-rk-f489b5="">
        <div className="heatmap-card__head" data-rk-f489b5="">
          <div className="heatmap-card__title-wrap" data-rk-f489b5="">
            <h5 className="heatmap-card__title" data-rk-f489b5="">{title}</h5>
            <span className="heatmap-card__total" data-rk-f489b5="">{totalCount.toLocaleString()} events in the last 4 months</span>
          </div>
      
          <div className="heatmap-card__legend" aria-hidden="true" data-rk-f489b5="">
            <span className="legend-text" data-rk-f489b5="">Less</span>
            <span className="cell cell--0" data-rk-f489b5=""></span>
            <span className="cell cell--1" data-rk-f489b5=""></span>
            <span className="cell cell--2" data-rk-f489b5=""></span>
            <span className="cell cell--3" data-rk-f489b5=""></span>
            <span className="cell cell--4" data-rk-f489b5=""></span>
            <span className="legend-text" data-rk-f489b5="">More</span>
          </div>
        </div>
      
        <div className="heatmap-card__matrix" data-rk-f489b5="">
          <div className="heatmap-card__months" data-rk-f489b5="">
            {months.map((m, __i: number) => (
              <span key={__i} className="month-label" data-rk-f489b5="">{m}</span>
            ))}
          </div>
      
          <div className="heatmap-card__grid" data-rk-f489b5="">
            {weeks.map((week, __i: number) => (
              <div key={__i} className="heatmap-col" data-rk-f489b5="">
                {week.map((level, __i: number) => (
                  <span key={__i} className={cx(['cell', `cell--${level}`])} data-rk-f489b5=""></span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivityHeatmapGrid;
