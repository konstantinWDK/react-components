import { AgencyAboutPage } from '@lib/templates/agency';
import { previewRoutes } from '../routes';

export default function Page() {
  return <AgencyAboutPage routes={previewRoutes} noindex />;
}
