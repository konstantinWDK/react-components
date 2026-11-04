import type { HTMLAttributes, ReactNode } from 'react';
import './GlassAlert.css';

/**
 * GlassAlert — A translucent feedback bar for displaying situational messages.
 *
 * @param type - Optional. 'info' | 'success' | 'warning' | 'error'. Default 'info'.
 * @param title - Required. Alert heading.
 */
export interface GlassAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  type?: 'info' | 'success' | 'warning' | 'error';
  title: ReactNode;
  children?: ReactNode;
}

const icons = { info: 'i', success: '✓', warning: '!', error: '✕' };

export function GlassAlert({ type = 'info', title, className, children, ...rest }: GlassAlertProps) {
  return (
    <div role="alert" {...rest} className={['glass-alert', `glass-alert--${type}`, className].filter(Boolean).join(' ')}>
      <div className="glass-alert__icon" aria-hidden="true">{icons[type]}</div>
      <div className="glass-alert__content">
        <div className="glass-alert__title">{title}</div>
        <div className="glass-alert__body">{children}</div>
      </div>
    </div>
  );
}

export default GlassAlert;
