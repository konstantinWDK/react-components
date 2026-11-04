import { InstallPage, installMetadata } from '../../../site/pages/install';
import { asLocale } from '../../../site/lib/seo';

type P = { params: Promise<{ lang: string }> };
export const generateMetadata = async ({ params }: P) => installMetadata(asLocale((await params).lang));
export default async function Page({ params }: P) {
  return <InstallPage lang={asLocale((await params).lang)} />;
}
