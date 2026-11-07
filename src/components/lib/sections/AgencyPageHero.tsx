'use client';

import './AgencyPageHero.css';

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
 * AgencyPageHero — Inner-page hero for agency sites: breadcrumb, eyebrow, oversized headline with a
 * highlighted *word*, intro text, optional CTA and a row of key facts.
 *
 * @param {string} eyebrow - Small label above the title. Default 'Services'.
 * @param {string} title - Heading; wrap one word in *asterisks* to highlight it. Default 'Growth you can *measure*'.
 * @param {string} text - Intro paragraph.
 * @param {Array<{label: string, href?: string}>} breadcrumb - Trail (last item = current page).
 * @param {{label: string, href: string}} cta - Optional call to action.
 * @param {Array<{value: string, label: string}>} facts - Key figures shown under the intro (max 4).
 * @param {string} align - Layout (left|center). Default 'left'.
 * @param {string} className - Extra class.
 *
 * Accessibility: breadcrumb nav with aria-current on the last item; the highlight is a <mark>
 * so the heading reads as one sentence; facts use a description list.
 */
export interface AgencyPageHeroProps {
  eyebrow?: string;
  title?: string;
  text?: string;
  breadcrumb?: Array<{ label: string; href?: string }>;
  cta?: { label: string; href: string };
  facts?: Array<{ value: string; label: string }>;
  align?: 'left' | 'center';
  className?: string;
}

export function AgencyPageHero({
  eyebrow = 'Services',
  title = 'Growth you can *measure*',
  text = 'Paid ads, SEO and websites run by one senior team, with one dashboard and one goal: more revenue for every euro you invest.',
  breadcrumb = [{ label: 'Home', href: '/' }, { label: 'Services' }],
  cta,
  facts = [
    { value: '€42M', label: 'ad spend managed' },
    { value: '4.8×', label: 'average ROAS' },
    { value: '96%', label: 'client retention' },
  ],
  align = 'left',
  className = '',
}: AgencyPageHeroProps) {
  const parts = title.split(/\*(.+?)\*/);
  return (
    <>
      <div className="aph-cq" data-rk-d68a6d="">
      <section className={cx(['aph', `aph--${align}`, className])} data-rk-d68a6d="">
        {breadcrumb.length > 0 && (
          <nav className="aph__crumbs" aria-label="Breadcrumb" data-rk-d68a6d="">
            <ol data-rk-d68a6d="">
              {breadcrumb.map((b, i) => (
                <li key={i} data-rk-d68a6d="">
                  {b.href && i < breadcrumb.length - 1 ? <a href={b.href} data-rk-d68a6d="">{b.label}</a> : <span aria-current="page" data-rk-d68a6d="">{b.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="aph__eyebrow" data-rk-d68a6d=""><span aria-hidden="true" data-rk-d68a6d=""></span>{eyebrow}</p>}
        <h1 className="aph__title" data-rk-d68a6d="">{parts.map((p, i) => (i % 2 ? <mark key={i} data-rk-d68a6d="">{p}</mark> : p))}</h1>
        <div className="aph__foot" data-rk-d68a6d="">
          {text && <p className="aph__text" data-rk-d68a6d="">{text}</p>}
          {cta && <a className="aph__cta" href={cta.href} data-rk-d68a6d="">{cta.label}<span aria-hidden="true" data-rk-d68a6d="">↗</span></a>}
        </div>
        {facts.length > 0 && (
          <dl className="aph__facts" data-rk-d68a6d="">
            {facts.slice(0, 4).map((f, __i: number) => (
              <div key={__i} data-rk-d68a6d=""><dt data-rk-d68a6d="">{f.label}</dt><dd data-rk-d68a6d="">{f.value}</dd></div>
            ))}
          </dl>
        )}
      </section>
      </div>
    </>
  );
}

export default AgencyPageHero;
