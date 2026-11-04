import type { HTMLAttributes, ReactNode } from 'react';
import './Badge.css';

/**
 * Badge — A compact visual indicator for labels, categories, or status tags.
 *
 * @param variant - Optional. 'default' | 'success' | 'warning' | 'danger' | 'info'. Default 'default'.
 * @param dot - Optional. Show a leading status dot. Default false.
 * @param pulse - Optional. Pulse the dot. Default false.
 */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  dot?: boolean;
  pulse?: boolean;
  children?: ReactNode;
}

export function Badge({ variant = 'default', dot = false, pulse = false, className, children, ...rest }: BadgeProps) {
  return (
    <span {...rest} className={['badge', `badge--${variant}`, className].filter(Boolean).join(' ')}>
      {dot && <span className={['badge__dot', pulse && 'badge__dot--pulse'].filter(Boolean).join(' ')} />}
      {children}
    </span>
  );
}

export default Badge;
