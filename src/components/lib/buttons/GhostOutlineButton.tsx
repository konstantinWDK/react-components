import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import './GhostOutlineButton.css';

/**
 * GhostOutlineButton — A minimalist transparent button with gradient outlines and animated borders.
 *
 * @param primaryColor - Optional. Gradient start. Default '#6366f1'.
 * @param secondaryColor - Optional. Gradient end. Default '#c084fc'.
 */
export interface GhostOutlineButtonProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  primaryColor?: string;
  secondaryColor?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: ReactNode;
}

export function GhostOutlineButton({
  href,
  type = 'button',
  primaryColor = '#6366f1',
  secondaryColor = '#c084fc',
  size = 'md',
  disabled = false,
  className,
  style,
  children,
  ...rest
}: GhostOutlineButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      aria-disabled={href && disabled ? true : undefined}
      className={['ghost-grad-btn', `ghost-grad-btn--${size}`, className].filter(Boolean).join(' ')}
      style={{ '--primary-color': primaryColor, '--secondary-color': secondaryColor, ...style } as CSSProperties}
    >
      <span className="ghost-grad-btn__text">{children}</span>
    </Tag>
  );
}

export default GhostOutlineButton;
