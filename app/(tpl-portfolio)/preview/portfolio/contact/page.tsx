import { PortfolioContactPage } from '@lib/templates/portfolio';
import { previewRoutes } from '../routes';

export default function Page() {
  return <PortfolioContactPage routes={previewRoutes} noindex />;
}
