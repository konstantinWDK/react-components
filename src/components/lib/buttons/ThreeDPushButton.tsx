import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import './ThreeDPushButton.css';

/**
 * ThreeDPushButton — A satisfying tactile 3D button that depresses when clicked, with depth layers.
 *
 * @param color - Optional. Front face color. Default '#6366f1'.
 */
export interface ThreeDPushButtonProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: ReactNode;
}

export function ThreeDPushButton({
  href,
  type = 'button',
  color = '#6366f1',
  size = 'md',
  disabled = false,
  className,
  style,
  children,
  ...rest
}: ThreeDPushButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      aria-disabled={href && disabled ? true : undefined}
      className={['push-btn', `push-btn--${size}`, className].filter(Boolean).join(' ')}
      style={{ '--btn-color': color, ...style } as CSSProperties}
    >
      <span className="push-btn__shadow" aria-hidden="true" />
      <span className="push-btn__edge" aria-hidden="true" />
      <span className="push-btn__front">{children}</span>
    </Tag>
  );
}

export default ThreeDPushButton;
