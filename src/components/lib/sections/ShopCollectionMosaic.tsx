'use client';

import ProductMedia from '../ecommerce/ProductMedia';
import './ShopCollectionMosaic.css';

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

interface Tile { title: string; text?: string; href: string; count?: number; icon?: string; hue?: number; image?: string }

/**
 * ShopCollectionMosaic — Asymmetric collection grid: one tall feature tile and smaller tiles,
 * each with an index number, title, item count and an underline link.
 *
 * @param {string} eyebrow - Small label. Default 'Collections'.
 * @param {string} title - Section heading. Default 'Shop by *intention*'.
 * @param {Array<{title: string, text?: string, href: string, count?: number, icon?: string, hue?: number, image?: string}>} items - 2–5 tiles; the first one is featured.
 * @param {string} linkLabel - Tile link text. Default 'Explore'.
 * @param {string} countLabel - Suffix after counts. Default 'pieces'.
 * @param {string} variant - Layout (feature-left|feature-right). Default 'feature-left'.
 * @param {string} size - Tile height (sm|md|lg). Default 'md'.
 * @param {string} className - Extra class.
 *
 * Accessibility: each tile is one link with a heading inside; art is decorative.
 */
export interface ShopCollectionMosaicProps {
  eyebrow?: string;
  title?: string;
  items?: Tile[];
  linkLabel?: string;
  countLabel?: string;
  variant?: 'feature-left' | 'feature-right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ShopCollectionMosaic({
  eyebrow = 'Collections',
  title = 'Shop by *intention*',
  items = [
    { title: 'The wardrobe', text: 'Overshirts, knitwear and coats in natural fibres.', href: '#', count: 24, icon: 'jacket', hue: 22 },
    { title: 'At the table', text: 'Stoneware made by hand.', href: '#', count: 12, icon: 'mug', hue: 14 },
    { title: 'Light & air', text: 'Lamps and living things.', href: '#', count: 9, icon: 'plant', hue: 110 },
    { title: 'To carry', text: 'Bags that soften with age.', href: '#', count: 8, icon: 'bag', hue: 34 },
  ],
  linkLabel = 'Explore',
  countLabel = 'pieces',
  variant = 'feature-left',
  size = 'md',
  className = '',
}: ShopCollectionMosaicProps) {
  const parts = title.split(/\*(.+?)\*/g);
  return (
    <>
      <section className={cx(['scm', `scm--${variant}`, `scm--${size}`, className])} data-rk-ba6398="">
        <header className="scm__head" data-rk-ba6398="">
          {eyebrow && <p className="scm__eyebrow" data-rk-ba6398="">{eyebrow}</p>}
          <h2 className="scm__title" data-rk-ba6398="">{parts.map((p, i) => (i % 2 ? <em data-rk-ba6398="">{p}</em> : p))}</h2>
        </header>
        <ul className="scm__grid" data-rk-ba6398="">
          {items.slice(0, 5).map((t, i) => (
            <li key={i} className={cx(['scm__item', { 'scm__item--feature': i === 0 }])} data-rk-ba6398="">
              <a className="scm__tile" href={t.href} data-rk-ba6398="">
                <span className="scm__art" data-rk-ba6398=""><ProductMedia image={t.image} alt="" icon={t.icon} hue={t.hue} ratio="auto" variant="soft" size={i === 0 ? 'lg' : 'md'} /></span>
                <span className="scm__num" aria-hidden="true" data-rk-ba6398="">{String(i + 1).padStart(2, '0')}</span>
                <span className="scm__body" data-rk-ba6398="">
                  <h3 className="scm__name" data-rk-ba6398="">{t.title}</h3>
                  {t.text && <span className="scm__text" data-rk-ba6398="">{t.text}</span>}
                  <span className="scm__link" data-rk-ba6398="">{t.count !== undefined ? `${linkLabel} · ${t.count} ${countLabel}` : linkLabel}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default ShopCollectionMosaic;
