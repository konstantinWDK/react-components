import { McpPage, mcpMetadata } from '../../../site/pages/mcp';
import { asLocale } from '../../../site/lib/seo';

type P = { params: Promise<{ lang: string }> };
export const generateMetadata = async ({ params }: P) => mcpMetadata(asLocale((await params).lang));
export default async function Page({ params }: P) {
  return <McpPage lang={asLocale((await params).lang)} />;
}
