'use client';

import './ContextMenuOverlay.css';

/** ContextMenuOverlay — ported from astro-component-kit. */
export interface ContextMenuOverlayProps {
}

export function ContextMenuOverlay({}: ContextMenuOverlayProps) {
  return (
    <>
      <div className="ctx-menu" data-rk-5a94ea="">
        <div className="ctx-group" data-rk-5a94ea="">
          <div className="ctx-item" data-rk-5a94ea="">Copy Link</div>
          <div className="ctx-item" data-rk-5a94ea="">Duplicate</div>
        </div>
        <hr data-rk-5a94ea="" />
        <div className="ctx-item danger" data-rk-5a94ea="">Delete Item</div>
      </div>
    </>
  );
}

export default ContextMenuOverlay;
