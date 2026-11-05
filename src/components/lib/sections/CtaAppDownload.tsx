'use client';

import './CtaAppDownload.css';

/**
 * CtaAppDownload — Full-page mobile app showcase and download CTA section with device mockup and store buttons.
 * 
 * @param {string} badge - Eyebrow badge text.
 * @param {string} title - Main headline.
 * @param {string} subtitle - Description text.
 */
export interface CtaAppDownloadProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function CtaAppDownload({
  badge = "Mobile Experience",
  title = "Manage Your React Deployments On the Go",
  subtitle = "Download our native companion mobile application. Monitor real-time builds, latency metrics, and team notifications directly from your pocket.",
  className = ""
}: CtaAppDownloadProps) {
  return (
    <>
      <div className="cq-cta-app-download-cq" data-rk-68c50b="">
      <section className={`app-download-section ${className}`} aria-labelledby="app-title" data-rk-68c50b="">
        <div className="container" data-rk-68c50b="">
          <div className="app-card" data-rk-68c50b="">
            <div className="app-info" data-rk-68c50b="">
              {badge && <span className="app-badge" data-rk-68c50b="">{badge}</span>}
              <h2 id="app-title" className="app-title" data-rk-68c50b="">{title}</h2>
              <p className="app-subtitle" data-rk-68c50b="">{subtitle}</p>
      
              <div className="app-features-mini" data-rk-68c50b="">
                <div className="feat-pill" data-rk-68c50b="">⚡ Instant Push Alerts</div>
                <div className="feat-pill" data-rk-68c50b="">📊 Real-Time Analytics</div>
                <div className="feat-pill" data-rk-68c50b="">🔒 Biometric Security</div>
              </div>
      
              <div className="store-buttons" data-rk-68c50b="">
                <a href="#app-store" className="store-btn" data-rk-68c50b="">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" data-rk-68c50b=""><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-.96.04-2.13.64-2.82 1.44-.6.7-.99 1.83-1.02 2.98.08.01.16.02.24.02.88 0 1.95-.58 2.61-1.4z" data-rk-68c50b="" /></svg>
                  <div className="store-btn__text" data-rk-68c50b="">
                    <span className="store-btn__sub" data-rk-68c50b="">Download on the</span>
                    <span className="store-btn__name" data-rk-68c50b="">App Store</span>
                  </div>
                </a>
      
                <a href="#google-play" className="store-btn" data-rk-68c50b="">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" data-rk-68c50b=""><path d="M3.609 1.814L13.792 12 3.61 22.186a2.227 2.227 0 0 1-.22-.968V2.782c0-.361.08-.696.22-.968zm11.24 11.24l2.128 2.129-12.03 6.946 9.902-9.075zm2.933-2.05l2.673 1.543c.876.505.876 1.332 0 1.837l-2.673 1.544-2.338-2.338 2.338-2.586zM4.947 1.87l12.031 6.947-2.128 2.128-9.903-9.075z" data-rk-68c50b="" /></svg>
                  <div className="store-btn__text" data-rk-68c50b="">
                    <span className="store-btn__sub" data-rk-68c50b="">GET IT ON</span>
                    <span className="store-btn__name" data-rk-68c50b="">Google Play</span>
                  </div>
                </a>
              </div>
            </div>
      
            <div className="app-visual" data-rk-68c50b="">
              <div className="phone-frame" data-rk-68c50b="">
                <div className="phone-notch" data-rk-68c50b=""></div>
                <div className="phone-screen" data-rk-68c50b="">
                  <div className="phone-header" data-rk-68c50b="">
                    <div className="phone-avatar" data-rk-68c50b=""></div>
                    <span data-rk-68c50b="">Production Edge</span>
                    <span className="phone-live" data-rk-68c50b="">100% UP</span>
                  </div>
                  <div className="phone-chart" data-rk-68c50b=""></div>
                  <div className="phone-card-mini" data-rk-68c50b="">✓ Build #402 deployed in 12s</div>
                  <div className="phone-card-mini" data-rk-68c50b="">⚡ TTFB latency: 14ms</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default CtaAppDownload;
