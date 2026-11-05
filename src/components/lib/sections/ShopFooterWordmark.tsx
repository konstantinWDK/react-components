'use client';

import './ShopFooterWordmark.css';

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
 * ShopFooterWordmark — Store footer with link columns, contact block, payment labels and a
 * giant edge-to-edge wordmark at the bottom.
 *
 * @param {string} brand - Wordmark. Default 'Forma'.
 * @param {string} brandHref - Wordmark link. Default '/'.
 * @param {Array<{title: string, links: {label: string, href: string}[]}>} columns - Link columns.
 * @param {{title: string, lines: string[]}} contact - Contact block (optional).
 * @param {string[]} payments - Payment method labels. Default Visa · Mastercard · PayPal · Apple Pay.
 * @param {string} copyright - Bottom-left text.
 * @param {string} variant - Style (plain|inverted). Default 'plain'.
 * @param {string} className - Extra class.
 *
 * Accessibility: footer landmark with a visually hidden heading; columns are nav lists; the
 * wordmark is decorative (aria-hidden) and duplicated by the visible brand link.
 */
export interface ShopFooterWordmarkProps {
  brand?: string;
  brandHref?: string;
  columns?: Array<{ title: string; links: Array<{ label: string; href: string }> }>;
  contact?: { title: string; lines: string[] };
  payments?: string[];
  copyright?: string;
  variant?: 'plain' | 'inverted';
  className?: string;
}

export function ShopFooterWordmark({
  brand = 'Forma',
  brandHref = '/',
  columns = [
    { title: 'Shop', links: [{ label: 'Clothing', href: '#' }, { label: 'Shoes', href: '#' }, { label: 'Bags', href: '#' }, { label: 'Objects', href: '#' }] },
    { title: 'Care', links: [{ label: 'Shipping', href: '#' }, { label: 'Returns', href: '#' }, { label: 'Repairs', href: '#' }, { label: 'Size guide', href: '#' }] },
    { title: 'Studio', links: [{ label: 'About', href: '#' }, { label: 'Journal', href: '#' }, { label: 'Stockists', href: '#' }] },
  ],
  contact = { title: 'Visit', lines: ['Calle del Pez 14, Madrid', 'Tue–Sat · 11:00–20:00', 'hello@forma.studio'] },
  payments = ['Visa', 'Mastercard', 'PayPal', 'Apple Pay'],
  copyright = `© ${new Date().getFullYear()} Forma Studio`,
  variant = 'plain',
  className = '',
}: ShopFooterWordmarkProps) {
  return (
    <>
      <footer className={cx(['sfw', `sfw--${variant}`, className])} aria-labelledby="sfw-title" data-rk-d16b13="">
        <h2 id="sfw-title" className="sr-only" data-rk-d16b13="">Site footer</h2>
        <div className="sfw__top" data-rk-d16b13="">
          <a className="sfw__brand" href={brandHref} data-rk-d16b13="">{brand}</a>
          {columns.map((c, __i: number) => (
            <nav key={__i} className="sfw__col" aria-label={c.title} data-rk-d16b13="">
              <p className="sfw__col-title" data-rk-d16b13="">{c.title}</p>
              <ul data-rk-d16b13="">{c.links.map((l, __i: number) => <li key={__i} data-rk-d16b13=""><a href={l.href} data-rk-d16b13="">{l.label}</a></li>)}</ul>
            </nav>
          ))}
          {contact && (
            <div className="sfw__col" data-rk-d16b13="">
              <p className="sfw__col-title" data-rk-d16b13="">{contact.title}</p>
              <address data-rk-d16b13="">{contact.lines.map((l, __i: number) => <span key={__i} data-rk-d16b13="">{l}</span>)}</address>
            </div>
          )}
        </div>
        <div className="sfw__bottom" data-rk-d16b13="">
          <p data-rk-d16b13="">{copyright}</p>
          {payments.length > 0 && <ul className="sfw__pay" aria-label="Payment methods" data-rk-d16b13="">{payments.map((p, __i: number) => <li key={__i} data-rk-d16b13="">{p}</li>)}</ul>}
        </div>
        <p className="sfw__wordmark" aria-hidden="true" data-rk-d16b13="">{brand}<span data-rk-d16b13="">°</span></p>
      </footer>
    </>
  );
}

export default ShopFooterWordmark;
