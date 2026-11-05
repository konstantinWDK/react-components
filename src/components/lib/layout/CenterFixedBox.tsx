'use client';

import type { ReactNode } from 'react';
import './CenterFixedBox.css';

/**
 * CenterFixedBox — Absolute center box helper component.
 */
export interface CenterFixedBoxProps {
  className?: string;
  children?: ReactNode;
}

export function CenterFixedBox({ className = '',
  children
}: CenterFixedBoxProps) {
  return (
    <>
      <div className={`abs-center-container ${className}`} data-rk-bc4cce="">
        <div className="abs-center" data-rk-bc4cce="">
          {children ?? (<>
            <div className="abs-card" data-rk-bc4cce="">
              <h4 data-rk-bc4cce="">Centered Content</h4>
              <p data-rk-bc4cce="">Centered cleanly in viewport or parent container.</p>
            </div>
          </>)}
        </div>
      </div>
    </>
  );
}

export default CenterFixedBox;
