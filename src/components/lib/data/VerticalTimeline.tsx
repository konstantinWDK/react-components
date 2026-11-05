'use client';

import './VerticalTimeline.css';

/** VerticalTimeline */
export interface VerticalTimelineProps {
}

export function VerticalTimeline({}: VerticalTimelineProps) {
  return (
    <>
      <div className="timeline-v" data-rk-2babd2="">
        <div className="t-item" data-rk-2babd2="">
          <div className="t-date" data-rk-2babd2="">Oct 2024</div>
          <div className="t-content" data-rk-2babd2=""><h4 data-rk-2babd2="">V2 Release</h4><p data-rk-2babd2="">Launched the modular registry architecture.</p></div>
        </div>
        <div className="t-item" data-rk-2babd2="">
          <div className="t-date" data-rk-2babd2="">Aug 2024</div>
          <div className="t-content" data-rk-2babd2=""><h4 data-rk-2babd2="">Beta Phase</h4><p data-rk-2babd2="">Community testing and initial component set.</p></div>
        </div>
      </div>
    </>
  );
}

export default VerticalTimeline;
