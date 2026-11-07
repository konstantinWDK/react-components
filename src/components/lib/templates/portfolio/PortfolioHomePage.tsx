'use client';

import PortfolioLayout from './PortfolioLayout';
import DevHero from '../../sections/DevHero';
import DevProjectsShowcase from '../../sections/DevProjectsShowcase';
import DevKeyboard from '../../sections/DevKeyboard';
import DevRepoList from '../../sections/DevRepoList';
import DevContributions from '../../sections/DevContributions';
import DevContact from '../../sections/DevContact';
import type { ContributionWeek } from '../../three/contributions-scene';
import { keycapPortfolio, portfolioRoutes, portfolioProjectHref, type PortfolioSite, type PortfolioRoutes } from './data';

/**
 * PortfolioHomePage — Developer portfolio home: retyping hero with skill tape over a 3D dot
 * matrix, 3D projects showcase, a 3D keyboard typing your stack under the repository list, a 3D
 * contribution matrix with flying cubes and the contact block.
 *
 * Usage (src/pages/index.react):
 *   import { PortfolioHomePage } from 'react-component-kit-ui/templates/portfolio';
 *   <PortfolioHomePage />
 *
 * Needs the optional `three` peer dependency (npm install three).
 *
 * @param {PortfolioSite} site - Content and settings. Default: Keycap demo developer.
 * @param {PortfolioRoutes} routes - Page URLs.
 * @param {ContributionWeek[]} contributions - Real contribution weeks. Default: demo year.
 * @param {string} contributionsSrc - URL returning `{ weeks }`, fetched on the client.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'light'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface PortfolioHomePageProps {
  site?: PortfolioSite;
  routes?: PortfolioRoutes;
  contributions?: ContributionWeek[];
  contributionsSrc?: string;
  theme?: 'light' | 'dark' | 'auto';
  noindex?: boolean;
}

export function PortfolioHomePage({ site = keycapPortfolio, routes = portfolioRoutes, contributions, contributionsSrc, theme = 'light', noindex = false }: PortfolioHomePageProps) {
  const github = site.contacts.find((c) => c.kind === 'github');
  const projects = site.projects.map((p) => ({ ...p, href: portfolioProjectHref(routes, p.slug) }));
  return (
    <>
      <PortfolioLayout title={`${site.role} · ${site.name}`} description={`${site.name} — ${site.role}. ${site.tagline}.`} site={site} routes={routes} currentHref={routes.home} theme={theme} noindex={noindex}>
        <DevHero titles={site.titles} name={site.name} tagline={site.tagline} status={site.status} skills={site.skills} />
      
        <DevProjectsShowcase projects={projects} subtitle="Architectural 3D cards in the language of the keyboard below. Drag to move through them in perspective and click a card to straighten it and open the details." />
      
        <DevKeyboard phrases={site.phrases}>
          <DevRepoList repos={site.repos} profile={github ? { label: github.value, href: github.href } : undefined} />
        </DevKeyboard>
      
        <DevContributions weeks={contributions} src={contributionsSrc} title="A year of commits" summary={`@${site.githubUser}`} />
      
        <DevContact text={`${site.status}. Tell me what you are building — I usually reply within a day.`} contacts={site.contacts.slice(0, 2)} cta={{ label: 'Start a project', href: routes.contact }} />
      </PortfolioLayout>
    </>
  );
}

export default PortfolioHomePage;
