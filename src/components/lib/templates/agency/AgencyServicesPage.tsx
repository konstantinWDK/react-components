'use client';

import AgencyLayout from './AgencyLayout';
import AgencyPageHero from '../../sections/AgencyPageHero';
import AgencyServicesList from '../../sections/AgencyServicesList';
import AgencyServicePillars from '../../sections/AgencyServicePillars';
import AgencyProcessSteps from '../../sections/AgencyProcessSteps';
import AgencyResultsBand from '../../sections/AgencyResultsBand';
import AgencyAuditCta from '../../sections/AgencyAuditCta';
import { voltaAgency, agencyRoutes, agencyServiceHref, type AgencySite, type AgencyRoutes } from './data';

/**
 * AgencyServicesPage — Services overview: page hero, expandable service rows (pitch,
 * deliverables, timeline and price) linking to each service page, process, results and audit CTA.
 *
 * Usage (src/pages/services/index.react):
 *   import { AgencyServicesPage } from 'react-component-kit-ui/templates/agency';
 *   <AgencyServicesPage />
 *
 * @param {AgencySite} site - Content and settings. Default: Volta demo agency.
 * @param {AgencyRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'dark'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface AgencyServicesPageProps {
  site?: AgencySite;
  routes?: AgencyRoutes;
  theme?: 'light' | 'dark' | 'auto';
  noindex?: boolean;
}

export function AgencyServicesPage({ site = voltaAgency, routes = agencyRoutes, theme = 'dark', noindex = false }: AgencyServicesPageProps) {
  const rows = site.services.map((s) => ({
    name: s.name, pitch: s.pitch, deliverables: s.deliverables, timeline: s.timeline, from: s.from, href: agencyServiceHref(routes, s.slug),
  }));
  const pillars = site.services.map((s) => ({
    name: s.name, short: s.short, icon: s.icon, kpi: s.kpi, from: `From ${s.from}`, href: agencyServiceHref(routes, s.slug),
  }));
  return (
    <>
      <AgencyLayout title="Services" description={`Paid ads, SEO and web development by ${site.name}.`} site={site} routes={routes} currentHref={routes.services} theme={theme} noindex={noindex}>
        <AgencyPageHero eyebrow="Services" title="Three channels, *one* growth team" text="Paid ads bring customers now, SEO compounds over time and your website converts both. We run all three with one plan and one dashboard." breadcrumb={[{ label: 'Home', href: routes.home }, { label: 'Services' }]} cta={{ label: 'Get a free audit', href: '#audit' }} facts={site.stats.slice(0, 3)} />
      
        <div className="volta-wrap section-tight">
          <AgencyServicePillars eyebrow="Choose a channel" title="Start where the *fastest* win is" text="" services={pillars} featured={-1} linkLabel="See the service" />
        </div>
      
        <div className="volta-wrap section-space">
          <AgencyServicesList eyebrow="In detail" title="What each service includes" services={rows} open={0} />
        </div>
      
        <div className="volta-wrap section-space">
          <AgencyProcessSteps steps={site.process} />
        </div>
      
        <div className="volta-wrap">
          <AgencyResultsBand stats={site.stats} variant="outline" />
        </div>
      
        <div className="volta-wrap section-space">
          <AgencyAuditCta cta={{ label: 'Book my free strategy call', href: routes.contact }} />
        </div>
      </AgencyLayout>
    </>
  );
}

export default AgencyServicesPage;
