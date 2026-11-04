import { DocPage, docMetadata, docParams } from '../../../../site/pages/docs';
import { asLocale } from '../../../../site/lib/seo';

type P = { params: Promise<{ lang: string; slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = docParams;
export const generateMetadata = async ({ params }: P) => {
  const { lang, slug } = await params;
  return docMetadata(slug, asLocale(lang));
};

export default async function Page({ params }: P) {
  const { lang, slug } = await params;
  return <DocPage slug={slug} lang={asLocale(lang)} />;
}
