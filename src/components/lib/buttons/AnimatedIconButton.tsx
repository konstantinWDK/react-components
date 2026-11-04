import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import './AnimatedIconButton.css';

/**
 * AnimatedIconButton — A button that elegantly slides an icon into view on hover.
 *
 * @param icon - Optional. Custom icon node. Defaults to a chevron pointing in `iconPos` direction.
 * @param iconPos - Optional. 'left' | 'right'. Default 'right'.
 */
export interface AnimatedIconButtonProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  iconPos?: 'left' | 'right';
  icon?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
}

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export function AnimatedIconButton({
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  iconPos = 'right',
  icon,
  disabled = false,
  className,
  children,
  ...rest
}: AnimatedIconButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  const iconNode = <span className="icon-anim-btn__icon">{icon ?? (iconPos === 'left' ? <ChevronLeft /> : <ChevronRight />)}</span>;
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      aria-disabled={href && disabled ? true : undefined}
      className={['icon-anim-btn', `icon-anim-btn--${variant}`, `icon-anim-btn--${size}`, `icon-anim-btn--${iconPos}`, className]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="icon-anim-btn__inner">
        {iconPos === 'left' && iconNode}
        <span className="icon-anim-btn__text">{children}</span>
        {iconPos === 'right' && iconNode}
      </span>
    </Tag>
  );
}

export default AnimatedIconButton;
