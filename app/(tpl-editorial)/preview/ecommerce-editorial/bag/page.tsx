import { EditorialBagPage } from '@lib/templates/ecommerce-editorial';
import { previewRoutes } from '../routes';

export default function Page() {
  return <EditorialBagPage routes={previewRoutes} seedCart noindex />;
}
