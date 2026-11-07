import { AgencyPricingPage } from '@lib/templates/agency';
import { previewRoutes } from '../routes';

export default function Page() {
  return <AgencyPricingPage routes={previewRoutes} noindex />;
}
