import { PortfolioBlogPage } from '@lib/templates/portfolio';
import { previewRoutes } from '../routes';

export default function Page() {
  return <PortfolioBlogPage routes={previewRoutes} noindex />;
}
