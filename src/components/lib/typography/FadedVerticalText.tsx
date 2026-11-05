'use client';

import type { ReactNode } from 'react';
import './FadedVerticalText.css';

/** FadedVerticalText — ported from astro-component-kit. */
export interface FadedVerticalTextProps {
  children?: ReactNode;
}

export function FadedVerticalText({ children }: FadedVerticalTextProps) {
  return (
    <>
      <div className="v-txt" data-rk-79dd68="">{children}</div>
    </>
  );
}

export default FadedVerticalText;
