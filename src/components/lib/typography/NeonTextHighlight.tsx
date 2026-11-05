'use client';

import type { ReactNode } from 'react';
import './NeonTextHighlight.css';

/** NeonTextHighlight */
export interface NeonTextHighlightProps {
  children?: ReactNode;
}

export function NeonTextHighlight({ children }: NeonTextHighlightProps) {
  return (
    <>
      <span className="neon-hi" data-rk-42042c="">{children}</span>
    </>
  );
}

export default NeonTextHighlight;
