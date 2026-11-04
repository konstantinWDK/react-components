'use client';

import type { CSSProperties, HTMLAttributes } from 'react';
import './NeonSpinner.css';

/**
 * NeonSpinner — A sleek, glowing loading spinner with customizable color and size.
 *
 * @param color - Optional. Default 'var(--c-primary, #6366f1)'.
 * @param size - Optional. 'sm' | 'md' | 'lg'. Default 'md'.
 * @param label - Optional. Accessible label. Default 'Loading'.
 */
export interface NeonSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const dimensions = { sm: '24px', md: '40px', lg: '64px' };

export function NeonSpinner({ color = 'var(--c-primary, #6366f1)', size = 'md', label = 'Loading', className, style, ...rest }: NeonSpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      {...rest}
      className={['neon-spinner', className].filter(Boolean).join(' ')}
      style={{ '--spinner-color': color, '--spinner-size': dimensions[size], ...style } as CSSProperties}
    />
  );
}

export default NeonSpinner;
