import { useRef, useState } from 'react';
import type { ElementType, HTMLAttributes, PointerEvent, ReactNode } from 'react';
import './RippleButton.css';

/**
 * RippleButton — Interactive button featuring an expanding click ripple effect with glass styling.
 */
export interface RippleButtonProps extends HTMLAttributes<HTMLElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children?: ReactNode;
}

interface Ripple {
  id: number;
  size: number;
  x: number;
  y: number;
}

export function RippleButton({
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  disabled = false,
  className,
  children,
  onPointerDown,
  ...rest
}: RippleButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextId = useRef(0);

  const handlePointerDown = (e: PointerEvent<HTMLElement>) => {
    onPointerDown?.(e);
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const d = Math.max(rect.width, rect.height);
    const ripple = { id: nextId.current++, size: d, x: e.clientX - rect.left - d / 2, y: e.clientY - rect.top - d / 2 };
    setRipples((r) => [...r, ripple]);
    window.setTimeout(() => setRipples((r) => r.filter((x) => x.id !== ripple.id)), 650);
  };

  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={!href && disabled ? true : undefined}
      aria-disabled={disabled ? true : undefined}
      className={['ripple-btn', `ripple-btn--${variant}`, `ripple-btn--${size}`, className].filter(Boolean).join(' ')}
      onPointerDown={handlePointerDown}
    >
      <span className="ripple-btn__label">{children}</span>
      <span className="ripple-btn__container" aria-hidden="true">
        {ripples.map((r) => (
          <span key={r.id} className="ripple-effect" style={{ width: r.size, height: r.size, left: r.x, top: r.y }} />
        ))}
      </span>
    </Tag>
  );
}

export default RippleButton;
