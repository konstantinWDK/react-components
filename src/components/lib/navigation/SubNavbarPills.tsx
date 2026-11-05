'use client';

import './SubNavbarPills.css';

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
 * SubNavbarPills — Secondary horizontal sub-navigation bar with scrollable pill links and badge counters.
 * 
 * @param {Array<{label: string, href: string, count?: number, active?: boolean}>} items - Nav links list.
 * @param {string} className - Optional CSS class.
 */
export interface SubNavbarPillsProps {
  items?: Array<{ label: string; href: string; count?: number; active?: boolean }>;
  className?: string;
}

export function SubNavbarPills({
  items = [
    { label: 'All Items', href: '#all', count: 124, active: true },
    { label: 'Components', href: '#components', count: 86 },
    { label: 'Templates', href: '#templates', count: 18 },
    { label: 'Icons', href: '#icons', count: 20 },
    { label: 'Guides', href: '#guides' },
  ],
  className = '',
}: SubNavbarPillsProps) {
  return (
    <>
      <nav className={cx(['subnav-pills', className])} aria-label="Sub navigation" data-rk-101a64="">
        <div className="subnav-pills__track" data-rk-101a64="">
          {items.map((item, __i: number) => (
            <a key={__i} href={item.href} className={cx(['subnav-pills__link', { 'is-active': item.active }])} aria-current={item.active ? 'page' : undefined} data-rk-101a64="">
              <span data-rk-101a64="">{item.label}</span>
              {item.count !== undefined && (
                <span className="subnav-pills__count" data-rk-101a64="">{item.count}</span>
              )}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}

export default SubNavbarPills;
