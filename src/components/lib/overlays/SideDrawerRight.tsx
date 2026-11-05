'use client';

import type { ReactNode } from 'react';
import './SideDrawerRight.css';

/** SideDrawerRight */
export interface SideDrawerRightProps {
  children?: ReactNode;
}

export function SideDrawerRight({ children }: SideDrawerRightProps) {
  return (
    <>
      <div className="drawer-wrap" data-rk-e9a0cd="">
        <div className="drawer-overlay" data-rk-e9a0cd=""></div>
        <div className="drawer-panel right" data-rk-e9a0cd="">
          <div className="drawer-header" data-rk-e9a0cd=""><h3 data-rk-e9a0cd="">Filters</h3><span data-rk-e9a0cd="">×</span></div>
          <div className="drawer-body" data-rk-e9a0cd="">{children}</div>
        </div>
      </div>
    </>
  );
}

export default SideDrawerRight;
