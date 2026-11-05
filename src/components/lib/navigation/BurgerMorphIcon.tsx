'use client';

import './BurgerMorphIcon.css';
// TODO(port): inline handler onClick="this.classList.toggle('active')"

/** BurgerMorphIcon — ported from astro-component-kit. */
export interface BurgerMorphIconProps {
}

export function BurgerMorphIcon({}: BurgerMorphIconProps) {
  return (
    <>
      <button className="burger" data-rk-641974="">
        <span data-rk-641974=""></span><span data-rk-641974=""></span><span data-rk-641974=""></span>
      </button>
    </>
  );
}

export default BurgerMorphIcon;
