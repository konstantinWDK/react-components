'use client';

import './FooterMegaSection.css';

interface Column { title: string; links: Array<{ label: string; href: string }> }

interface Social { label: string; href: string; icon: 'github' | 'x' | 'discord' | 'youtube' }

/**
 * FooterMegaSection — Full site footer: brand blurb, newsletter field, four link
 * columns, social icons, system-status pill and legal row.
 *
 * @param {string} brand - Brand name.
 * @param {string} tagline - Short brand description.
 * @param {Array<{title: string, links: Array<{label: string, href: string}>}>} columns - Link columns.
 * @param {Array<{label: string, href: string, icon: 'github'|'x'|'discord'|'youtube'}>} socials - Social links.
 * @param {string} status - System status text (empty to hide).
 * @param {string} copyright - Copyright line.
 * @param {string} variant - Footer style (default|bordered|minimal).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface FooterMegaSectionProps {
  brand?: string;
  tagline?: string;
  columns?: Column[];
  socials?: Social[];
  status?: string;
  copyright?: string;
  variant?: 'default' | 'bordered' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FooterMegaSection({
  brand = 'Astro Kit',
  tagline = 'Accessible, zero-dependency components for building beautiful Astro sites.',
  columns = [
    { title: 'Product', links: [{ label: 'Components', href: '#' }, { label: 'Sections', href: '#' }, { label: 'Charts', href: '#' }, { label: 'Changelog', href: '#' }] },
    { title: 'Resources', links: [{ label: 'Documentation', href: '#' }, { label: 'Installation', href: '#' }, { label: 'Notes', href: '#' }, { label: 'Showcase', href: '#' }] },
    { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Contact', href: '#' }] },
    { title: 'Legal', links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }, { label: 'License (MIT)', href: '#' }] },
  ],
  socials = [
    { label: 'GitHub', href: '#', icon: 'github' },
    { label: 'X (Twitter)', href: '#', icon: 'x' },
    { label: 'Discord', href: '#', icon: 'discord' },
    { label: 'YouTube', href: '#', icon: 'youtube' },
  ],
  status = 'All systems operational',
  copyright = `© ${new Date().getFullYear()} Astro Kit. All rights reserved.`,
  variant = 'default',
  size = 'md',
  className = '',
}: FooterMegaSectionProps) {
  const icons = {
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.4 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 19.9 1S18.7.6 16 2.5a13.4 13.4 0 0 0-7 0C6.3.6 5.1 1 5.1 1A5 5 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.7c0 5.4 3.3 6.6 6.4 7a3.4 3.4 0 0 0-.9 2.6V22"/>',
    x: '<path d="M4 4l16 16M20 4 4 20"/>',
    discord: '<path d="M8 12h.01M16 12h.01"/><path d="M7.5 7.5c3-1 6-1 9 0M7 16.5c3 1 7 1 10 0"/><path d="M15.5 17l1 3c3-1 5-3 5.5-4.5.5-4-1-8-3-11-1.5-.8-3-1.2-4.5-1.5L14 4.5M8.5 17l-1 3c-3-1-5-3-5.5-4.5-.5-4 1-8 3-11 1.5-.8 3-1.2 4.5-1.5L10 4.5"/>',
    youtube: '<path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
  };
  const id = `fms-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <>
      <div className="cq-footer-mega-section-cq" data-rk-6cdbde="">
      <footer className={`fms fms--${variant} fms--${size} ${className}`} aria-labelledby={id} data-rk-6cdbde="">
        <h2 id={id} className="fms__sr" data-rk-6cdbde="">Site footer</h2>
        <div className="fms__inner" data-rk-6cdbde="">
          <div className="fms__top" data-rk-6cdbde="">
            <div className="fms__brand" data-rk-6cdbde="">
              <a className="fms__logo" href="/" data-rk-6cdbde="">
                <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" data-rk-6cdbde=""><path d="M12 2 3 20h4l5-10 5 10h4z" fill="var(--c-primary-light, #d4a017)" data-rk-6cdbde="" /></svg>
                {brand}
              </a>
              <p className="fms__tagline" data-rk-6cdbde="">{tagline}</p>
              <form className="fms__news" action="#" method="post" data-rk-6cdbde="">
                <label htmlFor={`${id}-email`} className="fms__news-label" data-rk-6cdbde="">Get product updates</label>
                <div className="fms__news-field" data-rk-6cdbde="">
                  <input id={`${id}-email`} type="email" name="email" placeholder="you@company.com" autoComplete="email" required data-rk-6cdbde="" />
                  <button type="submit" aria-label="Subscribe to product updates" data-rk-6cdbde="">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-6cdbde=""><path d="M5 12h14M13 6l6 6-6 6" data-rk-6cdbde="" /></svg>
                  </button>
                </div>
              </form>
            </div>
            <nav className="fms__cols" aria-label="Footer" data-rk-6cdbde="">
              {columns.map((c, __i: number) => (
                <div key={__i} className="fms__col" data-rk-6cdbde="">
                  <h3 className="fms__col-title" data-rk-6cdbde="">{c.title}</h3>
                  <ul data-rk-6cdbde="">
                    {c.links.map((l, __i: number) => <li key={__i} data-rk-6cdbde=""><a href={l.href} data-rk-6cdbde="">{l.label}</a></li>)}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          <div className="fms__bottom" data-rk-6cdbde="">
            <p className="fms__copy" data-rk-6cdbde="">{copyright}</p>
            {status && (
              <a className="fms__status" href="#" data-rk-6cdbde="">
                <span className="fms__dot" aria-hidden="true" data-rk-6cdbde=""></span>{status}
              </a>
            )}
            <ul className="fms__socials" data-rk-6cdbde="">
              {socials.map((s, __i: number) => (
                <li key={__i} data-rk-6cdbde="">
                  <a href={s.href} aria-label={s.label} data-rk-6cdbde="">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: icons[s.icon] }} data-rk-6cdbde=""></svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}

export default FooterMegaSection;
