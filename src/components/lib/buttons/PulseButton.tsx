'use client';

import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import './PulseButton.css';

/**
 * PulseButton — A button with a persistent circular pulse effect to draw attention.
 *
 * @param color - Optional. Pulse color. Default '#8b5cf6'.
 */
export interface PulseButtonProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  disabled?: boolean;
  children?: ReactNode;
}

export function PulseButton({
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  color = '#8b5cf6',
  disabled = false,
  className,
  style,
  children,
  ...rest
}: PulseButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      aria-disabled={href && disabled ? true : undefined}
      className={['pulse-btn', `pulse-btn--${variant}`, `pulse-btn--${size}`, className].filter(Boolean).join(' ')}
      style={{ '--pulse-color': color, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

export default PulseButton;
