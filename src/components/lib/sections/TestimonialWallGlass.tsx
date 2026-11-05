'use client';

import './TestimonialWallGlass.css';

/**
 * TestimonialWallGlass — Full-page social proof testimonial wall with verified customer cards and stats.
 * 
 * @param {string} badge - Eyebrow badge text.
 * @param {string} title - Section main heading.
 * @param {string} subtitle - Supporting description text.
 */
export interface TestimonialWallGlassProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function TestimonialWallGlass({
  badge = "Customer Love",
  title = "Trusted by 10,000+ Developers Worldwide",
  subtitle = "See how engineering teams ship faster and build beautiful React products with our component kit.",
  className = ""
}: TestimonialWallGlassProps) {
  return (
    <>
      <div className="cq-testimonial-wall-glass-cq" data-rk-3eb70b="">
      <section className={`testimonials-section ${className}`} aria-labelledby="testimonials-title" data-rk-3eb70b="">
        <div className="testimonials-bg" aria-hidden="true" data-rk-3eb70b="">
          <div className="test-glow test-glow--1" data-rk-3eb70b=""></div>
          <div className="test-glow test-glow--2" data-rk-3eb70b=""></div>
        </div>
      
        <div className="container" data-rk-3eb70b="">
          {/* Header */}
          <div className="section-header" data-rk-3eb70b="">
            {badge && <span className="section-badge" data-rk-3eb70b="">{badge}</span>}
            <h2 id="testimonials-title" className="section-title" data-rk-3eb70b="">{title}</h2>
            <p className="section-subtitle" data-rk-3eb70b="">{subtitle}</p>
      
            {/* Trust Metrics Bar */}
            <div className="trust-bar" data-rk-3eb70b="">
              <div className="trust-stat" data-rk-3eb70b="">
                <span className="trust-stat__num" data-rk-3eb70b="">4.9 / 5.0</span>
                <div className="trust-stars" data-rk-3eb70b="">★★★★★</div>
                <span className="trust-stat__label" data-rk-3eb70b="">Over 1,200 Reviews</span>
              </div>
              <div className="trust-sep" data-rk-3eb70b=""></div>
              <div className="trust-stat" data-rk-3eb70b="">
                <span className="trust-stat__num" data-rk-3eb70b="">99.8%</span>
                <span className="trust-stat__sub" data-rk-3eb70b="">Satisfaction Rate</span>
                <span className="trust-stat__label" data-rk-3eb70b="">Based on 2026 Survey</span>
              </div>
              <div className="trust-sep" data-rk-3eb70b=""></div>
              <div className="trust-stat" data-rk-3eb70b="">
                <span className="trust-stat__num" data-rk-3eb70b="">3.5x</span>
                <span className="trust-stat__sub" data-rk-3eb70b="">Faster Shipping</span>
                <span className="trust-stat__label" data-rk-3eb70b="">Average Team Velocity</span>
              </div>
            </div>
          </div>
      
          {/* Testimonials Grid / Wall */}
          <div className="testimonial-wall" data-rk-3eb70b="">
            {/* Card 1 */}
            <article className="test-card" data-rk-3eb70b="">
              <div className="test-card__stars" data-rk-3eb70b="">★★★★★</div>
              <p className="test-card__quote" data-rk-3eb70b="">
                "The UI/UX quality is astounding. We built our entire SaaS marketing site in a weekend and our Lighthouse scores went from 78 to a solid 100."
              </p>
              <div className="test-card__author" data-rk-3eb70b="">
                <div className="author-avatar author-avatar--1" data-rk-3eb70b="">SK</div>
                <div className="author-info" data-rk-3eb70b="">
                  <span className="author-name" data-rk-3eb70b="">Sarah Kowalski</span>
                  <span className="author-role" data-rk-3eb70b="">Staff Frontend Engineer at CloudScale</span>
                </div>
              </div>
            </article>
      
            {/* Card 2 (Featured Highlight) */}
            <article className="test-card test-card--featured" data-rk-3eb70b="">
              <span className="featured-badge" data-rk-3eb70b="">Featured Case Study</span>
              <div className="test-card__stars" data-rk-3eb70b="">★★★★★</div>
              <p className="test-card__quote" data-rk-3eb70b="">
                "Zero client runtime JS combined with modern glassmorphic aesthetics is exactly what our agency needed. It cut our design-to-production turnaround by 70%."
              </p>
              <div className="test-card__author" data-rk-3eb70b="">
                <div className="author-avatar author-avatar--2" data-rk-3eb70b="">MA</div>
                <div className="author-info" data-rk-3eb70b="">
                  <span className="author-name" data-rk-3eb70b="">Marc Andersson</span>
                  <span className="author-role" data-rk-3eb70b="">Founder & Design Lead at HyperStudio</span>
                </div>
              </div>
            </article>
      
            {/* Card 3 */}
            <article className="test-card" data-rk-3eb70b="">
              <div className="test-card__stars" data-rk-3eb70b="">★★★★★</div>
              <p className="test-card__quote" data-rk-3eb70b="">
                "Strict TypeScript support made integrating these components into our existing React 5 monorepo completely frictionless."
              </p>
              <div className="test-card__author" data-rk-3eb70b="">
                <div className="author-avatar author-avatar--3" data-rk-3eb70b="">DL</div>
                <div className="author-info" data-rk-3eb70b="">
                  <span className="author-name" data-rk-3eb70b="">David Lin</span>
                  <span className="author-role" data-rk-3eb70b="">CTO at NexusFintech</span>
                </div>
              </div>
            </article>
      
            {/* Card 4 */}
            <article className="test-card" data-rk-3eb70b="">
              <div className="test-card__stars" data-rk-3eb70b="">★★★★★</div>
              <p className="test-card__quote" data-rk-3eb70b="">
                "The accessible form controls and micro-interactions feel like custom handcrafted components. Our users constantly compliment the new dashboard."
              </p>
              <div className="test-card__author" data-rk-3eb70b="">
                <div className="author-avatar author-avatar--4" data-rk-3eb70b="">EV</div>
                <div className="author-info" data-rk-3eb70b="">
                  <span className="author-name" data-rk-3eb70b="">Elena Vega</span>
                  <span className="author-role" data-rk-3eb70b="">Head of Product at DevMetrics</span>
                </div>
              </div>
            </article>
      
            {/* Card 5 */}
            <article className="test-card" data-rk-3eb70b="">
              <div className="test-card__stars" data-rk-3eb70b="">★★★★★</div>
              <p className="test-card__quote" data-rk-3eb70b="">
                "Finally a component library that doesn't force bloated heavy dependencies. Pure React, pure CSS, ultra clean."
              </p>
              <div className="test-card__author" data-rk-3eb70b="">
                <div className="author-avatar author-avatar--5" data-rk-3eb70b="">TH</div>
                <div className="author-info" data-rk-3eb70b="">
                  <span className="author-name" data-rk-3eb70b="">Thomas Huber</span>
                  <span className="author-role" data-rk-3eb70b="">Senior Systems Architect</span>
                </div>
              </div>
            </article>
      
            {/* Card 6 */}
            <article className="test-card" data-rk-3eb70b="">
              <div className="test-card__stars" data-rk-3eb70b="">★★★★★</div>
              <p className="test-card__quote" data-rk-3eb70b="">
                "The interactive 3D Galaxy hero alone saved our team weeks of WebGL experimentation. Outstanding work!"
              </p>
              <div className="test-card__author" data-rk-3eb70b="">
                <div className="author-avatar author-avatar--6" data-rk-3eb70b="">AR</div>
                <div className="author-info" data-rk-3eb70b="">
                  <span className="author-name" data-rk-3eb70b="">Aria Rossi</span>
                  <span className="author-role" data-rk-3eb70b="">Creative Director at OrbitLabs</span>
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

export default TestimonialWallGlass;
