'use client';

import './TrustBadges.css';

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

interface Item { icon: 'truck' | 'return' | 'lock' | 'chat' | 'gift' | 'leaf'; title: string; text?: string }

/**
 * TrustBadges — Row of store guarantees (shipping, returns, secure payment, support).
 *
 * @param {Array<{icon: string, title: string, text?: string}>} items - Badges. Icons: truck|return|lock|chat|gift|leaf.
 * @param {string} variant - Style (cards|inline|divided). Default 'cards'.
 * @param {string} size - Density (sm|md|lg). Default 'md'.
 * @param {string} className - Extra class.
 *
 * Accessibility: plain list; icons are decorative.
 */
export interface TrustBadgesProps {
  items?: Item[];
  variant?: 'cards' | 'inline' | 'divided';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function TrustBadges({
  items = [
    { icon: 'truck', title: 'Free shipping', text: 'On orders over $75' },
    { icon: 'return', title: '30-day returns', text: 'No questions asked' },
    { icon: 'lock', title: 'Secure checkout', text: 'SSL & 3-D Secure' },
    { icon: 'chat', title: 'Real humans', text: 'Support 7 days a week' },
  ],
  variant = 'cards',
  size = 'md',
  className = '',
}: TrustBadgesProps) {
  const icons: Record<Item['icon'], string> = {
    truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    return: '<path d="M4 10h11a5 5 0 0 1 0 10H9"/><path d="m8 6-4 4 4 4"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12z"/>',
    gift: '<rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13M12 8S10 3 7.5 4 9 8 12 8zm0 0s2-5 4.5-4S15 8 12 8z"/>',
    leaf: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19c3-4 6-6 10-8"/>',
  };
  return (
    <>
      <div className="trust-badges-cq" data-rk-dbc985="">
      <ul className={cx(['trust-badges', `trust-badges--${variant}`, `trust-badges--${size}`, className])} data-rk-dbc985="">
        {items.map((item, __i: number) => (
          <li key={__i} className="trust-badge" data-rk-dbc985="">
            <span className="trust-badge__icon" aria-hidden="true" data-rk-dbc985="">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" data-rk-dbc985=""><g dangerouslySetInnerHTML={{ __html: icons[item.icon] }} data-rk-dbc985="" /></svg>
            </span>
            <span className="trust-badge__text" data-rk-dbc985="">
              <strong data-rk-dbc985="">{item.title}</strong>
              {item.text && <span data-rk-dbc985="">{item.text}</span>}
            </span>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
}

export default TrustBadges;
