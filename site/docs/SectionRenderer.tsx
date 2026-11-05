'use client';

import { useEffect, useRef } from 'react';
import { autoLoaders } from '../demos/auto/loaders';

const Sections = autoLoaders.sections;

/** Full-width live section (section page). */
export function SectionRenderer({ slug }: { slug: string }) {
  return <Sections slug={slug} bare />;
}

/** Scaled 1280px miniature that fits its card (catalog cards, home spotlight). */
export function SectionMini({ slug, className = 'section-card__mini', scaleClass = 'section-card__mini-scale' }: { slug: string; className?: string; scaleClass?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    const fit = () => host.style.setProperty('--mini-scale', String(host.clientWidth / 1280));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} inert aria-hidden="true" data-nosnippet="">
      <div className={scaleClass}>
        <Sections slug={slug} bare />
      </div>
    </div>
  );
}
