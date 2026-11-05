'use client';

import './HeroGlass.css';

// HeroGlass — Centered hero with glassmorphism card overlay

/** HeroGlass */
export interface HeroGlassProps {
  title?: string;
  subtitle?: string;
}

export function HeroGlass({
  title = "Your Complete Component Library",
  subtitle = "Build stunning landing pages and apps with 200+ accessible, responsive, and customizable components.",
}: HeroGlassProps) {
  return (
    <>
      <div className="cq-hero-glass-cq" data-rk-2480b8="">
      <section className="hero-glass" data-rk-2480b8="">
        <div className="hero-glass__bg" aria-hidden="true" data-rk-2480b8="">
          <div className="hero-glass__orb hero-glass__orb--1" data-rk-2480b8=""></div>
          <div className="hero-glass__orb hero-glass__orb--2" data-rk-2480b8=""></div>
          <div className="hero-glass__orb hero-glass__orb--3" data-rk-2480b8=""></div>
        </div>
        <div className="container" data-rk-2480b8="">
          <div className="hero-glass__card" data-rk-2480b8="">
            <h1 className="hero-glass__title" data-rk-2480b8="">{title}</h1>
            <p className="hero-glass__subtitle" data-rk-2480b8="">{subtitle}</p>
            <div className="hero-glass__actions" data-rk-2480b8="">
              <button className="hero-glass__btn hero-glass__btn--primary" data-rk-2480b8="">
                Get Started Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" data-rk-2480b8=""><path d="M5 12h14M12 5l7 7-7 7" data-rk-2480b8="" /></svg>
              </button>
              <button className="hero-glass__btn hero-glass__btn--secondary" data-rk-2480b8="">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" data-rk-2480b8=""><polygon points="5 3 19 12 5 21 5 3" data-rk-2480b8="" /></svg>
                Watch Demo
              </button>
            </div>
            <div className="hero-glass__trust" data-rk-2480b8="">
              <span data-rk-2480b8="">Trusted by 5,000+ developers</span>
              <div className="hero-glass__avatars" data-rk-2480b8="">
                <span className="hero-glass__avatar" data-rk-2480b8="">A</span>
                <span className="hero-glass__avatar" data-rk-2480b8="">B</span>
                <span className="hero-glass__avatar" data-rk-2480b8="">C</span>
                <span className="hero-glass__avatar" data-rk-2480b8="">D</span>
                <span className="hero-glass__avatar hero-glass__avatar--more" data-rk-2480b8="">+</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default HeroGlass;
