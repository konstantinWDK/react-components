'use client';

import ModernSelect from '../forms/ModernSelect';
import './ProductToolbar.css';

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
 * ProductToolbar — Catalog heading bar: title, live result count and a sort select
 * (built on ModernSelect) that drives FilterSidebar's sorting.
 *
 * @param {string} title - Page heading. Default 'All products'.
 * @param {string} description - Optional supporting copy.
 * @param {number} total - Initial product count. Default 0.
 * @param {string} target - ProductGrid id. Default 'product-grid'.
 * @param {string} filtersId - FilterSidebar form id (sort select becomes `${filtersId}-sort`). Default 'catalog-filters'.
 * @param {Array<{label: string, value: string}>} sortOptions - Sort choices (values: featured|price-asc|price-desc|rating|name).
 * @param {string} countLabel - Text after the count. Default 'products'.
 * @param {string} headingLevel - Title element (h1|h2). Default 'h1'.
 * @param {string} variant - Layout (split|stacked). Default 'split'.
 * @param {string} className - Extra class.
 *
 * Accessibility: the count lives in a polite live region so filter changes are announced.
 */
export interface ProductToolbarProps {
  title?: string;
  description?: string;
  total?: number;
  target?: string;
  filtersId?: string;
  sortOptions?: Array<{ label: string; value: string }>;
  countLabel?: string;
  headingLevel?: 'h1' | 'h2';
  variant?: 'split' | 'stacked';
  className?: string;
}

export function ProductToolbar({
  title = 'All products',
  description,
  total = 0,
  target = 'product-grid',
  filtersId = 'catalog-filters',
  sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: low to high', value: 'price-asc' },
    { label: 'Price: high to low', value: 'price-desc' },
    { label: 'Top rated', value: 'rating' },
    { label: 'Name A–Z', value: 'name' },
  ],
  countLabel = 'products',
  headingLevel = 'h1',
  variant = 'split',
  className = '',
}: ProductToolbarProps) {
  const Heading: any = headingLevel;
  return (
    <>
      <div className="p-toolbar-cq" data-rk-e742d8="">
      <div className={cx(['p-toolbar', `p-toolbar--${variant}`, className])} data-rk-e742d8="">
        <div className="p-toolbar__text" data-rk-e742d8="">
          <Heading className="p-toolbar__title" data-rk-e742d8="">{title}</Heading>
          {description && <p className="p-toolbar__desc" data-rk-e742d8="">{description}</p>}
          <p className="p-toolbar__count" aria-live="polite" data-rk-e742d8="">
            <span data-result-count={target} data-rk-e742d8="">{total}</span> {countLabel}
          </p>
        </div>
        <div className="p-toolbar__sort" data-rk-e742d8="">
          <ModernSelect label="Sort by" id={`${filtersId}-sort`} name="sort" options={sortOptions} />
        </div>
      </div>
      </div>
    </>
  );
}

export default ProductToolbar;
