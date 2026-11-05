import { StoreHomePage } from '@lib/templates/ecommerce';
import { previewRoutes } from './routes';

export default function Page() {
  return <StoreHomePage routes={previewRoutes} seedCart noindex />;
}
