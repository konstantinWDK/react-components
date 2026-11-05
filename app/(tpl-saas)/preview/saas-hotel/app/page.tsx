import { DashboardPage } from '@lib/templates/saas-hotel';
import { previewRoutes } from '../routes';

export default function Page() {
  return <DashboardPage routes={previewRoutes} />;
}
