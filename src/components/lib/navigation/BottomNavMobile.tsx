'use client';

import './BottomNavMobile.css';

/** BottomNavMobile — ported from astro-component-kit. */
export interface BottomNavMobileProps {
}

export function BottomNavMobile({}: BottomNavMobileProps) {
  return (
    <>
      <div className="bottom-nav" data-rk-0f9377="">
        <a href="#" className="active" data-rk-0f9377="">🏠</a>
        <a href="#" data-rk-0f9377="">🔍</a>
        <a href="#" data-rk-0f9377="">🔔</a>
        <a href="#" data-rk-0f9377="">👤</a>
      </div>
    </>
  );
}

export default BottomNavMobile;
