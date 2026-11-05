'use client';

import './TypographyShowcase.css';

// TypographyShowcase.astro — Premium typography section with live preview

/** TypographyShowcase — ported from astro-component-kit. */
export interface TypographyShowcaseProps {
  title?: string;
  subtitle?: string;
}

export function TypographyShowcase({ title = "Typography", subtitle = "Headings and text patterns." }: TypographyShowcaseProps) {
  return (
    <>
      <div className="cq-typography-showcase-cq" data-rk-f450d8="">
      <section className="typography-showcase" data-rk-f450d8="">
        <div className="container" data-rk-f450d8="">
          <div className="showcase-header" data-rk-f450d8="">
            <span className="showcase-eyebrow" data-rk-f450d8="">✍️ Typography</span>
            <h2 className="showcase-title" data-rk-f450d8="">{title}</h2>
            <p className="showcase-subtitle" data-rk-f450d8="">{subtitle}</p>
          </div>
      
          <div className="preview-stage" data-rk-f450d8="">
            <div className="preview-stage__inner" data-rk-f450d8="">
              <div className="typo-stack" data-rk-f450d8="">
                {/* Gradient Heading Mockup */}
                <div className="typo-mockup typo-mockup--gradient" data-rk-f450d8="">
                  <h3 className="gradient-heading" data-rk-f450d8="">Premium Design System</h3>
                </div>
      
                {/* Blockquote Mockup */}
                <div className="typo-mockup typo-mockup--blockquote" data-rk-f450d8="">
                  <blockquote className="blockquote" data-rk-f450d8="">
                    <p data-rk-f450d8="">Great design is invisible. It simply feels right.</p>
                    <cite data-rk-f450d8="">— Design Philosophy</cite>
                  </blockquote>
                </div>
      
                {/* Animated Text Reveal Mockup */}
                <div className="typo-mockup typo-mockup--reveal" data-rk-f450d8="">
                  <span className="text-reveal" data-rk-f450d8="">Shimmer Reveal Effect</span>
                </div>
      
                {/* Link Styles Mockup */}
                <div className="typo-mockup typo-mockup--links" data-rk-f450d8="">
                  <div className="link-group" data-rk-f450d8="">
                    <a href="#" className="styled-link" data-rk-f450d8="">Hover Underline</a>
                    <a href="#" className="styled-link" data-rk-f450d8="">Animated Link</a>
                    <a href="#" className="styled-link" data-rk-f450d8="">Gold Accent</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <div className="usage-code" data-rk-f450d8="">
            <code data-rk-f450d8="">&lt;Typography variant="heading" size="xl"&gt;Premium Design&lt;/Typography&gt;</code>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default TypographyShowcase;
