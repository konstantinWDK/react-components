import { EditorialCheckoutPage } from '@lib/templates/ecommerce-editorial';
import { previewRoutes } from '../routes';

export default function Page() {
  return <EditorialCheckoutPage routes={previewRoutes} seedCart noindex />;
}
