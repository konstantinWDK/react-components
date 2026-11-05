'use client';

import type { CSSProperties } from 'react';
import './RadialIconMenu.css';

/** RadialIconMenu */
export interface RadialIconMenuProps {
}

export function RadialIconMenu({}: RadialIconMenuProps) {
  return (
    <>
      <div className="radial-wrap" data-rk-e0eadf="">
        <div className="toggle" data-rk-e0eadf="">+</div>
        <div className="icons" data-rk-e0eadf="">
          <div style={{ '--i': "1" } as CSSProperties} data-rk-e0eadf="">📷</div>
          <div style={{ '--i': "2" } as CSSProperties} data-rk-e0eadf="">📁</div>
          <div style={{ '--i': "3" } as CSSProperties} data-rk-e0eadf="">✉️</div>
        </div>
      </div>
    </>
  );
}

export default RadialIconMenu;
