'use client';

import type { ReactNode } from 'react';
import './AnimatedUnderlineLink.css';

/** AnimatedUnderlineLink */
export interface AnimatedUnderlineLinkProps {
  href: string;
  children?: ReactNode;
}

export function AnimatedUnderlineLink({ href,
  children
}: AnimatedUnderlineLinkProps) {
  return (
    <>
      <a href={href} className="smart-link" data-rk-8961c9="">{children}</a>
    </>
  );
}

export default AnimatedUnderlineLink;
