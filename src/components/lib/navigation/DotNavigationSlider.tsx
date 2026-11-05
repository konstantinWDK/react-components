'use client';

import './DotNavigationSlider.css';

/** DotNavigationSlider — ported from astro-component-kit. */
export interface DotNavigationSliderProps {
}

export function DotNavigationSlider({}: DotNavigationSliderProps) {
  return (
    <>
      <div className="dot-nav" data-rk-4601d6="">
        <button className="active" data-rk-4601d6=""></button>
        <button data-rk-4601d6=""></button>
        <button data-rk-4601d6=""></button>
        <button data-rk-4601d6=""></button>
      </div>
    </>
  );
}

export default DotNavigationSlider;
