import { EditorialShopPage } from '@lib/templates/ecommerce-editorial';
import { previewRoutes } from '../routes';

export default function Page() {
  return <EditorialShopPage routes={previewRoutes} seedCart noindex />;
}
