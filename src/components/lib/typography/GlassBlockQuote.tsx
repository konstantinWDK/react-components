'use client';

import type { ReactNode } from 'react';
import './GlassBlockQuote.css';

/** GlassBlockQuote — ported from astro-component-kit. */
export interface GlassBlockQuoteProps {
  children?: ReactNode;
}

export function GlassBlockQuote({ children }: GlassBlockQuoteProps) {
  return (
    <>
      <blockquote className="glass-quote" data-rk-b9e615="">
        <div className="q-ico" data-rk-b9e615="">“</div>
        <p data-rk-b9e615="">{children}</p>
        <footer data-rk-b9e615="">— React Components Team</footer>
      </blockquote>
    </>
  );
}

export default GlassBlockQuote;
