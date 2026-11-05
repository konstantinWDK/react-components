'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { appIcon } from './app-icons';
import './AppSidebar.css';

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

interface Item { label: string; href: string; icon?: string; badge?: string | number }

interface Group { label?: string; items: Item[] }

/**
 * AppSidebar — SaaS app navigation: workspace switcher, grouped nav items with icons and
 * count badges, collapsible to an icon rail, and an upgrade/plan card at the bottom.
 *
 * @param {{name: string, plan?: string, initials?: string}} workspace - Workspace shown at the top.
 * @param {Array<{label?: string, items: {label: string, href: string, icon?: string, badge?: string|number}[]}>} groups - Nav groups.
 * @param {string} currentHref - Marks the matching item with aria-current.
 * @param {{title: string, text?: string, href: string, cta?: string, progress?: number}} promo - Card at the bottom (optional).
 * @param {boolean} fullHeight - Full-viewport sticky sidebar (app shell). false renders it inline (docs, cards). Default true.
 * @param {boolean} collapsible - Show the collapse toggle (remembered in localStorage). Default true.
 * @param {string} variant - Style (surface|transparent|accent). Default 'surface'.
 * @param {string} size - Width preset (sm|md|lg). Default 'md'.
 * @param {string} id - Element id (AppTopbar's menu button opens it on mobile). Default 'app-sidebar'.
 * @param {string} className - Extra class.
 *
 * Accessibility: a labelled nav landmark; the current page uses aria-current; when collapsed,
 * labels stay available to screen readers and appear as tooltips on hover/focus.
 */
export interface AppSidebarProps {
  workspace?: { name: string; plan?: string; initials?: string };
  groups?: Group[];
  currentHref?: string;
  promo?: { title: string; text?: string; href: string; cta?: string; progress?: number };
  fullHeight?: boolean;
  collapsible?: boolean;
  variant?: 'surface' | 'transparent' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  className?: string;
}

export function AppSidebar({
  workspace = { name: 'Hotel Mirador', plan: 'Pro plan', initials: 'HM' },
  groups = [
    { items: [
      { label: 'Dashboard', href: '#', icon: 'dashboard' },
      { label: 'Reservations', href: '#reservations', icon: 'calendar', badge: 12 },
      { label: 'Rooms', href: '#rooms', icon: 'bed' },
      { label: 'Guests', href: '#guests', icon: 'users' },
    ] },
    { label: 'Insights', items: [
      { label: 'Reports', href: '#reports', icon: 'chart' },
      { label: 'Revenue', href: '#revenue', icon: 'wallet' },
    ] },
    { label: 'Account', items: [{ label: 'Settings', href: '#settings', icon: 'settings' }] },
  ],
  currentHref = '#',
  promo = { title: 'Channel manager', text: '3 of 5 channels connected', href: '#', cta: 'Connect more', progress: 60 },
  fullHeight = true,
  collapsible = true,
  variant = 'surface',
  size = 'md',
  id = 'app-sidebar',
  className = '',
}: AppSidebarProps) {

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-app-sidebar]:not([data-bound])').forEach((sb) => {
        sb.dataset.bound = '';
        const btn = sb.querySelector<HTMLButtonElement>('[data-collapse]');
        const key = `${sb.id}:collapsed`;
        const set = (on: boolean) => {
          sb.classList.toggle('is-collapsed', on);
          btn?.setAttribute('aria-pressed', String(on));
          btn?.setAttribute('aria-label', on ? 'Expand sidebar' : 'Collapse sidebar');
        };
        try { set(window.localStorage.getItem(key) === '1'); } catch { /* ignore */ }
        btn?.addEventListener('click', () => {
          const on = !sb.classList.contains('is-collapsed');
          set(on);
          try { window.localStorage.setItem(key, on ? '1' : '0'); } catch { /* ignore */ }
        });
    
        // Mobile drawer: opened by any [data-sidebar-open="<id>"] button (AppTopbar's menu button).
        const backdrop = sb.nextElementSibling as HTMLElement | null;
        const open = (v: boolean) => {
          sb.classList.toggle('is-open', v);
          if (backdrop) backdrop.hidden = !v;
          document.querySelectorAll(`[data-sidebar-open="${sb.id}"]`).forEach((b) => b.setAttribute('aria-expanded', String(v)));
          if (v) sb.querySelector<HTMLElement>('a, button')?.focus();
        };
        document.querySelectorAll<HTMLElement>(`[data-sidebar-open="${sb.id}"]`).forEach((b) => b.addEventListener('click', () => open(!sb.classList.contains('is-open'))));
        backdrop?.addEventListener('click', () => open(false));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && sb.classList.contains('is-open')) open(false); });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <aside className={cx(['app-sb', `app-sb--${variant}`, `app-sb--${size}`, { 'app-sb--inline': !fullHeight }, className])} id={id} data-app-sidebar aria-label="Application" data-rk-ad73bd="">
        <div className="app-sb__top" data-rk-ad73bd="">
          <a className="app-sb__ws" href={groups[0]?.items[0]?.href ?? '#'} data-rk-ad73bd="">
            <span className="app-sb__ws-logo" aria-hidden="true" data-rk-ad73bd="">{workspace.initials ?? workspace.name.slice(0, 2).toUpperCase()}</span>
            <span className="app-sb__ws-text app-sb__label" data-rk-ad73bd="">
              <strong data-rk-ad73bd="">{workspace.name}</strong>
              {workspace.plan && <small data-rk-ad73bd="">{workspace.plan}</small>}
            </span>
          </a>
          {collapsible && (
            <button className="app-sb__collapse" type="button" aria-label="Collapse sidebar" aria-pressed="false" data-collapse data-rk-ad73bd="">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-ad73bd=""><rect x="3" y="3" width="18" height="18" rx="2" data-rk-ad73bd="" /><path d="M9 3v18" data-rk-ad73bd="" /></svg>
            </button>
          )}
        </div>
      
        <nav className="app-sb__nav" aria-label="Main" data-rk-ad73bd="">
          {groups.map((g, __i: number) => (
            <div key={__i} className="app-sb__group" data-rk-ad73bd="">
              {g.label && <p className="app-sb__group-label app-sb__label" data-rk-ad73bd="">{g.label}</p>}
              <ul data-rk-ad73bd="">
                {g.items.map((item, __i: number) => {
                  const active = item.href === currentHref;
                  return (
                    <li key={__i} data-rk-ad73bd="">
                      <a className={cx(['app-sb__link', { 'is-active': active }])} href={item.href} aria-current={active ? 'page' : undefined} data-tip={item.label} data-rk-ad73bd="">
                        <span className="app-sb__icon" aria-hidden="true" data-rk-ad73bd=""><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" data-rk-ad73bd=""><g dangerouslySetInnerHTML={{ __html: appIcon(item.icon) }} data-rk-ad73bd="" /></svg></span>
                        <span className="app-sb__text app-sb__label" data-rk-ad73bd="">{item.label}</span>
                        {item.badge !== undefined && <span className="app-sb__badge app-sb__label" data-rk-ad73bd="">{item.badge}</span>}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      
        {promo && (
          <a className="app-sb__promo app-sb__label" href={promo.href} data-rk-ad73bd="">
            <strong data-rk-ad73bd="">{promo.title}</strong>
            {promo.text && <span data-rk-ad73bd="">{promo.text}</span>}
            {promo.progress !== undefined && <span className="app-sb__meter" aria-hidden="true" data-rk-ad73bd=""><i style={st(`width: ${promo.progress}%`)} data-rk-ad73bd=""></i></span>}
            {promo.cta && <em data-rk-ad73bd="">{promo.cta} →</em>}
          </a>
        )}
      </aside>
      <div className="app-sb-backdrop" data-sidebar-backdrop hidden data-rk-ad73bd=""></div>
    </>
  );
}

export default AppSidebar;
