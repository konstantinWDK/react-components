'use client';

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import './IndicatorBadgeMinimal.css';

/**
 * IndicatorBadgeMinimal — A small notification dot placed on the corner of an icon or avatar.
 *
 * @param color - Optional. Default 'var(--c-primary, #6366f1)'.
 * @param position - Optional. Corner. Default 'top-right'.
 * @param pulse - Optional. Default false.
 */
export interface IndicatorBadgeMinimalProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  pulse?: boolean;
  children?: ReactNode;
}

const positionStyles: Record<NonNullable<IndicatorBadgeMinimalProps['position']>, CSSProperties> = {
  'top-right': { top: 0, right: 0, transform: 'translate(25%, -25%)' },
  'top-left': { top: 0, left: 0, transform: 'translate(-25%, -25%)' },
  'bottom-right': { bottom: 0, right: 0, transform: 'translate(25%, 25%)' },
  'bottom-left': { bottom: 0, left: 0, transform: 'translate(-25%, 25%)' },
};

export function IndicatorBadgeMinimal({
  color = 'var(--c-primary, #6366f1)',
  position = 'top-right',
  pulse = false,
  className,
  children,
  ...rest
}: IndicatorBadgeMinimalProps) {
  return (
    <div {...rest} className={['indicator-wrap', className].filter(Boolean).join(' ')}>
      {children}
      <span
        className={['dot-indicator', pulse && 'dot-indicator--pulse'].filter(Boolean).join(' ')}
        style={{ background: color, ...positionStyles[position] }}
        aria-hidden="true"
      />
    </div>
  );
}

export default IndicatorBadgeMinimal;
