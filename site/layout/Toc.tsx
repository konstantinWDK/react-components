'use client';

import { useEffect, useState } from 'react';

/** Right "On this page" column: collects h2[id] from the docs content and highlights the visible one. */
export function Toc({ title, fixed }: { title: string; fixed?: { id: string; text: string }[] }) {
  const [items, setItems] = useState<{ id: string; text: string }[]>(fixed ?? []);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (fixed) {
      const els = fixed.map((f) => document.getElementById(f.id)).filter((el): el is HTMLElement => !!el);
      const obs = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-80px 0px -60% 0px', threshold: 0 });
      els.forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    }
    const headings = Array.from(document.querySelectorAll<HTMLElement>('.docs-content h2[id], .doc-section h2[id], .doc-section[id] h2')).filter(
      (h) => !h.closest('[inert], [aria-hidden="true"], .preview-demo, .section-preview-full, .preview-container'),
    );
    headings.forEach((h, i) => {
      if (!h.id) h.id = `section-${i + 1}`;
    });
    setItems(headings.map((h) => ({ id: h.id, text: h.textContent ?? '' })));

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [fixed]);

  return (
    <aside className="toc" aria-label={title} hidden={items.length === 0}>
      <span className="toc__title">{title}</span>
      <nav className="toc__nav">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={`toc__link ${active === it.id ? 'toc__link--active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(it.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            {it.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
