'use client';

import type { ReactNode } from 'react';
import './BentoGrid3.css';

/**
 * BentoGrid3 — Modern dashboard grid inspired by Bento-box layouts.
 */
export interface BentoGrid3Props {
  className?: string;
  slot1?: ReactNode;
  slot2?: ReactNode;
  slot3?: ReactNode;
  slot4?: ReactNode;
}

export function BentoGrid3({ className = '',
  slot1,
  slot2,
  slot3,
  slot4
}: BentoGrid3Props) {
  return (
    <>
      <div className="cq-bento-grid3-cq" data-rk-356029="">
      <div className={`bento ${className}`} data-rk-356029="">
        <div className="item wide" data-rk-356029="">
          {slot1 ?? (<>
            <h4 data-rk-356029="">Main Highlight</h4>
            <p data-rk-356029="">Wide key feature metric or banner</p>
          </>)}
        </div>
        <div className="item" data-rk-356029="">
          {slot2 ?? (<>
            <h4 data-rk-356029="">Stat Widget</h4>
            <p data-rk-356029="">Quick KPI</p>
          </>)}
        </div>
        <div className="item" data-rk-356029="">
          {slot3 ?? (<>
            <h4 data-rk-356029="">Live Feed</h4>
            <p data-rk-356029="">Real-time status</p>
          </>)}
        </div>
        <div className="item tall" data-rk-356029="">
          {slot4 ?? (<>
            <h4 data-rk-356029="">Analytics</h4>
            <p data-rk-356029="">Vertical trend tracker</p>
          </>)}
        </div>
      </div>
      </div>
    </>
  );
}

export default BentoGrid3;
