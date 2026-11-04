'use client';

import { useRef } from 'react';
import type { ElementType, HTMLAttributes, MouseEvent, ReactNode } from 'react';
import './MagneticButton.css';

/**
 * MagneticButton — A button that physically follows the user's cursor when hovered,
 * providing a satisfying magnetic snap effect.
 *
 * @param strength - Optional. How intense the magnetic pull is (0–1). Default 0.5.
 */
export interface MagneticButtonProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  strength?: number;
  disabled?: boolean;
  children?: ReactNode;
}

export function MagneticButton({
  href,
  type = 'button',
  variant = 'secondary',
  size = 'md',
  strength = 0.5,
  disabled = false,
  className,
  children,
  onMouseMove,
  onMouseLeave,
  ...rest
}: MagneticButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  const innerRef = useRef<HTMLSpanElement>(null);

  // Transforms are written straight to the DOM — no re-render per mouse move.
  const move = (el: HTMLElement, x: number, y: number) => {
    el.style.transform = `translate(${x}px, ${y}px)`;
    if (innerRef.current) innerRef.current.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
  };

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    onMouseMove?.(e);
    if (disabled) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    move(el, (e.clientX - rect.left - rect.width / 2) * strength, (e.clientY - rect.top - rect.height / 2) * strength);
  };

  const handleLeave = (e: MouseEvent<HTMLElement>) => {
    onMouseLeave?.(e);
    move(e.currentTarget, 0, 0);
  };

  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      aria-disabled={href && disabled ? true : undefined}
      className={['magnetic-btn', `magnetic-btn--${variant}`, `magnetic-btn--${size}`, className].filter(Boolean).join(' ')}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <span ref={innerRef} className="magnetic-btn__inner">{children}</span>
    </Tag>
  );
}

export default MagneticButton;
