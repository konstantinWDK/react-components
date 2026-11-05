'use client';

import './CardsShowcase.css';

// CardsShowcase — Premium cards category showcase section with live preview

/** CardsShowcase */
export interface CardsShowcaseProps {
  title?: string;
  subtitle?: string;
}

export function CardsShowcase({ title = "Cards", subtitle = "Versatile card containers for content display." }: CardsShowcaseProps) {
  return (
    <>
      <div className="cq-cards-showcase-cq" data-rk-a394b5="">
      <section className="cards-showcase" data-rk-a394b5="">
        <div className="container" data-rk-a394b5="">
          <div className="showcase-header" data-rk-a394b5="">
            <span className="showcase-eyebrow" data-rk-a394b5="">🃏 Cards</span>
            <h2 className="showcase-title" data-rk-a394b5="">{title}</h2>
            <p className="showcase-subtitle" data-rk-a394b5="">{subtitle}</p>
          </div>
      
          <div className="preview-stage" data-rk-a394b5="">
            <div className="preview-stage__inner" data-rk-a394b5="">
              <div className="card-grid" data-rk-a394b5="">
                {/* Glass Card */}
                <div className="preview-card preview-card--glass" data-rk-a394b5="">
                  <div className="glass-card" data-rk-a394b5="">
                    <div className="glass-card__icon" data-rk-a394b5="">✨</div>
                    <h3 className="glass-card__title" data-rk-a394b5="">Glass Card</h3>
                    <p className="glass-card__desc" data-rk-a394b5="">Frosted glass effect with subtle borders and backdrop blur for a modern aesthetic.</p>
                  </div>
                </div>
      
                {/* Profile Card */}
                <div className="preview-card preview-card--profile" data-rk-a394b5="">
                  <div className="profile-card" data-rk-a394b5="">
                    <div className="profile-card__avatar" data-rk-a394b5="">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="profile-card__avatar-icon" data-rk-a394b5="">
                        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0" strokeLinecap="round" strokeLinejoin="round" data-rk-a394b5="" />
                      </svg>
                    </div>
                    <h4 className="profile-card__name" data-rk-a394b5="">Jane Doe</h4>
                    <p className="profile-card__role" data-rk-a394b5="">Senior Developer</p>
                    <p className="profile-card__bio" data-rk-a394b5="">Building beautiful interfaces with modern design systems and component libraries.</p>
                    <div className="profile-card__stats" data-rk-a394b5="">
                      <span className="profile-card__stat" data-rk-a394b5=""><strong data-rk-a394b5="">142</strong> Projects</span>
                      <span className="profile-card__stat" data-rk-a394b5=""><strong data-rk-a394b5="">2.4k</strong> Followers</span>
                    </div>
                  </div>
                </div>
      
                {/* Pricing Card */}
                <div className="preview-card preview-card--pricing" data-rk-a394b5="">
                  <div className="pricing-card" data-rk-a394b5="">
                    <span className="pricing-card__badge" data-rk-a394b5="">Popular</span>
                    <h4 className="pricing-card__plan" data-rk-a394b5="">Pro Plan</h4>
                    <div className="pricing-card__price" data-rk-a394b5="">
                      <span className="pricing-card__currency" data-rk-a394b5="">$</span>
                      <span className="pricing-card__amount" data-rk-a394b5="">29</span>
                      <span className="pricing-card__period" data-rk-a394b5="">/mo</span>
                    </div>
                    <ul className="pricing-card__features" data-rk-a394b5="">
                      <li data-rk-a394b5="">Unlimited projects</li>
                      <li data-rk-a394b5="">Priority support</li>
                      <li data-rk-a394b5="">Advanced analytics</li>
                      <li data-rk-a394b5="">Custom branding</li>
                    </ul>
                    <button className="pricing-card__cta" data-rk-a394b5="">Get Started</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <div className="usage-code" data-rk-a394b5="">
            <code data-rk-a394b5="">&lt;GlassCard variant="glass"&gt;Content here&lt;/GlassCard&gt;</code>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default CardsShowcase;
