import { LandingPage } from '@lib/templates/saas-hotel';
import { previewRoutes } from './routes';

export default function Page() {
  return <LandingPage routes={previewRoutes} noindex />;
}
