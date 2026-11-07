import { AgencyWorkPage } from '@lib/templates/agency';
import { previewRoutes } from '../routes';

export default function Page() {
  return <AgencyWorkPage routes={previewRoutes} noindex />;
}
