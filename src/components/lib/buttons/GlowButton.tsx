'use client';

import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import './GlowButton.css';

/**
 * GlowButton — A button with an animated glow effect that pulsates on hover.
 *
 * @param color - Optional. Glow color. Default '#6366f1'.
 */
export interface GlowButtonProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: ReactNode;
}

export function GlowButton({
  href,
  type = 'button',
  color = '#6366f1',
  size = 'md',
  disabled = false,
  className,
  style,
  children,
  ...rest
}: GlowButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      aria-disabled={href && disabled ? true : undefined}
      className={['glow-btn', `glow-btn--${size}`, className].filter(Boolean).join(' ')}
      style={{ '--btn-color': color, ...style } as CSSProperties}
    >
      <span className="glow-btn__content">{children}</span>
    </Tag>
  );
}

export default GlowButton;
