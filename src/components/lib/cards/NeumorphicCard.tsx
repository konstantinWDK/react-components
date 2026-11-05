'use client';

import type { ReactNode } from 'react';
import './NeumorphicCard.css';

/**
 * NeumorphicCard — A soft UI card with deep shadows for a realistic elevated look.
 * 
 * @param {'sm'|'md'|'lg'} padding - Optional. Inner padding layout size. Default is 'md'.
 */
export interface NeumorphicCardProps {
  padding?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

export function NeumorphicCard({ padding = 'md',
  children
}: NeumorphicCardProps) {
  return (
    <>
      <div className={`neu-card neu-card--p${padding}`} data-rk-6601f7="">
        {children}
      </div>
    </>
  );
}

export default NeumorphicCard;
