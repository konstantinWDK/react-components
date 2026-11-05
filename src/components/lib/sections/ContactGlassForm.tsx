'use client';

import './ContactGlassForm.css';
// TODO(port): inline handler onSubmit="event.preventDefault(); alert('Message s"

/**
 * ContactGlassForm — Full-page interactive contact and support section with glassmorphism form and live channel indicators.
 * 
 * @param {string} badge - Eyebrow badge text.
 * @param {string} title - Section main heading.
 * @param {string} subtitle - Description text.
 */
export interface ContactGlassFormProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function ContactGlassForm({
  badge = "Get In Touch",
  title = "Let's Build Something Exceptional Together",
  subtitle = "Have a question, custom component inquiry, or need enterprise support? Our team is here to assist.",
  className = ""
}: ContactGlassFormProps) {
  return (
    <>
      <div className="cq-contact-glass-form-cq" data-rk-6b0fee="">
      <section className={`contact-section ${className}`} aria-labelledby="contact-title" data-rk-6b0fee="">
        <div className="contact-bg" aria-hidden="true" data-rk-6b0fee="">
          <div className="contact-glow" data-rk-6b0fee=""></div>
        </div>
      
        <div className="container" data-rk-6b0fee="">
          <div className="contact-grid" data-rk-6b0fee="">
            {/* Left Column: Info & Channels */}
            <div className="contact-info" data-rk-6b0fee="">
              {badge && <span className="contact-badge" data-rk-6b0fee="">{badge}</span>}
              <h2 id="contact-title" className="contact-title" data-rk-6b0fee="">{title}</h2>
              <p className="contact-subtitle" data-rk-6b0fee="">{subtitle}</p>
      
              {/* Response SLA Badge */}
              <div className="sla-badge" data-rk-6b0fee="">
                <span className="sla-dot" data-rk-6b0fee=""></span>
                <span data-rk-6b0fee="">Average response time: <strong data-rk-6b0fee="">under 2 hours</strong></span>
              </div>
      
              {/* Channels List */}
              <div className="channels-list" data-rk-6b0fee="">
                <div className="channel-card" data-rk-6b0fee="">
                  <div className="channel-icon" data-rk-6b0fee="">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-6b0fee=""><rect width="20" height="16" x="2" y="4" rx="2" data-rk-6b0fee="" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" data-rk-6b0fee="" /></svg>
                  </div>
                  <div className="channel-details" data-rk-6b0fee="">
                    <span className="channel-label" data-rk-6b0fee="">Direct Email</span>
                    <a href="mailto:support@astrocomponents.dev" className="channel-link" data-rk-6b0fee="">support@astrocomponents.dev</a>
                  </div>
                </div>
      
                <div className="channel-card" data-rk-6b0fee="">
                  <div className="channel-icon" data-rk-6b0fee="">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-6b0fee=""><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" data-rk-6b0fee="" /><path d="M9 18c-4.51 2-5-2-7-2" data-rk-6b0fee="" /></svg>
                  </div>
                  <div className="channel-details" data-rk-6b0fee="">
                    <span className="channel-label" data-rk-6b0fee="">Open Source GitHub</span>
                    <a href="https://github.com" target="_blank" rel="noopener" className="channel-link" data-rk-6b0fee="">github.com/astro-components</a>
                  </div>
                </div>
      
                <div className="channel-card" data-rk-6b0fee="">
                  <div className="channel-icon" data-rk-6b0fee="">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-6b0fee=""><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" data-rk-6b0fee="" /></svg>
                  </div>
                  <div className="channel-details" data-rk-6b0fee="">
                    <span className="channel-label" data-rk-6b0fee="">Community Discord</span>
                    <a href="https://discord.com" target="_blank" rel="noopener" className="channel-link" data-rk-6b0fee="">discord.gg/astro-components</a>
                  </div>
                </div>
              </div>
            </div>
      
            {/* Right Column: Interactive Glass Form */}
            <div className="contact-form-wrap" data-rk-6b0fee="">
              <form className="contact-form" data-rk-6b0fee="">
                <h3 className="form-title" data-rk-6b0fee="">Send us a message</h3>
                <p className="form-desc" data-rk-6b0fee="">Fill in the details below and we will get back to you promptly.</p>
      
                <div className="form-row" data-rk-6b0fee="">
                  <div className="form-group" data-rk-6b0fee="">
                    <label htmlFor="c-name" data-rk-6b0fee="">Full Name</label>
                    <input type="text" id="c-name" required placeholder="Alex Morgan" className="form-input" data-rk-6b0fee="" />
                  </div>
                  <div className="form-group" data-rk-6b0fee="">
                    <label htmlFor="c-email" data-rk-6b0fee="">Work Email</label>
                    <input type="email" id="c-email" required placeholder="alex@company.com" className="form-input" data-rk-6b0fee="" />
                  </div>
                </div>
      
                <div className="form-group" data-rk-6b0fee="">
                  <label htmlFor="c-subject" data-rk-6b0fee="">Subject / Inquiry Type</label>
                  <select id="c-subject" className="form-select" data-rk-6b0fee="">
                    <option value="general" data-rk-6b0fee="">General Question</option>
                    <option value="enterprise" data-rk-6b0fee="">Enterprise Custom Components</option>
                    <option value="bug" data-rk-6b0fee="">Bug Report / Issue</option>
                    <option value="partnership" data-rk-6b0fee="">Partnership & Sponsorship</option>
                  </select>
                </div>
      
                <div className="form-group" data-rk-6b0fee="">
                  <label htmlFor="c-message" data-rk-6b0fee="">Your Message</label>
                  <textarea id="c-message" required rows={4} placeholder="Tell us how we can help..." className="form-textarea" data-rk-6b0fee=""></textarea>
                </div>
      
                <button type="submit" className="submit-btn" data-rk-6b0fee="">
                  <span data-rk-6b0fee="">Send Message</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-6b0fee=""><path d="m22 2-7 20-4-9-9-4Z" data-rk-6b0fee="" /><path d="M22 2 11 13" data-rk-6b0fee="" /></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default ContactGlassForm;
