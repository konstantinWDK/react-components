'use client';

import LogoWithGalaxy from '../LogoWithGalaxy';
import './SimpleFooterGlass.css';

/** SimpleFooterGlass — ported from astro-component-kit. */
export interface SimpleFooterGlassProps {
}

export function SimpleFooterGlass({}: SimpleFooterGlassProps) {
  return (
    <>
      <footer className="glass-foot" data-rk-d147a1="">
        <div className="foot-grid" data-rk-d147a1="">
          <div className="foot-brand" data-rk-d147a1="">
            <LogoWithGalaxy size="medium" />
            <p data-rk-d147a1="">Premium components for the next web.</p>
          </div>
          <div className="foot-links" data-rk-d147a1="">
            <div data-rk-d147a1=""><h5 data-rk-d147a1="">Project</h5><a href="#" data-rk-d147a1="">Github</a><a href="#" data-rk-d147a1="">License</a></div>
            <div data-rk-d147a1=""><h5 data-rk-d147a1="">Support</h5><a href="#" data-rk-d147a1="">Issues</a><a href="#" data-rk-d147a1="">Discord</a></div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default SimpleFooterGlass;
