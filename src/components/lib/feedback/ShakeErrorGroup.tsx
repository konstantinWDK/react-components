'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import './ShakeErrorGroup.css';

/**
 * ShakeErrorGroup — A feedback container that shakes horizontally to indicate failure or invalid input.
 * Tip: change its `key` to replay the shake on every new error.
 *
 * @param message - Required.
 * @param active - Optional. Triggers the shake. Default false.
 * @param icon - Optional. Default '⚠️'.
 */
export interface ShakeErrorGroupProps extends HTMLAttributes<HTMLDivElement> {
  message: ReactNode;
  active?: boolean;
  icon?: ReactNode;
}

export function ShakeErrorGroup({ message, active = false, icon = '⚠️', className, ...rest }: ShakeErrorGroupProps) {
  return (
    <div role="alert" {...rest} className={['shake-box', active && 'shake-box--active', className].filter(Boolean).join(' ')}>
      <span className="shake-box__icon" aria-hidden="true">{icon}</span>
      <span className="shake-box__msg">{message}</span>
    </div>
  );
}

export default ShakeErrorGroup;
