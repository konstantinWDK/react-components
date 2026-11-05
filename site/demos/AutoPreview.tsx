'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from 'react';
import { previewProps } from './generated-meta';
import { previewOverrides } from './preview-overrides';

/**
 * Generic live preview — same behaviour as react PreviewRenderer.react:
 * e-commerce / app components get their demo props, everything else renders with
 * its default props and the component name as children.
 */
export function AutoPreview({ slug, name, Comp, wide }: { slug: string; name: string; Comp: ComponentType<any>; wide: boolean }) {
  const demo = previewOverrides[slug] ?? previewProps[slug];
  if (demo) {
    return (
      <div className="dynamic-preview-container dynamic-preview-container--wide">
        <div className="ecommerce-preview" style={{ maxWidth: demo.maxWidth ?? '100%' }}>
          <Comp {...(demo.props ?? {})} />
        </div>
      </div>
    );
  }
  return (
    <div className={`dynamic-preview-container ${wide ? 'dynamic-preview-container--wide' : ''}`}>
      <Comp>
        <span className="dynamic-preview-label">{name}</span>
      </Comp>
    </div>
  );
}
