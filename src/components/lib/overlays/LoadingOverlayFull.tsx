'use client';

import './LoadingOverlayFull.css';

/** LoadingOverlayFull — ported from astro-component-kit. */
export interface LoadingOverlayFullProps {
}

export function LoadingOverlayFull({}: LoadingOverlayFullProps) {
  return (
    <>
      <div className="load-overlay" data-rk-7704fd="">
        <div className="spinner" data-rk-7704fd=""></div>
      </div>
    </>
  );
}

export default LoadingOverlayFull;
