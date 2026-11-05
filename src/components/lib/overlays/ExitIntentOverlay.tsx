'use client';

import './ExitIntentOverlay.css';

/** ExitIntentOverlay */
export interface ExitIntentOverlayProps {
}

export function ExitIntentOverlay({}: ExitIntentOverlayProps) {
  return (
    <>
      <div className="exit-modal" data-rk-aa5def="">
        <div className="exit-card" data-rk-aa5def="">
          <h2 data-rk-aa5def="">Wait! Before you go...</h2>
          <p data-rk-aa5def="">Get 20% off your first order when you join our mailing list.</p>
          <input type="email" placeholder="Your email" data-rk-aa5def="" />
          <button data-rk-aa5def="">Get My Code</button>
        </div>
      </div>
    </>
  );
}

export default ExitIntentOverlay;
