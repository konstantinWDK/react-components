'use client';

import type { ReactNode } from 'react';
import './SplitScreenLayout.css';

/**
 * SplitScreenLayout — A layout divided into two equal halves, perfect for landing pages.
 */
export interface SplitScreenLayoutProps {
  className?: string;
  left?: ReactNode;
  right?: ReactNode;
}

export function SplitScreenLayout({ className = '',
  left,
  right
}: SplitScreenLayoutProps) {
  return (
    <>
      <div className={`split-layout ${className}`} data-rk-aa2173="">
        <div className="split-side left" data-rk-aa2173="">
          {left ?? (<>
            <div className="demo-split-block" data-rk-aa2173="">
              <h3 data-rk-aa2173="">Left Content</h3>
              <p data-rk-aa2173="">Hero text and main value proposition.</p>
            </div>
          </>)}
        </div>
        <div className="split-side right" data-rk-aa2173="">
          {right ?? (<>
            <div className="demo-split-block" data-rk-aa2173="">
              <h3 data-rk-aa2173="">Right Content</h3>
              <p data-rk-aa2173="">Visual graphic, product mockups, or form.</p>
            </div>
          </>)}
        </div>
      </div>
    </>
  );
}

export default SplitScreenLayout;
