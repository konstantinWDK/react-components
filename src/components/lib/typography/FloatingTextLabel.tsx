'use client';

import type { ReactNode } from 'react';
import './FloatingTextLabel.css';

/** FloatingTextLabel */
export interface FloatingTextLabelProps {
  children?: ReactNode;
}

export function FloatingTextLabel({ children }: FloatingTextLabelProps) {
  return (
    <>
      <div className="f-label-wrap" data-rk-f9cb2b="">
        <span className="f-label" data-rk-f9cb2b="">PREMIUM</span>
        {children}
      </div>
    </>
  );
}

export default FloatingTextLabel;
