'use client';

import './GanttChartMinimal.css';

/** GanttChartMinimal */
export interface GanttChartMinimalProps {
}

export function GanttChartMinimal({}: GanttChartMinimalProps) {
  return (
    <>
      <div className="gantt" data-rk-fd4a22="">
        <div className="g-row" data-rk-fd4a22=""><div className="g-bar" style={{ width: "40%", marginLeft: "10%", background: "#6366f1" }} data-rk-fd4a22=""></div></div>
        <div className="g-row" data-rk-fd4a22=""><div className="g-bar" style={{ width: "30%", marginLeft: "55%", background: "#c084fc" }} data-rk-fd4a22=""></div></div>
        <div className="g-row" data-rk-fd4a22=""><div className="g-bar" style={{ width: "20%", marginLeft: "20%", background: "#10b981" }} data-rk-fd4a22=""></div></div>
      </div>
    </>
  );
}

export default GanttChartMinimal;
