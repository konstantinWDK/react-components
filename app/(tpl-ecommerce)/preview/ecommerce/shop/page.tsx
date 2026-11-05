import { StoreCategoryPage } from '@lib/templates/ecommerce';
import { previewRoutes } from '../routes';

export default function Page() {
  return <StoreCategoryPage routes={previewRoutes} seedCart noindex />;
}
