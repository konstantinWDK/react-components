'use client';

import './CtaGlowBanner.css';
// TODO(port): inline handler onSubmit="event.preventDefault(); alert('Thank you"

/**
 * CtaGlowBanner — Full-width high-converting CTA section with radial cyber mesh and interactive action group.
 * 
 * @param {string} badge - Eyebrow badge.
 * @param {string} title - Main headline.
 * @param {string} subtitle - Description text.
 * @param {string} primaryCtaText - Primary button text.
 * @param {string} secondaryCtaText - Secondary button text.
 */
export interface CtaGlowBannerProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  className?: string;
}

export function CtaGlowBanner({
  badge = "Get Started Today",
  title = "Ready to Build Something Extraordinary?",
  subtitle = "Join over 10,000 developers building modern, accessible, and blindingly fast React web applications.",
  primaryCtaText = "Start Building Free",
  secondaryCtaText = "View Components",
  className = ""
}: CtaGlowBannerProps) {
  return (
    <>
      <div className="cq-cta-glow-banner-cq" data-rk-c3786a="">
      <section className={`cta-banner-section ${className}`} aria-labelledby="cta-title" data-rk-c3786a="">
        <div className="container" data-rk-c3786a="">
          <div className="cta-banner-card" data-rk-c3786a="">
            <div className="cta-mesh-bg" aria-hidden="true" data-rk-c3786a=""></div>
      
            <div className="cta-content" data-rk-c3786a="">
              {badge && <span className="cta-badge" data-rk-c3786a="">{badge}</span>}
              <h2 id="cta-title" className="cta-title" data-rk-c3786a="">{title}</h2>
              <p className="cta-subtitle" data-rk-c3786a="">{subtitle}</p>
      
              {/* CTA Action Buttons & Email Input */}
              <div className="cta-actions" data-rk-c3786a="">
                <form className="cta-form" data-rk-c3786a="">
                  <input type="email" placeholder="Enter your work email..." required className="cta-input" aria-label="Email address" data-rk-c3786a="" />
                  <button type="submit" className="cta-btn cta-btn--primary" data-rk-c3786a="">
                    {primaryCtaText}
                  </button>
                </form>
                <a href="/docs/glass-button" className="cta-btn cta-btn--ghost" data-rk-c3786a="">
                  {secondaryCtaText}
                </a>
              </div>
      
              {/* Trust Badges Row */}
              <div className="cta-trust-row" data-rk-c3786a="">
                <div className="trust-item" data-rk-c3786a="">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-c3786a=""><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" data-rk-c3786a="" /></svg>
                  <span data-rk-c3786a="">SOC2 Type II Certified</span>
                </div>
                <div className="trust-item" data-rk-c3786a="">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-c3786a=""><circle cx="12" cy="12" r="10" data-rk-c3786a="" /><path d="m9 12 2 2 4-4" data-rk-c3786a="" /></svg>
                  <span data-rk-c3786a="">WCAG 2.1 AA Compliant</span>
                </div>
                <div className="trust-item" data-rk-c3786a="">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-c3786a=""><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" data-rk-c3786a="" /></svg>
                  <span data-rk-c3786a="">100/100 Lighthouse Performance</span>
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

export default CtaGlowBanner;
