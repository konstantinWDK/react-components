'use client';

import './FeedbackShowcase.css';

// FeedbackShowcase.astro — Premium feedback category showcase with live preview

/** FeedbackShowcase — ported from astro-component-kit. */
export interface FeedbackShowcaseProps {
  title?: string;
  subtitle?: string;
}

export function FeedbackShowcase({ title = "Feedback", subtitle = "Badges, alerts, and notification components." }: FeedbackShowcaseProps) {
  return (
    <>
      <div className="cq-feedback-showcase-cq" data-rk-a1f8ad="">
      <section className="feedback-showcase" data-rk-a1f8ad="">
        <div className="container" data-rk-a1f8ad="">
          <div className="showcase-header" data-rk-a1f8ad="">
            <span className="showcase-eyebrow" data-rk-a1f8ad="">&#128172; Feedback</span>
            <h2 className="showcase-title" data-rk-a1f8ad="">{title}</h2>
            <p className="showcase-subtitle" data-rk-a1f8ad="">{subtitle}</p>
          </div>
      
          <div className="preview-stage" data-rk-a1f8ad="">
            <div className="preview-stage__inner" data-rk-a1f8ad="">
              <div className="feedback-stack" data-rk-a1f8ad="">
      
                {/* Alert Banner: Success */}
                <div className="alert alert--success" data-rk-a1f8ad="">
                  <span className="alert__icon" data-rk-a1f8ad="">&#9989;</span>
                  <span className="alert__message" data-rk-a1f8ad="">Changes saved successfully.</span>
                  <span className="alert__dismiss" data-rk-a1f8ad="">&times;</span>
                </div>
      
                {/* Alert Banner: Warning */}
                <div className="alert alert--warning" data-rk-a1f8ad="">
                  <span className="alert__icon" data-rk-a1f8ad="">&#9888;&#65039;</span>
                  <span className="alert__message" data-rk-a1f8ad="">Your session expires in 5 minutes.</span>
                  <span className="alert__dismiss" data-rk-a1f8ad="">&times;</span>
                </div>
      
                {/* Badge / Pill */}
                <div className="badge-row" data-rk-a1f8ad="">
                  <span className="badge badge--new" data-rk-a1f8ad="">New</span>
                  <span className="badge badge--beta" data-rk-a1f8ad="">Beta</span>
                  <span className="badge badge--count" data-rk-a1f8ad="">3</span>
                </div>
      
                {/* Toast Notification */}
                <div className="toast" data-rk-a1f8ad="">
                  <span className="toast__icon" data-rk-a1f8ad="">&#128276;</span>
                  <div className="toast__content" data-rk-a1f8ad="">
                    <span className="toast__title" data-rk-a1f8ad="">New message</span>
                    <span className="toast__body" data-rk-a1f8ad="">Hey! Can you review the latest PR?</span>
                  </div>
                  <span className="toast__dismiss" data-rk-a1f8ad="">&times;</span>
                </div>
      
                {/* Spinner / Loading Indicator */}
                <div className="spinner-row" data-rk-a1f8ad="">
                  <div className="spinner" data-rk-a1f8ad=""></div>
                  <span className="spinner__label" data-rk-a1f8ad="">Loading...</span>
                </div>
      
              </div>
            </div>
          </div>
      
          <div className="usage-code" data-rk-a1f8ad="">
            <code data-rk-a1f8ad="">&lt;Alert variant="success"&gt;Changes saved successfully.&lt;/Alert&gt;</code>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default FeedbackShowcase;
