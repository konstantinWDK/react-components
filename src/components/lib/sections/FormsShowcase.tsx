'use client';

import './FormsShowcase.css';

// FormsShowcase — Premium forms section with live preview

/** FormsShowcase */
export interface FormsShowcaseProps {
  title?: string;
  subtitle?: string;
}

export function FormsShowcase({ title = "Forms", subtitle = "Form elements with clean animations and validation states." }: FormsShowcaseProps) {
  return (
    <>
      <div className="cq-forms-showcase-cq" data-rk-100605="">
      <section className="forms-showcase" data-rk-100605="">
        <div className="container" data-rk-100605="">
          <div className="showcase-header" data-rk-100605="">
            <span className="showcase-eyebrow" data-rk-100605="">📝 Forms</span>
            <h2 className="showcase-title" data-rk-100605="">{title}</h2>
            <p className="showcase-subtitle" data-rk-100605="">{subtitle}</p>
          </div>
      
          <div className="preview-stage" data-rk-100605="">
            <div className="preview-stage__inner" data-rk-100605="">
              <div className="form-grid" data-rk-100605="">
                {/* Animated Input */}
                <div className="form-group" data-rk-100605="">
                  <div className="input-wrapper" data-rk-100605="">
                    <input type="text" className="input-animated" placeholder=" " readOnly data-rk-100605="" />
                    <label className="input-label" data-rk-100605="">Email address</label>
                    <span className="input-border" data-rk-100605=""></span>
                  </div>
                </div>
      
                {/* Glass Textarea */}
                <div className="form-group" data-rk-100605="">
                  <div className="textarea-glass" data-rk-100605="">
                    <span className="textarea-label" data-rk-100605="">Message</span>
                    <div className="textarea-mockup" data-rk-100605="">
                      <span className="textarea-line" data-rk-100605=""></span>
                      <span className="textarea-line short" data-rk-100605=""></span>
                      <span className="textarea-line" data-rk-100605=""></span>
                    </div>
                  </div>
                </div>
      
                {/* Custom Checkbox & Toggle */}
                <div className="form-group form-group--controls" data-rk-100605="">
                  <div className="checkbox-mockup" data-rk-100605="">
                    <div className="checkbox-box" data-rk-100605="">
                      <svg className="checkbox-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" data-rk-100605="">
                        <polyline points="20 6 9 17 4 12" data-rk-100605=""></polyline>
                      </svg>
                    </div>
                    <span className="checkbox-label" data-rk-100605="">Accept terms</span>
                  </div>
                  <div className="toggle-mockup" data-rk-100605="">
                    <div className="toggle-track" data-rk-100605="">
                      <div className="toggle-thumb" data-rk-100605=""></div>
                    </div>
                    <span className="toggle-label" data-rk-100605="">Dark mode</span>
                  </div>
                </div>
      
                {/* Select Dropdown */}
                <div className="form-group" data-rk-100605="">
                  <div className="select-mockup" data-rk-100605="">
                    <span className="select-label" data-rk-100605="">Category</span>
                    <div className="select-display" data-rk-100605="">
                      <span className="select-value" data-rk-100605="">Select option...</span>
                      <svg className="select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-100605="">
                        <polyline points="6 9 12 15 18 9" data-rk-100605=""></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <div className="usage-code" data-rk-100605="">
            <code data-rk-100605="">&lt;GlassInput type="email" label="Email" /&gt;</code>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default FormsShowcase;
