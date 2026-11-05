import { EditorialHomePage } from '@lib/templates/ecommerce-editorial';
import { previewRoutes } from './routes';

export default function Page() {
  return <EditorialHomePage routes={previewRoutes} seedCart noindex />;
}
