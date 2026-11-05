import { StoreProductPage, demoStore } from '@lib/templates/ecommerce';
import { previewRoutes } from '../../routes';

export const dynamicParams = false;
export const generateStaticParams = () => demoStore.products.map((p: { slug: string }) => ({ slug: p.slug }));

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <StoreProductPage slug={(await params).slug} routes={previewRoutes} seedCart noindex />;
}
