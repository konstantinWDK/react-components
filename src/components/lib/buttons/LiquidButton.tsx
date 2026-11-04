import { useId } from 'react';
import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import './LiquidButton.css';

/**
 * LiquidButton — A button featuring a fluid, liquid-like animated background layer (SVG gooey filter).
 *
 * @param color - Optional. Liquid color. Default '#6366f1'.
 */
export interface LiquidButtonProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: ReactNode;
}

export function LiquidButton({
  href,
  type = 'button',
  color = '#6366f1',
  size = 'md',
  disabled = false,
  className,
  style,
  children,
  ...rest
}: LiquidButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  // Unique, CSS-safe filter id so several buttons can coexist on a page.
  const filterId = `gooey-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      aria-disabled={href && disabled ? true : undefined}
      className={['liquid-btn', `liquid-btn--${size}`, className].filter(Boolean).join(' ')}
      style={{ '--liquid-color': color, '--filterId': `url(#${filterId})`, ...style } as CSSProperties}
    >
      <span className="liquid-btn__text">{children}</span>

      <span className="liquid-wrapper" aria-hidden="true">
        <span className="liquid-main" />
        <span className="liquid-container">
          <span className="liquid-blob" />
          <span className="liquid-blob" />
          <span className="liquid-blob" />
          <span className="liquid-blob" />
        </span>
      </span>

      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </Tag>
  );
}

export default LiquidButton;
