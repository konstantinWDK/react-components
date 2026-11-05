'use client';

import type { ReactNode } from 'react';
import './BackgroundClipMask.css';

/** BackgroundClipMask */
export interface BackgroundClipMaskProps {
  children?: ReactNode;
}

export function BackgroundClipMask({ children }: BackgroundClipMaskProps) {
  return (
    <>
      <h1 className="mask-txt" data-rk-519212="">{children}</h1>
    </>
  );
}

export default BackgroundClipMask;
