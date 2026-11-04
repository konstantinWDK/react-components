import { useState } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import './ToastNotificationGroup.css';

/**
 * ToastNotificationGroup — Stackable notification banner with auto-timed progress bar, icon, and dismiss action.
 *
 * @param type - Optional. 'success' | 'warning' | 'error' | 'info'. Default 'success'.
 * @param title - Optional. Default 'Changes Saved'.
 * @param message - Optional.
 * @param actionText - Optional. Default 'Undo'. Pass '' to hide.
 * @param onAction - Optional. Action button handler.
 * @param onDismiss - Optional. Called after the dismiss animation ends.
 */
export interface ToastNotificationGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  type?: 'success' | 'warning' | 'error' | 'info';
  title?: ReactNode;
  message?: ReactNode;
  actionText?: string;
  onAction?: () => void;
  onDismiss?: () => void;
}

const icons = { success: '✓', warning: '!', error: '✕', info: 'ℹ' };

export function ToastNotificationGroup({
  type = 'success',
  title = 'Changes Saved',
  message = 'Your project settings were synchronized with production.',
  actionText = 'Undo',
  onAction,
  onDismiss,
  className,
  style,
  ...rest
}: ToastNotificationGroupProps) {
  const [state, setState] = useState<'shown' | 'leaving' | 'gone'>('shown');
  if (state === 'gone') return null;

  const dismiss = () => {
    setState('leaving');
    window.setTimeout(() => {
      setState('gone');
      onDismiss?.();
    }, 250);
  };

  const leaving: CSSProperties = state === 'leaving' ? { opacity: 0, transform: 'translateY(10px) scale(0.95)' } : {};

  return (
    <div role="alert" {...rest} className={['toast-item', `toast-item--${type}`, className].filter(Boolean).join(' ')} style={{ ...style, ...leaving }}>
      <div className="toast-item__body">
        <span className="toast-item__icon" aria-hidden="true">{icons[type]}</span>
        <div className="toast-item__content">
          <h5 className="toast-item__title">{title}</h5>
          <p className="toast-item__msg">{message}</p>
        </div>
        {actionText && (
          <button type="button" className="toast-item__action" onClick={onAction}>
            {actionText}
          </button>
        )}
        <button type="button" className="toast-item__close" aria-label="Dismiss alert" onClick={dismiss}>
          ✕
        </button>
      </div>
      <div className="toast-item__progress" aria-hidden="true" />
    </div>
  );
}

export default ToastNotificationGroup;
