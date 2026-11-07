'use client';

import PortfolioLayout from './PortfolioLayout';
import DevPageHero from '../../sections/DevPageHero';
import DevMonitor from '../../sections/DevMonitor';
import DevProjectDetail from '../../sections/DevProjectDetail';
import { keycapPortfolio, portfolioRoutes, portfolioProjectHref, type PortfolioSite, type PortfolioRoutes } from './data';

/**
 * PortfolioProjectPage — Project case study: breadcrumb hero with a 3D monitor typing the
 * project's terminal lines, long-form overview / challenge / solution / highlights next to a
 * sticky spec sheet (role, year, status, stack, metrics, links) and previous / next project keys.
 *
 * Usage (src/pages/projects/[slug].react):
 *   import { PortfolioProjectPage, keycapPortfolio } from 'react-component-kit-ui/templates/portfolio';
 *   export function getStaticPaths() {
 *     return keycapPortfolio.projects.map((p) => ({ params: { slug: p.slug } }));
 *   }
 *   <PortfolioProjectPage slug={Astro.params.slug} />
 *
 * @param {string} slug - Project slug.
 * @param {PortfolioSite} site - Content and settings.
 * @param {PortfolioRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'light'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface PortfolioProjectPageProps {
  slug: string;
  site?: PortfolioSite;
  routes?: PortfolioRoutes;
  theme?: 'light' | 'dark' | 'auto';
  noindex?: boolean;
}

export function PortfolioProjectPage({ slug, site = keycapPortfolio, routes = portfolioRoutes, theme = 'light', noindex = false }: PortfolioProjectPageProps) {
  const i = Math.max(0, site.projects.findIndex((p) => p.slug === slug));
  const project = site.projects[i];
  const prev = site.projects[i - 1];
  const next = site.projects[i + 1];
  const prompt = `${site.githubUser}@dev:~$`;
  return (
    <>
      <PortfolioLayout title={`${project.title} — ${project.tagline}`} description={project.description} site={site} routes={routes} currentHref={portfolioProjectHref(routes, project.slug)} theme={theme} noindex={noindex}>
        <DevPageHero breadcrumb={[{ label: 'Home', href: routes.home }, { label: 'Projects', href: routes.projects }, { label: project.title }]} label={`PRJ // ${String(i + 1).padStart(2, '0')} · ${project.category}`} title={project.title} titleAccent={project.tagline} text="">
          <DevMonitor lines={project.terminal} prompt={prompt} height="380px" label={`${project.title} terminal`} />
        </DevPageHero>
      
        <DevProjectDetail project={project} prev={prev && { title: prev.title, href: portfolioProjectHref(routes, prev.slug) }} next={next && { title: next.title, href: portfolioProjectHref(routes, next.slug) }} />
      </PortfolioLayout>
    </>
  );
}

export default PortfolioProjectPage;
