'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { appIcon, initials, hueFrom } from './app-icons';
import './AppTopbar.css';

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

/** "a: b; --c: d" → style object */
function st(css: string | undefined): CSSProperties {
  const o: Record<string, string> = {};
  for (const decl of String(css ?? '').split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const k = decl.slice(0, i).trim();
    if (k) o[k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = decl.slice(i + 1).trim();
  }
  return o as CSSProperties;
}

interface Notice { title: string; text?: string; time: string; unread?: boolean; tone?: 'info' | 'success' | 'warning' | 'danger' }

/**
 * AppTopbar — SaaS app top bar: mobile menu button, search (⌘K / Ctrl+K), notifications dropdown
 * with unread count and "mark all read", light/dark toggle and a user menu.
 *
 * @param {string} searchPlaceholder - Search placeholder. Default 'Search guests, bookings, rooms…'.
 * @param {string} searchAction - Search form action. Default '#'.
 * @param {Array<{title: string, text?: string, time: string, unread?: boolean, tone?: 'info'|'success'|'warning'|'danger'}>} notifications - Dropdown items.
 * @param {{name: string, role?: string, email?: string}} user - Signed-in user.
 * @param {Array<{label: string, href: string}>} userLinks - User menu links.
 * @param {string} signOutHref - Sign-out link. Default '#'.
 * @param {string} sidebarId - id of the AppSidebar the menu button opens on mobile. Default 'app-sidebar'.
 * @param {boolean} themeToggle - Show the light/dark toggle. Default true.
 * @param {string} variant - Style (blur|solid|transparent). Default 'blur'.
 * @param {string} className - Extra class.
 *
 * Slots: `start` (e.g. page title or breadcrumb next to the menu button), `actions` (extra buttons).
 *
 * Accessibility: dropdowns are disclosure buttons closed with Escape or an outside click;
 * the unread count is part of the bell's label; ⌘K moves focus to the search field.
 */
export interface AppTopbarProps {
  searchPlaceholder?: string;
  searchAction?: string;
  notifications?: Notice[];
  user?: { name: string; role?: string; email?: string };
  userLinks?: Array<{ label: string; href: string }>;
  signOutHref?: string;
  sidebarId?: string;
  themeToggle?: boolean;
  variant?: 'blur' | 'solid' | 'transparent';
  className?: string;
  start?: ReactNode;
  actions?: ReactNode;
}

export function AppTopbar({
  searchPlaceholder = 'Search guests, bookings, rooms…',
  searchAction = '#',
  notifications = [
    { title: 'New booking from Booking.com', text: 'Deluxe King · 3 nights · €612', time: '2 min ago', unread: true, tone: 'success' },
    { title: 'Room 204 reported maintenance', text: 'Air conditioning not cooling', time: '18 min ago', unread: true, tone: 'warning' },
    { title: 'Payout sent', text: '€18,240 to your bank account', time: '1 h ago', tone: 'info' },
  ],
  user = { name: 'Lucía Ortega', role: 'General manager', email: 'lucia@mirador.com' },
  userLinks = [{ label: 'Your profile', href: '#' }, { label: 'Settings', href: '#' }, { label: 'Billing', href: '#' }],
  signOutHref = '#',
  sidebarId = 'app-sidebar',
  themeToggle = true,
  variant = 'blur',
  className = '',
  start,
  actions
}: AppTopbarProps) {
  const unread = notifications.filter((n) => n.unread).length;
  const hue = hueFrom(user.name);

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-app-topbar]:not([data-bound])').forEach((bar) => {
        bar.dataset.bound = '';
        const toggles = Array.from(bar.querySelectorAll<HTMLButtonElement>('[data-dd]'));
        const panel = (b: HTMLButtonElement) => document.getElementById(b.getAttribute('aria-controls') || '');
        const closeAll = (except?: HTMLButtonElement) => toggles.forEach((b) => {
          if (b === except) return;
          b.setAttribute('aria-expanded', 'false');
          const p = panel(b);
          if (p) p.hidden = true;
        });
        toggles.forEach((b) => b.addEventListener('click', (e) => {
          e.stopPropagation();
          const open = b.getAttribute('aria-expanded') !== 'true';
          closeAll(b);
          b.setAttribute('aria-expanded', String(open));
          const p = panel(b);
          if (p) p.hidden = !open;
        }));
        document.addEventListener('click', (e) => { if (!bar.contains(e.target as Node)) closeAll(); });
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            const open = toggles.find((b) => b.getAttribute('aria-expanded') === 'true');
            closeAll();
            open?.focus();
          }
          if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            bar.querySelector<HTMLInputElement>('[data-search]')?.focus();
          }
        });
    
        bar.querySelector('[data-mark-read]')?.addEventListener('click', () => {
          bar.querySelectorAll('.app-tb__note.is-unread').forEach((n) => n.classList.remove('is-unread'));
          bar.querySelector('[data-unread]')?.remove();
          bar.querySelector('[aria-controls="app-tb-notes"]')?.setAttribute('aria-label', 'Notifications');
        });
    
        bar.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
          const root = document.documentElement;
          const next = root.dataset.theme === 'light' ? 'dark' : 'light';
          root.dataset.theme = next;
          try { window.localStorage.setItem('ack-theme', next); } catch { /* ignore */ }
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header className={cx(['app-tb', `app-tb--${variant}`, className])} data-app-topbar data-rk-4b9da7="">
        <button className="app-tb__icon app-tb__menu" type="button" aria-label="Open navigation" aria-controls={sidebarId} aria-expanded="false" data-sidebar-open={sidebarId} data-rk-4b9da7="">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-4b9da7=""><g dangerouslySetInnerHTML={{ __html: appIcon('menu') }} data-rk-4b9da7="" /></svg>
        </button>
        <div className="app-tb__start" data-rk-4b9da7="">{start}</div>
      
        <form className="app-tb__search" role="search" action={searchAction} data-rk-4b9da7="">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-4b9da7=""><g dangerouslySetInnerHTML={{ __html: appIcon('search') }} data-rk-4b9da7="" /></svg>
          <label className="sr-only" htmlFor="app-tb-q" data-rk-4b9da7="">{searchPlaceholder}</label>
          <input id="app-tb-q" name="q" type="search" placeholder={searchPlaceholder} autoComplete="off" data-search data-rk-4b9da7="" />
          <kbd aria-hidden="true" data-rk-4b9da7="">⌘K</kbd>
        </form>
      
        <div className="app-tb__actions" data-rk-4b9da7="">
          {actions}
          {themeToggle && (
            <button className="app-tb__icon" type="button" aria-label="Switch theme" data-theme-toggle data-rk-4b9da7="">
              <svg className="i-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-4b9da7=""><g dangerouslySetInnerHTML={{ __html: appIcon('sun') }} data-rk-4b9da7="" /></svg>
              <svg className="i-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-4b9da7=""><g dangerouslySetInnerHTML={{ __html: appIcon('moon') }} data-rk-4b9da7="" /></svg>
            </button>
          )}
      
          <div className="app-tb__menu-wrap" data-rk-4b9da7="">
            <button className="app-tb__icon" type="button" aria-expanded="false" aria-controls="app-tb-notes" aria-label={unread ? `Notifications, ${unread} unread` : 'Notifications'} data-dd data-rk-4b9da7="">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-4b9da7=""><g dangerouslySetInnerHTML={{ __html: appIcon('bell') }} data-rk-4b9da7="" /></svg>
              {unread > 0 && <span className="app-tb__dot" aria-hidden="true" data-unread data-rk-4b9da7="">{unread}</span>}
            </button>
            <div className="app-tb__panel app-tb__panel--notes" id="app-tb-notes" hidden data-panel data-rk-4b9da7="">
              <div className="app-tb__panel-head" data-rk-4b9da7="">
                <strong data-rk-4b9da7="">Notifications</strong>
                <button type="button" className="app-tb__link" data-mark-read data-rk-4b9da7="">Mark all as read</button>
              </div>
              <ul data-rk-4b9da7="">
                {notifications.map((n, __i: number) => (
                  <li key={__i} className={cx(['app-tb__note', `app-tb__note--${n.tone ?? 'info'}`, { 'is-unread': n.unread }])} data-rk-4b9da7="">
                    <span className="app-tb__note-dot" aria-hidden="true" data-rk-4b9da7=""></span>
                    <span className="app-tb__note-body" data-rk-4b9da7="">
                      <strong data-rk-4b9da7="">{n.title}</strong>
                      {n.text && <span data-rk-4b9da7="">{n.text}</span>}
                      <time data-rk-4b9da7="">{n.time}</time>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
      
          <div className="app-tb__menu-wrap" data-rk-4b9da7="">
            <button className="app-tb__user" type="button" aria-expanded="false" aria-controls="app-tb-user" data-dd data-rk-4b9da7="">
              <span className="app-tb__avatar" style={st(`--h: ${hue}`)} aria-hidden="true" data-rk-4b9da7="">{initials(user.name)}</span>
              <span className="app-tb__who" data-rk-4b9da7=""><strong data-rk-4b9da7="">{user.name}</strong>{user.role && <small data-rk-4b9da7="">{user.role}</small>}</span>
              <span className="sr-only" data-rk-4b9da7="">Account menu</span>
            </button>
            <div className="app-tb__panel app-tb__panel--user" id="app-tb-user" hidden data-panel data-rk-4b9da7="">
              <div className="app-tb__panel-head app-tb__panel-head--user" data-rk-4b9da7="">
                <strong data-rk-4b9da7="">{user.name}</strong>
                {user.email && <span data-rk-4b9da7="">{user.email}</span>}
              </div>
              <ul data-rk-4b9da7="">
                {userLinks.map((l, __i: number) => <li key={__i} data-rk-4b9da7=""><a href={l.href} data-rk-4b9da7="">{l.label}</a></li>)}
                <li className="app-tb__sep" data-rk-4b9da7=""><a href={signOutHref} data-rk-4b9da7="">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-4b9da7=""><g dangerouslySetInnerHTML={{ __html: appIcon('logout') }} data-rk-4b9da7="" /></svg>
                  Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default AppTopbar;
