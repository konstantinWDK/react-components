'use client';

import type { ReactNode } from 'react';
import './MonospaceStatLine.css';

/** MonospaceStatLine — ported from astro-component-kit. */
export interface MonospaceStatLineProps {
  children?: ReactNode;
}

export function MonospaceStatLine({ children }: MonospaceStatLineProps) {
  return (
    <>
      <div className="mono-stat" data-rk-f4a3f2="">{children}</div>
    </>
  );
}

export default MonospaceStatLine;
