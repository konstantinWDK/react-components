// Shapes of the registry exported from astro-component-kit (metadata only, no code).
export interface ComponentDoc {
  slug: string;
  name: string;
  description: string;
  category: string;
  sectionCategory?: string;
  tags: string[];
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface SectionCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface TemplatePage {
  slug?: string;
  name: string;
  path?: string;
  description?: string;
  [key: string]: unknown;
}

export interface TemplateDoc {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  tags: string[];
  previewBase: string;
  importPath: string;
  pages: TemplatePage[];
  newComponents: unknown[];
  reusedComponents: unknown[];
  /** Optional peer dependencies the template needs (shown instead of "0 deps"). */
  peerDeps?: string[];
  [key: string]: unknown;
}
