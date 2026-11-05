'use client';

import type { ReactNode } from 'react';
import './HeroShowcaseSplit.css';

/**
 * HeroShowcaseSplit — Two-column modern landing hero section with install command, action CTAs, and interactive preview widget.
 * 
 * @param {string} badge - Header lead badge. Default is 'NEW: REACT 19 SUITE'.
 * @param {string} title - Primary headline string.
 * @param {string} subtitle - Subtitle paragraph text.
 * @param {string} primaryCtaText - Primary CTA button text.
 * @param {string} primaryCtaHref - Primary CTA link.
 * @param {string} secondaryCtaText - Secondary button text.
 * @param {string} secondaryCtaHref - Secondary link.
 */
export interface HeroShowcaseSplitProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  children?: ReactNode;
}

export function HeroShowcaseSplit({
  badge = 'NEW: REACT 19 PRODUCTION SUITE',
  title = 'Craft stunning web apps at lightspeed',
  subtitle = 'A cohesive collection of 150+ dark-mode first, accessible React components. Zero dependencies, pure vanilla CSS, full TypeScript support.',
  primaryCtaText = 'Explore Components',
  primaryCtaHref = '/docs/glass-button',
  secondaryCtaText = 'View on GitHub',
  secondaryCtaHref = 'https://github.com/konstantinWDK/react-components',
  children
}: HeroShowcaseSplitProps) {
  return (
    <>
      <div className="cq-hero-showcase-split-cq" data-rk-723e29="">
      <section className="split-hero" data-rk-723e29="">
        <div className="split-hero__inner" data-rk-723e29="">
          <div className="split-hero__content" data-rk-723e29="">
            <div className="split-hero__badge" data-rk-723e29="">
              <span className="dot" data-rk-723e29=""></span>
              <span data-rk-723e29="">{badge}</span>
            </div>
      
            <h1 className="split-hero__title" data-rk-723e29="">{title}</h1>
            <p className="split-hero__subtitle" data-rk-723e29="">{subtitle}</p>
      
            <div className="split-hero__actions" data-rk-723e29="">
              <a href={primaryCtaHref} className="btn btn--primary" data-rk-723e29="">
                {primaryCtaText}
                <span aria-hidden="true" data-rk-723e29="">→</span>
              </a>
              <a href={secondaryCtaHref} target="_blank" rel="noopener" className="btn btn--secondary" data-rk-723e29="">
                {secondaryCtaText}
              </a>
            </div>
      
            <div className="split-hero__install" data-rk-723e29="">
              <span className="prompt" data-rk-723e29="">$</span>
              <code data-rk-723e29="">npm install react-component-kit-ui</code>
            </div>
          </div>
      
          <div className="split-hero__visual" data-rk-723e29="">
            <div className="glass-device" data-rk-723e29="">
              <div className="glass-device__bar" data-rk-723e29="">
                <span className="d-dot d-dot--red" data-rk-723e29=""></span>
                <span className="d-dot d-dot--yellow" data-rk-723e29=""></span>
                <span className="d-dot d-dot--green" data-rk-723e29=""></span>
                <span className="glass-device__url" data-rk-723e29="">reactcomponents.dev/preview</span>
              </div>
              <div className="glass-device__body" data-rk-723e29="">
                {children ?? (<>
                  <div className="mock-widget" data-rk-723e29="">
                    <span className="mock-icon" data-rk-723e29="">⚡</span>
                    <h4 data-rk-723e29="">Production SSR Ready</h4>
                    <p data-rk-723e29="">Zero JavaScript hydration overhead by default.</p>
                    <div className="mock-metrics" data-rk-723e29="">
                      <div data-rk-723e29=""><span data-rk-723e29="">Score</span><strong data-rk-723e29="">100</strong></div>
                      <div data-rk-723e29=""><span data-rk-723e29="">A11y</span><strong data-rk-723e29="">AA</strong></div>
                      <div data-rk-723e29=""><span data-rk-723e29="">Speed</span><strong data-rk-723e29="">0.2s</strong></div>
                    </div>
                  </div>
                </>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default HeroShowcaseSplit;
