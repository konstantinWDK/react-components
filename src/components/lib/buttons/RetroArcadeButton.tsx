import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import './RetroArcadeButton.css';

/**
 * RetroArcadeButton — An 8-bit style arcade button with chunky borders and pixelated interactions.
 */
export interface RetroArcadeButtonProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'yellow' | 'red' | 'blue' | 'green';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: ReactNode;
}

export function RetroArcadeButton({
  href,
  type = 'button',
  variant = 'yellow',
  size = 'md',
  disabled = false,
  className,
  children,
  ...rest
}: RetroArcadeButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      aria-disabled={href && disabled ? true : undefined}
      className={['retro-arcade-btn', `retro-arcade-btn--${variant}`, `retro-arcade-btn--${size}`, className].filter(Boolean).join(' ')}
    >
      <span className="retro-arcade-btn__inner">{children}</span>
    </Tag>
  );
}

export default RetroArcadeButton;
