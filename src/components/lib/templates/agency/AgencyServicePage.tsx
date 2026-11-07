'use client';

import AgencyLayout from './AgencyLayout';
import AgencyPageHero from '../../sections/AgencyPageHero';
import AgencyServiceOverview from '../../sections/AgencyServiceOverview';
import AgencyRoiCalculator from '../../sections/AgencyRoiCalculator';
import AgencyAuditCta from '../../sections/AgencyAuditCta';
import AgencyProcessSteps from '../../sections/AgencyProcessSteps';
import AgencyWorkGrid from '../../sections/AgencyWorkGrid';
import AgencyPricingPackages from '../../sections/AgencyPricingPackages';
import FaqTwoColumn from '../../sections/FaqTwoColumn';
import { voltaAgency, agencyRoutes, agencyCaseHref, type AgencySite, type AgencyRoutes } from './data';
import './AgencyServicePage.css';

/**
 * AgencyServicePage — One service (Paid Ads, SEO or Web Development): hero with outcomes, what's
 * included, an interactive tool (ROI calculator for ads, free audit for SEO and web), process,
 * related case studies, the service's pricing packages and FAQ.
 *
 * Usage (src/pages/services/[slug].react):
 *   import { AgencyServicePage, voltaAgency } from 'react-component-kit-ui/templates/agency';
 *   export function getStaticPaths() {
 *     return voltaAgency.services.map((s) => ({ params: { slug: s.slug } }));
 *   }
 *   <AgencyServicePage slug={Astro.params.slug} />
 *
 * @param {string} slug - Service slug ('ads' | 'seo' | 'web').
 * @param {AgencySite} site - Content and settings. Default: Volta demo agency.
 * @param {AgencyRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'dark'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface AgencyServicePageProps {
  slug: string;
  site?: AgencySite;
  routes?: AgencyRoutes;
  theme?: 'light' | 'dark' | 'auto';
  noindex?: boolean;
}

export function AgencyServicePage({ slug, site = voltaAgency, routes = agencyRoutes, theme = 'dark', noindex = false }: AgencyServicePageProps) {
  const service = site.services.find((s) => s.slug === slug) ?? site.services[0];
  
  const titles: Record<string, string> = {
    ads: 'Ads that pay for *themselves*',
    seo: 'Traffic you don’t pay *per click*',
    web: 'Websites that *convert*',
  };
  const category = { ads: 'Ads', seo: 'SEO', web: 'Web' }[service.slug];
  const related = site.cases
    .filter((c) => c.category === category)
    .concat(site.cases.filter((c) => c.category !== category))
    .slice(0, 3)
    .map((c) => ({ slug: c.slug, client: c.client, title: c.title, category: c.category, services: c.services.slice(0, 2), result: c.result, year: c.year, hue: c.hue, href: agencyCaseHref(routes, c.slug) }));
  return (
    <>
      <AgencyLayout title={service.name} description={service.short} site={site} routes={routes} currentHref={`${routes.service}${service.slug}/`} theme={theme} noindex={noindex}>
        <AgencyPageHero eyebrow={service.name} title={titles[service.slug] ?? service.name} text={service.pitch} breadcrumb={[{ label: 'Home', href: routes.home }, { label: 'Services', href: routes.services }, { label: service.name }]} cta={{ label: service.slug === 'ads' ? 'Calculate my ROI' : 'Get a free audit', href: service.slug === 'ads' ? '#roi' : '#audit' }} facts={[...service.outcomes, { value: service.from, label: service.slug === 'web' ? 'projects from' : 'retainers from' }]} />
      
        <div className="volta-wrap section-space" data-rk-ce1d3a="">
          <AgencyServiceOverview title={`Everything in our ${service.name} service`} text={service.short} included={service.included} outcomes={service.outcomes.slice(0, 2)} tools={service.tools} cta={{ label: 'Talk to a specialist', href: routes.contact }} />
        </div>
      
        <div className="volta-wrap section-tight" id={service.slug === 'ads' ? 'roi' : undefined} data-rk-ce1d3a="">
          {service.slug === 'ads'
            ? <AgencyRoiCalculator upliftLabel={`With ${site.name}`} currency={site.currency} locale={site.locale} cta={{ label: 'Get a custom forecast', href: routes.contact }} />
            : <AgencyAuditCta eyebrow={service.slug === 'seo' ? 'Free SEO audit' : 'Free website audit'} title={service.slug === 'seo' ? 'Find out what is holding your rankings back' : 'How fast — and how convincing — is your website?'} cta={{ label: 'Book my free strategy call', href: routes.contact }} />}
        </div>
      
        <div className="volta-wrap section-space" data-rk-ce1d3a="">
          <AgencyProcessSteps title={`How a ${service.name} engagement runs`} steps={service.process} />
        </div>
      
        <div className="volta-wrap section-space home-tight" data-rk-ce1d3a="">
          <AgencyWorkGrid eyebrow="Proof" title={`${service.name} results`} projects={related} filters={false} variant="grid" link={{ label: 'All case studies', href: routes.work }} />
        </div>
      
        <div className="volta-wrap section-space" data-rk-ce1d3a="">
          <AgencyPricingPackages eyebrow="Pricing" title={`${service.name} packages`} tabs={[{ id: service.slug, label: service.name, packages: site.pricing[service.slug] }]} currency={site.currency} locale={site.locale} cta={{ label: 'Get started', href: routes.contact }} />
        </div>
      
        <div className="volta-wrap section-space home-tight" data-rk-ce1d3a="">
          <FaqTwoColumn title={`${service.name} questions`} subtitle="Still unsure? We answer every message within one business day." items={service.faqs.map((f) => ({ q: f.question, a: f.answer }))} support={{ label: 'Ask us anything', href: routes.contact }} />
        </div>
      </AgencyLayout>
    </>
  );
}

export default AgencyServicePage;
