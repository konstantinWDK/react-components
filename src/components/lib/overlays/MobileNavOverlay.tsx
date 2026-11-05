'use client';

import './MobileNavOverlay.css';

/** MobileNavOverlay */
export interface MobileNavOverlayProps {
}

export function MobileNavOverlay({}: MobileNavOverlayProps) {
  return (
    <>
      <div className="mob-nav" data-rk-69811e="">
        <div className="mob-close" data-rk-69811e="">×</div>
        <nav className="mob-links" data-rk-69811e="">
          <a href="#" data-rk-69811e="">Home</a>
          <a href="#" data-rk-69811e="">Features</a>
          <a href="#" data-rk-69811e="">Pricing</a>
          <a href="#" data-rk-69811e="">Team</a>
        </nav>
      </div>
    </>
  );
}

export default MobileNavOverlay;
