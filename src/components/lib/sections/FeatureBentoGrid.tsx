'use client';

import './FeatureBentoGrid.css';

/**
 * FeatureBentoGrid — Full-page modern Bento-Grid features section with interactive widgets and metric cards.
 * 
 * @param {string} badge - Eyebrow badge text.
 * @param {string} title - Main section heading.
 * @param {string} subtitle - Supporting description text.
 */
export interface FeatureBentoGridProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function FeatureBentoGrid({
  badge = "Core Capabilities",
  title = "Engineered for Extreme Performance",
  subtitle = "Everything you need to build next-generation React applications with zero runtime overhead.",
  className = ""
}: FeatureBentoGridProps) {
  return (
    <>
      <div className="cq-feature-bento-grid-cq" data-rk-c1d0ee="">
      <section className={`bento-section ${className}`} aria-labelledby="bento-title" data-rk-c1d0ee="">
        <div className="bento-bg" aria-hidden="true" data-rk-c1d0ee="">
          <div className="bento-glow bento-glow--1" data-rk-c1d0ee=""></div>
          <div className="bento-glow bento-glow--2" data-rk-c1d0ee=""></div>
        </div>
      
        <div className="container" data-rk-c1d0ee="">
          {/* Header */}
          <div className="section-header" data-rk-c1d0ee="">
            {badge && <span className="section-badge" data-rk-c1d0ee="">{badge}</span>}
            <h2 id="bento-title" className="section-title" data-rk-c1d0ee="">{title}</h2>
            <p className="section-subtitle" data-rk-c1d0ee="">{subtitle}</p>
          </div>
      
          {/* Bento Grid Container */}
          <div className="bento-grid" data-rk-c1d0ee="">
            {/* Slot 1: Large Highlight (Span 2 col) */}
            <article className="bento-card bento-card--wide" data-rk-c1d0ee="">
              <div className="bento-card__content" data-rk-c1d0ee="">
                <div className="bento-card__icon bento-card__icon--primary" data-rk-c1d0ee="">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-c1d0ee=""><path d="m18 16 4-4-4-4" data-rk-c1d0ee="" /><path d="m6 8-4 4 4 4" data-rk-c1d0ee="" /><path d="m14.5 4-5 16" data-rk-c1d0ee="" /></svg>
                </div>
                <span className="bento-tag" data-rk-c1d0ee="">Zero Runtime JS</span>
                <h3 className="bento-card__title" data-rk-c1d0ee="">Pure Static Architecture</h3>
                <p className="bento-card__desc" data-rk-c1d0ee="">
                  Components ship zero client-side JavaScript by default, delivering perfect 100/100 Lighthouse performance scores out of the box.
                </p>
                <div className="bento-speed-stat" data-rk-c1d0ee="">
                  <div className="speed-score" data-rk-c1d0ee="">
                    <span className="score-number" data-rk-c1d0ee="">100</span>
                    <span className="score-label" data-rk-c1d0ee="">Lighthouse Score</span>
                  </div>
                  <div className="speed-bars" data-rk-c1d0ee="">
                    <div className="speed-bar" data-rk-c1d0ee=""><span className="bar-fill" style={{ width: "100%" }} data-rk-c1d0ee=""></span><span className="bar-name" data-rk-c1d0ee="">Performance</span></div>
                    <div className="speed-bar" data-rk-c1d0ee=""><span className="bar-fill" style={{ width: "100%" }} data-rk-c1d0ee=""></span><span className="bar-name" data-rk-c1d0ee="">Accessibility</span></div>
                    <div className="speed-bar" data-rk-c1d0ee=""><span className="bar-fill" style={{ width: "100%" }} data-rk-c1d0ee=""></span><span className="bar-name" data-rk-c1d0ee="">Best Practices</span></div>
                  </div>
                </div>
              </div>
            </article>
      
            {/* Slot 2: Security & Accessibility (Tall) */}
            <article className="bento-card bento-card--tall" data-rk-c1d0ee="">
              <div className="bento-card__content" data-rk-c1d0ee="">
                <div className="bento-card__icon bento-card__icon--gold" data-rk-c1d0ee="">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-c1d0ee=""><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" data-rk-c1d0ee="" /><path d="m9 12 2 2 4-4" data-rk-c1d0ee="" /></svg>
                </div>
                <span className="bento-tag" data-rk-c1d0ee="">WCAG 2.1 AA</span>
                <h3 className="bento-card__title" data-rk-c1d0ee="">Accessible & Tested</h3>
                <p className="bento-card__desc" data-rk-c1d0ee="">
                  Every button, input, and modal conforms strictly to WCAG AA guidelines with keyboard navigation and ARIA attributes.
                </p>
                <div className="a11y-pill-list" data-rk-c1d0ee="">
                  <div className="a11y-pill" data-rk-c1d0ee="">✓ Focus Rings Built-in</div>
                  <div className="a11y-pill" data-rk-c1d0ee="">✓ Keyboard Nav (Tab/Esc)</div>
                  <div className="a11y-pill" data-rk-c1d0ee="">✓ Contrast Ratio ≥ 4.5:1</div>
                  <div className="a11y-pill" data-rk-c1d0ee="">✓ Screen Reader Ready</div>
                </div>
              </div>
            </article>
      
            {/* Slot 3: Design Tokens & Theming */}
            <article className="bento-card" data-rk-c1d0ee="">
              <div className="bento-card__content" data-rk-c1d0ee="">
                <div className="bento-card__icon bento-card__icon--cyan" data-rk-c1d0ee="">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-c1d0ee=""><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" data-rk-c1d0ee="" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" data-rk-c1d0ee="" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" data-rk-c1d0ee="" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" data-rk-c1d0ee="" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" data-rk-c1d0ee="" /></svg>
                </div>
                <span className="bento-tag" data-rk-c1d0ee="">CSS Tokens</span>
                <h3 className="bento-card__title" data-rk-c1d0ee="">Fluid Design Tokens</h3>
                <p className="bento-card__desc" data-rk-c1d0ee="">
                  Seamless global variables for colors, typography scales, glass blurs, and border radiuses.
                </p>
                <div className="tokens-preview" data-rk-c1d0ee="">
                  <span className="color-dot color-dot--gold" data-rk-c1d0ee=""></span>
                  <span className="color-dot color-dot--indigo" data-rk-c1d0ee=""></span>
                  <span className="color-dot color-dot--emerald" data-rk-c1d0ee=""></span>
                  <span className="color-dot color-dot--rose" data-rk-c1d0ee=""></span>
                </div>
              </div>
            </article>
      
            {/* Slot 4: TypeScript Strict */}
            <article className="bento-card" data-rk-c1d0ee="">
              <div className="bento-card__content" data-rk-c1d0ee="">
                <div className="bento-card__icon bento-card__icon--blue" data-rk-c1d0ee="">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-c1d0ee=""><rect width="18" height="18" x="3" y="3" rx="2" data-rk-c1d0ee="" /><path d="M7 7h10" data-rk-c1d0ee="" /><path d="M12 7v10" data-rk-c1d0ee="" /></svg>
                </div>
                <span className="bento-tag" data-rk-c1d0ee="">TypeScript 5.x</span>
                <h3 className="bento-card__title" data-rk-c1d0ee="">Strict Type Safety</h3>
                <p className="bento-card__desc" data-rk-c1d0ee="">
                  Full TypeScript IntelliSense with prop auto-completion and compile-time validation in your IDE.
                </p>
                <div className="code-snippet-mini" data-rk-c1d0ee="">
                  <code data-rk-c1d0ee="">interface Props &#123; variant: 'glass' | 'glow' &#125;</code>
                </div>
              </div>
            </article>
      
            {/* Slot 5: 3D & Particle Shaders (Wide) */}
            <article className="bento-card bento-card--wide" data-rk-c1d0ee="">
              <div className="bento-card__content" data-rk-c1d0ee="">
                <div className="bento-card__icon bento-card__icon--purple" data-rk-c1d0ee="">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-c1d0ee=""><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" data-rk-c1d0ee="" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" data-rk-c1d0ee="" /><line x1="12" y1="22.08" x2="12" y2="12" data-rk-c1d0ee="" /></svg>
                </div>
                <span className="bento-tag" data-rk-c1d0ee="">Three.js & WebGL</span>
                <h3 className="bento-card__title" data-rk-c1d0ee="">Interactive 3D Galaxy & Visuals</h3>
                <p className="bento-card__desc" data-rk-c1d0ee="">
                  GPU-accelerated particle galaxy backgrounds with smooth physics, mouse-follow damping, and hardware-accelerated shaders.
                </p>
                <div className="live-pill" data-rk-c1d0ee="">
                  <span className="live-dot" data-rk-c1d0ee=""></span>
                  <span data-rk-c1d0ee="">60 FPS Fluid Physics Engine</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default FeatureBentoGrid;
