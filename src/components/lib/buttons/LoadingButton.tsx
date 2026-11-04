import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import './LoadingButton.css';

/**
 * LoadingButton — A button supporting async states with a built-in spinner and disabled logic.
 *
 * @param isLoading - Shows the spinner and locks interaction. Default false.
 */
export interface LoadingButtonProps extends HTMLAttributes<HTMLElement> {
  isLoading?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: ReactNode;
}

export function LoadingButton({
  isLoading = false,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children,
  ...rest
}: LoadingButtonProps) {
  const Tag: ElementType = href ? 'a' : 'button';
  const locked = disabled || isLoading;
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : locked}
      aria-disabled={href && locked ? true : undefined}
      aria-busy={isLoading || undefined}
      className={['load-btn', `load-btn--${variant}`, `load-btn--${size}`, isLoading && 'is-loading', className].filter(Boolean).join(' ')}
    >
      <span className="load-btn__content">{children}</span>
      <span className="load-btn__spinner" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      </span>
    </Tag>
  );
}

export default LoadingButton;
