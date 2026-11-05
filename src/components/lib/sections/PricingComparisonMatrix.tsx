'use client';

import { useEffect, useRef } from 'react';
import './PricingComparisonMatrix.css';

/**
 * PricingComparisonMatrix — Full-page interactive pricing matrix with billing toggle and feature comparison.
 * 
 * @param {string} badge - Eyebrow badge text.
 * @param {string} title - Section main heading.
 * @param {string} subtitle - Supporting description text.
 */
export interface PricingComparisonMatrixProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function PricingComparisonMatrix({
  badge = "Flexible Plans",
  title = "Transparent Pricing for High-Growth Teams",
  subtitle = "Choose the right plan to scale your digital products. No hidden fees, cancel anytime.",
  className = ""
}: PricingComparisonMatrixProps) {

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const toggleBtn = document.getElementById('billingToggleBtn');
      const priceVals = document.querySelectorAll('.price-val');
    
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          const isAnnual = toggleBtn.getAttribute('aria-checked') === 'true';
          const newState = !isAnnual;
          toggleBtn.setAttribute('aria-checked', String(newState));
    
          priceVals.forEach((el) => {
            const val = newState ? el.getAttribute('data-annual') : el.getAttribute('data-monthly');
            if (val) el.textContent = val;
          });
        });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="cq-pricing-comparison-matrix-cq" data-rk-4ae18a="">
      <section className={`pricing-section ${className}`} aria-labelledby="pricing-title" data-rk-4ae18a="">
        <div className="pricing-bg" aria-hidden="true" data-rk-4ae18a="">
          <div className="pricing-glow" data-rk-4ae18a=""></div>
        </div>
      
        <div className="container" data-rk-4ae18a="">
          {/* Header */}
          <div className="section-header" data-rk-4ae18a="">
            {badge && <span className="section-badge" data-rk-4ae18a="">{badge}</span>}
            <h2 id="pricing-title" className="section-title" data-rk-4ae18a="">{title}</h2>
            <p className="section-subtitle" data-rk-4ae18a="">{subtitle}</p>
      
            {/* Interactive Billing Toggle */}
            <div className="billing-toggle-wrap" data-rk-4ae18a="">
              <span className="toggle-label" id="label-monthly" data-rk-4ae18a="">Monthly</span>
              <button type="button" className="billing-toggle" id="billingToggleBtn" role="switch" aria-checked="false" aria-label="Toggle annual billing" data-rk-4ae18a="">
                <span className="toggle-slider" data-rk-4ae18a=""></span>
              </button>
              <span className="toggle-label" id="label-annual" data-rk-4ae18a="">
                Annual <span className="discount-pill" data-rk-4ae18a="">Save 20%</span>
              </span>
            </div>
          </div>
      
          {/* Pricing Cards Grid */}
          <div className="pricing-cards" data-rk-4ae18a="">
            {/* 1. Starter Tier */}
            <div className="plan-card" data-rk-4ae18a="">
              <div className="plan-card__header" data-rk-4ae18a="">
                <span className="plan-name" data-rk-4ae18a="">Starter</span>
                <p className="plan-desc" data-rk-4ae18a="">For indie developers and personal experiments.</p>
                <div className="plan-price" data-rk-4ae18a="">
                  <span className="price-currency" data-rk-4ae18a="">$</span>
                  <span className="price-val" data-monthly="19" data-annual="15" data-rk-4ae18a="">19</span>
                  <span className="price-period" data-rk-4ae18a="">/mo</span>
                </div>
                <a href="#get-started" className="plan-btn plan-btn--ghost" data-rk-4ae18a="">Get Started</a>
              </div>
              <div className="plan-divider" data-rk-4ae18a=""></div>
              <ul className="plan-features" aria-label="Starter Plan Features" data-rk-4ae18a="">
                <li data-rk-4ae18a=""><span className="check-icon" data-rk-4ae18a="">✓</span> Up to 3 React Projects</li>
                <li data-rk-4ae18a=""><span className="check-icon" data-rk-4ae18a="">✓</span> All 200+ UI Components</li>
                <li data-rk-4ae18a=""><span className="check-icon" data-rk-4ae18a="">✓</span> Community Discord Support</li>
                <li className="feature-disabled" data-rk-4ae18a=""><span className="cross-icon" data-rk-4ae18a="">✕</span> Private Component Registry</li>
                <li className="feature-disabled" data-rk-4ae18a=""><span className="cross-icon" data-rk-4ae18a="">✕</span> Dedicated Priority Support</li>
              </ul>
            </div>
      
            {/* 2. Pro Tier (Featured / Most Popular) */}
            <div className="plan-card plan-card--popular" data-rk-4ae18a="">
              <div className="popular-ribbon" data-rk-4ae18a="">Most Popular</div>
              <div className="plan-card__header" data-rk-4ae18a="">
                <span className="plan-name plan-name--popular" data-rk-4ae18a="">Professional</span>
                <p className="plan-desc" data-rk-4ae18a="">For fast-moving teams and production web applications.</p>
                <div className="plan-price" data-rk-4ae18a="">
                  <span className="price-currency" data-rk-4ae18a="">$</span>
                  <span className="price-val" data-monthly="49" data-annual="39" data-rk-4ae18a="">49</span>
                  <span className="price-period" data-rk-4ae18a="">/mo</span>
                </div>
                <a href="#get-pro" className="plan-btn plan-btn--primary" data-rk-4ae18a="">Start 14-Day Free Trial</a>
              </div>
              <div className="plan-divider" data-rk-4ae18a=""></div>
              <ul className="plan-features" aria-label="Professional Plan Features" data-rk-4ae18a="">
                <li data-rk-4ae18a=""><span className="check-icon" data-rk-4ae18a="">✓</span> Unlimited React Projects</li>
                <li data-rk-4ae18a=""><span className="check-icon" data-rk-4ae18a="">✓</span> All 200+ UI & 3D Components</li>
                <li data-rk-4ae18a=""><span className="check-icon" data-rk-4ae18a="">✓</span> Figma UI Kit & Design Tokens</li>
                <li data-rk-4ae18a=""><span className="check-icon" data-rk-4ae18a="">✓</span> Private NPM Team Access</li>
                <li data-rk-4ae18a=""><span className="check-icon" data-rk-4ae18a="">✓</span> Priority Email & Chat Support</li>
              </ul>
            </div>
      
            {/* 3. Enterprise Tier */}
            <div className="plan-card" data-rk-4ae18a="">
              <div className="plan-card__header" data-rk-4ae18a="">
                <span className="plan-name" data-rk-4ae18a="">Enterprise</span>
                <p className="plan-desc" data-rk-4ae18a="">For organizations requiring custom SLAs and bespoke design systems.</p>
                <div className="plan-price" data-rk-4ae18a="">
                  <span className="price-currency" data-rk-4ae18a="">$</span>
                  <span className="price-val" data-monthly="149" data-annual="119" data-rk-4ae18a="">149</span>
                  <span className="price-period" data-rk-4ae18a="">/mo</span>
                </div>
                <a href="#contact-sales" className="plan-btn plan-btn--ghost" data-rk-4ae18a="">Contact Sales</a>
              </div>
              <div className="plan-divider" data-rk-4ae18a=""></div>
              <ul className="plan-features" aria-label="Enterprise Plan Features" data-rk-4ae18a="">
                <li data-rk-4ae18a=""><span className="check-icon" data-rk-4ae18a="">✓</span> Everything in Pro Plan</li>
                <li data-rk-4ae18a=""><span className="check-icon" data-rk-4ae18a="">✓</span> Custom Component Engineering</li>
                <li data-rk-4ae18a=""><span className="check-icon" data-rk-4ae18a="">✓</span> 99.99% Guaranteed SLA</li>
                <li data-rk-4ae18a=""><span className="check-icon" data-rk-4ae18a="">✓</span> Dedicated Security Audit Support</li>
                <li data-rk-4ae18a=""><span className="check-icon" data-rk-4ae18a="">✓</span> Dedicated Account Manager</li>
              </ul>
            </div>
          </div>
      
          {/* Money-back guarantee footer note */}
          <div className="pricing-footer" data-rk-4ae18a="">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="guarantee-icon" data-rk-4ae18a=""><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" data-rk-4ae18a="" /><path d="m9 12 2 2 4-4" data-rk-4ae18a="" /></svg>
            <span data-rk-4ae18a="">30-Day unconditional money-back guarantee. No questions asked.</span>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default PricingComparisonMatrix;
