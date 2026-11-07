'use client';

import PortfolioLayout from './PortfolioLayout';
import DevArticle from '../../sections/DevArticle';
import { keycapPortfolio, portfolioRoutes, portfolioPostHref, type PortfolioSite, type PortfolioRoutes } from './data';

/**
 * PortfolioPostPage — Blog article: meta line, title, lead, tags, reading-progress bar, monochrome
 * prose with code blocks and previous / next article keys.
 *
 * Usage (src/pages/blog/[slug].react):
 *   import { PortfolioPostPage, keycapPortfolio } from 'react-component-kit-ui/templates/portfolio';
 *   export function getStaticPaths() {
 *     return keycapPortfolio.posts.map((p) => ({ params: { slug: p.slug } }));
 *   }
 *   <PortfolioPostPage slug={Astro.params.slug} />
 *
 * @param {string} slug - Post slug.
 * @param {PortfolioSite} site - Content and settings.
 * @param {PortfolioRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'light'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface PortfolioPostPageProps {
  slug: string;
  site?: PortfolioSite;
  routes?: PortfolioRoutes;
  theme?: 'light' | 'dark' | 'auto';
  noindex?: boolean;
}

export function PortfolioPostPage({ slug, site = keycapPortfolio, routes = portfolioRoutes, theme = 'light', noindex = false }: PortfolioPostPageProps) {
  const posts = [...site.posts].sort((a, b) => b.date.localeCompare(a.date));
  const i = Math.max(0, posts.findIndex((p) => p.slug === slug));
  const post = posts[i];
  const newer = posts[i - 1];
  const older = posts[i + 1];
  return (
    <>
      <PortfolioLayout title={post.title} description={post.excerpt} site={site} routes={routes} currentHref={portfolioPostHref(routes, post.slug)} theme={theme} noindex={noindex}>
        <DevArticle title={post.title} excerpt={post.excerpt} date={post.date} category={post.category} readingTime={post.readingTime} author={site.name} tags={post.tags} html={post.html} back={{ label: 'All articles', href: routes.blog }} prev={older && { title: older.title, href: portfolioPostHref(routes, older.slug) }} next={newer && { title: newer.title, href: portfolioPostHref(routes, newer.slug) }} />
      </PortfolioLayout>
    </>
  );
}

export default PortfolioPostPage;
