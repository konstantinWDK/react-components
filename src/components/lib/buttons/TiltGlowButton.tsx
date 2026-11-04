'use client';

import type { CSSProperties, ElementType, HTMLAttributes, MouseEvent, ReactNode } from 'react';
import './TiltGlowButton.css';

/**
 * TiltGlowButton — An interactive 3D button that tilts towards the cursor with dynamic lighting.
 *
 * @param primaryColor - Optional. Default '#6366f1'.
 * @param secondaryColor - Optional. Default '#c084fc'.
 */
export interface TiltGlowButtonProps extends HTMLAttributes<HTMLElement> {
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

export function TiltGlowButton({
  href,
  type = 'button',
  primaryColor = '#6366f1',
  secondaryColor = '#c084fc',
  size = 'md',
  disabled = false,
  className,
  style,
  children,
  onMouseMove,
  onMouseLeave,
  ...rest
}: TiltGlowButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';

  // Written straight to the DOM — no re-render per mouse move.
  const handleMove = (e: MouseEvent<HTMLElement>) => {
    onMouseMove?.(e);
    if (disabled) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    el.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    el.style.transform = `rotateY(${(x / rect.width - 0.5) * 25}deg) rotateX(${(y / rect.height - 0.5) * -25}deg)`;
  };

  const handleLeave = (e: MouseEvent<HTMLElement>) => {
    onMouseLeave?.(e);
    const el = e.currentTarget;
    el.style.transform = 'rotateY(0deg) rotateX(0deg)';
    el.style.setProperty('--mouse-x', '50%');
    el.style.setProperty('--mouse-y', '50%');
  };

  return (
    <div className={['tilt-wrapper', `tilt-wrapper--${size}`, className].filter(Boolean).join(' ')}>
      <Tag
        {...rest}
        href={href}
        type={href ? undefined : type}
        disabled={href ? undefined : disabled}
        aria-disabled={href && disabled ? true : undefined}
        className="tilt-card"
        style={{ '--primary-color': primaryColor, '--secondary-color': secondaryColor, ...style } as CSSProperties}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <span className="tilt-card__glow" aria-hidden="true" />
        <span className="tilt-card__content">{children}</span>
      </Tag>
    </div>
  );
}

export default TiltGlowButton;
