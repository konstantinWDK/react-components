'use client';

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import './PulseDot.css';

/**
 * PulseDot — A status indicator with a labeled text and a pulsing dot animation.
 *
 * @param label - Required. Status text.
 * @param color - Optional. Default '#34d399'.
 */
export interface PulseDotProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  color?: string;
}

export function PulseDot({ label, color = '#34d399', className, style, ...rest }: PulseDotProps) {
  return (
    <div {...rest} className={['status-wrap', className].filter(Boolean).join(' ')} style={{ '--status-color': color, ...style } as CSSProperties}>
      <div className="pulse-dot" aria-hidden="true" />
      <span className="status-text">{label}</span>
    </div>
  );
}

export default PulseDot;
