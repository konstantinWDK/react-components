import { PortfolioPostPage, keycapPortfolio } from '@lib/templates/portfolio';
import { previewRoutes } from '../../routes';

export const dynamicParams = false;
export const generateStaticParams = () => keycapPortfolio.posts.map((p: { slug: string }) => ({ slug: p.slug }));

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <PortfolioPostPage slug={(await params).slug} routes={previewRoutes} noindex />;
}
