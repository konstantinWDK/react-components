'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

// One chunk per category: a docs page only downloads the demos of its own category.
const loaders: Record<string, ComponentType<{ slug: string }>> = {
  buttons: dynamic(() => import('./buttons')),
  feedback: dynamic(() => import('./feedback')),
};

export function DemoRenderer({ category, slug }: { category: string; slug: string }) {
  const Demo = loaders[category];
  return Demo ? <Demo slug={slug} /> : null;
}
