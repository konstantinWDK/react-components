'use client';

import './ButtonsShowcase.css';

// ButtonsShowcase — Premium buttons section with live preview

/** ButtonsShowcase */
export interface ButtonsShowcaseProps {
  title?: string;
  subtitle?: string;
}

export function ButtonsShowcase({ title = "Buttons", subtitle = "Interactive button components with premium styles and animations." }: ButtonsShowcaseProps) {
  return (
    <>
      <div className="cq-buttons-showcase-cq" data-rk-c4a9f3="">
      <section className="buttons-showcase" data-rk-c4a9f3="">
        <div className="container" data-rk-c4a9f3="">
          <div className="showcase-header" data-rk-c4a9f3="">
            <span className="showcase-eyebrow" data-rk-c4a9f3="">⚡ Buttons</span>
            <h2 className="showcase-title" data-rk-c4a9f3="">{title}</h2>
            <p className="showcase-subtitle" data-rk-c4a9f3="">{subtitle}</p>
          </div>
      
          <div className="preview-stage" data-rk-c4a9f3="">
            <div className="preview-stage__inner" data-rk-c4a9f3="">
              <div className="button-grid" data-rk-c4a9f3="">
                <button className="btn btn--primary" data-rk-c4a9f3="">Primary</button>
                <button className="btn btn--glass" data-rk-c4a9f3="">Glass</button>
                <button className="btn btn--glow" data-rk-c4a9f3="">Glow</button>
                <button className="btn btn--shimmer" data-rk-c4a9f3="">Shimmer</button>
                <button className="btn btn--neumorphic" data-rk-c4a9f3="">Neumorphic</button>
                <button className="btn btn--ghost" data-rk-c4a9f3="">Ghost</button>
              </div>
            </div>
          </div>
      
          <div className="usage-code" data-rk-c4a9f3="">
            <code data-rk-c4a9f3="">&lt;GlassButton variant="primary"&gt;Click me&lt;/GlassButton&gt;</code>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default ButtonsShowcase;
