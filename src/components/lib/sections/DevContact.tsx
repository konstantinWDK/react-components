'use client';

import './DevContact.css';

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

interface Contact { kind: 'email' | 'github' | 'linkedin' | 'x' | 'web'; label: string; value: string; href: string }

/**
 * DevContact — Contact block for developer portfolios ("Keycap" design): label, title, optional
 * text and a glass capsule of contact cards (email, GitHub, LinkedIn…) with an icon, type, value
 * and an arrow that nudges on hover. An optional CTA links to a full contact page.
 *
 * @param {string} eyebrow - Small mono label. Default 'Contact'.
 * @param {string} title - Heading. Default "Let's talk".
 * @param {string} text - Optional intro.
 * @param {Array<{kind: 'email'|'github'|'linkedin'|'x'|'web', label: string, value: string, href: string}>} contacts - Contact cards.
 * @param {{label: string, href: string}} cta - Optional button.
 * @param {string} className - Extra class.
 *
 * Accessibility: cards are links with visible text; external links open in a new tab with
 * rel="noopener"; focus ring on every card.
 */
export interface DevContactProps {
  eyebrow?: string;
  title?: string;
  text?: string;
  contacts: Contact[];
  cta?: { label: string; href: string };
  className?: string;
}

export function DevContact({ eyebrow = 'Contact', title = "Let's talk", text, contacts = [
  { kind: 'email', label: 'Email', value: 'hello@you.dev', href: 'mailto:hello@you.dev' },
  { kind: 'github', label: 'GitHub', value: 'github.com/you', href: '#' },
], cta, className = '' }: DevContactProps) {
  const icons: Record<Contact['kind'], string> = {
    email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>',
    x: '<path d="M4 4l16 16M20 4 4 20"/>',
    web: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>',
  };
  return (
    <>
      <section className={cx(['dvcn', className])} data-rk-4c0d5a="">
        <div className="dvcn__wrap" data-rk-4c0d5a="">
          <p className="dvcn__eyebrow" data-rk-4c0d5a="">{eyebrow}</p>
          <h2 className="dvcn__title" data-rk-4c0d5a="">{title}</h2>
          {text && <p className="dvcn__text" data-rk-4c0d5a="">{text}</p>}
          <ul className="dvcn__grid" data-rk-4c0d5a="">
            {contacts.map((c, __i: number) => {
              const external = !c.href.startsWith('mailto:') && !c.href.startsWith('tel:');
              return (
                <li key={__i} data-rk-4c0d5a="">
                  <a className="dvcn__card" href={c.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} data-rk-4c0d5a="">
                    <span className="dvcn__icon" aria-hidden="true" data-rk-4c0d5a="">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: icons[c.kind] ?? icons.web }} data-rk-4c0d5a="" />
                    </span>
                    <span className="dvcn__info" data-rk-4c0d5a="">
                      <span className="dvcn__type" data-rk-4c0d5a="">{c.label}</span>
                      <span className="dvcn__value" data-rk-4c0d5a="">{c.value}</span>
                    </span>
                    <span className="dvcn__arrow" aria-hidden="true" data-rk-4c0d5a="">{external ? '↗' : '→'}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          {cta && <a className="dvcn__cta" href={cta.href} data-rk-4c0d5a="">{cta.label} <span aria-hidden="true" data-rk-4c0d5a="">→</span></a>}
        </div>
      </section>
    </>
  );
}

export default DevContact;
