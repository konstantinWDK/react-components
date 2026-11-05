'use client';

import type { ReactNode } from 'react';
import './ShadowRevealText.css';

/** ShadowRevealText — ported from astro-component-kit. */
export interface ShadowRevealTextProps {
  children?: ReactNode;
}

export function ShadowRevealText({ children }: ShadowRevealTextProps) {
  return (
    <>
      <h2 className="rev-text" data-rk-9adbdb="">{children}</h2>
    </>
  );
}

export default ShadowRevealText;
