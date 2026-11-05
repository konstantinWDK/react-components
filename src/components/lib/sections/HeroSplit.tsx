'use client';

import './HeroSplit.css';

// HeroSplit — Split-screen hero with image/media side

/** HeroSplit */
export interface HeroSplitProps {
  title?: string;
  subtitle?: string;
}

export function HeroSplit({
  title = "Ship Faster with Premium Components",
  subtitle = "Stop building from scratch. Use production-ready, accessible, and responsive components.",
}: HeroSplitProps) {
  return (
    <>
      <div className="cq-hero-split-cq" data-rk-cb5680="">
      <section className="hero-split" data-rk-cb5680="">
        <div className="hero-split__content" data-rk-cb5680="">
          <span className="hero-split__badge" data-rk-cb5680="">Open Source · MIT</span>
          <h1 className="hero-split__title" data-rk-cb5680="">{title}</h1>
          <p className="hero-split__subtitle" data-rk-cb5680="">{subtitle}</p>
          <div className="hero-split__actions" data-rk-cb5680="">
            <button className="hero-split__btn hero-split__btn--primary" data-rk-cb5680="">
              Start Building
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" data-rk-cb5680=""><path d="M5 12h14M12 5l7 7-7 7" data-rk-cb5680="" /></svg>
            </button>
            <button className="hero-split__btn hero-split__btn--ghost" data-rk-cb5680="">
              Documentation
            </button>
          </div>
          <div className="hero-split__stats" data-rk-cb5680="">
            <div className="hero-split__stat" data-rk-cb5680="">
              <span className="hero-split__stat-num" data-rk-cb5680="">200+</span>
              <span className="hero-split__stat-label" data-rk-cb5680="">Components</span>
            </div>
            <div className="hero-split__stat" data-rk-cb5680="">
              <span className="hero-split__stat-num" data-rk-cb5680="">10K+</span>
              <span className="hero-split__stat-label" data-rk-cb5680="">Downloads</span>
            </div>
            <div className="hero-split__stat" data-rk-cb5680="">
              <span className="hero-split__stat-num" data-rk-cb5680="">5K+</span>
              <span className="hero-split__stat-label" data-rk-cb5680="">Stars</span>
            </div>
          </div>
        </div>
        <div className="hero-split__visual" aria-hidden="true" data-rk-cb5680="">
          <div className="hero-split__visual-inner" data-rk-cb5680="">
            <div className="hero-split__mock-card" data-rk-cb5680="">
              <div className="hero-split__mock-body" data-rk-cb5680="">
                <div className="hero-split__mock-line hero-split__mock-line--wide" data-rk-cb5680=""></div>
                <div className="hero-split__mock-line hero-split__mock-line--medium" data-rk-cb5680=""></div>
                <div className="hero-split__mock-line hero-split__mock-line--short" data-rk-cb5680=""></div>
                <div className="hero-split__mock-grid" data-rk-cb5680="">
                  <div className="hero-split__mock-box" data-rk-cb5680=""></div>
                  <div className="hero-split__mock-box" data-rk-cb5680=""></div>
                  <div className="hero-split__mock-box" data-rk-cb5680=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default HeroSplit;
