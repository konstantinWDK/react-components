'use client';

import { useEffect, useRef } from 'react';
import './CookiePreferencesDrawer.css';

/**
 * CookiePreferencesDrawer — GDPR/CCPA consent drawer with frosted glass styling and category toggles.
 * 
 * @param {string} title - Header text. Default is 'Privacy Preferences'.
 * @param {string} description - Explanation text for user privacy consent.
 */
export interface CookiePreferencesDrawerProps {
  title?: string;
  description?: string;
}

export function CookiePreferencesDrawer({
  title = 'Privacy & Cookie Settings',
  description = 'We use cookies and telemetry to improve performance, analyze usage, and customize your experience.',
}: CookiePreferencesDrawerProps) {
  const categories = [
    { id: 'necessary', name: 'Strictly Necessary', desc: 'Required for core authentication and security.', locked: true },
    { id: 'analytics', name: 'Performance & Analytics', desc: 'Anonymous traffic data to improve component reliability.', locked: false },
    { id: 'marketing', name: 'Targeted Experience', desc: 'Personalized recommendations based on library interactions.', locked: false },
  ];

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    function setupCookieDrawers() {
        document.querySelectorAll('[data-cookie-drawer]').forEach((drawer) => {
          const dismiss = () => {
            (drawer as HTMLElement).style.transform = 'translateY(120%)';
            (drawer as HTMLElement).style.opacity = '0';
            setTimeout(() => drawer.remove(), 350);
          };
    
          drawer.querySelector('[data-cookie-reject]')?.addEventListener('click', dismiss);
          drawer.querySelector('[data-cookie-accept]')?.addEventListener('click', dismiss);
        });
      }
    
      setupCookieDrawers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <aside className="cookie-drawer" role="dialog" aria-modal="true" aria-label={title} data-cookie-drawer data-rk-5e1b22="">
        <div className="cookie-drawer__header" data-rk-5e1b22="">
          <div className="cookie-drawer__icon" data-rk-5e1b22="">🍪</div>
          <div className="cookie-drawer__titles" data-rk-5e1b22="">
            <h4 className="cookie-drawer__title" data-rk-5e1b22="">{title}</h4>
            <p className="cookie-drawer__desc" data-rk-5e1b22="">{description}</p>
          </div>
        </div>
      
        <div className="cookie-drawer__categories" data-rk-5e1b22="">
          {categories.map((cat, __i: number) => (
            <div key={__i} className="cookie-cat" data-rk-5e1b22="">
              <div className="cookie-cat__info" data-rk-5e1b22="">
                <span className="cookie-cat__name" data-rk-5e1b22="">{cat.name}</span>
                <span className="cookie-cat__desc" data-rk-5e1b22="">{cat.desc}</span>
              </div>
              <label className="switch" data-rk-5e1b22="">
                <input type="checkbox" defaultChecked={cat.locked} disabled={cat.locked} name={cat.id} data-rk-5e1b22="" />
                <span className="slider" data-rk-5e1b22=""></span>
              </label>
            </div>
          ))}
        </div>
      
        <div className="cookie-drawer__actions" data-rk-5e1b22="">
          <button type="button" className="btn btn--secondary" data-cookie-reject data-rk-5e1b22="">Reject All</button>
          <button type="button" className="btn btn--primary" data-cookie-accept data-rk-5e1b22="">Accept Selected</button>
        </div>
      </aside>
    </>
  );
}

export default CookiePreferencesDrawer;
