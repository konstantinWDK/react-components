// Registry: metadata copied from astro-component-kit + which items are already ported to React.
import raw from './registry.json';
import type { Category, ComponentDoc, SectionCategory, TemplateDoc } from './types';
import { demoMeta } from '../demos/meta';

export type { Category, ComponentDoc, SectionCategory, TemplateDoc };

export const categories = raw.categories as Category[];
export const sectionCategories = raw.sectionCategories as SectionCategory[];
export const templates = raw.templates as unknown as TemplateDoc[];

/** Every component of the Astro kit (ported or not). */
export const allComponents = (raw.components as ComponentDoc[]).filter(Boolean);

export const isPorted = (slug: string) => slug in demoMeta;

/** Components available in the React kit, in the Astro registry order. */
export const components = allComponents.filter((c) => isPorted(c.slug));

export const getComponentBySlug = (slug: string) => components.find((c) => c.slug === slug);
export const getComponentsByCategory = (id: string) => components.filter((c) => c.category === id);

export const docsComponents = components.filter((c) => c.category !== 'sections');
export const sectionComponents = components.filter((c) => c.category === 'sections');
export const allSections = allComponents.filter((c) => c.category === 'sections');

export const counts = {
  components: docsComponents.length,
  sections: sectionComponents.length,
  templates: 0,
  totalAstro: allComponents.length,
};
