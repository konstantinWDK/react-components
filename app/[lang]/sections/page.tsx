import { SectionsCatalogPage, sectionsMetadata } from '../../../site/pages/sections';
import { asLocale } from '../../../site/lib/seo';

type P = { params: Promise<{ lang: string }> };
export const generateMetadata = async ({ params }: P) => sectionsMetadata(asLocale((await params).lang));
export default async function Page({ params }: P) {
  return <SectionsCatalogPage lang={asLocale((await params).lang)} />;
}
