import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import './DoubleBorderButton.css';

/**
 * DoubleBorderButton — A button with a sophisticated offset double-border effect and sleek hover transitions.
 */
export interface DoubleBorderButtonProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: ReactNode;
}

export function DoubleBorderButton({
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children,
  ...rest
}: DoubleBorderButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      aria-disabled={href && disabled ? true : undefined}
      className={['double-border-btn', `double-border-btn--${variant}`, `double-border-btn--${size}`, className].filter(Boolean).join(' ')}
    >
      <span className="double-border-btn__content">{children}</span>
    </Tag>
  );
}

export default DoubleBorderButton;
