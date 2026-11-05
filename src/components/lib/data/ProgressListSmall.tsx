'use client';

import './ProgressListSmall.css';

/** ProgressListSmall — ported from astro-component-kit. */
export interface ProgressListSmallProps {
}

export function ProgressListSmall({}: ProgressListSmallProps) {
  return (
    <>
      <div className="p-list" data-rk-7a9f23="">
        <div className="p-row" data-rk-7a9f23=""><span data-rk-7a9f23="">Storage</span><strong data-rk-7a9f23="">42%</strong></div>
        <div className="p-bar" data-rk-7a9f23=""><div className="fill" style={{ width: "42%" }} data-rk-7a9f23=""></div></div>
        <div style={{ marginTop: "1rem" }} data-rk-7a9f23=""></div>
        <div className="p-row" data-rk-7a9f23=""><span data-rk-7a9f23="">Bandwidth</span><strong data-rk-7a9f23="">68%</strong></div>
        <div className="p-bar" data-rk-7a9f23=""><div className="fill" style={{ width: "68%", background: "#c084fc" }} data-rk-7a9f23=""></div></div>
      </div>
    </>
  );
}

export default ProgressListSmall;
