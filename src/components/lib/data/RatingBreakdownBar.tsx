'use client';

import './RatingBreakdownBar.css';

/** RatingBreakdownBar — ported from astro-component-kit. */
export interface RatingBreakdownBarProps {
}

export function RatingBreakdownBar({}: RatingBreakdownBarProps) {
  return (
    <>
      <div className="rating-box" data-rk-5d3b8d="">
        <div className="r-row" data-rk-5d3b8d=""><span data-rk-5d3b8d="">5★</span><div className="bar-bg" data-rk-5d3b8d=""><div className="bar-val" style={{ width: "80%" }} data-rk-5d3b8d=""></div></div></div>
        <div className="r-row" data-rk-5d3b8d=""><span data-rk-5d3b8d="">4★</span><div className="bar-bg" data-rk-5d3b8d=""><div className="bar-val" style={{ width: "15%" }} data-rk-5d3b8d=""></div></div></div>
        <div className="r-row" data-rk-5d3b8d=""><span data-rk-5d3b8d="">3★</span><div className="bar-bg" data-rk-5d3b8d=""><div className="bar-val" style={{ width: "5%" }} data-rk-5d3b8d=""></div></div></div>
      </div>
    </>
  );
}

export default RatingBreakdownBar;
