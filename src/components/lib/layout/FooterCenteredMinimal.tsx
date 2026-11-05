'use client';

import type { ReactNode } from 'react';
import './FooterCenteredMinimal.css';

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
 * FooterCenteredMinimal — A minimal centered footer with copyright text.
 *
 * Displays a simple, clean footer with a logo slot and copyright text.
 * Suitable for landing pages, documentation sites, and minimal layouts.
 *
 * @param {string} copyright - Copyright text. Default: '© 2026 Built with Astro Components Kit.'.
 * @param {string} className - Additional CSS class to apply.
 *
 * @example
 * ```astro
 * <FooterCenteredMinimal copyright="© 2026 MyCompany. All rights reserved." />
 * ```
 */
export interface FooterCenteredMinimalProps {
  copyright?: string;
  className?: string;
  logo?: ReactNode;
}

export function FooterCenteredMinimal({ copyright = '© 2026 Built with Astro Components Kit.', className = '',
  logo
}: FooterCenteredMinimalProps) {
  return (
    <>
      <div className="cq-footer-centered-minimal-cq" data-rk-2106dc="">
      <footer className={cx(['footer-centered', className])} data-rk-2106dc="">
        <div className="footer-centered__inner" data-rk-2106dc="">
          <div className="footer-centered__logo" data-rk-2106dc="">
            {logo}
          </div>
          <p className="footer-centered__copy" data-rk-2106dc="">{copyright}</p>
        </div>
      </footer>
      </div>
    </>
  );
}

export default FooterCenteredMinimal;
