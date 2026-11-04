import { buttons } from './buttons';
import type { ComponentDemo } from './types';

export type { ComponentDemo };

/** Categories in sidebar order. Add new ones here as they get ported from Astro. */
export const categories: { id: string; label: string; items: ComponentDemo[] }[] = [
  { id: 'buttons', label: 'Buttons', items: buttons },
];
