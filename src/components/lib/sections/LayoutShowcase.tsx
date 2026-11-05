'use client';

import './LayoutShowcase.css';

// LayoutShowcase.astro — Premium layout section with live preview

/** LayoutShowcase — ported from astro-component-kit. */
export interface LayoutShowcaseProps {
  title?: string;
  subtitle?: string;
}

export function LayoutShowcase({ title = "Layout", subtitle = "Grids, containers, and structural sections." }: LayoutShowcaseProps) {
  return (
    <>
      <div className="cq-layout-showcase-cq" data-rk-3043b4="">
      <section className="layout-showcase" data-rk-3043b4="">
        <div className="container" data-rk-3043b4="">
          <div className="showcase-header" data-rk-3043b4="">
            <span className="showcase-eyebrow" data-rk-3043b4="">🏗️ Layout</span>
            <h2 className="showcase-title" data-rk-3043b4="">{title}</h2>
            <p className="showcase-subtitle" data-rk-3043b4="">{subtitle}</p>
          </div>
      
          <div className="preview-stage" data-rk-3043b4="">
            <div className="preview-stage__inner" data-rk-3043b4="">
              <div className="layout-mockups" data-rk-3043b4="">
                {/* Bento Grid */}
                <div className="mockup-label" data-rk-3043b4="">Bento Grid</div>
                <div className="bento-grid" data-rk-3043b4="">
                  <div className="bento-item bento-item--wide" data-rk-3043b4="">
                    <span className="bento-item__label" data-rk-3043b4="">Hero</span>
                  </div>
                  <div className="bento-item" data-rk-3043b4="">
                    <span className="bento-item__label" data-rk-3043b4="">Card</span>
                  </div>
                  <div className="bento-item" data-rk-3043b4="">
                    <span className="bento-item__label" data-rk-3043b4="">Card</span>
                  </div>
                  <div className="bento-item" data-rk-3043b4="">
                    <span className="bento-item__label" data-rk-3043b4="">Card</span>
                  </div>
                  <div className="bento-item bento-item--tall" data-rk-3043b4="">
                    <span className="bento-item__label" data-rk-3043b4="">Sidebar</span>
                  </div>
                </div>
      
                {/* Split Screen */}
                <div className="mockup-label" data-rk-3043b4="">Split Screen</div>
                <div className="split-screen" data-rk-3043b4="">
                  <div className="split-screen__left" data-rk-3043b4="">
                    <span className="split-screen__label" data-rk-3043b4="">Content</span>
                  </div>
                  <div className="split-screen__right" data-rk-3043b4="">
                    <span className="split-screen__label" data-rk-3043b4="">Media</span>
                  </div>
                </div>
      
                {/* Footer */}
                <div className="mockup-label" data-rk-3043b4="">Footer</div>
                <div className="footer-mockup" data-rk-3043b4="">
                  <div className="footer-mockup__top" data-rk-3043b4="">
                    <div className="footer-mockup__brand" data-rk-3043b4="">
                      <span className="footer-mockup__label" data-rk-3043b4="">Brand</span>
                    </div>
                    <div className="footer-mockup__links" data-rk-3043b4="">
                      <div className="footer-mockup__col" data-rk-3043b4="">
                        <span className="footer-mockup__label" data-rk-3043b4="">Links</span>
                      </div>
                      <div className="footer-mockup__col" data-rk-3043b4="">
                        <span className="footer-mockup__label" data-rk-3043b4="">Links</span>
                      </div>
                      <div className="footer-mockup__col" data-rk-3043b4="">
                        <span className="footer-mockup__label" data-rk-3043b4="">Links</span>
                      </div>
                    </div>
                  </div>
                  <div className="footer-mockup__bottom" data-rk-3043b4="">
                    <span className="footer-mockup__label" data-rk-3043b4="">Copyright</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <div className="usage-code" data-rk-3043b4="">
            <code dangerouslySetInnerHTML={{ __html: `&lt;LayoutSection variant="bento"&gt;{content}&lt;/LayoutSection&gt;` }} data-rk-3043b4=""></code>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default LayoutShowcase;
