'use client';

import type { ReactNode } from 'react';
import './LetterSpacingWide.css';

/** LetterSpacingWide */
export interface LetterSpacingWideProps {
  children?: ReactNode;
}

export function LetterSpacingWide({ children }: LetterSpacingWideProps) {
  return (
    <>
      <div className="cinema-txt" data-rk-a5a573="">{children}</div>
    </>
  );
}

export default LetterSpacingWide;
