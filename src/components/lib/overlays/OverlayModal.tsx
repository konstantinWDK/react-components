'use client';

import './OverlayModal.css';

/** OverlayModal */
export interface OverlayModalProps {
}

export function OverlayModal({}: OverlayModalProps) {
  return (
    <>
      <div className="modal-overlay" data-rk-e1e17c="">
        <div className="modal-card anim-scale-up" data-rk-e1e17c="">
          <div className="modal-close" data-rk-e1e17c="">×</div>
          <h3 data-rk-e1e17c="">Confirm Action</h3>
          <p data-rk-e1e17c="">Are you sure you want to proceed with this sensitive operation?</p>
          <div className="modal-actions" data-rk-e1e17c="">
            <button className="cancel" data-rk-e1e17c="">Cancel</button>
            <button className="confirm" data-rk-e1e17c="">Continue</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OverlayModal;
