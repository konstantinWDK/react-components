'use client';

import './AgencyFooterCta.css';

/** class:list → className */
function cx(...args: unknown[]): string {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (!v) return;
    if (typeof v === 'string' || typeof v === 'number') out.push(String(v));
    else if (Array.isArray(v)) v.forEach(walk);
    else if (typeof v === 'object') for (const [k, on] of Object.entries(v as Record<string, unknown>)) if (on) out.push(k);
  };
  args.forEach(walk);
  return out.join(' ');
}

/**
 * AgencyFooterCta — Agency footer led by a giant "Let's talk" link, then link columns, offices,
 * socials and the legal line.
 *
 * @param {string} kicker - Line above the CTA. Default 'Have a project in mind?'.
 * @param {{label: string, href: string}} cta - Giant CTA link. Default "Let's talk".
 * @param {string} email - Email shown under the CTA (optional).
 * @param {Array<{title: string, links: {label: string, href: string}[]}>} columns - Link columns.
 * @param {Array<{city: string, address: string}>} offices - Office addresses.
 * @param {Array<{label: string, href: string}>} socials - Social links.
 * @param {string} brand - Brand for the legal line. Default 'Volta'.
 * @param {string} variant - Style (accent|plain). Default 'accent'.
 * @param {string} className - Extra class.
 *
 * Accessibility: footer landmark with a visually hidden heading; the CTA is a single large link;
 * columns are nav lists.
 */
export interface AgencyFooterCtaProps {
  kicker?: string;
  cta?: { label: string; href: string };
  email?: string;
  columns?: Array<{ title: string; links: Array<{ label: string; href: string }> }>;
  offices?: Array<{ city: string; address: string }>;
  socials?: Array<{ label: string; href: string }>;
  brand?: string;
  variant?: 'accent' | 'plain';
  className?: string;
}

export function AgencyFooterCta({
  kicker = 'Have a project in mind?',
  cta = { label: "Let's talk", href: '#contact' },
  email = 'hello@volta.studio',
  columns = [
    { title: 'Studio', links: [{ label: 'Work', href: '#' }, { label: 'Services', href: '#' }, { label: 'About', href: '#' }, { label: 'Careers', href: '#' }] },
    { title: 'Services', links: [{ label: 'Brand identity', href: '#' }, { label: 'Websites', href: '#' }, { label: 'Growth', href: '#' }] },
  ],
  offices = [{ city: 'Madrid', address: 'Calle de Fuencarral 45' }, { city: 'Lisbon', address: 'Rua das Flores 12' }],
  socials = [{ label: 'Instagram', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Dribbble', href: '#' }, { label: 'Behance', href: '#' }],
  brand = 'Volta',
  variant = 'accent',
  className = '',
}: AgencyFooterCtaProps) {
  return (
    <>
      <div className="cq-agency-footer" data-rk-43a7ea="">
      <footer className={cx(['afc', `afc--${variant}`, className])} aria-labelledby="afc-title" data-rk-43a7ea="">
        <h2 id="afc-title" className="sr-only" data-rk-43a7ea="">Footer</h2>
        <div className="afc__inner" data-rk-43a7ea="">
          <p className="afc__kicker" data-rk-43a7ea="">{kicker}</p>
          <a className="afc__cta" href={cta.href} data-rk-43a7ea="">{cta.label}<span aria-hidden="true" data-rk-43a7ea="">↗</span></a>
          {email && <a className="afc__email" href={`mailto:${email}`} data-rk-43a7ea="">{email}</a>}
      
          <div className="afc__grid" data-rk-43a7ea="">
            {columns.map((c, __i: number) => (
              <nav key={__i} aria-label={c.title} data-rk-43a7ea=""><p className="afc__label" data-rk-43a7ea="">{c.title}</p><ul data-rk-43a7ea="">{c.links.map((l, __i: number) => <li key={__i} data-rk-43a7ea=""><a href={l.href} data-rk-43a7ea="">{l.label}</a></li>)}</ul></nav>
            ))}
            {offices.length > 0 && (
              <div data-rk-43a7ea=""><p className="afc__label" data-rk-43a7ea="">Offices</p><ul data-rk-43a7ea="">{offices.map((o, __i: number) => <li key={__i} data-rk-43a7ea=""><strong data-rk-43a7ea="">{o.city}</strong><span data-rk-43a7ea="">{o.address}</span></li>)}</ul></div>
            )}
            {socials.length > 0 && (
              <nav aria-label="Social" data-rk-43a7ea=""><p className="afc__label" data-rk-43a7ea="">Follow</p><ul data-rk-43a7ea="">{socials.map((s, __i: number) => <li key={__i} data-rk-43a7ea=""><a href={s.href} data-rk-43a7ea="">{s.label} ↗</a></li>)}</ul></nav>
            )}
          </div>
          <p className="afc__legal" data-rk-43a7ea=""><span data-rk-43a7ea="">© {new Date().getFullYear()} {brand}. All rights reserved.</span><span data-rk-43a7ea="">Privacy · Cookies · Imprint</span></p>
        </div>
      </footer>
      </div>
    </>
  );
}

export default AgencyFooterCta;
