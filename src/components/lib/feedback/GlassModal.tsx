import { useEffect, useRef } from 'react';
import type { DialogHTMLAttributes, ReactNode } from 'react';
import './GlassModal.css';

/**
 * GlassModal — A premium overlay dialog for critical confirmations or focused interactions.
 * Built on the native <dialog> element (focus trap, Esc to close, top layer).
 *
 * @param open - Required. Controls visibility.
 * @param onClose - Called on cancel, Esc, or backdrop click.
 * @param onConfirm - Called when the confirm button is pressed.
 * @param title - Optional. Default 'Confirm Action'.
 * @param confirmLabel - Optional. Default 'Confirm'.
 * @param cancelLabel - Optional. Default 'Cancel'.
 */
export interface GlassModalProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, 'open' | 'title'> {
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  title?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  children?: ReactNode;
}

export function GlassModal({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  className,
  children,
  ...rest
}: GlassModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      {...rest}
      ref={ref}
      className={['modal-dialog', className].filter(Boolean).join(' ')}
      onClose={() => onClose?.()}
      onClick={(e) => {
        // Clicking the backdrop targets the <dialog> itself.
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="modal-box">
        <div className="modal-header"><h3>{title}</h3></div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button className="modal-btn modal-btn--sec" type="button" onClick={() => onClose?.()}>
            {cancelLabel}
          </button>
          <button className="modal-btn modal-btn--pri" type="button" onClick={() => onConfirm?.()}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default GlassModal;
