import { InstallPage, installMetadata } from '../../../site/pages/install';

export const metadata = installMetadata('en');
export default function Page() {
  return <InstallPage lang="en" />;
}
