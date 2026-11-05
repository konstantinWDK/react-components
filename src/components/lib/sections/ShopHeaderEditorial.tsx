'use client';

import { useEffect, useRef } from 'react';
import ProductMedia from '../ecommerce/ProductMedia';
import { createCart } from '../ecommerce/cart-store';
import './ShopHeaderEditorial.css';

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

interface Col { title: string; links: Array<{ label: string; href: string }> }

interface Feature { title: string; text?: string; href: string; icon?: string; hue?: number }

interface NavLink { label: string; href: string; columns?: Col[]; feature?: Feature }

/**
 * ShopHeaderEditorial — Editorial store header: thin announcement line, left menu, centred
 * wordmark, right utilities (search, theme toggle, bag count) and a full-width mega menu.
 *
 * @param {string} brand - Wordmark text. Default 'Forma'.
 * @param {string} brandHref - Wordmark link. Default '/'.
 * @param {string} announcement - Top line text (empty hides it).
 * @param {Array} links - `{ label, href, columns?: { title, links: {label, href}[] }[], feature?: { title, text, href, icon?, hue? } }`.
 * @param {string} searchHref - Search page URL (empty hides the icon). Default '#'.
 * @param {string} bagHref - Bag page URL. When empty, the bag button opens a CartDrawer instead.
 * @param {string} cartKey - Cart storage key for the live count. Default 'ack-cart'.
 * @param {boolean} themeToggle - Show a light/dark toggle (html[data-theme]). Default true.
 * @param {string} currentHref - Marks the active link.
 * @param {boolean} sticky - Stick to the top on scroll. Default true.
 * @param {string} variant - Style (paper|transparent|inverted). Default 'paper'.
 * @param {string} size - Height (sm|md|lg). Default 'md'.
 * @param {string} id - Base id. Default 'shop-header'.
 * @param {string} className - Extra class.
 *
 * Accessibility: mega menus are disclosure buttons (aria-expanded) that close on Escape/outside
 * click; the mobile menu is a disclosure too; the bag link label includes the live count.
 */
export interface ShopHeaderEditorialProps {
  brand?: string;
  brandHref?: string;
  announcement?: string;
  links?: NavLink[];
  searchHref?: string;
  bagHref?: string;
  cartKey?: string;
  themeToggle?: boolean;
  currentHref?: string;
  sticky?: boolean;
  variant?: 'paper' | 'transparent' | 'inverted';
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  className?: string;
}

export function ShopHeaderEditorial({
  brand = 'Forma',
  brandHref = '/',
  announcement = 'Complimentary shipping over €150 · Free returns within 30 days',
  links = [
    {
      label: 'Shop',
      href: '#',
      columns: [
        { title: 'Clothing', links: [{ label: 'Overshirts', href: '#' }, { label: 'Knitwear', href: '#' }, { label: 'Outerwear', href: '#' }] },
        { title: 'Objects', links: [{ label: 'Ceramics', href: '#' }, { label: 'Lighting', href: '#' }, { label: 'Plants', href: '#' }] },
        { title: 'Accessories', links: [{ label: 'Bags', href: '#' }, { label: 'Eyewear', href: '#' }, { label: 'Watches', href: '#' }] },
      ],
      feature: { title: 'The Autumn edit', text: 'Twelve pieces in warm, quiet tones.', href: '#', icon: 'jacket', hue: 22 },
    },
    { label: 'New in', href: '#' },
    { label: 'Journal', href: '#' },
  ],
  searchHref = '#',
  bagHref = '#',
  cartKey = 'ack-cart',
  themeToggle = true,
  currentHref,
  sticky = true,
  variant = 'paper',
  size = 'md',
  id = 'shop-header',
  className = '',
}: ShopHeaderEditorialProps) {

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-shop-header]:not([data-bound])').forEach((header) => {
        header.dataset.bound = '';
        const toggles = Array.from(header.querySelectorAll<HTMLButtonElement>('[data-mega-toggle]'));
        const panelOf = (b: HTMLButtonElement) => document.getElementById(b.getAttribute('aria-controls') || '');
        const closeAll = (except?: HTMLButtonElement) => toggles.forEach((b) => {
          if (b === except) return;
          b.setAttribute('aria-expanded', 'false');
          const p = panelOf(b);
          if (p) p.hidden = true;
        });
        toggles.forEach((b) => b.addEventListener('click', () => {
          const open = b.getAttribute('aria-expanded') !== 'true';
          closeAll(b);
          b.setAttribute('aria-expanded', String(open));
          const p = panelOf(b);
          if (p) p.hidden = !open;
        }));
        document.addEventListener('click', (e) => { if (!header.contains(e.target as Node)) closeAll(); });
        document.addEventListener('keydown', (e) => {
          if (e.key !== 'Escape') return;
          const open = toggles.find((b) => b.getAttribute('aria-expanded') === 'true');
          closeAll();
          open?.focus();
          const burger = header.querySelector<HTMLButtonElement>('[data-burger]');
          if (burger?.getAttribute('aria-expanded') === 'true') { burger.click(); burger.focus(); }
        });
    
        const burger = header.querySelector<HTMLButtonElement>('[data-burger]');
        const nav = header.querySelector<HTMLElement>('[data-nav]');
        burger?.addEventListener('click', () => {
          const open = burger.getAttribute('aria-expanded') !== 'true';
          burger.setAttribute('aria-expanded', String(open));
          nav?.classList.toggle('is-open', open);
        });
    
        header.querySelector('[data-theme-btn]')?.addEventListener('click', () => {
          const root = document.documentElement;
          const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
          root.dataset.theme = next;
          try { window.localStorage.setItem('ack-theme', next); } catch { /* ignore */ }
        });
    
        const bag = header.querySelector<HTMLElement>('[data-bag-link]');
        const count = header.querySelector<HTMLElement>('[data-count]');
        if (bag && count) {
          const cart = createCart(header.dataset.key);
          const render = () => {
            const n = cart.count();
            count.textContent = String(n);
            bag.setAttribute('aria-label', `Bag, ${n} ${n === 1 ? 'item' : 'items'}`);
          };
          render();
          cart.subscribe(() => {
            render();
            count.classList.remove('is-bump');
            void count.offsetWidth;
            count.classList.add('is-bump');
          });
          if (bag.tagName === 'BUTTON') {
            bag.addEventListener('click', () => document.dispatchEvent(new CustomEvent('ack:cart-open', { detail: { key: cart.key, trigger: bag } })));
          }
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header className={cx(['she', `she--${variant}`, `she--${size}`, { 'she--sticky': sticky }, className])} data-shop-header data-key={cartKey} data-rk-74ee75="">
        {announcement && <p className="she__announce" data-rk-74ee75="">{announcement}</p>}
        <div className="she__bar" data-rk-74ee75="">
          <div className="she__left" data-rk-74ee75="">
            <button className="she__icon she__burger" type="button" aria-expanded="false" aria-controls={`${id}-nav`} aria-label="Menu" data-burger data-rk-74ee75="">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" data-rk-74ee75=""><path d="M3 8h18M3 16h18" data-rk-74ee75="" /></svg>
            </button>
            <nav className="she__nav" id={`${id}-nav`} aria-label="Main" data-nav data-rk-74ee75="">
              <ul data-rk-74ee75="">
                {links.map((link, i) => (
                  <li key={i} data-rk-74ee75="">
                    {link.columns?.length ? (
                      <>
                        <button className="she__link she__link--desk" type="button" aria-expanded="false" aria-controls={`${id}-mega-${i}`} data-mega-toggle data-rk-74ee75="">{link.label}</button>
                        <a className="she__link she__link--mob" href={link.href} data-rk-74ee75="">{link.label}</a>
                        <ul className="she__sub" data-rk-74ee75="">
                          {link.columns.flatMap((c) => c.links).map((l, __i: number) => <li key={__i} data-rk-74ee75=""><a href={l.href} data-rk-74ee75="">{l.label}</a></li>)}
                        </ul>
                      </>
                    ) : (
                      <a className="she__link" href={link.href} aria-current={currentHref === link.href ? 'page' : undefined} data-rk-74ee75="">{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
      
          <a className="she__brand" href={brandHref} data-rk-74ee75="">{brand}</a>
      
          <div className="she__right" data-rk-74ee75="">
            {searchHref && (
              <a className="she__icon" href={searchHref} aria-label="Search" data-rk-74ee75="">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" data-rk-74ee75=""><circle cx="11" cy="11" r="7" data-rk-74ee75="" /><path d="m20 20-3.5-3.5" data-rk-74ee75="" /></svg>
              </a>
            )}
            {themeToggle && (
              <button className="she__icon" type="button" aria-label="Switch theme" data-theme-btn data-rk-74ee75="">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" data-rk-74ee75=""><circle cx="12" cy="12" r="8" data-rk-74ee75="" /><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" data-rk-74ee75="" /></svg>
              </button>
            )}
            {bagHref ? (
              <a className="she__bag" href={bagHref} aria-label="Bag" data-bag-link data-rk-74ee75="">
                Bag <span className="she__count" data-count data-rk-74ee75="">0</span>
              </a>
            ) : (
              <button className="she__bag" type="button" aria-label="Bag" data-bag-link data-cart-open data-cart-key={cartKey} data-rk-74ee75="">
                Bag <span className="she__count" data-count data-rk-74ee75="">0</span>
              </button>
            )}
          </div>
        </div>
      
        {links.map((link, i) => link.columns?.length ? (
          <div className="she__mega" id={`${id}-mega-${i}`} hidden data-mega data-rk-74ee75="">
            <div className="she__mega-inner" data-rk-74ee75="">
              {link.columns.map((col, __i: number) => (
                <div key={__i} className="she__col" data-rk-74ee75="">
                  <p className="she__col-title" data-rk-74ee75="">{col.title}</p>
                  <ul data-rk-74ee75="">{col.links.map((l, __i: number) => <li key={__i} data-rk-74ee75=""><a href={l.href} data-rk-74ee75="">{l.label}</a></li>)}</ul>
                </div>
              ))}
              <a className="she__col she__col--all" href={link.href} data-rk-74ee75="">View everything <span aria-hidden="true" data-rk-74ee75="">→</span></a>
              {link.feature && (
                <a className="she__feature" href={link.feature.href} data-rk-74ee75="">
                  <ProductMedia icon={link.feature.icon} hue={link.feature.hue} ratio="4 / 3" variant="soft" size="lg" />
                  <span className="she__feature-title" data-rk-74ee75="">{link.feature.title}</span>
                  {link.feature.text && <span className="she__feature-text" data-rk-74ee75="">{link.feature.text}</span>}
                </a>
              )}
            </div>
          </div>
        ) : null)}
      </header>
    </>
  );
}

export default ShopHeaderEditorial;
