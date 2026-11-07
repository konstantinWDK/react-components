'use client';

import AgencyLayout from './AgencyLayout';
import AgencyHeroKinetic from '../../sections/AgencyHeroKinetic';
import AgencyPlatformsMarquee from '../../sections/AgencyPlatformsMarquee';
import AgencyServicePillars from '../../sections/AgencyServicePillars';
import AgencyResultsBand from '../../sections/AgencyResultsBand';
import AgencyWorkGrid from '../../sections/AgencyWorkGrid';
import AgencyProcessSteps from '../../sections/AgencyProcessSteps';
import AgencyQuotes from '../../sections/AgencyQuotes';
import AgencyAuditCta from '../../sections/AgencyAuditCta';
import { voltaAgency, agencyRoutes, agencyServiceHref, agencyCaseHref, type AgencySite, type AgencyRoutes } from './data';
import './AgencyHomePage.css';

/**
 * AgencyHomePage — Marketing agency home: kinetic hero, platforms marquee, service pillars
 * (Ads, SEO, Web), animated results, selected case studies, process, client quotes and the
 * free-audit lead magnet.
 *
 * Usage (src/pages/index.react):
 *   import { AgencyHomePage } from 'react-component-kit-ui/templates/agency';
 *   <AgencyHomePage />
 *
 * @param {AgencySite} site - Content and settings. Default: Volta demo agency.
 * @param {AgencyRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'dark'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface AgencyHomePageProps {
  site?: AgencySite;
  routes?: AgencyRoutes;
  theme?: 'light' | 'dark' | 'auto';
  noindex?: boolean;
}

export function AgencyHomePage({ site = voltaAgency, routes = agencyRoutes, theme = 'dark', noindex = false }: AgencyHomePageProps) {
  const pillars = site.services.map((s) => ({
    name: s.name, short: s.short, icon: s.icon, kpi: s.kpi, deliverables: s.deliverables.slice(0, 3),
    from: `From ${s.from}`, href: agencyServiceHref(routes, s.slug),
  }));
  const projects = site.cases.slice(0, 4).map((c) => ({
    slug: c.slug, client: c.client, title: c.title, category: c.category, services: c.services.slice(0, 2),
    result: c.result, year: c.year, hue: c.hue, href: agencyCaseHref(routes, c.slug),
  }));
  return (
    <>
      <AgencyLayout title={`${site.name} — Performance marketing, SEO & web`} description={site.tagline} site={site} routes={routes} currentHref={routes.home} theme={theme} noindex={noindex}>
        <AgencyHeroKinetic before="More customers from" words={['Google Ads', 'Meta', 'SEO', 'your website']} text={`${site.name} is a performance marketing agency. Paid ads, SEO and fast websites run by one senior team — measured in revenue, not clicks.`} primary={{ label: 'Get a free audit', href: '#audit' }} secondary={{ label: 'See results', href: routes.work }} proof={{ count: '140+', label: 'brands growing with us since 2017', people: site.team.slice(0, 4).map((p) => p.name) }} stickers={['ROAS ↑', 'Page 1', '0.8s']} />
      
        <AgencyPlatformsMarquee platforms={site.platforms} />
      
        <div className="volta-wrap section-space" data-rk-180dcb="">
          <AgencyServicePillars services={pillars} featured={0} />
        </div>
      
        <div className="volta-wrap" data-rk-180dcb="">
          <AgencyResultsBand stats={site.stats} title="Numbers our clients take to the board meeting" />
        </div>
      
        <div className="volta-wrap section-space" data-rk-180dcb="">
          <AgencyWorkGrid eyebrow="Case studies" title="Growth we can prove" projects={projects} link={{ label: 'All case studies', href: routes.work }} />
        </div>
      
        <div className="volta-wrap section-space home-tight" data-rk-180dcb="">
          <AgencyProcessSteps steps={site.process} cta={{ label: 'Start with a free audit', href: '#audit' }} />
        </div>
      
        <div className="volta-wrap section-space" data-rk-180dcb="">
          <AgencyQuotes quotes={site.quotes} />
        </div>
      
        <div className="volta-wrap section-space home-tight" data-rk-180dcb="">
          <AgencyAuditCta cta={{ label: 'Book my free strategy call', href: routes.contact }} />
        </div>
      </AgencyLayout>
    </>
  );
}

export default AgencyHomePage;
