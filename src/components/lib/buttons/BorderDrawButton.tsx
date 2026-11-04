'use client';

import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import './BorderDrawButton.css';

/**
 * BorderDrawButton — A button that animates its border being drawn on hover.
 *
 * @param color - Optional. Accent color of the drawn border. Default '#6366f1'.
 */
export interface BorderDrawButtonProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: ReactNode;
}

export function BorderDrawButton({
  href,
  type = 'button',
  color = '#6366f1',
  size = 'md',
  disabled = false,
  className,
  style,
  children,
  ...rest
}: BorderDrawButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      aria-disabled={href && disabled ? true : undefined}
      className={['draw-btn', `draw-btn--${size}`, className].filter(Boolean).join(' ')}
      style={{ '--btn-color': color, ...style } as CSSProperties}
    >
      <span className="draw-btn__text">{children}</span>
    </Tag>
  );
}

export default BorderDrawButton;
