'use client';

import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import './CyberpunkButton.css';

/**
 * CyberpunkButton — A glitchy, neon-styled button inspired by futuristic sci-fi aesthetics.
 *
 * @param primaryColor - Optional. Main neon color. Default '#ff003c'.
 * @param secondaryColor - Optional. Glitch offset color. Default '#00e0ff'.
 * @param label - Optional. Text used for the glitch layer (and as content when no children). Default 'READY'.
 */
export interface CyberpunkButtonProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  primaryColor?: string;
  secondaryColor?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  disabled?: boolean;
  children?: ReactNode;
}

export function CyberpunkButton({
  href,
  type = 'button',
  primaryColor = '#ff003c',
  secondaryColor = '#00e0ff',
  size = 'md',
  label = 'READY',
  disabled = false,
  className,
  style,
  children,
  ...rest
}: CyberpunkButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      aria-disabled={href && disabled ? true : undefined}
      className={['cyber-btn', `cyber-btn--${size}`, className].filter(Boolean).join(' ')}
      style={{ '--primary-color': primaryColor, '--secondary-color': secondaryColor, ...style } as CSSProperties}
      data-text={label}
    >
      <span className="cyber-btn__inner">{children ?? label}</span>
      <span className="cyber-btn__glitch" aria-hidden="true" />
      <span className="cyber-btn__tag" aria-hidden="true">R25</span>
    </Tag>
  );
}

export default CyberpunkButton;
