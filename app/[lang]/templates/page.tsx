import { TemplatesCatalogPage, templatesMetadata } from '../../../site/pages/templates';
import { asLocale } from '../../../site/lib/seo';

type P = { params: Promise<{ lang: string }> };
export const generateMetadata = async ({ params }: P) => templatesMetadata(asLocale((await params).lang));
export default async function Page({ params }: P) {
  return <TemplatesCatalogPage lang={asLocale((await params).lang)} />;
}
