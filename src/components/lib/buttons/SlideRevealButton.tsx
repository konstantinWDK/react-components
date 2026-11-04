import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import './SlideRevealButton.css';

/**
 * SlideRevealButton — Interactive action button with a sliding icon drawer and kinetic typography transition.
 *
 * @param icon - Optional. Icon revealed on hover. Default '→'.
 */
export interface SlideRevealButtonProps extends HTMLAttributes<HTMLElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
}

export function SlideRevealButton({
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  icon = '→',
  disabled = false,
  className,
  children,
  ...rest
}: SlideRevealButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={!href && disabled ? true : undefined}
      aria-disabled={disabled ? true : undefined}
      className={['slide-reveal-btn', `slide-reveal-btn--${variant}`, `slide-reveal-btn--${size}`, className].filter(Boolean).join(' ')}
    >
      <span className="slide-reveal-btn__text">{children}</span>
      <span className="slide-reveal-btn__icon" aria-hidden="true">{icon}</span>
    </Tag>
  );
}

export default SlideRevealButton;
