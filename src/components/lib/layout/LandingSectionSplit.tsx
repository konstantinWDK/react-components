'use client';

import type { ReactNode } from 'react';
import './LandingSectionSplit.css';

/**
 * LandingSectionSplit — Landing page section with text on one side and a media container on the other.
 */
export interface LandingSectionSplitProps {
  title?: string;
  subtitle?: string;
  className?: string;
  actions?: ReactNode;
  media?: ReactNode;
}

export function LandingSectionSplit({ 
  title = 'Build Faster with Astro', 
  subtitle = 'Scale with pre-built accessible components and modular designs.', 
  className = '',
  actions,
  media
}: LandingSectionSplitProps) {
  return (
    <>
      <div className="cq-landing-section-split-cq" data-rk-4cb82a="">
      <section className={`split-sec ${className}`} data-rk-4cb82a="">
        <div className="split-sec-text" data-rk-4cb82a="">
          <h2 data-rk-4cb82a="">{title}</h2>
          <p data-rk-4cb82a="">{subtitle}</p>
          <div className="split-sec-actions" data-rk-4cb82a="">
            {actions ?? (<>
              <button className="split-demo-btn" data-rk-4cb82a="">Explore Docs</button>
            </>)}
          </div>
        </div>
        <div className="split-sec-media" data-rk-4cb82a="">
          {media ?? (<>
            <div className="media-mockup" data-rk-4cb82a="">
              <span data-rk-4cb82a="">⚡ Interactive Preview</span>
            </div>
          </>)}
        </div>
      </section>
      </div>
    </>
  );
}

export default LandingSectionSplit;
