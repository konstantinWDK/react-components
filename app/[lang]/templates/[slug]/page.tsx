import { TemplatePage, templateMetadata, templateParams } from '../../../../site/pages/template';
import { asLocale } from '../../../../site/lib/seo';

type P = { params: Promise<{ lang: string; slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = templateParams;
export const generateMetadata = async ({ params }: P) => {
  const { lang, slug } = await params;
  return templateMetadata(slug, asLocale(lang));
};

export default async function Page({ params }: P) {
  const { lang, slug } = await params;
  return <TemplatePage slug={slug} lang={asLocale(lang)} />;
}
