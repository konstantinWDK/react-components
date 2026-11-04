import { TemplatesCatalogPage, templatesMetadata } from '../../../site/pages/templates';

export const metadata = templatesMetadata('en');
export default function Page() {
  return <TemplatesCatalogPage lang="en" />;
}
