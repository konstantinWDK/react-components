import { DocPage, docMetadata, docParams } from '../../../../site/pages/docs';

export const dynamicParams = false;
export const generateStaticParams = docParams;
export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => docMetadata((await params).slug, 'en');

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <DocPage slug={(await params).slug} lang="en" />;
}
