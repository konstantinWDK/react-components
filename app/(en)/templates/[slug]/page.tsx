import { TemplatePage, templateMetadata, templateParams } from '../../../../site/pages/template';

export const dynamicParams = false;
export const generateStaticParams = templateParams;
export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => templateMetadata((await params).slug, 'en');

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <TemplatePage slug={(await params).slug} lang="en" />;
}
