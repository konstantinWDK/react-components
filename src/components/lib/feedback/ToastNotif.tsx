import type { HTMLAttributes, ReactNode } from 'react';
import './ToastNotif.css';

/**
 * ToastNotif — A transient snackbar notification that appears at the corner of the screen.
 *
 * @param message - Required.
 * @param icon - Optional. Default '✅'.
 * @param variant - Optional. 'success' | 'info' | 'error'. Default 'success'.
 * @param show - Optional. Visibility (animated). Default true.
 */
export interface ToastNotifProps extends HTMLAttributes<HTMLDivElement> {
  message: ReactNode;
  icon?: ReactNode;
  variant?: 'success' | 'info' | 'error';
  show?: boolean;
}

export function ToastNotif({ message, icon = '✅', variant = 'success', show = true, className, ...rest }: ToastNotifProps) {
  return (
    <div role="status" {...rest} className={['toast', `toast--${variant}`, show && 'toast--show', className].filter(Boolean).join(' ')}>
      <div className="toast__icon" aria-hidden="true">{icon}</div>
      <span className="toast__msg">{message}</span>
    </div>
  );
}

export default ToastNotif;
