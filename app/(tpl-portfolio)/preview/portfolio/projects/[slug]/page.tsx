import { PortfolioProjectPage, keycapPortfolio } from '@lib/templates/portfolio';
import { previewRoutes } from '../../routes';

export const dynamicParams = false;
export const generateStaticParams = () => keycapPortfolio.projects.map((p: { slug: string }) => ({ slug: p.slug }));

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <PortfolioProjectPage slug={(await params).slug} routes={previewRoutes} noindex />;
}
