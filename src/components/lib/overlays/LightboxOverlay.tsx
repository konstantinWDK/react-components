'use client';

import './LightboxOverlay.css';

/** LightboxOverlay — ported from astro-component-kit. */
export interface LightboxOverlayProps {
}

export function LightboxOverlay({}: LightboxOverlayProps) {
  return (
    <>
      <div className="lightbox" data-rk-746ba1="">
        <div className="close" data-rk-746ba1="">×</div>
        <div className="img-preview" data-rk-746ba1=""></div>
        <div className="caption" data-rk-746ba1="">Nature Landscape / 2024</div>
      </div>
    </>
  );
}

export default LightboxOverlay;
