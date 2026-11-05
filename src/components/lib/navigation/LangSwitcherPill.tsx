'use client';

import './LangSwitcherPill.css';

/** LangSwitcherPill — ported from astro-component-kit. */
export interface LangSwitcherPillProps {
}

export function LangSwitcherPill({}: LangSwitcherPillProps) {
  return (
    <>
      <div className="lang-pill" data-rk-c3a6ea="">
        <span className="curr" data-rk-c3a6ea="">EN</span>
        <div className="list" data-rk-c3a6ea="">
          <span data-rk-c3a6ea="">ES</span>
          <span data-rk-c3a6ea="">FR</span>
          <span data-rk-c3a6ea="">JP</span>
        </div>
      </div>
    </>
  );
}

export default LangSwitcherPill;
