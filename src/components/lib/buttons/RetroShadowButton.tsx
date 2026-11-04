'use client';

import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import './RetroShadowButton.css';

/**
 * RetroShadowButton — A sharp-edged neo-brutalist button with a thick solid block shadow.
 */
export interface RetroShadowButtonProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'pink' | 'cyan' | 'yellow' | 'lime';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: ReactNode;
}

export function RetroShadowButton({
  href,
  type = 'button',
  variant = 'pink',
  size = 'md',
  disabled = false,
  className,
  children,
  ...rest
}: RetroShadowButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      aria-disabled={href && disabled ? true : undefined}
      className={['retro-shadow-btn', `retro-shadow-btn--${variant}`, `retro-shadow-btn--${size}`, className].filter(Boolean).join(' ')}
    >
      {children}
    </Tag>
  );
}

export default RetroShadowButton;
