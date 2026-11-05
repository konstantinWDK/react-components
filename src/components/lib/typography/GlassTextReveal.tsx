'use client';

import type { ReactNode } from 'react';
import './GlassTextReveal.css';

/** GlassTextReveal */
export interface GlassTextRevealProps {
  children?: ReactNode;
}

export function GlassTextReveal({ children }: GlassTextRevealProps) {
  return (
    <>
      <h3 className="shimmer-txt" data-rk-ca8ede="">{children}</h3>
    </>
  );
}

export default GlassTextReveal;
