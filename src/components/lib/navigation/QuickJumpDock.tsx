'use client';

import './QuickJumpDock.css';

/**
 * QuickJumpDock — Floating desktop navigation dock bar with hover magnification and tooltips.
 * 
 * @param {Array<{label: string, icon: string, href: string}>} items - List of dock actions.
 */
export interface QuickJumpDockProps {
  items?: Array<{ label: string; icon: string; href: string }>;
}

export function QuickJumpDock({
  items = [
    {
      label: 'Home',
      href: '/',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    },
    {
      label: 'Components',
      href: '/docs/glass-button',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
    },
    {
      label: 'Sections',
      href: '/sections',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>`,
    },
    {
      label: 'Search',
      href: '#search',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    },
    {
      label: 'GitHub',
      href: 'https://github.com/konstantinWDK/astro-components',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/></svg>`,
    },
  ],
}: QuickJumpDockProps) {
  return (
    <>
      <nav className="quick-dock" aria-label="Quick dock navigation" data-dock data-rk-6aad51="">
        {items.map((item, __i: number) => (
          <a key={__i} href={item.href} className="quick-dock__item" aria-label={item.label} data-rk-6aad51="">
            <span className="quick-dock__tooltip" aria-hidden="true" data-rk-6aad51="">{item.label}</span>
            <span className="quick-dock__icon" dangerouslySetInnerHTML={{ __html: item.icon }} data-rk-6aad51="" />
          </a>
        ))}
      </nav>
    </>
  );
}

export default QuickJumpDock;
