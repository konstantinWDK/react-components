'use client';

import './AgencyServicePillars.css';

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

interface Service {
  name: string;
  short: string;
  icon?: 'ads' | 'seo' | 'web' | 'social' | 'email' | 'data';
  kpi?: { value: string; label: string };
  deliverables?: string[];
  from?: string;
  href?: string;
}

/**
 * AgencyServicePillars — Three (or more) service cards for a marketing agency: icon, name, pitch,
 * headline KPI, deliverables and a link. The middle card can be highlighted.
 *
 * @param {string} eyebrow - Small label. Default 'What we do'.
 * @param {string} title - Heading; wrap a word in *asterisks* to highlight it. Default 'Three ways we *grow* your business'.
 * @param {string} text - Intro paragraph (optional).
 * @param {Array<{name: string, short: string, icon?: string, kpi?: {value: string, label: string}, deliverables?: string[], from?: string, href?: string}>} services - Cards. icon: ads|seo|web|social|email|data.
 * @param {number} featured - Index of the highlighted card (-1 for none). Default 0.
 * @param {string} linkLabel - Card link text. Default 'Explore'.
 * @param {string} className - Extra class.
 *
 * Accessibility: each card is an article with an h3; the whole card is clickable through the
 * heading link (stretched), so there is a single link per card for screen readers.
 */
export interface AgencyServicePillarsProps {
  eyebrow?: string;
  title?: string;
  text?: string;
  services?: Service[];
  featured?: number;
  linkLabel?: string;
  className?: string;
}

export function AgencyServicePillars({
  eyebrow = 'What we do',
  title = 'Three ways we *grow* your business',
  text = 'Most clients start with one channel and add the others once the numbers prove it. One team, one plan, one dashboard.',
  services = [
    { name: 'Paid Ads', short: 'Google, Meta, TikTok and LinkedIn campaigns built around profit, not clicks.', icon: 'ads', kpi: { value: '4.8×', label: 'average ROAS' }, deliverables: ['Campaign build', 'Creative testing', 'Tracking'], from: 'From €1,900 / mo', href: '#ads' },
    { name: 'SEO', short: 'Technical SEO, content and links that compound into traffic you do not pay for.', icon: 'seo', kpi: { value: '+212%', label: 'organic traffic' }, deliverables: ['Technical audit', 'Content', 'Digital PR'], from: 'From €1,500 / mo', href: '#seo' },
    { name: 'Web Development', short: 'Fast, accessible websites and landing pages designed to turn visitors into leads.', icon: 'web', kpi: { value: '0.8s', label: 'median load time' }, deliverables: ['UX & design', 'React build', 'Headless CMS'], from: 'From €9,500', href: '#web' },
  ],
  featured = 0,
  linkLabel = 'Explore',
  className = '',
}: AgencyServicePillarsProps) {
  const icons: Record<string, string> = {
    ads: '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
    seo: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8M7.5 12l2-2 1.5 1.5L13.5 9"/>',
    web: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9.5 13l-2 2 2 2M14.5 13l2 2-2 2"/>',
    social: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
    email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    data: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  };
  const parts = title.split(/\*(.+?)\*/);
  return (
    <>
      <div className="asp-cq" data-rk-6fdb99="">
      <section className={cx(['asp', className])} data-rk-6fdb99="">
        <header className="asp__head" data-rk-6fdb99="">
          {eyebrow && <p className="asp__eyebrow" data-rk-6fdb99="">{eyebrow}</p>}
          <h2 className="asp__title" data-rk-6fdb99="">{parts.map((p, i) => (i % 2 ? <mark key={i} data-rk-6fdb99="">{p}</mark> : p))}</h2>
          {text && <p className="asp__text" data-rk-6fdb99="">{text}</p>}
        </header>
        <div className="asp__grid" data-rk-6fdb99="">
          {services.map((s, i) => (
            <article key={i} className={cx(['asp__card', { 'is-featured': i === featured }])} data-rk-6fdb99="">
              <div className="asp__top" data-rk-6fdb99="">
                <span className="asp__icon" aria-hidden="true" data-rk-6fdb99="">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: icons[s.icon ?? 'data'] }} data-rk-6fdb99=""></svg>
                </span>
                <span className="asp__num" aria-hidden="true" data-rk-6fdb99="">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="asp__name" data-rk-6fdb99="">{s.href ? <a href={s.href} data-rk-6fdb99="">{s.name}</a> : s.name}</h3>
              <p className="asp__short" data-rk-6fdb99="">{s.short}</p>
              {s.kpi && (
                <p className="asp__kpi" data-rk-6fdb99=""><strong data-rk-6fdb99="">{s.kpi.value}</strong><span data-rk-6fdb99="">{s.kpi.label}</span></p>
              )}
              {s.deliverables && s.deliverables.length > 0 && (
                <ul className="asp__tags" data-rk-6fdb99="">{s.deliverables.map((d, __i: number) => <li key={__i} data-rk-6fdb99="">{d}</li>)}</ul>
              )}
              <div className="asp__foot" data-rk-6fdb99="">
                {s.from && <span className="asp__from" data-rk-6fdb99="">{s.from}</span>}
                {s.href && <span className="asp__go" aria-hidden="true" data-rk-6fdb99="">{linkLabel} <span data-rk-6fdb99="">→</span></span>}
              </div>
            </article>
          ))}
        </div>
      </section>
      </div>
    </>
  );
}

export default AgencyServicePillars;
