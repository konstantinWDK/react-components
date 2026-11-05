'use client';

import { useEffect, useRef } from 'react';
import './AgencyHeader.css';

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
 * AgencyHeader — Floating pill navigation for agency and studio sites: logo, links, theme toggle,
 * "Start a project" CTA and an animated full-screen mobile menu.
 *
 * @param {string} brand - Logo text. Default 'Volta'.
 * @param {string} brandHref - Logo link. Default '/'.
 * @param {Array<{label: string, href: string}>} links - Menu links.
 * @param {{label: string, href: string}} cta - Call to action. Default 'Start a project'.
 * @param {string} currentHref - Marks the active link with aria-current.
 * @param {boolean} themeToggle - Show the light/dark toggle. Default true.
 * @param {boolean} sticky - Float over the page while scrolling. Default true.
 * @param {string} variant - Style (pill|bar). Default 'pill'.
 * @param {string} className - Extra class.
 *
 * Accessibility: nav landmark; the mobile menu is a disclosure (aria-expanded) closed with
 * Escape, which returns focus to the toggle; links have 44px targets.
 */
export interface AgencyHeaderProps {
  brand?: string;
  brandHref?: string;
  links?: Array<{ label: string; href: string }>;
  cta?: { label: string; href: string };
  currentHref?: string;
  themeToggle?: boolean;
  sticky?: boolean;
  variant?: 'pill' | 'bar';
  className?: string;
}

export function AgencyHeader({
  brand = 'Volta',
  brandHref = '/',
  links = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Studio', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ],
  cta = { label: 'Start a project', href: '#contact' },
  currentHref,
  themeToggle = true,
  sticky = true,
  variant = 'pill',
  className = '',
}: AgencyHeaderProps) {

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-agency-header]:not([data-bound])').forEach((h) => {
        h.dataset.bound = '';
        const burger = h.querySelector<HTMLButtonElement>('[data-burger]');
        const nav = h.querySelector<HTMLElement>('[data-nav]');
        const set = (open: boolean) => {
          burger?.setAttribute('aria-expanded', String(open));
          nav?.classList.toggle('is-open', open);
          h.classList.toggle('is-menu', open);
          document.documentElement.style.overflow = open ? 'hidden' : '';
        };
        burger?.addEventListener('click', () => set(burger.getAttribute('aria-expanded') !== 'true'));
        nav?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && burger?.getAttribute('aria-expanded') === 'true') { set(false); burger.focus(); }
        });
        h.querySelector('[data-theme-btn]')?.addEventListener('click', () => {
          const root = document.documentElement;
          const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
          root.dataset.theme = next;
          try { window.localStorage.setItem('ack-theme', next); } catch { /* ignore */ }
        });
        const onScroll = () => h.classList.toggle('is-scrolled', window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header className={cx(['ah', `ah--${variant}`, { 'ah--sticky': sticky }, className])} data-agency-header data-rk-72bba8="">
        <div className="ah__bar" data-rk-72bba8="">
          <a className="ah__brand" href={brandHref} data-rk-72bba8=""><span className="ah__dot" aria-hidden="true" data-rk-72bba8=""></span>{brand}</a>
          <nav className="ah__nav" id="ah-nav" aria-label="Main" data-nav data-rk-72bba8="">
            <ul data-rk-72bba8="">
              {links.map((l, __i: number) => <li key={__i} data-rk-72bba8=""><a href={l.href} aria-current={l.href === currentHref ? 'page' : undefined} data-rk-72bba8="">{l.label}</a></li>)}
            </ul>
            {cta && <a className="ah__cta ah__cta--mobile" href={cta.href} data-rk-72bba8="">{cta.label} <span aria-hidden="true" data-rk-72bba8="">↗</span></a>}
          </nav>
          <div className="ah__actions" data-rk-72bba8="">
            {themeToggle && (
              <button className="ah__icon" type="button" aria-label="Switch theme" data-theme-btn data-rk-72bba8="">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" data-rk-72bba8=""><circle cx="12" cy="12" r="8" data-rk-72bba8="" /><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" data-rk-72bba8="" /></svg>
              </button>
            )}
            {cta && <a className="ah__cta" href={cta.href} data-rk-72bba8="">{cta.label} <span aria-hidden="true" data-rk-72bba8="">↗</span></a>}
            <button className="ah__icon ah__burger" type="button" aria-expanded="false" aria-controls="ah-nav" aria-label="Menu" data-burger data-rk-72bba8="">
              <span aria-hidden="true" data-rk-72bba8=""></span><span aria-hidden="true" data-rk-72bba8=""></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default AgencyHeader;
