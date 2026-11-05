'use client';

import type { ReactNode } from 'react';
import './CodeInlineGlass.css';

/** CodeInlineGlass — ported from astro-component-kit. */
export interface CodeInlineGlassProps {
  children?: ReactNode;
}

export function CodeInlineGlass({ children }: CodeInlineGlassProps) {
  return (
    <>
      <code className="glass-code" data-rk-8ec09e="">{children}</code>
    </>
  );
}

export default CodeInlineGlass;
