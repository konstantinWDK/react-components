'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import '../../../../styles/global.css';
import './lobby-theme.css';
import AppSidebar from '../../app/AppSidebar';
import AppTopbar from '../../app/AppTopbar';
import { lobbyData, saasRoutes, type LobbyData, type SaasRoutes } from './data';

/**
 * AppLayout — Full HTML document for the hotel SaaS app: AppSidebar + AppTopbar + content area.
 * Owns the "Lobby" look through tokens (cobalt accent, slate surfaces) with light and dark palettes.
 *
 * @param {string} title - Page title (product name is appended).
 * @param {string} description - Meta description.
 * @param {string} current - Active route key (dashboard|reservations|rooms|guests|reports|settings).
 * @param {LobbyData} data - Demo/workspace data. Default: Hotel Mirador.
 * @param {SaasRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). The topbar toggle overrides it. Default 'light'.
 * @param {boolean} noindex - Add robots noindex. Default true (app pages are private).
 * @param {string} lang - Document language. Default 'en'.
 */
export interface AppLayoutProps {
  title: string;
  description?: string;
  current?: 'dashboard' | 'reservations' | 'rooms' | 'guests' | 'reports' | 'settings';
  data?: LobbyData;
  routes?: SaasRoutes;
  theme?: 'light' | 'dark' | 'auto';
  noindex?: boolean;
  lang?: string;
  children?: ReactNode;
}

export function AppLayout({ title, description, current = 'dashboard', data = lobbyData, routes = saasRoutes, theme = 'light', noindex = true, lang = 'en',
  children
}: AppLayoutProps) {
  const pending = data.reservations.filter((r) => r.status === 'Pending').length;
  const dirty = data.housekeeping.filter((r) => r.status === 'dirty').length;
  const groups = [
    { items: [
      { label: 'Dashboard', href: routes.dashboard, icon: 'dashboard' },
      { label: 'Reservations', href: routes.reservations, icon: 'calendar', badge: pending || undefined },
      { label: 'Rooms', href: routes.rooms, icon: 'bed', badge: dirty || undefined },
      { label: 'Guests', href: routes.guests, icon: 'users' },
    ] },
    { label: 'Insights', items: [{ label: 'Reports', href: routes.reports, icon: 'chart' }] },
    { label: 'Workspace', items: [{ label: 'Settings', href: routes.settings, icon: 'settings' }] },
  ];
  const currentHref = routes[current];

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    // <html>/<body> attributes of the Astro layout
    if (!document.documentElement.hasAttribute("lang")) document.documentElement.setAttribute("lang", String((lang)));
    document.documentElement.classList.add(...String("theme-lobby").split(/\s+/).filter(Boolean));
    if (!document.documentElement.hasAttribute("data-theme")) document.documentElement.setAttribute("data-theme", String((theme === 'auto' ? 'light' : theme)));
    document.body.classList.add(...String("lobby").split(/\s+/).filter(Boolean));

    const { initial }: Record<string, any> = { initial: theme };
    
          (function () {
            var t = initial;
            try { t = localStorage.getItem('ack-theme') || t; } catch (e) {}
            if (t === 'auto') t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.documentElement.dataset.theme = t;
          })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <>
        <>
          
          
          <title>{`${title} · ${data.workspace.name} — ${data.product}`}</title>
          {description && <meta name="description" content={description} />}
          {noindex && <meta name="robots" content="noindex, follow" />}
          
        </>
        <>
          <a className="lobby__skip" href="#main">Skip to content</a>
          <div className="lobby__shell">
            <AppSidebar workspace={data.workspace} groups={groups} currentHref={currentHref} promo={{ title: 'Channel manager', text: '4 of 5 channels in sync', href: routes.settings, cta: 'Connect Airbnb', progress: 80 }} />
            <div className="lobby__main">
              <AppTopbar notifications={data.notifications} user={data.user} userLinks={[{ label: 'Your profile', href: routes.settings }, { label: 'Team & billing', href: `${routes.settings}#team` }]} signOutHref={routes.signIn} />
              <main id="main" className="lobby__content" tabIndex={-1}>
                {children}
              </main>
            </div>
          </div>
        </>
      </>
    </>
  );
}

export default AppLayout;
