'use client';

import type { ReactNode } from 'react';
import './KbdIndicator.css';

/** KbdIndicator */
export interface KbdIndicatorProps {
  children?: ReactNode;
}

export function KbdIndicator({ children }: KbdIndicatorProps) {
  return (
    <>
      <kbd className="tau-kbd" data-rk-ca0051="">{children}</kbd>
    </>
  );
}

export default KbdIndicator;
