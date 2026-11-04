import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import './ShimmerButton.css';

/**
 * ShimmerButton — A clean, elegant button with a continuous diagonal shimmer sweeping animation.
 */
export interface ShimmerButtonProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: ReactNode;
}

export function ShimmerButton({
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children,
  ...rest
}: ShimmerButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      aria-disabled={href && disabled ? true : undefined}
      className={['shimmer-btn', `shimmer-btn--${variant}`, `shimmer-btn--${size}`, className].filter(Boolean).join(' ')}
    >
      <span className="shimmer-btn__content">{children}</span>
    </Tag>
  );
}

export default ShimmerButton;
