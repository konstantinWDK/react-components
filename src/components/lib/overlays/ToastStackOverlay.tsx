'use client';

import './ToastStackOverlay.css';

/** ToastStackOverlay — ported from astro-component-kit. */
export interface ToastStackOverlayProps {
}

export function ToastStackOverlay({}: ToastStackOverlayProps) {
  return (
    <>
      <div className="toast-stack" data-rk-e22de0="">
        <div className="toast-mini success" data-rk-e22de0="">Profile updated!</div>
        <div className="toast-mini error" data-rk-e22de0="">Failed to sync changes.</div>
      </div>
    </>
  );
}

export default ToastStackOverlay;
