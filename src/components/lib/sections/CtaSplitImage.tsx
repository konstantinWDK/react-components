'use client';

import { useId } from 'react';
import type { CSSProperties } from 'react';
import './CtaSplitImage.css';

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
 * CtaSplitImage — Conversion banner split into copy + CTA and a decorative
 * visual panel (CSS gradient mesh with floating stat chips). Optional real image.
 *
 * @param {string} title - Heading.
 * @param {string} text - Supporting copy.
 * @param {{label: string, href: string}} primary - Primary CTA.
 * @param {{label: string, href: string}} secondary - Secondary CTA.
 * @param {string} image - Optional image URL (replaces the CSS visual).
 * @param {string} imageAlt - Alt text when an image is used.
 * @param {Array<{value: string, label: string}>} chips - Floating stat chips on the visual.
 * @param {string} variant - Panel style (mesh|solid|outline).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface CtaSplitImageProps {
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  image?: string;
  imageAlt?: string;
  chips?: Array<{ value: string; label: string }>;
  variant?: 'mesh' | 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CtaSplitImage({
  title = 'Ready to ship your best page yet?',
  text = 'Join thousands of teams building fast, accessible Astro sites. Free forever for personal projects.',
  primary = { label: 'Get started free', href: '#' },
  secondary = { label: 'Talk to sales', href: '#' },
  image,
  imageAlt = '',
  chips = [
    { value: '99.9%', label: 'uptime' },
    { value: '< 50ms', label: 'TTFB' },
    { value: '100', label: 'Lighthouse' },
  ],
  variant = 'mesh',
  size = 'md',
  className = '',
}: CtaSplitImageProps) {
  const id = `csi-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <>
      <div className="cq-cta-split-image-cq" data-rk-56220c="">
      <section className={`csi csi--${variant} csi--${size} ${className}`} aria-labelledby={id} data-rk-56220c="">
        <div className="csi__box" data-rk-56220c="">
          <div className="csi__copy" data-rk-56220c="">
            <h2 id={id} className="csi__title" data-rk-56220c="">{title}</h2>
            <p className="csi__text" data-rk-56220c="">{text}</p>
            <div className="csi__actions" data-rk-56220c="">
              <a className="csi__btn csi__btn--primary" href={primary.href} data-rk-56220c="">{primary.label}</a>
              {secondary && <a className="csi__btn csi__btn--ghost" href={secondary.href} data-rk-56220c="">{secondary.label}</a>}
            </div>
          </div>
          <div className="csi__visual" data-rk-56220c="">
            {image ? (
              <img src={image} alt={imageAlt} loading="lazy" decoding="async" data-rk-56220c="" />
            ) : (
              <div className="csi__mesh" aria-hidden="true" data-rk-56220c="">
                {chips.map((c, i) => (
                  <span key={i} className="csi__chip" style={st(`--i:${i}`)} data-rk-56220c=""><strong data-rk-56220c="">{c.value}</strong>{c.label}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default CtaSplitImage;
