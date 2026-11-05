'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { autoLoaders } from '../demos/auto/loaders';

/** Live miniature of a section / component used by a template (scaled canvas, like TemplateDetailPage.astro). */
export function TemplateMini({ slug, folder, canvas, isSection, props, maxWidth }: { slug: string; folder: string; canvas: number; isSection: boolean; props?: Record<string, unknown>; maxWidth?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => el.style.setProperty('--mini-scale', String(el.clientWidth / canvas));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [canvas]);
  const Demo = autoLoaders[folder];
  return (
    <div ref={ref} className={`td-prev__stage ${isSection ? '' : 'td-prev__stage--component'}`} style={{ '--canvas': canvas } as CSSProperties} data-mini="">
      <div className="td-prev__mini" inert aria-hidden="true" data-nosnippet="">
        <div className="td-prev__scale">
          <div className="td-prev__inner" style={maxWidth ? { maxWidth } : undefined}>
            {Demo && <Demo slug={slug} bare props={props} />}
          </div>
        </div>
      </div>
    </div>
  );
}
