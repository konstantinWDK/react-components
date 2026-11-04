'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import './SimpleTooltip.css';

/**
 * SimpleTooltip — A lightweight hover-based hint for buttons or icons (pure CSS).
 *
 * @param text - Required. Tooltip text.
 * @param position - Optional. 'top' | 'bottom' | 'left' | 'right'. Default 'top'.
 */
export interface SimpleTooltipProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children?: ReactNode;
}

export function SimpleTooltip({ text, position = 'top', className, children, ...rest }: SimpleTooltipProps) {
  return (
    <div {...rest} className={['tooltip-wrap', `tooltip-wrap--${position}`, className].filter(Boolean).join(' ')} data-tip={text}>
      {children}
    </div>
  );
}

export default SimpleTooltip;
