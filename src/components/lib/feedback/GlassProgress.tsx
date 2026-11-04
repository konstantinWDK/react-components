'use client';

import type { HTMLAttributes } from 'react';
import './GlassProgress.css';

/**
 * GlassProgress — A horizontal linear progress bar with glassmorphism and gradient fill.
 *
 * @param value - Required. 0–100.
 * @param label - Optional. Accessible label. Default 'Progress bar'.
 */
export interface GlassProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  label?: string;
}

export function GlassProgress({ value, label = 'Progress bar', className, ...rest }: GlassProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      {...rest}
      className={['progress-container', className].filter(Boolean).join(' ')}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="progress-fill" style={{ width: `${clamped}%` }} />
    </div>
  );
}

export default GlassProgress;
