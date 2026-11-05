import { SectionPage, sectionMetadata, sectionParams } from '../../../../site/pages/section';

export const dynamicParams = false;
export const generateStaticParams = sectionParams;
export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => sectionMetadata((await params).slug, 'en');

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <SectionPage slug={(await params).slug} lang="en" />;
}
