'use client';

import type { CSSProperties, HTMLAttributes } from 'react';
import './AnimatedCheckmark.css';

/**
 * AnimatedCheckmark — A decorative SVG checkmark with a circular fill and draw animation.
 *
 * @param size - Optional. Size in px. Default 56.
 * @param color - Optional. Fill/stroke color. Default '#7ac142'.
 */
export interface AnimatedCheckmarkProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  color?: string;
}

export function AnimatedCheckmark({ size = 56, color = '#7ac142', className, style, ...rest }: AnimatedCheckmarkProps) {
  return (
    <div
      {...rest}
      className={['checkmark-container', className].filter(Boolean).join(' ')}
      style={{ '--check-size': `${size}px`, '--check-color': color, ...style } as CSSProperties}
    >
      <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" aria-hidden="true">
        <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>
    </div>
  );
}

export default AnimatedCheckmark;
