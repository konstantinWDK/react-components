'use client';

import './HeroGradient.css';

// HeroGradient — Full-screen hero with animated gradient background

/** HeroGradient */
export interface HeroGradientProps {
  title?: string;
  subtitle?: string;
}

export function HeroGradient({
  title = "Build Beautiful Interfaces",
  subtitle = "Premium open-source UI components for React. Copy, paste, and ship faster.",
}: HeroGradientProps) {
  return (
    <>
      <div className="cq-hero-gradient-cq" data-rk-c25c97="">
      <section className="hero-gradient" data-rk-c25c97="">
        <div className="hero-gradient__bg" aria-hidden="true" data-rk-c25c97=""></div>
        <div className="hero-gradient__content" data-rk-c25c97="">
          <span className="hero-gradient__badge" data-rk-c25c97="">⚡ 200+ Components</span>
          <h1 className="hero-gradient__title" data-rk-c25c97="">{title}</h1>
          <p className="hero-gradient__subtitle" data-rk-c25c97="">{subtitle}</p>
          <div className="hero-gradient__actions" data-rk-c25c97="">
            <button className="hero-btn hero-btn--primary" data-rk-c25c97="">
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" data-rk-c25c97=""><path d="M5 12h14M12 5l7 7-7 7" data-rk-c25c97="" /></svg>
            </button>
            <button className="hero-btn hero-btn--glass" data-rk-c25c97="">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" data-rk-c25c97=""><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77 5.44 5.44 0 0 0 3.5 8.53a5.44 5.44 0 0 0-.09 2.61 3.37 3.37 0 0 0-.94 2.61s3.3 1.19 6.44 1.54" data-rk-c25c97="" /><path d="M9 19c0 2.3 1.8 4.2 4 4.2s4-1.9 4-4.2" data-rk-c25c97="" /></svg>
              View on GitHub
            </button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default HeroGradient;
