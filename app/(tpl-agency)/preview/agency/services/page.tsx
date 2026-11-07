import { AgencyServicesPage } from '@lib/templates/agency';
import { previewRoutes } from '../routes';

export default function Page() {
  return <AgencyServicesPage routes={previewRoutes} noindex />;
}
