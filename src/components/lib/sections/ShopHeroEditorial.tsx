'use client';

import ProductMedia from '../ecommerce/ProductMedia';
import './ShopHeroEditorial.css';

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

interface Cta { label: string; href: string }

/**
 * ShopHeroEditorial — Magazine-style shop hero: oversized serif headline with an italic accent
 * word, issue/season meta, two CTAs, a tall feature image with caption and a running ticker.
 *
 * @param {string} kicker - Small label above the title. Default 'Autumn / Winter 26'.
 * @param {string} title - Headline (wrap a word in *asterisks* to italicise it). Default 'Quiet *objects* for everyday rituals'.
 * @param {string} text - Supporting paragraph.
 * @param {{label: string, href: string}} primary - Main CTA.
 * @param {{label: string, href: string}} secondary - Secondary CTA (optional).
 * @param {{icon?: string, hue?: number, image?: string, alt?: string, caption?: string, href?: string}} media - Feature visual.
 * @param {string[]} ticker - Words for the running ticker (empty hides it).
 * @param {string} issue - Small index label, e.g. "N° 04".
 * @param {string} variant - Layout (split|stacked). Default 'split'.
 * @param {string} size - Vertical rhythm (sm|md|lg). Default 'md'.
 * @param {string} className - Extra class.
 *
 * Accessibility: one h1; ticker is decorative (aria-hidden) and stops with reduced motion.
 */
export interface ShopHeroEditorialProps {
  kicker?: string;
  title?: string;
  text?: string;
  primary?: Cta;
  secondary?: Cta;
  media?: { icon?: string; hue?: number; image?: string; alt?: string; caption?: string; href?: string };
  ticker?: string[];
  issue?: string;
  variant?: 'split' | 'stacked';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ShopHeroEditorial({
  kicker = 'Autumn / Winter 26',
  title = 'Quiet *objects* for everyday rituals',
  text = 'Clothing and homeware made slowly, in small runs, by workshops we know by name. Designed to be used for years — and to look better for it.',
  primary = { label: 'Shop the collection', href: '#' },
  secondary = { label: 'Read the journal', href: '#' },
  media = { icon: 'jacket', hue: 22, caption: 'Wool overcoat, in Rust — €320', href: '#' },
  ticker = ['Made in small runs', 'Natural fibres', 'Repair for life', 'Carbon-neutral shipping', 'Free returns'],
  issue = 'N° 04',
  variant = 'split',
  size = 'md',
  className = '',
}: ShopHeroEditorialProps) {
  const parts = title.split(/\*(.+?)\*/g);
  const MediaTag = media.href ? 'a' : 'div';
  return (
    <>
      <section className={cx(['sh-ed', `sh-ed--${variant}`, `sh-ed--${size}`, className])} data-rk-cb8b08="">
        <div className="sh-ed__inner" data-rk-cb8b08="">
          <div className="sh-ed__copy" data-rk-cb8b08="">
            <p className="sh-ed__meta" data-rk-cb8b08=""><span data-rk-cb8b08="">{kicker}</span>{issue && <span data-rk-cb8b08="">{issue}</span>}</p>
            <h1 className="sh-ed__title" data-rk-cb8b08="">{parts.map((p, i) => (i % 2 ? <em data-rk-cb8b08="">{p}</em> : p))}</h1>
            <div className="sh-ed__foot" data-rk-cb8b08="">
              {text && <p className="sh-ed__text" data-rk-cb8b08="">{text}</p>}
              <div className="sh-ed__ctas" data-rk-cb8b08="">
                {primary && <a className="sh-ed__btn sh-ed__btn--solid" href={primary.href} data-rk-cb8b08="">{primary.label}<span aria-hidden="true" data-rk-cb8b08="">→</span></a>}
                {secondary && <a className="sh-ed__btn" href={secondary.href} data-rk-cb8b08="">{secondary.label}</a>}
              </div>
            </div>
          </div>
          <MediaTag className="sh-ed__media" href={media.href} data-rk-cb8b08="">
            <ProductMedia image={media.image} alt={media.alt ?? ''} icon={media.icon} hue={media.hue} ratio="4 / 5" variant="soft" size="lg" />
            {media.caption && <span className="sh-ed__caption" data-rk-cb8b08="">{media.caption}</span>}
          </MediaTag>
        </div>
        {ticker.length > 0 && (
          <div className="sh-ed__ticker" aria-hidden="true" data-rk-cb8b08="">
            <div className="sh-ed__track" data-rk-cb8b08="">
              {[0, 1].map(() => ticker.map((w, __i: number) => <span key={__i} data-rk-cb8b08="">{w}<i data-rk-cb8b08="">✦</i></span>))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default ShopHeroEditorial;
