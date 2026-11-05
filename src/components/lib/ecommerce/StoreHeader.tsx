'use client';

import { useEffect, useRef } from 'react';
import { createCart } from './cart-store';
import './StoreHeader.css';

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

interface ChildLink { label: string; href: string; description?: string }

interface NavLink { label: string; href: string; children?: ChildLink[] }

/**
 * StoreHeader — Shop navigation bar: brand, menu with category dropdowns, search,
 * account link and a cart button whose badge follows the cart store live.
 *
 * @param {string} brand - Store name. Default 'Nova Store'.
 * @param {string} brandHref - Brand link. Default '/'.
 * @param {Array} links - Menu items `{ label, href, children?: { label, href, description? }[] }`.
 * @param {string} searchAction - Search form action URL. Default '#'.
 * @param {string} searchPlaceholder - Search placeholder. Default 'Search products'.
 * @param {string} accountHref - Account link (hidden when empty). Default '#'.
 * @param {string} cartKey - Cart storage key. Default 'ack-cart'.
 * @param {string} cartLabel - Accessible label for the cart button. Default 'Cart'.
 * @param {string} currentHref - Marks the matching menu link with aria-current.
 * @param {boolean} sticky - Stick to the top on scroll. Default true.
 * @param {string} variant - Style (glass|solid|transparent). Default 'glass'.
 * @param {string} size - Height (sm|md|lg). Default 'md'.
 * @param {boolean} themeToggle - Show a light/dark toggle (sets html[data-theme], remembered in localStorage). Default true.
 * @param {string} id - Base id for inner elements (unique per page). Default 'store-header'.
 * @param {string} className - Extra class.
 *
 * Accessibility: dropdowns are disclosure buttons (aria-expanded) closed with Escape or outside click;
 * the mobile menu is a disclosure too; the cart badge count is part of the button label.
 * Clicking the cart button dispatches `ack:cart-open`, which CartDrawer listens to.
 */
export interface StoreHeaderProps {
  brand?: string;
  brandHref?: string;
  links?: NavLink[];
  searchAction?: string;
  searchPlaceholder?: string;
  accountHref?: string;
  cartKey?: string;
  cartLabel?: string;
  currentHref?: string;
  sticky?: boolean;
  variant?: 'glass' | 'solid' | 'transparent';
  size?: 'sm' | 'md' | 'lg';
  themeToggle?: boolean;
  id?: string;
  className?: string;
}

export function StoreHeader({
  brand = 'Nova Store',
  brandHref = '/',
  links = [
    {
      label: 'Shop',
      href: '#',
      children: [
        { label: 'Audio', href: '#', description: 'Headphones & speakers' },
        { label: 'Wearables', href: '#', description: 'Watches & bands' },
        { label: 'Bags', href: '#', description: 'Backpacks & totes' },
        { label: 'Home', href: '#', description: 'Lamps, mugs & plants' },
      ],
    },
    { label: 'New in', href: '#' },
    { label: 'Sale', href: '#' },
    { label: 'Journal', href: '#' },
  ],
  searchAction = '#',
  searchPlaceholder = 'Search products',
  accountHref = '#',
  cartKey = 'ack-cart',
  cartLabel = 'Cart',
  currentHref,
  sticky = true,
  variant = 'glass',
  size = 'md',
  themeToggle = true,
  id = 'store-header',
  className = '',
}: StoreHeaderProps) {
  const uid = id;

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-store-header]:not([data-bound])').forEach((header) => {
        header.dataset.bound = '';
        const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
        const menu = header.querySelector<HTMLElement>('[data-menu]');
        const dropdownToggles = Array.from(header.querySelectorAll<HTMLButtonElement>('[data-dropdown-toggle]'));
    
        const closeDropdowns = (except?: HTMLButtonElement) => {
          dropdownToggles.forEach((btn) => {
            if (btn === except) return;
            btn.setAttribute('aria-expanded', 'false');
            const panel = document.getElementById(btn.getAttribute('aria-controls') || '');
            if (panel) panel.hidden = true;
          });
        };
    
        dropdownToggles.forEach((btn) => {
          btn.addEventListener('click', () => {
            const open = btn.getAttribute('aria-expanded') !== 'true';
            closeDropdowns(btn);
            btn.setAttribute('aria-expanded', String(open));
            const panel = document.getElementById(btn.getAttribute('aria-controls') || '');
            if (panel) panel.hidden = !open;
          });
        });
    
        toggle?.addEventListener('click', () => {
          const open = toggle.getAttribute('aria-expanded') !== 'true';
          toggle.setAttribute('aria-expanded', String(open));
          menu?.classList.toggle('is-open', open);
        });
    
        document.addEventListener('click', (e) => {
          if (!header.contains(e.target as Node)) closeDropdowns();
        });
        document.addEventListener('keydown', (e) => {
          if (e.key !== 'Escape') return;
          const openBtn = dropdownToggles.find((b) => b.getAttribute('aria-expanded') === 'true');
          closeDropdowns();
          openBtn?.focus();
          if (toggle?.getAttribute('aria-expanded') === 'true') {
            toggle.setAttribute('aria-expanded', 'false');
            menu?.classList.remove('is-open');
            toggle.focus();
          }
        });
    
        const themeBtn = header.querySelector<HTMLButtonElement>('[data-theme-toggle]');
        if (themeBtn) {
          const root = document.documentElement;
          const current = () => (root.dataset.theme === 'light' ? 'light' : 'dark');
          const label = () => themeBtn.setAttribute('aria-label', current() === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
          label();
          themeBtn.addEventListener('click', () => {
            const next = current() === 'light' ? 'dark' : 'light';
            root.dataset.theme = next;
            try { window.localStorage.setItem('ack-theme', next); } catch { /* ignore */ }
            label();
            document.dispatchEvent(new CustomEvent('ack:theme', { detail: { theme: next } }));
          });
        }
    
        const cartBtn = header.querySelector<HTMLButtonElement>('[data-cart-open]');
        const countEl = header.querySelector<HTMLElement>('[data-cart-count]');
        if (cartBtn && countEl) {
          const cart = createCart(cartBtn.dataset.cartKey);
          const label = cartBtn.dataset.cartLabel || 'Cart';
          const render = () => {
            const n = cart.count();
            countEl.textContent = n > 99 ? '99+' : String(n);
            countEl.hidden = n === 0;
            cartBtn.setAttribute('aria-label', n ? `${label} (${n})` : label);
          };
          render();
          cart.subscribe((_items) => {
            render();
            countEl.classList.remove('is-bump');
            void countEl.offsetWidth;
            countEl.classList.add('is-bump');
          });
          cartBtn.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('ack:cart-open', { detail: { key: cart.key, trigger: cartBtn } }));
          });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header className={cx(['store-header', `store-header--${variant}`, `store-header--${size}`, { 'store-header--sticky': sticky }, className])} data-store-header data-rk-bf78a5="">
        <div className="store-header__inner" data-rk-bf78a5="">
          {links.length > 0 && (
          <button className="store-header__toggle" type="button" aria-expanded="false" aria-controls={`${uid}-nav`} aria-label="Menu" data-menu-toggle data-rk-bf78a5="">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-bf78a5=""><path className="l1" d="M4 7h16" data-rk-bf78a5="" /><path className="l2" d="M4 12h16" data-rk-bf78a5="" /><path className="l3" d="M4 17h16" data-rk-bf78a5="" /></svg>
          </button>
          )}
      
          <a className="store-header__brand" href={brandHref} data-rk-bf78a5="">
            <span className="store-header__logo" aria-hidden="true" data-rk-bf78a5="">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" data-rk-bf78a5=""><path d="M12 2 3 7v10l9 5 9-5V7z" data-rk-bf78a5="" /><path d="m3 7 9 5 9-5M12 12v10" data-rk-bf78a5="" /></svg>
            </span>
            <span data-rk-bf78a5="">{brand}</span>
          </a>
      
          {links.length > 0 ? (
          <nav className="store-header__nav" id={`${uid}-nav`} aria-label="Main" data-menu data-rk-bf78a5="">
            <ul className="store-header__links" data-rk-bf78a5="">
              {links.map((link, i) => (
                <li key={i} className="store-header__item" data-rk-bf78a5="">
                  {link.children?.length ? (
                    <>
                      <button className="store-header__link store-header__link--parent" type="button" aria-expanded="false" aria-controls={`${uid}-dd-${i}`} data-dropdown-toggle data-rk-bf78a5="">
                        {link.label}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-bf78a5=""><path d="m6 9 6 6 6-6" data-rk-bf78a5="" /></svg>
                      </button>
                      <div className="store-header__dropdown" id={`${uid}-dd-${i}`} hidden data-dropdown data-rk-bf78a5="">
                        <ul data-rk-bf78a5="">
                          {link.children.map((child, __i: number) => (
                            <li key={__i} data-rk-bf78a5="">
                              <a href={child.href} aria-current={currentHref === child.href ? 'page' : undefined} data-rk-bf78a5="">
                                <strong data-rk-bf78a5="">{child.label}</strong>
                                {child.description && <span data-rk-bf78a5="">{child.description}</span>}
                              </a>
                            </li>
                          ))}
                          <li className="store-header__dropdown-all" data-rk-bf78a5=""><a href={link.href} data-rk-bf78a5="">View all →</a></li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <a className="store-header__link" href={link.href} aria-current={currentHref === link.href ? 'page' : undefined} data-rk-bf78a5="">{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          ) : <div className="store-header__nav" data-rk-bf78a5="" />}
      
          <div className="store-header__actions" data-rk-bf78a5="">
            <form className="store-header__search" role="search" action={searchAction} data-rk-bf78a5="">
              <label className="sr-only" htmlFor={`${uid}-q`} data-rk-bf78a5="">{searchPlaceholder}</label>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" data-rk-bf78a5=""><circle cx="11" cy="11" r="7" data-rk-bf78a5="" /><path d="m20 20-3.5-3.5" data-rk-bf78a5="" /></svg>
              <input id={`${uid}-q`} name="q" type="search" placeholder={searchPlaceholder} autoComplete="off" data-rk-bf78a5="" />
            </form>
            {themeToggle && (
              <button className="store-header__icon store-header__theme" type="button" aria-label="Switch to light theme" data-theme-toggle data-rk-bf78a5="">
                <svg className="i-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-bf78a5=""><circle cx="12" cy="12" r="4" data-rk-bf78a5="" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" data-rk-bf78a5="" /></svg>
                <svg className="i-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-bf78a5=""><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" data-rk-bf78a5="" /></svg>
              </button>
            )}
            {accountHref && (
              <a className="store-header__icon" href={accountHref} aria-label="Account" data-rk-bf78a5="">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-bf78a5=""><circle cx="12" cy="8" r="4" data-rk-bf78a5="" /><path d="M4 21a8 8 0 0 1 16 0" data-rk-bf78a5="" /></svg>
              </a>
            )}
            <button className="store-header__icon store-header__cart" type="button" data-cart-open data-cart-key={cartKey} data-cart-label={cartLabel} aria-label={cartLabel} data-rk-bf78a5="">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-bf78a5=""><path d="M6 7h12l-1 13H7z" data-rk-bf78a5="" /><path d="M9 7V6a3 3 0 0 1 6 0v1" data-rk-bf78a5="" /></svg>
              <span className="store-header__count" data-cart-count hidden aria-hidden="true" data-rk-bf78a5="">0</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default StoreHeader;
