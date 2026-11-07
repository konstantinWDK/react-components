'use client';

import AgencyLayout from './AgencyLayout';
import AgencyPageHero from '../../sections/AgencyPageHero';
import AgencyPricingPackages from '../../sections/AgencyPricingPackages';
import AgencyRoiCalculator from '../../sections/AgencyRoiCalculator';
import FaqTwoColumn from '../../sections/FaqTwoColumn';
import { voltaAgency, agencyRoutes, type AgencySite, type AgencyRoutes } from './data';
import './AgencyPricingPage.css';

/**
 * AgencyPricingPage — Pricing: page hero, packages per service with a billing switch, the ads ROI
 * calculator, FAQ and audit CTA.
 *
 * Usage (src/pages/pricing.react):
 *   import { AgencyPricingPage } from 'react-component-kit-ui/templates/agency';
 *   <AgencyPricingPage />
 *
 * @param {AgencySite} site - Content and settings. Default: Volta demo agency.
 * @param {AgencyRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'dark'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface AgencyPricingPageProps {
  site?: AgencySite;
  routes?: AgencyRoutes;
  theme?: 'light' | 'dark' | 'auto';
  noindex?: boolean;
}

export function AgencyPricingPage({ site = voltaAgency, routes = agencyRoutes, theme = 'dark', noindex = false }: AgencyPricingPageProps) {
  const tabs = site.services.map((s) => ({ id: s.slug, label: s.name, packages: site.pricing[s.slug] }));
  return (
    <>
      <AgencyLayout title="Pricing" description={`Transparent pricing for paid ads, SEO and websites by ${site.name}.`} site={site} routes={routes} currentHref={routes.pricing} theme={theme} noindex={noindex}>
        <AgencyPageHero eyebrow="Pricing" title="Fixed fees. *No* surprises." text="We never take a percentage of your ad spend. Pick a retainer for ongoing growth or a fixed-price project for your website." breadcrumb={[{ label: 'Home', href: routes.home }, { label: 'Pricing' }]} facts={[
            { value: '3 months', label: 'initial term, then monthly' },
            { value: '0%', label: 'commission on ad spend' },
            { value: '48h', label: 'to your free audit' },
          ]} />
      
        <div className="volta-wrap section-tight" data-rk-444970="">
          <AgencyPricingPackages title="Choose a service" text="" tabs={tabs} currency={site.currency} locale={site.locale} cta={{ label: 'Get started', href: routes.contact }} />
        </div>
      
        <div className="volta-wrap section-space" id="roi" data-rk-444970="">
          <AgencyRoiCalculator upliftLabel={`With ${site.name}`} currency={site.currency} locale={site.locale} cta={{ label: 'Get a custom forecast', href: routes.contact }} />
        </div>
      
        <div className="volta-wrap section-space home-tight" data-rk-444970="">
          <FaqTwoColumn title="Pricing questions" subtitle="Everything about contracts, ad budgets and what is included." items={site.faqs.map((f) => ({ q: f.question, a: f.answer }))} support={{ label: 'Talk to us', href: routes.contact }} />
        </div>
      </AgencyLayout>
    </>
  );
}

export default AgencyPricingPage;
