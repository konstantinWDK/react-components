import type { ReactNode } from 'react';

export interface ComponentDemo {
  slug: string;
  name?: string;
  description?: string;
  category?: string;
  demo: () => ReactNode;
}
