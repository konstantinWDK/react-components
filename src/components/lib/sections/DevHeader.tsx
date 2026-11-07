'use client';

import { useEffect, useRef, useId } from 'react';
import './DevHeader.css';

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
 * DevHeader — Floating navigation for developer portfolios ("Keycap" design): a split logo whose
 * middle collapses on scroll (N·OALINDQVIST·.DEV → N.DEV), pill links, a light/dark toggle and a
 * full-screen mobile menu.
 *
 * @param {{initial: string, middle: string, suffix: string}} logo - Logo parts. Default K / EYCAP / .DEV.
 * @param {string} logoHref - Logo link. Default '/'.
 * @param {Array<{label: string, href: string}>} links - Menu links.
 * @param {string} currentHref - Marks the matching link with aria-current="page".
 * @param {boolean} themeToggle - Show the light/dark toggle. Default true.
 * @param {boolean} collapseOnScroll - Collapse the logo middle after scrolling. Default true.
 * @param {string} className - Extra class.
 *
 * Accessibility: nav landmark with label; the mobile menu is a disclosure (aria-expanded,
 * aria-controls) that closes with Escape and returns focus; 44px touch targets; the theme toggle
 * reports its state with aria-pressed.
 */
export interface DevHeaderProps {
  logo?: { initial: string; middle: string; suffix: string };
  logoHref?: string;
  links?: Array<{ label: string; href: string }>;
  currentHref?: string;
  themeToggle?: boolean;
  collapseOnScroll?: boolean;
  className?: string;
}

export function DevHeader({
  logo = { initial: 'K', middle: 'EYCAP', suffix: '.DEV' },
  logoHref = '/',
  links = [{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects/' }, { label: 'Blog', href: '/blog/' }, { label: 'Contact', href: '/contact/' }],
  currentHref = '/',
  themeToggle = true,
  collapseOnScroll = true,
  className = '',
}: DevHeaderProps) {
  const isActive = (href: string) => !!currentHref && (currentHref === href || (href !== logoHref && currentHref.startsWith(href)));
  const menuId = `dvhd-menu-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-dev-header]:not([data-bound])').forEach((h) => {
        h.dataset.bound = '';
        const onScroll = () => h.classList.toggle('is-scrolled', window.scrollY > 80);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    
        const btn = h.querySelector<HTMLButtonElement>('[data-menu-btn]');
        const setOpen = (open: boolean) => {
          h.classList.toggle('is-open', open);
          btn?.setAttribute('aria-expanded', String(open));
          document.documentElement.style.overflow = open ? 'hidden' : '';
        };
        btn?.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
        h.querySelectorAll('.dvhd__link').forEach((a) => a.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && h.classList.contains('is-open')) {
            setOpen(false);
            btn?.focus();
          }
        });
    
        const themeBtn = h.querySelector<HTMLButtonElement>('[data-theme-btn]');
        const sync = () => {
          const dark = document.documentElement.dataset.theme === 'dark';
          themeBtn?.setAttribute('aria-pressed', String(dark));
        };
        sync();
        themeBtn?.addEventListener('click', () => {
          const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
          document.documentElement.dataset.theme = next;
          try { window.localStorage.setItem('ack-theme', next); } catch { /* ignore */ }
          sync();
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header className={cx(['dvhd', className])} data-dev-header data-collapse={collapseOnScroll ? '' : undefined} data-rk-5c9c2e="">
        <div className="dvhd__bar" data-rk-5c9c2e="">
          <a className="dvhd__logo" href={logoHref} aria-label={`${logo.initial}${logo.middle}${logo.suffix} — home`} data-rk-5c9c2e="">
            <span className="dvhd__initial" data-rk-5c9c2e="">{logo.initial}</span><span className="dvhd__middle" aria-hidden="true" data-rk-5c9c2e="">{logo.middle}</span><span className="dvhd__suffix" data-rk-5c9c2e="">{logo.suffix}</span>
          </a>
      
          <nav className="dvhd__nav" aria-label="Main" data-rk-5c9c2e="">
            <ul className="dvhd__list" id={menuId} data-rk-5c9c2e="">
              {links.map((l, __i: number) => (
                <li key={__i} data-rk-5c9c2e="">
                  <a className={cx(['dvhd__link', { 'is-active': isActive(l.href) }])} href={l.href} aria-current={isActive(l.href) ? 'page' : undefined} data-rk-5c9c2e="">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
      
          <div className="dvhd__tools" data-rk-5c9c2e="">
            {themeToggle && (
              <button className="dvhd__icon" type="button" data-theme-btn aria-label="Dark theme" aria-pressed="false" data-rk-5c9c2e="">
                <svg className="dvhd__sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-5c9c2e=""><circle cx="12" cy="12" r="4" data-rk-5c9c2e="" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" data-rk-5c9c2e="" /></svg>
                <svg className="dvhd__moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-5c9c2e=""><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" data-rk-5c9c2e="" /></svg>
              </button>
            )}
            <button className="dvhd__toggle" type="button" data-menu-btn aria-expanded="false" aria-controls={menuId} aria-label="Menu" data-rk-5c9c2e="">
              <span data-rk-5c9c2e=""></span><span data-rk-5c9c2e=""></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default DevHeader;
