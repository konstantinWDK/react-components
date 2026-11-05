'use client';

import type { ReactNode } from 'react';
import './GradientUnderlineLink.css';

/** GradientUnderlineLink */
export interface GradientUnderlineLinkProps {
  children?: ReactNode;
}

export function GradientUnderlineLink({ children }: GradientUnderlineLinkProps) {
  return (
    <>
      <a href="#" className="grad-link" data-rk-66205f="">{children}</a>
    </>
  );
}

export default GradientUnderlineLink;
