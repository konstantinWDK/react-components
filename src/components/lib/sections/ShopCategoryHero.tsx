'use client';

import ProductMedia from '../ecommerce/ProductMedia';
import './ShopCategoryHero.css';

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

/**
 * ShopCategoryHero — Catalogue page header: breadcrumb, oversized category title with item
 * count, intro text, sub-category links and a strip of three visuals.
 *
 * @param {Array<{label: string, href?: string}>} breadcrumb - Trail; the last item is the current page.
 * @param {string} title - Category name. Default 'Clothing'.
 * @param {number} count - Number of products (superscript). Optional.
 * @param {string} text - Intro paragraph.
 * @param {Array<{label: string, href: string, active?: boolean}>} links - Sub-category links.
 * @param {Array<{icon?: string, hue?: number, image?: string}>} visuals - Up to three images (empty hides the strip).
 * @param {string} variant - Layout (split|centered). Default 'split'.
 * @param {string} size - Vertical rhythm (sm|md|lg). Default 'md'.
 * @param {string} className - Extra class.
 *
 * Accessibility: breadcrumb nav with aria-current; one h1; visuals are decorative.
 */
export interface ShopCategoryHeroProps {
  breadcrumb?: Array<{ label: string; href?: string }>;
  title?: string;
  count?: number;
  text?: string;
  links?: Array<{ label: string; href: string; active?: boolean }>;
  visuals?: Array<{ icon?: string; hue?: number; image?: string }>;
  variant?: 'split' | 'centered';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ShopCategoryHero({
  breadcrumb = [{ label: 'Home', href: '#' }, { label: 'Shop', href: '#' }, { label: 'Clothing' }],
  title = 'Clothing',
  count = 24,
  text = 'Overshirts, knitwear and outerwear cut from linen, merino and organic cotton. Designed to be layered, washed and worn for a decade.',
  links = [
    { label: 'All', href: '#', active: true },
    { label: 'Overshirts', href: '#' },
    { label: 'Knitwear', href: '#' },
    { label: 'Outerwear', href: '#' },
  ],
  visuals = [{ icon: 'shirt', hue: 30 }, { icon: 'jacket', hue: 22 }, { icon: 'sneaker', hue: 12 }],
  variant = 'split',
  size = 'md',
  className = '',
}: ShopCategoryHeroProps) {
  return (
    <>
      <header className={cx(['sch', `sch--${variant}`, `sch--${size}`, className])} data-rk-979dea="">
        <nav className="sch__crumbs" aria-label="Breadcrumb" data-rk-979dea="">
          <ol data-rk-979dea="">
            {breadcrumb.map((b, i) => (
              <li key={i} data-rk-979dea="">{b.href && i < breadcrumb.length - 1 ? <a href={b.href} data-rk-979dea="">{b.label}</a> : <span aria-current="page" data-rk-979dea="">{b.label}</span>}</li>
            ))}
          </ol>
        </nav>
        <div className="sch__main" data-rk-979dea="">
          <h1 className="sch__title" data-rk-979dea="">{title}{count !== undefined && <sup data-rk-979dea="">{count}</sup>}</h1>
          <div className="sch__side" data-rk-979dea="">
            {text && <p className="sch__text" data-rk-979dea="">{text}</p>}
            {links.length > 0 && (
              <ul className="sch__links" data-rk-979dea="">
                {links.map((l, __i: number) => <li key={__i} data-rk-979dea=""><a href={l.href} aria-current={l.active ? 'page' : undefined} data-rk-979dea="">{l.label}</a></li>)}
              </ul>
            )}
          </div>
        </div>
        {visuals.length > 0 && (
          <div className="sch__strip" aria-hidden="true" data-rk-979dea="">
            {visuals.slice(0, 3).map((v, __i: number) => <ProductMedia key={__i} image={v.image} icon={v.icon} hue={v.hue} ratio="16 / 9" variant="soft" size="md" />)}
          </div>
        )}
      </header>
    </>
  );
}

export default ShopCategoryHero;
