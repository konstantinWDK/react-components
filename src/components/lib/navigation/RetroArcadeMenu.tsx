'use client';

import './RetroArcadeMenu.css';

/** RetroArcadeMenu — ported from astro-component-kit. */
export interface RetroArcadeMenuProps {
}

export function RetroArcadeMenu({}: RetroArcadeMenuProps) {
  return (
    <>
      <div className="retro-menu" data-rk-00ab44="">
        <div className="item selected" data-rk-00ab44="">▶ LOAD GAME</div>
        <div className="item" data-rk-00ab44="">OPTIONS</div>
        <div className="item" data-rk-00ab44="">EXIT</div>
      </div>
    </>
  );
}

export default RetroArcadeMenu;
