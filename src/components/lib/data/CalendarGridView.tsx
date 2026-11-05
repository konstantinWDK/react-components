'use client';

import './CalendarGridView.css';

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

/** CalendarGridView */
export interface CalendarGridViewProps {
}

export function CalendarGridView({}: CalendarGridViewProps) {
  return (
    <>
      <div className="cal-card" data-rk-b15626="">
        <div className="cal-head" data-rk-b15626=""><h4 data-rk-b15626="">October 2024</h4></div>
        <div className="cal-grid" data-rk-b15626="">
          <span data-rk-b15626="">Mo</span><span data-rk-b15626="">Tu</span><span data-rk-b15626="">We</span><span data-rk-b15626="">Th</span><span data-rk-b15626="">Fr</span><span data-rk-b15626="">Sa</span><span data-rk-b15626="">Su</span>
          {[...Array(31)].map((_, i) => <div key={i} className={cx([{ "today": i+1 === 24 }])} data-rk-b15626="">{i+1}</div>)}
        </div>
      </div>
    </>
  );
}

export default CalendarGridView;
