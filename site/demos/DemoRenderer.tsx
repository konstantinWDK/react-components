'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { autoLoaders } from './auto/loaders';

// One chunk per category: a docs page only downloads the demos of its own category.
// buttons / feedback have hand-written demos; the rest use the generated previews.
const loaders: Record<string, ComponentType<{ slug: string }>> = {
  ...autoLoaders,
  buttons: dynamic(() => import('./buttons')),
  feedback: dynamic(() => import('./feedback')),
};

export function DemoRenderer({ category, slug }: { category: string; slug: string }) {
  const Demo = loaders[category];
  return Demo ? <Demo slug={slug} /> : null;
}
