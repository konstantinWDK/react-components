'use client';

import { useEffect, useRef, useId } from 'react';
import './AgencyPricingPackages.css';

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

interface Pkg { name: string; price: number; billing: 'monthly' | 'project'; note: string; features: string[]; featured?: boolean }

interface Tab { id: string; label: string; packages: Pkg[] }

/**
 * AgencyPricingPackages — Agency pricing with one tab per service (Ads, SEO, Web…), three
 * packages per tab and a billing switch (monthly / 6-month commitment with discount) for retainers.
 * One-off project prices are shown as "fixed price". With a single tab the switcher is hidden.
 *
 * @param {string} eyebrow - Small label. Default 'Pricing'.
 * @param {string} title - Heading. Default 'Transparent pricing, no percentage of spend'.
 * @param {string} text - Intro paragraph.
 * @param {Array<{id: string, label: string, packages: Array<{name: string, price: number, billing: 'monthly'|'project', note: string, features: string[], featured?: boolean}>}>} tabs - Services and their packages.
 * @param {string} initial - Tab id selected first. Default: first tab.
 * @param {number} discount - Discount (%) for the 6-month commitment. Default 10.
 * @param {string} currency - ISO currency. Default 'EUR'.
 * @param {string} locale - Number locale. Default 'en-IE'.
 * @param {{label: string, href: string}} cta - Package button. Default 'Get started'.
 * @param {string} footnote - Line under the cards.
 * @param {string} className - Extra class.
 *
 * Accessibility: WAI-ARIA tabs (arrow keys, Home/End) and a switch (role="switch") for billing;
 * prices update in place and the change is announced in a polite live region.
 */
export interface AgencyPricingPackagesProps {
  eyebrow?: string;
  title?: string;
  text?: string;
  tabs?: Tab[];
  initial?: string;
  discount?: number;
  currency?: string;
  locale?: string;
  cta?: { label: string; href: string };
  footnote?: string;
  className?: string;
}

export function AgencyPricingPackages({
  eyebrow = 'Pricing',
  title = 'Transparent pricing, no percentage of spend',
  text = 'Fixed monthly fees for retainers, fixed prices for projects. Ad spend is paid directly to the platforms.',
  tabs = [
    { id: 'ads', label: 'Paid Ads', packages: [
      { name: 'Launch', price: 1900, billing: 'monthly', note: 'Up to €15k / month ad spend.', features: ['2 ad platforms', '6 new ads / month', 'Conversion tracking', 'Monthly report'] },
      { name: 'Growth', price: 3400, billing: 'monthly', note: '€15–60k / month ad spend.', features: ['4 ad platforms', '12 new ads / month', 'Server-side tracking', 'Landing page tests', 'Weekly report'], featured: true },
      { name: 'Scale', price: 5900, billing: 'monthly', note: '€60k+ / month ad spend.', features: ['All platforms', 'Weekly creative', 'Marketing mix modelling', 'Dedicated team'] },
    ] },
    { id: 'seo', label: 'SEO', packages: [
      { name: 'Foundations', price: 1500, billing: 'monthly', note: 'Fix the basics, grow one market.', features: ['Technical fixes', '4 pages / month', 'Rank tracking', 'Monthly report'] },
      { name: 'Authority', price: 2900, billing: 'monthly', note: 'Win competitive keywords.', features: ['8 articles / month', 'Digital PR / quarter', 'Local SEO', 'Revenue dashboard'], featured: true },
      { name: 'Enterprise', price: 4800, billing: 'monthly', note: 'Many markets, large sites.', features: ['International SEO', '16 articles / month', 'Monthly PR', 'Dev hours included'] },
    ] },
    { id: 'web', label: 'Websites', packages: [
      { name: 'Landing page', price: 3200, billing: 'project', note: 'One page for a launch.', features: ['Copy & design', 'React build', 'A/B test setup'] },
      { name: 'Website', price: 9500, billing: 'project', note: 'Up to 12 templates.', features: ['UX & content', 'Design system', 'Headless CMS', 'SEO migration'], featured: true },
      { name: 'E-commerce', price: 18000, billing: 'project', note: 'Headless Shopify.', features: ['Shopify + React', 'Checkout UX', 'Integrations', 'CRO roadmap'] },
    ] },
  ],
  initial,
  discount = 10,
  currency = 'EUR',
  locale = 'en-IE',
  cta = { label: 'Get started', href: '#contact' },
  footnote = 'All prices exclude VAT. Retainers have a 3-month initial term, then roll monthly.',
  className = '',
}: AgencyPricingPackagesProps) {
  const uid = `app-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const first = tabs.find((t) => t.id === initial)?.id ?? tabs[0]?.id;
  const fmt = (n: number) => new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);
  const single = tabs.length < 2;
  const hasMonthly = (t: Tab) => t.packages.some((p) => p.billing === 'monthly');

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-agency-pricing]:not([data-bound])').forEach((root) => {
        root.dataset.bound = '';
        const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
        const billingWrap = root.querySelector<HTMLElement>('[data-billing-wrap]');
        const sw = root.querySelector<HTMLButtonElement>('[data-billing]');
        const live = root.querySelector<HTMLElement>('[data-live]');
        const discount = Number(root.dataset.discount) || 0;
        const fmt = new Intl.NumberFormat(root.dataset.locale || 'en', { style: 'currency', currency: root.dataset.currency || 'EUR', maximumFractionDigits: 0 });
    
        const select = (tab: HTMLButtonElement, focus = false) => {
          tabs.forEach((t) => {
            const on = t === tab;
            t.setAttribute('aria-selected', String(on));
            t.tabIndex = on ? 0 : -1;
            const panel = root.querySelector<HTMLElement>(`#${t.getAttribute('aria-controls')}`);
            if (panel) panel.hidden = !on;
          });
          if (billingWrap) billingWrap.hidden = !tab.hasAttribute('data-monthly');
          if (focus) tab.focus();
        };
        tabs.forEach((t, i) => {
          t.addEventListener('click', () => select(t));
          t.addEventListener('keydown', (e) => {
            const k = e.key;
            let n = -1;
            if (k === 'ArrowRight') n = (i + 1) % tabs.length;
            else if (k === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
            else if (k === 'Home') n = 0;
            else if (k === 'End') n = tabs.length - 1;
            if (n >= 0) { e.preventDefault(); select(tabs[n], true); }
          });
        });
    
        sw?.addEventListener('click', () => {
          const on = sw.getAttribute('aria-checked') !== 'true';
          sw.setAttribute('aria-checked', String(on));
          root.querySelectorAll<HTMLElement>('[data-price]').forEach((el) => {
            const base = Number(el.dataset.price);
            el.textContent = fmt.format(on ? Math.round(base * (1 - discount / 100)) : base);
          });
          if (live) live.textContent = on ? `6-month plan selected: ${discount}% off monthly prices.` : 'Monthly billing selected.';
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="app-cq" data-rk-17fea4="">
      <section className={cx(['app', className])} data-agency-pricing data-discount={discount} data-currency={currency} data-locale={locale} data-rk-17fea4="">
        <header className="app__head" data-rk-17fea4="">
          {eyebrow && <p className="app__eyebrow" data-rk-17fea4="">{eyebrow}</p>}
          <h2 className="app__title" data-rk-17fea4="">{title}</h2>
          {text && <p className="app__text" data-rk-17fea4="">{text}</p>}
        </header>
      
        <div className="app__controls" data-rk-17fea4="">
          {!single && (
            <div className="app__tabs" role="tablist" aria-label="Service" data-rk-17fea4="">
              {tabs.map((t, __i: number) => (
                <button key={__i} type="button" role="tab" className="app__tab" id={`${uid}-tab-${t.id}`} aria-controls={`${uid}-panel-${t.id}`} aria-selected={t.id === first ? 'true' : 'false'} tabIndex={t.id === first ? 0 : -1} data-tab={t.id} data-monthly={hasMonthly(t) ? '' : undefined} data-rk-17fea4="">{t.label}</button>
              ))}
            </div>
          )}
          <div className="app__billing" data-billing-wrap hidden={!hasMonthly(tabs.find((t) => t.id === first) ?? tabs[0])} data-rk-17fea4="">
            <span id={`${uid}-bill`} data-rk-17fea4="">Monthly</span>
            <button type="button" role="switch" aria-checked="false" aria-labelledby={`${uid}-bill ${uid}-bill-6`} className="app__switch" data-billing data-rk-17fea4=""><span data-rk-17fea4=""></span></button>
            <span id={`${uid}-bill-6`} data-rk-17fea4="">6-month plan <em data-rk-17fea4="">−{discount}%</em></span>
          </div>
        </div>
      
        {tabs.map((t, __i: number) => (
          <div key={__i} className="app__panel" role={single ? undefined : 'tabpanel'} id={`${uid}-panel-${t.id}`} aria-labelledby={single ? undefined : `${uid}-tab-${t.id}`} hidden={t.id !== first} tabIndex={single ? undefined : 0} data-rk-17fea4="">
            <div className="app__grid" data-rk-17fea4="">
              {t.packages.map((p, __i: number) => (
                <article key={__i} className={cx(['app__card', { 'is-featured': p.featured }])} data-rk-17fea4="">
                  {p.featured && <span className="app__flag" data-rk-17fea4="">Most popular</span>}
                  <h3 className="app__name" data-rk-17fea4="">{p.name}</h3>
                  <p className="app__note" data-rk-17fea4="">{p.note}</p>
                  <p className="app__price" data-rk-17fea4="">
                    <strong data-price={p.billing === 'monthly' ? p.price : undefined} data-rk-17fea4="">{fmt(p.price)}</strong>
                    <span data-rk-17fea4="">{p.billing === 'monthly' ? '/ month' : 'fixed price'}</span>
                  </p>
                  <ul className="app__features" data-rk-17fea4="">
                    {p.features.map((f, __i: number) => <li key={__i} data-rk-17fea4=""><span aria-hidden="true" data-rk-17fea4="">✓</span>{f}</li>)}
                  </ul>
                  {cta && <a className="app__cta" href={cta.href} data-rk-17fea4="">{cta.label}<span className="sr-only" data-rk-17fea4=""> — {t.label} {p.name}</span></a>}
                </article>
              ))}
            </div>
          </div>
        ))}
      
        {footnote && <p className="app__foot" data-rk-17fea4="">{footnote}</p>}
        <p className="sr-only" aria-live="polite" data-live data-rk-17fea4=""></p>
      </section>
      </div>
    </>
  );
}

export default AgencyPricingPackages;
