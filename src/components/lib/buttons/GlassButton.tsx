'use client';

import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import './GlassButton.css';

/**
 * GlassButton — A premium button with glassmorphism effect, gradient border and smooth hover animations.
 *
 * @param href - Optional. If provided, renders an <a> tag instead of <button>.
 * @param type - Optional. The HTML button type. Default 'button'.
 * @param variant - Optional. 'primary' | 'secondary' | 'ghost'. Default 'primary'.
 * @param size - Optional. 'sm' | 'md' | 'lg'. Default 'md'.
 * @param disabled - Optional. Whether the button is disabled. Default false.
 */
export interface GlassButtonProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: ReactNode;
}

export function GlassButton({
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children,
  ...rest
}: GlassButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      aria-disabled={href && disabled ? true : undefined}
      className={['glass-btn', `glass-btn--${variant}`, `glass-btn--${size}`, className].filter(Boolean).join(' ')}
    >
      <span className="glass-btn__shimmer" />
      <span className="glass-btn__content">{children}</span>
    </Tag>
  );
}

export default GlassButton;
