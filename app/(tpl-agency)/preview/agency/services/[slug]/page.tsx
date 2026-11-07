import { AgencyServicePage, voltaAgency } from '@lib/templates/agency';
import { previewRoutes } from '../../routes';

export const dynamicParams = false;
export const generateStaticParams = () => voltaAgency.services.map((p: { slug: string }) => ({ slug: p.slug }));

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <AgencyServicePage slug={(await params).slug} routes={previewRoutes} noindex />;
}
