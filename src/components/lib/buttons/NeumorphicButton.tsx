'use client';

import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import './NeumorphicButton.css';

/**
 * NeumorphicButton — A premium Soft UI button with beveled surface gradients and hue-tinted shadows.
 *
 * @param baseColor - Optional. Surface color. Default 'var(--c-bg-2, #111827)'.
 * @param variant - Optional. 'convex' | 'concave'. Default 'convex'.
 */
export interface NeumorphicButtonProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  baseColor?: string;
  variant?: 'convex' | 'concave';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: ReactNode;
}

export function NeumorphicButton({
  href,
  type = 'button',
  baseColor = 'var(--c-bg-2, #111827)',
  variant = 'convex',
  size = 'md',
  disabled = false,
  className,
  style,
  children,
  ...rest
}: NeumorphicButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      aria-disabled={href && disabled ? true : undefined}
      className={['neu-btn', `neu-btn--${size}`, `neu-btn--${variant}`, className].filter(Boolean).join(' ')}
      style={{ '--base-color': baseColor, ...style } as CSSProperties}
    >
      <span className="neu-btn__surface">{children}</span>
    </Tag>
  );
}

export default NeumorphicButton;
