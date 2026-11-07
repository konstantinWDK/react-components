'use client';

import AgencyLayout from './AgencyLayout';
import AgencyPageHero from '../../sections/AgencyPageHero';
import AgencyServicePillars from '../../sections/AgencyServicePillars';
import AgencyResultsBand from '../../sections/AgencyResultsBand';
import AgencyTeamGrid from '../../sections/AgencyTeamGrid';
import AgencyPlatformsMarquee from '../../sections/AgencyPlatformsMarquee';
import { voltaAgency, agencyRoutes, type AgencySite, type AgencyRoutes } from './data';
import './AgencyAboutPage.css';

/**
 * AgencyAboutPage — About the agency: page hero, values, results band, team grid with
 * "we're hiring" card and certified platforms.
 *
 * Usage (src/pages/about.react):
 *   import { AgencyAboutPage } from 'react-component-kit-ui/templates/agency';
 *   <AgencyAboutPage />
 *
 * @param {AgencySite} site - Content and settings. Default: Volta demo agency.
 * @param {AgencyRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'dark'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface AgencyAboutPageProps {
  site?: AgencySite;
  routes?: AgencyRoutes;
  theme?: 'light' | 'dark' | 'auto';
  noindex?: boolean;
}

export function AgencyAboutPage({ site = voltaAgency, routes = agencyRoutes, theme = 'dark', noindex = false }: AgencyAboutPageProps) {
  const valueIcons = ['data', 'social', 'web'] as const;
  const values = site.values.map((v, i) => ({ name: v.title, short: v.text, icon: valueIcons[i % valueIcons.length] }));
  return (
    <>
      <AgencyLayout title="About" description={`${site.name} is an independent performance marketing agency.`} site={site} routes={routes} currentHref={routes.about} theme={theme} noindex={noindex}>
        <AgencyPageHero eyebrow="About us" title="Marketers who *read* the numbers" text={`${site.name} started in 2017 with one belief: marketing should be measured like any other investment. Today we are 30 specialists across Madrid and Lisbon.`} breadcrumb={[{ label: 'Home', href: routes.home }, { label: 'About' }]} facts={[
            { value: '2017', label: 'founded' },
            { value: '30', label: 'specialists' },
            { value: '140+', label: 'clients' },
            { value: '4', label: 'languages' },
          ]} />
      
        <div className="volta-wrap section-tight" data-rk-6d5612="">
          <AgencyServicePillars eyebrow="What we believe" title="Three *promises* to every client" text="" services={values} featured={0} />
        </div>
      
        <div className="volta-wrap section-space" data-rk-6d5612="">
          <AgencyResultsBand stats={site.stats} variant="dark" />
        </div>
      
        <div className="volta-wrap section-space home-tight" data-rk-6d5612="">
          <AgencyTeamGrid eyebrow="The team" title="Specialists, not account managers" text="You work directly with the people who run your campaigns, write your content and build your site." people={site.team.slice(0, 7)} hiring={{ title: 'We are hiring', text: 'Paid media buyers and SEO specialists — hybrid in Madrid or Lisbon.', href: routes.contact, label: 'See open roles' }} />
        </div>
      
        <AgencyPlatformsMarquee title="Certified partners" platforms={site.platforms} />
      </AgencyLayout>
    </>
  );
}

export default AgencyAboutPage;
