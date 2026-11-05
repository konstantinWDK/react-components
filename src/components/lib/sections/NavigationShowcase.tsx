'use client';

import './NavigationShowcase.css';

// NavigationShowcase.astro — Premium navigation section with live preview

/** NavigationShowcase — ported from astro-component-kit. */
export interface NavigationShowcaseProps {
  title?: string;
  subtitle?: string;
}

export function NavigationShowcase({ title = "Navigation", subtitle = "Navbars, tabs, breadcrumbs and navigation patterns." }: NavigationShowcaseProps) {
  return (
    <>
      <div className="cq-navigation-showcase-cq" data-rk-80eaa7="">
      <section className="navigation-showcase" data-rk-80eaa7="">
        <div className="container" data-rk-80eaa7="">
          <div className="showcase-header" data-rk-80eaa7="">
            <span className="showcase-eyebrow" data-rk-80eaa7="">🧭 Navigation</span>
            <h2 className="showcase-title" data-rk-80eaa7="">{title}</h2>
            <p className="showcase-subtitle" data-rk-80eaa7="">{subtitle}</p>
          </div>
      
          <div className="preview-stage" data-rk-80eaa7="">
            <div className="preview-stage__inner" data-rk-80eaa7="">
              <div className="nav-mockups" data-rk-80eaa7="">
      
                {/* Navbar Mockup */}
                <div className="navbar-mock" data-rk-80eaa7="">
                  <div className="navbar-mock__logo" data-rk-80eaa7="">
                    <div className="navbar-mock__logo-icon" data-rk-80eaa7=""></div>
                    <span data-rk-80eaa7="">Brand</span>
                  </div>
                  <nav className="navbar-mock__links" data-rk-80eaa7="">
                    <a className="navbar-mock__link" href="#" data-rk-80eaa7="">Home</a>
                    <a className="navbar-mock__link" href="#" data-rk-80eaa7="">Features</a>
                    <a className="navbar-mock__link" href="#" data-rk-80eaa7="">Pricing</a>
                    <a className="navbar-mock__link" href="#" data-rk-80eaa7="">About</a>
                  </nav>
                  <button className="navbar-mock__cta" data-rk-80eaa7="">Get Started</button>
                </div>
      
                {/* Tabs Mockup */}
                <div className="tabs-mock" data-rk-80eaa7="">
                  <button className="tabs-mock__tab tabs-mock__tab--active" data-rk-80eaa7="">Overview</button>
                  <button className="tabs-mock__tab" data-rk-80eaa7="">Details</button>
                  <button className="tabs-mock__tab" data-rk-80eaa7="">Reviews</button>
                  <button className="tabs-mock__tab" data-rk-80eaa7="">Settings</button>
                  <div className="tabs-mock__indicator" data-rk-80eaa7=""></div>
                </div>
      
                {/* Breadcrumbs Mockup */}
                <div className="breadcrumbs-mock" data-rk-80eaa7="">
                  <a className="breadcrumbs-mock__item" href="#" data-rk-80eaa7="">Home</a>
                  <span className="breadcrumbs-mock__separator" data-rk-80eaa7="">/</span>
                  <a className="breadcrumbs-mock__item" href="#" data-rk-80eaa7="">Components</a>
                  <span className="breadcrumbs-mock__separator" data-rk-80eaa7="">/</span>
                  <span className="breadcrumbs-mock__item breadcrumbs-mock__item--active" data-rk-80eaa7="">Navigation</span>
                </div>
      
              </div>
            </div>
          </div>
      
          <div className="usage-code" data-rk-80eaa7="">
            <code data-rk-80eaa7="">&lt;Navigation type="navbar | tabs | breadcrumbs"&gt;...&lt;/Navigation&gt;</code>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default NavigationShowcase;
