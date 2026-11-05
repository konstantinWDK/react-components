'use client';

import './AgeVerificationOverlay.css';

/** AgeVerificationOverlay — ported from astro-component-kit. */
export interface AgeVerificationOverlayProps {
}

export function AgeVerificationOverlay({}: AgeVerificationOverlayProps) {
  return (
    <>
      <div className="age-gate" data-rk-99adbd="">
        <div className="age-card" data-rk-99adbd="">
          <h2 data-rk-99adbd="">Age Verification</h2>
          <p data-rk-99adbd="">Please confirm you are 18 or older to view this site.</p>
          <div className="acts-row" data-rk-99adbd=""><button className="no" data-rk-99adbd="">Exit</button><button className="yes" data-rk-99adbd="">I am 18+</button></div>
        </div>
      </div>
    </>
  );
}

export default AgeVerificationOverlay;
