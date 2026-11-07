import { AgencyCaseStudyPage, voltaAgency } from '@lib/templates/agency';
import { previewRoutes } from '../../routes';

export const dynamicParams = false;
export const generateStaticParams = () => voltaAgency.cases.map((p: { slug: string }) => ({ slug: p.slug }));

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <AgencyCaseStudyPage slug={(await params).slug} routes={previewRoutes} noindex />;
}
