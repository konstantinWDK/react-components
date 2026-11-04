import { HomePage, homeMetadata } from '../../site/pages/home';
import { asLocale } from '../../site/lib/seo';

type P = { params: Promise<{ lang: string }> };
export const generateMetadata = async ({ params }: P) => homeMetadata(asLocale((await params).lang));
export default async function Page({ params }: P) {
  return <HomePage lang={asLocale((await params).lang)} />;
}
