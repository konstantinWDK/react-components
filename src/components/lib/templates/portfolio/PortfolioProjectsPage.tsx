'use client';

import PortfolioLayout from './PortfolioLayout';
import DevPageHero from '../../sections/DevPageHero';
import DevProjectGrid from '../../sections/DevProjectGrid';
import DevContact from '../../sections/DevContact';
import { keycapPortfolio, portfolioRoutes, portfolioProjectHref, type PortfolioSite, type PortfolioRoutes } from './data';

/**
 * PortfolioProjectsPage — All projects: page hero and a filterable grid of keycap-style project
 * cards (category keys, stack, status and stars), followed by the contact block.
 *
 * Usage (src/pages/projects/index.react):
 *   import { PortfolioProjectsPage } from 'react-component-kit-ui/templates/portfolio';
 *   <PortfolioProjectsPage />
 *
 * @param {PortfolioSite} site - Content and settings.
 * @param {PortfolioRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'light'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface PortfolioProjectsPageProps {
  site?: PortfolioSite;
  routes?: PortfolioRoutes;
  theme?: 'light' | 'dark' | 'auto';
  noindex?: boolean;
}

export function PortfolioProjectsPage({ site = keycapPortfolio, routes = portfolioRoutes, theme = 'light', noindex = false }: PortfolioProjectsPageProps) {
  return (
    <>
      <PortfolioLayout title="Projects" description={`Projects by ${site.name}: ${site.projects.map((p) => p.title).join(', ')}.`} site={site} routes={routes} currentHref={routes.projects} theme={theme} noindex={noindex}>
        <DevPageHero label={`${String(site.projects.length).padStart(2, '0')} PROJECTS // INDEX`} title="Things I've" titleAccent="built & shipped." text="Products, libraries and experiments — from accessible UI kits to 3D experiences and developer tools. Each one has a short case study." />
        <DevProjectGrid projects={site.projects.map((p) => ({
            title: p.title, tagline: p.tagline, category: p.category, technologies: p.technologies,
            status: p.status, year: p.year, stars: p.stars, href: portfolioProjectHref(routes, p.slug),
          }))} />
        <DevContact title="Have a project in mind?" contacts={site.contacts.slice(0, 2)} cta={{ label: 'Get in touch', href: routes.contact }} />
      </PortfolioLayout>
    </>
  );
}

export default PortfolioProjectsPage;
