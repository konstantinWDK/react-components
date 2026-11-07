import { PortfolioHomePage } from '@lib/templates/portfolio';
import { previewRoutes } from './routes';

export default function Page() {
  return <PortfolioHomePage routes={previewRoutes} noindex />;
}
