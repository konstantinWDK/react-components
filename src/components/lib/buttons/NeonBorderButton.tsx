import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import './NeonBorderButton.css';

/**
 * NeonBorderButton — Futuristic button wrapped in an animated rotating neon conic-gradient border.
 *
 * @param color - Optional. Neon accent color. Default '#d4a017'.
 */
export interface NeonBorderButtonProps extends HTMLAttributes<HTMLElement> {
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children?: ReactNode;
}

export function NeonBorderButton({
  color = '#d4a017',
  size = 'md',
  href,
  type = 'button',
  disabled = false,
  className,
  style,
  children,
  ...rest
}: NeonBorderButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={!href && disabled ? true : undefined}
      aria-disabled={disabled ? true : undefined}
      className={['neon-border-btn', `neon-border-btn--${size}`, className].filter(Boolean).join(' ')}
      style={{ '--neon-accent': color, ...style } as CSSProperties}
    >
      <span className="neon-border-btn__glow" aria-hidden="true" />
      <span className="neon-border-btn__border" aria-hidden="true" />
      <span className="neon-border-btn__content">{children}</span>
    </Tag>
  );
}

export default NeonBorderButton;
