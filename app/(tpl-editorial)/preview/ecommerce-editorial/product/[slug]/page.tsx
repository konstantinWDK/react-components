import { EditorialProductPage, formaStore } from '@lib/templates/ecommerce-editorial';
import { previewRoutes } from '../../routes';

export const dynamicParams = false;
export const generateStaticParams = () => formaStore.products.map((p: { slug: string }) => ({ slug: p.slug }));

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <EditorialProductPage slug={(await params).slug} routes={previewRoutes} seedCart noindex />;
}
