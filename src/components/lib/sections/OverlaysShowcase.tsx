'use client';

import './OverlaysShowcase.css';

// OverlaysShowcase.astro — Premium overlays section with live preview

/** OverlaysShowcase — ported from astro-component-kit. */
export interface OverlaysShowcaseProps {
  title?: string;
  subtitle?: string;
}

export function OverlaysShowcase({ title = "Overlays", subtitle = "Modals, drawers, and popovers." }: OverlaysShowcaseProps) {
  return (
    <>
      <div className="cq-overlays-showcase-cq" data-rk-bbd78d="">
      <section className="overlays-showcase" data-rk-bbd78d="">
        <div className="container" data-rk-bbd78d="">
          <div className="showcase-header" data-rk-bbd78d="">
            <span className="showcase-eyebrow" data-rk-bbd78d="">🪟 Overlays</span>
            <h2 className="showcase-title" data-rk-bbd78d="">{title}</h2>
            <p className="showcase-subtitle" data-rk-bbd78d="">{subtitle}</p>
          </div>
      
          <div className="preview-stage" data-rk-bbd78d="">
            <div className="preview-stage__inner" data-rk-bbd78d="">
              <div className="overlay-demo" data-rk-bbd78d="">
                {/* Modal Dialog */}
                <div className="overlay-modal" data-rk-bbd78d="">
                  <div className="overlay-backdrop" data-rk-bbd78d=""></div>
                  <div className="overlay-card" data-rk-bbd78d="">
                    <div className="overlay-card__header" data-rk-bbd78d="">
                      <span className="overlay-card__title" data-rk-bbd78d="">Confirm Action</span>
                      <button className="overlay-close" aria-label="Close" data-rk-bbd78d="">&times;</button>
                    </div>
                    <p className="overlay-card__body" data-rk-bbd78d="">Are you sure you want to proceed? This action cannot be undone.</p>
                    <div className="overlay-card__actions" data-rk-bbd78d="">
                      <button className="btn btn--ghost" data-rk-bbd78d="">Cancel</button>
                      <button className="btn btn--primary" data-rk-bbd78d="">Confirm</button>
                    </div>
                  </div>
                </div>
      
                {/* Side Drawer */}
                <div className="overlay-drawer" data-rk-bbd78d="">
                  <div className="drawer-backdrop" data-rk-bbd78d=""></div>
                  <div className="drawer-panel" data-rk-bbd78d="">
                    <div className="drawer-header" data-rk-bbd78d="">
                      <span className="drawer-title" data-rk-bbd78d="">Settings</span>
                      <button className="overlay-close" aria-label="Close" data-rk-bbd78d="">&times;</button>
                    </div>
                    <div className="drawer-body" data-rk-bbd78d="">
                      <div className="drawer-item" data-rk-bbd78d="">
                        <span className="drawer-label" data-rk-bbd78d="">Theme</span>
                        <span className="drawer-value" data-rk-bbd78d="">Dark</span>
                      </div>
                      <div className="drawer-item" data-rk-bbd78d="">
                        <span className="drawer-label" data-rk-bbd78d="">Notifications</span>
                        <span className="drawer-value" data-rk-bbd78d="">Enabled</span>
                      </div>
                      <div className="drawer-item" data-rk-bbd78d="">
                        <span className="drawer-label" data-rk-bbd78d="">Language</span>
                        <span className="drawer-value" data-rk-bbd78d="">English</span>
                      </div>
                    </div>
                  </div>
                </div>
      
                {/* Popover */}
                <div className="overlay-popover" data-rk-bbd78d="">
                  <div className="popover-target" data-rk-bbd78d="">Hover me</div>
                  <div className="popover-content" data-rk-bbd78d="">
                    <span className="popover-arrow" data-rk-bbd78d=""></span>
                    <p className="popover-text" data-rk-bbd78d="">This is a popover with additional context.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <div className="usage-code" data-rk-bbd78d="">
            <code data-rk-bbd78d="">&lt;Overlay type="modal"&gt;Content&lt;/Overlay&gt;</code>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default OverlaysShowcase;
