'use client';

import LogoWithGalaxy from '../LogoWithGalaxy';
import './SplashIntroOverlay.css';

/** SplashIntroOverlay — ported from astro-component-kit. */
export interface SplashIntroOverlayProps {
}

export function SplashIntroOverlay({}: SplashIntroOverlayProps) {
  return (
    <>
      <div className="splash" data-rk-ccfb24="">
        <div className="logo-anim" data-rk-ccfb24="">
          <LogoWithGalaxy size="large" />
        </div>
      </div>
    </>
  );
}

export default SplashIntroOverlay;
