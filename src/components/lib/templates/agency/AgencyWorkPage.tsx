'use client';

import AgencyLayout from './AgencyLayout';
import AgencyPageHero from '../../sections/AgencyPageHero';
import AgencyWorkGrid from '../../sections/AgencyWorkGrid';
import AgencyResultsBand from '../../sections/AgencyResultsBand';
import AgencyQuotes from '../../sections/AgencyQuotes';
import { voltaAgency, agencyRoutes, agencyCaseHref, type AgencySite, type AgencyRoutes } from './data';
import './AgencyWorkPage.css';

/**
 * AgencyWorkPage — Case studies index: page hero, filterable case-study grid (Ads, SEO, Web),
 * results band and client quotes.
 *
 * Usage (src/pages/work/index.react):
 *   import { AgencyWorkPage } from 'react-component-kit-ui/templates/agency';
 *   <AgencyWorkPage />
 *
 * @param {AgencySite} site - Content and settings. Default: Volta demo agency.
 * @param {AgencyRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'dark'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface AgencyWorkPageProps {
  site?: AgencySite;
  routes?: AgencyRoutes;
  theme?: 'light' | 'dark' | 'auto';
  noindex?: boolean;
}

export function AgencyWorkPage({ site = voltaAgency, routes = agencyRoutes, theme = 'dark', noindex = false }: AgencyWorkPageProps) {
  const projects = site.cases.map((c) => ({
    slug: c.slug, client: c.client, title: c.title, category: c.category, services: c.services.slice(0, 2),
    result: c.result, year: c.year, hue: c.hue, href: agencyCaseHref(routes, c.slug),
  }));
  return (
    <>
      <AgencyLayout title="Case studies" description={`Results ${site.name} delivered with paid ads, SEO and websites.`} site={site} routes={routes} currentHref={routes.work} theme={theme} noindex={noindex}>
        <AgencyPageHero eyebrow="Case studies" title="Results, with the *numbers*" text="Every case study shows the starting point, what we changed and the outcome — measured in revenue, pipeline or leads." breadcrumb={[{ label: 'Home', href: routes.home }, { label: 'Case studies' }]} facts={[]} />
      
        <div className="volta-wrap section-tight" data-rk-e5315a="">
          <AgencyWorkGrid eyebrow={`${projects.length} projects`} title="Filter by service" projects={projects} link={{ label: 'Get results like these', href: routes.contact }} />
        </div>
      
        <div className="volta-wrap section-space" data-rk-e5315a="">
          <AgencyResultsBand stats={site.stats} variant="accent" />
        </div>
      
        <div className="volta-wrap section-space home-tight" data-rk-e5315a="">
          <AgencyQuotes quotes={site.quotes} />
        </div>
      </AgencyLayout>
    </>
  );
}

export default AgencyWorkPage;
