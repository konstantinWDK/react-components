'use client';

import type { CSSProperties } from 'react';
import './TestimonialCardClean.css';

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
 * TestimonialCardClean — Minimalist card for user quotes and reviews.
 * 
 * @param {string} quote - The body of the testimonial review.
 * @param {string} name - The reviewer's full name.
 * @param {string} role - The reviewer's job title or company role.
 * @param {string} avatarUrl - Optional string tracking the avatar headshot URL.
 */
export interface TestimonialCardCleanProps {
  quote: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export function TestimonialCardClean({ quote, name, role, avatarUrl }: TestimonialCardCleanProps) {
  return (
    <>
      <div className="testi-card" data-rk-49942c="">
        <blockquote className="testi-card__quote" data-rk-49942c="">"{quote}"</blockquote>
        <div className="testi-card__author" data-rk-49942c="">
          <div className="testi-card__pic" style={st(avatarUrl ? `background-image: url('${avatarUrl}'); background-size: cover;` : '')} data-rk-49942c=""></div>
          <div className="testi-card__info" data-rk-49942c="">
            <h5 className="testi-card__name" data-rk-49942c="">{name}</h5>
            <span className="testi-card__role" data-rk-49942c="">{role}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default TestimonialCardClean;
