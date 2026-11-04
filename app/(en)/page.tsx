import { HomePage, homeMetadata } from '../../site/pages/home';

export const metadata = homeMetadata('en');
export default function Page() {
  return <HomePage lang="en" />;
}
