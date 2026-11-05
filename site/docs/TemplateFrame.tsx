'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import '../styles/template-frame.css';

/** Scaled, non-interactive live miniature of a template page (desktop width rendered in an iframe). */
export function TemplateFrame({ src, title, width = 1440, height = 960, eager = false }: { src: string; title: string; width?: number; height?: number; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => el.style.setProperty('--tf-s', String(entry.contentRect.width / width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);
  return (
    <div ref={ref} className="tpl-frame" style={{ '--tf-w': width, '--tf-h': height } as CSSProperties} data-template-frame="">
      <div className="tpl-frame__bar" aria-hidden="true"><span /><span /><span /><em>{src}</em></div>
      <div className="tpl-frame__viewport" inert aria-hidden="true">
        <iframe src={src} title={title} scrolling="no" loading={eager ? 'eager' : 'lazy'} tabIndex={-1} width={width} height={height} />
      </div>
    </div>
  );
}
