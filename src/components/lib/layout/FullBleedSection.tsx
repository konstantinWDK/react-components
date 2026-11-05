'use client';

import type { ReactNode } from 'react';
import './FullBleedSection.css';

/**
 * FullBleedSection — Section that breaks out of the container to hit viewport edges.
 */
export interface FullBleedSectionProps {
  className?: string;
  children?: ReactNode;
}

export function FullBleedSection({ className = '',
  children
}: FullBleedSectionProps) {
  return (
    <>
      <section className={`full-bleed ${className}`} data-rk-4e57ad="">
        <div className="full-bleed-inner" data-rk-4e57ad="">
          {children ?? (<>
            <h3 data-rk-4e57ad="">Full Bleed Background Container</h3>
            <p data-rk-4e57ad="">Content breaks out to full viewport edges while inner content stays readable.</p>
          </>)}
        </div>
      </section>
    </>
  );
}

export default FullBleedSection;
