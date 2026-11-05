'use client';

import type { ReactNode } from 'react';
import './DropCapParagraph.css';

/** DropCapParagraph — ported from astro-component-kit. */
export interface DropCapParagraphProps {
  children?: ReactNode;
}

export function DropCapParagraph({ children }: DropCapParagraphProps) {
  return (
    <>
      <p className="drop-p" data-rk-1c2ef5="">{children}</p>
    </>
  );
}

export default DropCapParagraph;
