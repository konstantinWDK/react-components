import { AgencyHomePage } from '@lib/templates/agency';
import { previewRoutes } from './routes';

export default function Page() {
  return <AgencyHomePage routes={previewRoutes} noindex />;
}
