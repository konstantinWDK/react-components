'use client';

import AgencyLayout from './AgencyLayout';
import AgencyCaseStudyHero from '../../sections/AgencyCaseStudyHero';
import AgencyCaseResults from '../../sections/AgencyCaseResults';
import AgencyWorkGrid from '../../sections/AgencyWorkGrid';
import AgencyAuditCta from '../../sections/AgencyAuditCta';
import { voltaAgency, agencyRoutes, agencyCaseHref, type AgencySite, type AgencyRoutes } from './data';
import './AgencyCaseStudyPage.css';

/**
 * AgencyCaseStudyPage — One case study: hero with headline result and facts, challenge,
 * approach, before/after metrics, 12-month results chart, client quote and more work.
 *
 * Usage (src/pages/work/[slug].react):
 *   import { AgencyCaseStudyPage, voltaAgency } from 'react-component-kit-ui/templates/agency';
 *   export function getStaticPaths() {
 *     return voltaAgency.cases.map((c) => ({ params: { slug: c.slug } }));
 *   }
 *   <AgencyCaseStudyPage slug={Astro.params.slug} />
 *
 * @param {string} slug - Case-study slug.
 * @param {AgencySite} site - Content and settings. Default: Volta demo agency.
 * @param {AgencyRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'dark'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface AgencyCaseStudyPageProps {
  slug: string;
  site?: AgencySite;
  routes?: AgencyRoutes;
  theme?: 'light' | 'dark' | 'auto';
  noindex?: boolean;
}

export function AgencyCaseStudyPage({ slug, site = voltaAgency, routes = agencyRoutes, theme = 'dark', noindex = false }: AgencyCaseStudyPageProps) {
  const index = Math.max(0, site.cases.findIndex((c) => c.slug === slug));
  const c = site.cases[index];
  const more = [1, 2, 3]
    .map((n) => site.cases[(index + n) % site.cases.length])
    .filter((x) => x.slug !== c.slug)
    .map((x) => ({ slug: x.slug, client: x.client, title: x.title, category: x.category, services: x.services.slice(0, 2), result: x.result, year: x.year, hue: x.hue, href: agencyCaseHref(routes, x.slug) }));
  return (
    <>
      <AgencyLayout title={`${c.client} case study`} description={c.summary} site={site} routes={routes} currentHref={agencyCaseHref(routes, c.slug)} theme={theme} noindex={noindex}>
        <AgencyCaseStudyHero client={c.client} category={c.category} title={c.title} summary={c.summary} result={c.result} hue={c.hue} facts={[
            { label: 'Industry', value: c.industry },
            { label: 'Services', value: c.services.join(', ') },
            { label: 'Duration', value: c.duration },
            { label: 'Year', value: c.year },
          ]} back={{ label: 'All case studies', href: routes.work }} />
      
        <div className="volta-wrap section-space" data-rk-a76f5f="">
          <AgencyCaseResults challenge={c.challenge} approach={c.approach} metrics={c.metrics} series={c.series} seriesLabel={c.seriesLabel} quote={c.quote} />
        </div>
      
        <div className="volta-wrap section-space home-tight" data-rk-a76f5f="">
          <AgencyWorkGrid eyebrow="Next" title="More results" projects={more} filters={false} variant="grid" link={{ label: 'All case studies', href: routes.work }} />
        </div>
      
        <div className="volta-wrap section-space home-tight" data-rk-a76f5f="">
          <AgencyAuditCta title="Want results like these?" cta={{ label: 'Book my free strategy call', href: routes.contact }} />
        </div>
      </AgencyLayout>
    </>
  );
}

export default AgencyCaseStudyPage;
