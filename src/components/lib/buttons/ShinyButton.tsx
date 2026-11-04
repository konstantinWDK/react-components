import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import './ShinyButton.css';

/**
 * ShinyButton — A button with a metallic shine effect that sweeps across on hover.
 */
export interface ShinyButtonProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: ReactNode;
}

export function ShinyButton({
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children,
  ...rest
}: ShinyButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      aria-disabled={href && disabled ? true : undefined}
      className={['shiny-btn', `shiny-btn--${variant}`, `shiny-btn--${size}`, className].filter(Boolean).join(' ')}
    >
      <span className="shiny-btn__content">{children}</span>
    </Tag>
  );
}

export default ShinyButton;
