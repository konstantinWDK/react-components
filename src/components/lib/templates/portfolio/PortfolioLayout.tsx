'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import '../../../../styles/global.css';
import DevHeader from '../../sections/DevHeader';
import DevFooter from '../../sections/DevFooter';
import { keycapPortfolio, portfolioRoutes, type PortfolioSite, type PortfolioRoutes } from './data';
import './PortfolioLayout.css';

/**
 * PortfolioLayout — Full HTML document for the developer portfolio template ("Keycap"): DevHeader,
 * main slot and DevFooter. Owns the monochrome keyboard look through design tokens: pure white
 * paper and black ink in light mode (default), near-black paper and white ink in dark mode. The 3D
 * sections read the same tokens and redraw when the theme changes.
 *
 * @param {string} title - Page title (site name is appended).
 * @param {string} description - Meta description.
 * @param {PortfolioSite} site - Content and settings. Default: Keycap demo developer.
 * @param {PortfolioRoutes} routes - Page URLs.
 * @param {string} currentHref - Highlights the matching menu link.
 * @param {string} theme - Initial theme (light|dark|auto). The header toggle overrides it per visitor. Default 'light'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 * @param {string} lang - Document language. Default 'en'.
 */
export interface PortfolioLayoutProps {
  title: string;
  description?: string;
  site?: PortfolioSite;
  routes?: PortfolioRoutes;
  currentHref?: string;
  theme?: 'light' | 'dark' | 'auto';
  noindex?: boolean;
  lang?: string;
  children?: ReactNode;
  head?: ReactNode;
}

export function PortfolioLayout({ title, description, site = keycapPortfolio, routes = portfolioRoutes, currentHref, theme = 'light', noindex = false, lang = 'en',
  children,
  head
}: PortfolioLayoutProps) {
  const fullTitle = title.includes(site.name) ? title : `${title} · ${site.name}`;
  const links = [
    { label: 'Home', href: routes.home },
    { label: 'Projects', href: routes.projects },
    { label: 'Blog', href: routes.blog },
    { label: 'Contact', href: routes.contact },
  ];

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    // <html>/<body> attributes of the React layout
    if (!document.documentElement.hasAttribute("lang")) document.documentElement.setAttribute("lang", String((lang)));
    document.documentElement.classList.add(...String("theme-keycap").split(/\s+/).filter(Boolean));
    if (!document.documentElement.hasAttribute("data-theme")) document.documentElement.setAttribute("data-theme", String((theme === 'auto' ? 'light' : theme)));
    document.body.classList.add(...String("keycap").split(/\s+/).filter(Boolean));

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
          
          
          <title data-rk-7db784="">{fullTitle}</title>
          {description && <meta name="description" content={description} data-rk-7db784="" />}
          {noindex && <meta name="robots" content="noindex, follow" data-rk-7db784="" />}
          <link rel="preconnect" href="https://fonts.googleapis.com" data-rk-7db784="" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" data-rk-7db784="" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400..900&family=JetBrains+Mono:wght@400..800&display=swap" rel="stylesheet" data-rk-7db784="" />
          
          {head}
        </>
        <>
          <a className="keycap__skip" href="#main" data-rk-7db784="">Skip to content</a>
          <DevHeader logo={site.logo} logoHref={routes.home} links={links} currentHref={currentHref} data-rk-7db784="" />
          <main id="main" className="keycap__main" tabIndex={-1} data-rk-7db784="">
            {children}
          </main>
          <DevFooter name={site.name} links={[...links, { label: 'GitHub', href: site.contacts.find((c) => c.kind === 'github')?.href ?? '#' }]} note="Keycap theme · React & Three.js" />
        </>
      </>
    </>
  );
}

export default PortfolioLayout;
