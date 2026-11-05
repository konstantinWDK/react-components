'use client';

import './MegaMenuGlass.css';

/** MegaMenuGlass — ported from astro-component-kit. */
export interface MegaMenuGlassProps {
}

export function MegaMenuGlass({}: MegaMenuGlassProps) {
  return (
    <>
      <div className="mega-wrap" data-rk-71025a="">
        <div className="mega-grid" data-rk-71025a="">
          <div className="mega-col" data-rk-71025a="">
            <h5 data-rk-71025a="">Products</h5>
            <a href="#" data-rk-71025a="">Analytics</a>
            <a href="#" data-rk-71025a="">CRM</a>
            <a href="#" data-rk-71025a="">Support</a>
          </div>
          <div className="mega-col" data-rk-71025a="">
            <h5 data-rk-71025a="">Resources</h5>
            <a href="#" data-rk-71025a="">Documentation</a>
            <a href="#" data-rk-71025a="">Tutorials</a>
            <a href="#" data-rk-71025a="">Guides</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default MegaMenuGlass;
