import { StoreCheckoutPage } from '@lib/templates/ecommerce';
import { previewRoutes } from '../routes';

export default function Page() {
  return <StoreCheckoutPage routes={previewRoutes} seedCart noindex />;
}
