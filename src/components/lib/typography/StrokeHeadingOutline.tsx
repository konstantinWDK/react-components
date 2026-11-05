'use client';

import type { ReactNode } from 'react';
import './StrokeHeadingOutline.css';

/** StrokeHeadingOutline — ported from astro-component-kit. */
export interface StrokeHeadingOutlineProps {
  children?: ReactNode;
}

export function StrokeHeadingOutline({ children }: StrokeHeadingOutlineProps) {
  return (
    <>
      <h2 className="stroke-h" data-rk-99997d="">{children}</h2>
    </>
  );
}

export default StrokeHeadingOutline;
