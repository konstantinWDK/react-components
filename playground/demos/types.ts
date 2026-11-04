import type { ReactNode } from 'react';

/** One entry of the playground registry — mirrors astro-component-kit's ComponentDoc. */
export interface ComponentDemo {
  slug: string;
  name: string;
  description: string;
  category: string;
  tags?: string[];
  demo: () => ReactNode;
}
