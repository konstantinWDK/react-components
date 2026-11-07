'use client';

import PortfolioLayout from './PortfolioLayout';
import DevPageHero from '../../sections/DevPageHero';
import DevPostList from '../../sections/DevPostList';
import { keycapPortfolio, portfolioRoutes, portfolioPostHref, type PortfolioSite, type PortfolioRoutes } from './data';

/**
 * PortfolioBlogPage — Blog index: page hero, a featured latest article and a filterable list of
 * posts with date, category and reading time.
 *
 * Usage (src/pages/blog/index.react):
 *   import { PortfolioBlogPage } from 'react-component-kit-ui/templates/portfolio';
 *   <PortfolioBlogPage />
 *
 * @param {PortfolioSite} site - Content and settings.
 * @param {PortfolioRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'light'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface PortfolioBlogPageProps {
  site?: PortfolioSite;
  routes?: PortfolioRoutes;
  theme?: 'light' | 'dark' | 'auto';
  noindex?: boolean;
}

export function PortfolioBlogPage({ site = keycapPortfolio, routes = portfolioRoutes, theme = 'light', noindex = false }: PortfolioBlogPageProps) {
  const posts = [...site.posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PortfolioLayout title="Blog" description={`Articles by ${site.name} about web development, 3D on the web, performance and design systems.`} site={site} routes={routes} currentHref={routes.blog} theme={theme} noindex={noindex}>
        <DevPageHero label="Articles & notes" hud={false} title="Notes on" titleAccent="building for the web." text="Technical write-ups about 3D on the web, animation, accessibility and shipping component libraries." />
        <DevPostList posts={posts.map((p) => ({ title: p.title, excerpt: p.excerpt, date: p.date, category: p.category, readingTime: p.readingTime, href: portfolioPostHref(routes, p.slug) }))} />
      </PortfolioLayout>
    </>
  );
}

export default PortfolioBlogPage;
