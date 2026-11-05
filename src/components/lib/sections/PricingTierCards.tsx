'use client';

import './PricingTierCards.css';

/**
 * PricingTierCards — Full-page 3-tier pricing cards section with animated highlights and feature breakdowns.
 * 
 * @param {string} badge - Eyebrow badge text.
 * @param {string} title - Main headline.
 * @param {string} subtitle - Description text.
 */
export interface PricingTierCardsProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function PricingTierCards({
  badge = "Plans & Pricing",
  title = "Simple, Predictable Pricing for Everyone",
  subtitle = "Start for free and upgrade as your Astro traffic scales. No surprise overage charges.",
  className = ""
}: PricingTierCardsProps) {
  return (
    <>
      <div className="cq-pricing-tier-cards-cq" data-rk-9c5b50="">
      <section className={`tier-pricing-section ${className}`} aria-labelledby="tier-pricing-title" data-rk-9c5b50="">
        <div className="container" data-rk-9c5b50="">
          <div className="section-header" data-rk-9c5b50="">
            {badge && <span className="section-badge" data-rk-9c5b50="">{badge}</span>}
            <h2 id="tier-pricing-title" className="section-title" data-rk-9c5b50="">{title}</h2>
            <p className="section-subtitle" data-rk-9c5b50="">{subtitle}</p>
          </div>
      
          <div className="tier-grid" data-rk-9c5b50="">
            {/* Free Tier */}
            <div className="tier-card" data-rk-9c5b50="">
              <span className="tier-badge" data-rk-9c5b50="">Community</span>
              <h3 className="tier-name" data-rk-9c5b50="">Hobby</h3>
              <p className="tier-desc" data-rk-9c5b50="">Great for learning React and small hobby sites.</p>
              <div className="tier-price" data-rk-9c5b50="">$0 <span data-rk-9c5b50="">/ forever</span></div>
              <a href="#free" className="tier-btn tier-btn--ghost" data-rk-9c5b50="">Get Started Free</a>
              <ul className="tier-list" data-rk-9c5b50="">
                <li data-rk-9c5b50="">✓ 1 Active Project</li>
                <li data-rk-9c5b50="">✓ Core UI Components</li>
                <li data-rk-9c5b50="">✓ Community Support</li>
                <li data-rk-9c5b50="">✓ MIT Open Source License</li>
              </ul>
            </div>
      
            {/* Pro Tier (Highlight) */}
            <div className="tier-card tier-card--highlight" data-rk-9c5b50="">
              <span className="tier-badge tier-badge--gold" data-rk-9c5b50="">RECOMMENDED</span>
              <h3 className="tier-name" data-rk-9c5b50="">Pro Developer</h3>
              <p className="tier-desc" data-rk-9c5b50="">Perfect for freelancers and modern digital creators.</p>
              <div className="tier-price" data-rk-9c5b50="">$29 <span data-rk-9c5b50="">/ month</span></div>
              <a href="#pro" className="tier-btn tier-btn--primary" data-rk-9c5b50="">Get Pro Access</a>
              <ul className="tier-list" data-rk-9c5b50="">
                <li data-rk-9c5b50="">✓ Unlimited Projects</li>
                <li data-rk-9c5b50="">✓ All 200+ UI & 3D Components</li>
                <li data-rk-9c5b50="">✓ Full Source Code & Figma Kit</li>
                <li data-rk-9c5b50="">✓ Lifetime Updates</li>
                <li data-rk-9c5b50="">✓ Direct Email Support</li>
              </ul>
            </div>
      
            {/* Team Tier */}
            <div className="tier-card" data-rk-9c5b50="">
              <span className="tier-badge" data-rk-9c5b50="">Agencies</span>
              <h3 className="tier-name" data-rk-9c5b50="">Agency Team</h3>
              <p className="tier-desc" data-rk-9c5b50="">For studios and multi-developer organizations.</p>
              <div className="tier-price" data-rk-9c5b50="">$99 <span data-rk-9c5b50="">/ month</span></div>
              <a href="#agency" className="tier-btn tier-btn--ghost" data-rk-9c5b50="">Get Team License</a>
              <ul className="tier-list" data-rk-9c5b50="">
                <li data-rk-9c5b50="">✓ Up to 10 Team Seats</li>
                <li data-rk-9c5b50="">✓ Commercial Client Redistribution</li>
                <li data-rk-9c5b50="">✓ Dedicated Slack Support Channel</li>
                <li data-rk-9c5b50="">✓ Custom Component Requests</li>
                <li data-rk-9c5b50="">✓ 1-on-1 Architecture Reviews</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default PricingTierCards;
