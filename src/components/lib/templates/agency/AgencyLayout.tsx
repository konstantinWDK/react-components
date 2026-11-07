'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import '../../../../styles/global.css';
import AgencyHeader from '../../sections/AgencyHeader';
import AgencyFooterCta from '../../sections/AgencyFooterCta';
import { voltaAgency, agencyRoutes, agencyServiceHref, type AgencySite, type AgencyRoutes } from './data';
import './AgencyLayout.css';

/**
 * AgencyLayout — Full HTML document for the marketing agency template: AgencyHeader (pill nav
 * with theme toggle and CTA), main slot and AgencyFooterCta. Owns the "Volta" look through design
 * tokens: tight grotesque type, lime accent, near-black dark theme and a warm light theme.
 *
 * @param {string} title - Page title (agency name is appended).
 * @param {string} description - Meta description.
 * @param {AgencySite} site - Content and settings. Default: Volta demo agency.
 * @param {AgencyRoutes} routes - Page URLs.
 * @param {string} currentHref - Highlights the matching menu link.
 * @param {string} theme - Initial theme (light|dark|auto). The header toggle overrides it per visitor. Default 'dark'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 * @param {string} lang - Document language. Default 'en'.
 */
export interface AgencyLayoutProps {
  title: string;
  description?: string;
  site?: AgencySite;
  routes?: AgencyRoutes;
  currentHref?: string;
  theme?: 'light' | 'dark' | 'auto';
  noindex?: boolean;
  lang?: string;
  children?: ReactNode;
  head?: ReactNode;
}

export function AgencyLayout({
  title,
  description,
  site = voltaAgency,
  routes = agencyRoutes,
  currentHref,
  theme = 'dark',
  noindex = false,
  lang = 'en',
  children,
  head
}: AgencyLayoutProps) {
  const fullTitle = title.includes(site.name) ? title : `${title} — ${site.name}`;
  const links = [
    { label: 'Services', href: routes.services },
    { label: 'Work', href: routes.work },
    { label: 'Pricing', href: routes.pricing },
    { label: 'About', href: routes.about },
  ];
  // Service and case-study pages highlight their parent menu item.
  const active = currentHref && links.find((l) => l.href !== routes.home && currentHref.startsWith(l.href))?.href;
  const footerColumns = [
    { title: 'Services', links: site.services.map((s) => ({ label: s.name, href: agencyServiceHref(routes, s.slug) })) },
    { title: 'Agency', links: [{ label: 'Case studies', href: routes.work }, { label: 'Pricing', href: routes.pricing }, { label: 'About', href: routes.about }, { label: 'Contact', href: routes.contact }] },
    { title: 'Resources', links: [{ label: 'Free audit', href: `${routes.home}#audit` }, { label: 'ROI calculator', href: `${agencyServiceHref(routes, 'ads')}#roi` }, { label: 'Privacy', href: '#' }] },
  ];

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    // <html>/<body> attributes of the React layout
    if (!document.documentElement.hasAttribute("lang")) document.documentElement.setAttribute("lang", String((lang)));
    document.documentElement.classList.add(...String("theme-volta").split(/\s+/).filter(Boolean));
    if (!document.documentElement.hasAttribute("data-theme")) document.documentElement.setAttribute("data-theme", String((theme === 'auto' ? 'dark' : theme)));
    document.body.classList.add(...String("volta").split(/\s+/).filter(Boolean));

    const { initial }: Record<string, any> = { initial: theme };
    
          (function () {
            var t = initial;
            try { t = localStorage.getItem('ack-theme') || t; } catch (e) {}
            if (t === 'auto') t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
            document.documentElement.dataset.theme = t;
          })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <>
        <>
          
          
          <title data-rk-7f7903="">{fullTitle}</title>
          {description && <meta name="description" content={description} data-rk-7f7903="" />}
          {noindex && <meta name="robots" content="noindex, follow" data-rk-7f7903="" />}
          <link rel="preconnect" href="https://fonts.googleapis.com" data-rk-7f7903="" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" data-rk-7f7903="" />
          <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400..900&display=swap" rel="stylesheet" data-rk-7f7903="" />
          
          {head}
        </>
        <>
          <a className="volta__skip" href="#main" data-rk-7f7903="">Skip to content</a>
          <AgencyHeader brand={site.name} brandHref={routes.home} links={links} cta={{ label: 'Free audit', href: routes.contact }} currentHref={active || currentHref} data-rk-7f7903="" />
          <main id="main" className="volta__main" tabIndex={-1} data-rk-7f7903="">
            {children}
          </main>
          <AgencyFooterCta kicker="Ready to grow?" cta={{ label: "Let's talk", href: routes.contact }} email={site.email} columns={footerColumns} offices={site.offices} socials={site.socials} brand={site.name} />
        </>
      </>
    </>
  );
}

export default AgencyLayout;
