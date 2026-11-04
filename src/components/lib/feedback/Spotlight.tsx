'use client';

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import './Spotlight.css';

/**
 * Spotlight — A visual emphasis component that dims the page and highlights its children.
 *
 * @param active - Optional. Default false.
 * @param opacity - Optional. Backdrop dim opacity. Default 0.7.
 */
export interface SpotlightProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  opacity?: number;
  children?: ReactNode;
}

export function Spotlight({ active = false, opacity = 0.7, className, style, children, ...rest }: SpotlightProps) {
  return (
    <div
      {...rest}
      className={['spotlight-wrap', active && 'spotlight-wrap--active', className].filter(Boolean).join(' ')}
      style={{ '--spotlight-opacity': opacity, ...style } as CSSProperties}
    >
      <div className="spotlight-content">{children}</div>
    </div>
  );
}

export default Spotlight;
