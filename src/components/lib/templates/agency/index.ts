// src/components/lib/templates/agency/index.ts
// Marketing agency template ("Volta"): a complete site for an agency selling Paid Ads, SEO and
// Web Development, built from the Agency* sections in the library.
//
//   import { AgencyHomePage } from 'react-component-kit-ui/templates/agency';
//   <AgencyHomePage theme="dark" />

export { default as AgencyLayout } from './AgencyLayout';
export { default as AgencyHomePage } from './AgencyHomePage';
export { default as AgencyServicesPage } from './AgencyServicesPage';
export { default as AgencyServicePage } from './AgencyServicePage';
export { default as AgencyWorkPage } from './AgencyWorkPage';
export { default as AgencyCaseStudyPage } from './AgencyCaseStudyPage';
export { default as AgencyPricingPage } from './AgencyPricingPage';
export { default as AgencyAboutPage } from './AgencyAboutPage';
export { default as AgencyContactPage } from './AgencyContactPage';

export { voltaAgency, agencyRoutes, agencyServiceHref, agencyCaseHref, agencyMoney } from './data';
export type { AgencySite, AgencyRoutes, AgencyService, AgencyCase, AgencyPackage, AgencyServiceSlug } from './data';
