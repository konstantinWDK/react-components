import { SectionPage, sectionMetadata, sectionParams } from '../../../../site/pages/section';
import { asLocale } from '../../../../site/lib/seo';

type P = { params: Promise<{ lang: string; slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = sectionParams;
export const generateMetadata = async ({ params }: P) => {
  const { lang, slug } = await params;
  return sectionMetadata(slug, asLocale(lang));
};

export default async function Page({ params }: P) {
  const { lang, slug } = await params;
  return <SectionPage slug={slug} lang={asLocale(lang)} />;
}
