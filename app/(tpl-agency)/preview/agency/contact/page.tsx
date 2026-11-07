import { AgencyContactPage } from '@lib/templates/agency';
import { previewRoutes } from '../routes';

export default function Page() {
  return <AgencyContactPage routes={previewRoutes} noindex />;
}
