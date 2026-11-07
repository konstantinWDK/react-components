'use client';

import type { CSSProperties } from 'react';
import './AgencyPlatformsMarquee.css';

/** class:list → className */
function cx(...args: unknown[]): string {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (!v) return;
    if (typeof v === 'string' || typeof v === 'number') out.push(String(v));
    else if (Array.isArray(v)) v.forEach(walk);
    else if (typeof v === 'object') for (const [k, on] of Object.entries(v as Record<string, unknown>)) if (on) out.push(k);
  };
  args.forEach(walk);
  return out.join(' ');
}

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
 * AgencyPlatformsMarquee — Two counter-scrolling rows of the platforms and tools an agency is
 * certified in (Google Ads, Meta, Search Console…), with an intro line and badges.
 *
 * @param {string} title - Intro line. Default 'Certified on the platforms where your customers are'.
 * @param {string[]} platforms - Names shown as pills (split across the two rows).
 * @param {string[]} badges - Small certification badges under the title (optional).
 * @param {number} speed - Seconds per loop. Default 38.
 * @param {string} className - Extra class.
 *
 * Accessibility: the platforms are a real list read once; the duplicated copy that makes the
 * loop seamless is aria-hidden; the animation pauses on hover and stops with reduced motion.
 */
export interface AgencyPlatformsMarqueeProps {
  title?: string;
  platforms?: string[];
  badges?: string[];
  speed?: number;
  className?: string;
}

export function AgencyPlatformsMarquee({
  title = 'Certified on the platforms where your customers are',
  platforms = ['Google Ads', 'Meta', 'TikTok', 'LinkedIn', 'YouTube', 'Microsoft Ads', 'Google Analytics 4', 'Search Console', 'Shopify', 'HubSpot', 'React', 'Looker Studio'],
  badges = ['Google Partner', 'Meta Business Partner', 'TikTok Agency Partner'],
  speed = 38,
  className = '',
}: AgencyPlatformsMarqueeProps) {
  const half = Math.ceil(platforms.length / 2);
  const rows = [platforms.slice(0, half), platforms.slice(half)].filter((r) => r.length > 0);
  return (
    <>
      <div className={cx(['apm', className])} style={st(`--apm-speed: ${speed}s`)} data-rk-cdc9a2="">
        <div className="apm__head" data-rk-cdc9a2="">
          <p className="apm__title" data-rk-cdc9a2="">{title}</p>
          {badges.length > 0 && (
            <ul className="apm__badges" data-rk-cdc9a2="">
              {badges.map((b, __i: number) => <li key={__i} data-rk-cdc9a2=""><span aria-hidden="true" data-rk-cdc9a2="">✓</span>{b}</li>)}
            </ul>
          )}
        </div>
        <ul className="apm__static" data-rk-cdc9a2="">{platforms.map((p, __i: number) => <li key={__i} className="apm__pill" data-rk-cdc9a2="">{p}</li>)}</ul>
        <div className="apm__rows" aria-hidden="true" data-rk-cdc9a2="">
          {rows.map((row, r) => (
            <div key={r} className={cx(['apm__row', { 'apm__row--rev': r % 2 === 1 }])} data-rk-cdc9a2="">
              <div className="apm__track" data-rk-cdc9a2="">
                {[...row, ...row, ...row, ...row].map((p, i) => (
                  <span key={i} className={cx(['apm__pill', { 'is-accent': i % 5 === 2 }])} data-rk-cdc9a2="">{p}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AgencyPlatformsMarquee;
