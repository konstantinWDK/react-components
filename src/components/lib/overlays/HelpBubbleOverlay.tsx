'use client';

import './HelpBubbleOverlay.css';

/** HelpBubbleOverlay — ported from astro-component-kit. */
export interface HelpBubbleOverlayProps {
}

export function HelpBubbleOverlay({}: HelpBubbleOverlayProps) {
  return (
    <>
      <div className="help-bubble" data-rk-da86e5="">
        <div className="tip" data-rk-da86e5="">We are online!</div>
        <div className="icon" data-rk-da86e5="">💬</div>
      </div>
    </>
  );
}

export default HelpBubbleOverlay;
