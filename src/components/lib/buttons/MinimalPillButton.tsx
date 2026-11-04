import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import './MinimalPillButton.css';

/**
 * MinimalPillButton — A cleanly rounded pill button optimized for minimal interactions and tags.
 */
export interface MinimalPillButtonProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: ReactNode;
}

export function MinimalPillButton({
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children,
  ...rest
}: MinimalPillButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      aria-disabled={href && disabled ? true : undefined}
      className={['pill-btn', `pill-btn--${variant}`, `pill-btn--${size}`, className].filter(Boolean).join(' ')}
    >
      {children}
    </Tag>
  );
}

export default MinimalPillButton;
