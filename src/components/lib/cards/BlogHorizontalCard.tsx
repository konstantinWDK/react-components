'use client';

import type { CSSProperties } from 'react';
import './BlogHorizontalCard.css';

/** "a: b; --c: d" → style object */
function st(css: string | undefined): CSSProperties {
  const o: Record<string, string> = {};
  for (const decl of String(css ?? '').split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const k = decl.slice(0, i).trim();
    if (k) o[k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = decl.slice(i + 1).trim();
  }
  return o as CSSProperties;
}

/**
 * BlogHorizontalCard — Landscape card layout for blog feeds or news items.
 * 
 * @param {string} title - The blog post title.
 * @param {string} description - Brief summary or excerpt.
 * @param {string} tag - Featured label or category (e.g. "Tutorial").
 * @param {string} thumbUrl - Optional thumbnail image URL.
 */
export interface BlogHorizontalCardProps {
  title: string;
  description: string;
  tag: string;
  thumbUrl?: string;
}

export function BlogHorizontalCard({ title, description, tag, thumbUrl }: BlogHorizontalCardProps) {
  return (
    <>
      <article className="blog-h-card" data-rk-6cf958="">
        <div className="blog-h-card__thumb" style={st(thumbUrl ? `background-image: url('${thumbUrl}'); background-size: cover;` : '')} data-rk-6cf958=""></div>
        <div className="blog-h-card__content" data-rk-6cf958="">
          <span className="blog-h-card__tag" data-rk-6cf958="">{tag}</span>
          <h4 className="blog-h-card__title" data-rk-6cf958="">{title}</h4>
          <p className="blog-h-card__desc" data-rk-6cf958="">{description}</p>
        </div>
      </article>
    </>
  );
}

export default BlogHorizontalCard;
