'use client';

import './DevFooter.css';

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
 * DevFooter — Minimal footer for developer portfolios ("Keycap" design): a row of mono links, the
 * copyright and an optional "built with" note, separated by a hairline.
 *
 * @param {string} name - Copyright holder.
 * @param {Array<{label: string, href: string}>} links - Footer links.
 * @param {string} note - Optional small note (e.g. "Built with React & Three.js").
 * @param {number} year - Copyright year. Default current year.
 * @param {string} className - Extra class.
 *
 * Accessibility: contentinfo landmark with a labelled nav; 44px link targets on touch screens.
 */
export interface DevFooterProps {
  name?: string;
  links?: Array<{ label: string; href: string }>;
  note?: string;
  year?: number;
  className?: string;
}

export function DevFooter({ name = 'Noa Lindqvist', links = [{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects/' }, { label: 'Blog', href: '/blog/' }, { label: 'Contact', href: '/contact/' }], note, year = new Date().getFullYear(), className = '' }: DevFooterProps) {
  return (
    <>
      <footer className={cx(['dvft', className])} data-rk-ca7b1f="">
        <div className="dvft__wrap" data-rk-ca7b1f="">
          {links.length > 0 && (
            <nav aria-label="Footer" data-rk-ca7b1f="">
              <ul className="dvft__links" data-rk-ca7b1f="">{links.map((l, __i: number) => <li key={__i} data-rk-ca7b1f=""><a href={l.href} data-rk-ca7b1f="">{l.label}</a></li>)}</ul>
            </nav>
          )}
          <p className="dvft__copy" data-rk-ca7b1f="">© {year} {name}{note && <span className="dvft__note" data-rk-ca7b1f=""> · {note}</span>}</p>
        </div>
      </footer>
    </>
  );
}

export default DevFooter;
