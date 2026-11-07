import { PortfolioProjectsPage } from '@lib/templates/portfolio';
import { previewRoutes } from '../routes';

export default function Page() {
  return <PortfolioProjectsPage routes={previewRoutes} noindex />;
}
