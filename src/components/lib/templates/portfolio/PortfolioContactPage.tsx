'use client';

import PortfolioLayout from './PortfolioLayout';
import DevPageHero from '../../sections/DevPageHero';
import DevMonitor from '../../sections/DevMonitor';
import DevContactForm from '../../sections/DevContactForm';
import { keycapPortfolio, portfolioRoutes, type PortfolioSite, type PortfolioRoutes } from './data';

/**
 * PortfolioContactPage — Contact: page hero with a 3D monitor, project inquiry form (type keys,
 * budget, message, inline validation) and an aside with availability and direct contacts.
 *
 * Usage (src/pages/contact.react):
 *   import { PortfolioContactPage } from 'react-component-kit-ui/templates/portfolio';
 *   <PortfolioContactPage action="https://your-backend/contact" />
 *
 * @param {string} action - Form endpoint. Without it the form runs in demo mode (validates and shows success).
 * @param {PortfolioSite} site - Content and settings.
 * @param {PortfolioRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'light'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface PortfolioContactPageProps {
  action?: string;
  site?: PortfolioSite;
  routes?: PortfolioRoutes;
  theme?: 'light' | 'dark' | 'auto';
  noindex?: boolean;
}

export function PortfolioContactPage({ action, site = keycapPortfolio, routes = portfolioRoutes, theme = 'light', noindex = false }: PortfolioContactPageProps) {
  return (
    <>
      <PortfolioLayout title="Contact" description={`Contact ${site.name} — ${site.status.toLowerCase()}.`} site={site} routes={routes} currentHref={routes.contact} theme={theme} noindex={noindex}>
        <DevPageHero label="CONTACT // OPEN_CHANNEL" title="Let's build" titleAccent="something good." text={`${site.status} · ${site.location}. Share a few details and I'll get back to you with next steps.`}>
          <DevMonitor lines={['$ ping ' + site.githubUser, '> 64 bytes: time=0.4ms', '$ status --availability', `> ${site.status.toLowerCase()}`, '$ mail --to hello', '> ready when you are']} prompt="guest@contact:~$" height="340px" label="Contact terminal" />
        </DevPageHero>
        <DevContactForm action={action} contacts={site.contacts.map((c) => ({ label: c.label, value: c.value, href: c.href }))} />
      </PortfolioLayout>
    </>
  );
}

export default PortfolioContactPage;
