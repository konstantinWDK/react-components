'use client';

import { useEffect, useRef, useId } from 'react';
import './AgencyRoiCalculator.css';

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
 * AgencyRoiCalculator — Paid-ads ROI calculator: sliders for monthly ad spend, cost per click,
 * conversion rate and average order value; live clicks, sales, revenue and ROAS, plus the
 * projection after agency optimisation (configurable uplift) on a comparison bar.
 *
 * @param {string} eyebrow - Small label. Default 'ROI calculator'.
 * @param {string} title - Heading. Default 'What could your ad budget return?'.
 * @param {string} text - Intro paragraph.
 * @param {number} spend - Initial monthly spend. Default 10000.
 * @param {number} cpc - Initial cost per click. Default 0.9.
 * @param {number} cvr - Initial conversion rate (%). Default 2.2.
 * @param {number} aov - Initial average order value. Default 85.
 * @param {number} uplift - Expected improvement with the agency (%), applied to CPC and CVR. Default 25.
 * @param {string} currency - ISO currency. Default 'EUR'.
 * @param {string} locale - Number locale. Default 'en-IE'.
 * @param {string} upliftLabel - Label of the optimised bar. Default 'With Volta'.
 * @param {{label: string, href: string}} cta - Call to action.
 * @param {string} disclaimer - Fine print.
 * @param {string} className - Extra class.
 *
 * Accessibility: native range inputs with labels and aria-valuetext in plain language; results
 * are summarised in a polite live region (debounced) so changes are announced without stealing focus.
 */
export interface AgencyRoiCalculatorProps {
  eyebrow?: string;
  title?: string;
  text?: string;
  spend?: number;
  cpc?: number;
  cvr?: number;
  aov?: number;
  uplift?: number;
  upliftLabel?: string;
  currency?: string;
  locale?: string;
  cta?: { label: string; href: string };
  disclaimer?: string;
  className?: string;
}

export function AgencyRoiCalculator({
  eyebrow = 'ROI calculator',
  title = 'What could your ad budget return?',
  text = 'Move the sliders to match your account. We show what you earn today and what a typical Volta optimisation adds.',
  spend = 10000,
  cpc = 0.9,
  cvr = 2.2,
  aov = 85,
  uplift = 25,
  upliftLabel = 'With Volta',
  currency = 'EUR',
  locale = 'en-IE',
  cta = { label: 'Get a custom forecast', href: '#contact' },
  disclaimer = 'Estimates for illustration only. Results depend on market, offer and margins.',
  className = '',
}: AgencyRoiCalculatorProps) {
  const uid = `arc-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const sliders = [
    { key: 'spend', label: 'Monthly ad spend', min: 1000, max: 100000, step: 500, value: spend, kind: 'money' },
    { key: 'cpc', label: 'Cost per click', min: 0.1, max: 5, step: 0.05, value: cpc, kind: 'money2' },
    { key: 'cvr', label: 'Conversion rate', min: 0.2, max: 10, step: 0.1, value: cvr, kind: 'pct' },
    { key: 'aov', label: 'Average order value', min: 10, max: 1000, step: 5, value: aov, kind: 'money' },
  ];

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-roi]:not([data-bound])').forEach((root) => {
        root.dataset.bound = '';
        const uplift = (Number(root.dataset.uplift) || 0) / 100;
        const locale = root.dataset.locale || 'en';
        const currency = root.dataset.currency || 'EUR';
        const money = new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 });
        const money2 = new Intl.NumberFormat(locale, { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const num = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
        const inputs = Array.from(root.querySelectorAll<HTMLInputElement>('input[type="range"]'));
        const val = (k: string) => Number(inputs.find((i) => i.name === k)?.value ?? 0);
        const show = (i: HTMLInputElement) => {
          const v = Number(i.value);
          const txt = i.dataset.kind === 'money2' ? money2.format(v) : i.dataset.kind === 'pct' ? `${v.toFixed(1)}%` : money.format(v);
          const out = root.querySelector<HTMLElement>(`[data-out="${i.name}"]`);
          if (out) out.textContent = txt;
          i.setAttribute('aria-valuetext', txt);
          const p = ((v - Number(i.min)) / (Number(i.max) - Number(i.min))) * 100;
          i.style.setProperty('--p', `${p}%`);
        };
        const set = (k: string, t: string) => { const el = root.querySelector<HTMLElement>(`[data-r="${k}"]`); if (el) el.textContent = t; };
        const calc = () => {
          inputs.forEach(show);
          const spend = val('spend'), cpc = val('cpc'), cvr = val('cvr') / 100, aov = val('aov');
          const clicks = spend / cpc;
          const sales = clicks * cvr;
          const revenue = sales * aov;
          const upClicks = spend / (cpc * (1 - uplift / 2));
          const upRevenue = upClicks * cvr * (1 + uplift) * aov;
          set('clicks', num.format(clicks));
          set('sales', num.format(sales));
          set('revenue', money.format(revenue));
          set('revenue2', money.format(revenue));
          set('roas', `${(revenue / spend).toFixed(1)}×`);
          set('upRevenue', money.format(upRevenue));
          set('upRoas', `${(upRevenue / spend).toFixed(1)}×`);
          set('gain', money.format(Math.max(0, upRevenue - revenue)));
          const max = Math.max(revenue, upRevenue, 1);
          root.querySelector<HTMLElement>('[data-bar="now"]')?.style.setProperty('--w', `${(revenue / max) * 100}%`);
          root.querySelector<HTMLElement>('[data-bar="up"]')?.style.setProperty('--w', `${(upRevenue / max) * 100}%`);
        };
        const live = root.querySelector<HTMLElement>('[data-live]');
        let timer = 0;
        const announce = () => {
          window.clearTimeout(timer);
          timer = window.setTimeout(() => {
            const r = (k: string) => root.querySelector<HTMLElement>(`[data-r="${k}"]`)?.textContent ?? '';
            if (live) live.textContent = `Revenue ${r('revenue')}, ROAS ${r('roas')}. Optimised: ${r('upRevenue')}, ROAS ${r('upRoas')}.`;
          }, 700);
        };
        inputs.forEach((i) => i.addEventListener('input', () => { calc(); announce(); }));
        calc();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="arc-cq" data-rk-a57006="">
      <section className={cx(['arc', className])} data-roi data-uplift={uplift} data-currency={currency} data-locale={locale} data-rk-a57006="">
        <div className="arc__intro" data-rk-a57006="">
          {eyebrow && <p className="arc__eyebrow" data-rk-a57006="">{eyebrow}</p>}
          <h2 className="arc__title" data-rk-a57006="">{title}</h2>
          {text && <p className="arc__text" data-rk-a57006="">{text}</p>}
        </div>
      
        <div className="arc__inputs" role="group" aria-label="Your account" data-rk-a57006="">
          {sliders.map((s, __i: number) => (
            <div key={__i} className="arc__field" data-rk-a57006="">
              <div className="arc__row" data-rk-a57006="">
                <label htmlFor={`${uid}-${s.key}`} data-rk-a57006="">{s.label}</label>
                <output htmlFor={`${uid}-${s.key}`} data-out={s.key} data-rk-a57006=""></output>
              </div>
              <input type="range" id={`${uid}-${s.key}`} name={s.key} min={s.min} max={s.max} step={s.step} defaultValue={s.value} data-kind={s.kind} data-rk-a57006="" />
            </div>
          ))}
        </div>
      
        <div className="arc__results" data-rk-a57006="">
          <div className="arc__out" data-rk-a57006="">
            <dl className="arc__now" data-rk-a57006="">
              <div data-rk-a57006=""><dt data-rk-a57006="">Clicks</dt><dd data-r="clicks" data-rk-a57006="">–</dd></div>
              <div data-rk-a57006=""><dt data-rk-a57006="">Sales</dt><dd data-r="sales" data-rk-a57006="">–</dd></div>
              <div data-rk-a57006=""><dt data-rk-a57006="">Revenue</dt><dd data-r="revenue" data-rk-a57006="">–</dd></div>
              <div data-rk-a57006=""><dt data-rk-a57006="">ROAS</dt><dd data-r="roas" data-rk-a57006="">–</dd></div>
            </dl>
            <div className="arc__compare" data-rk-a57006="">
              <p className="arc__compare-title" data-rk-a57006="">Monthly revenue</p>
              <div className="arc__bar" data-rk-a57006=""><span data-rk-a57006="">Today</span><span className="arc__fill" data-bar="now" data-rk-a57006=""></span><strong data-r="revenue2" data-rk-a57006="">–</strong></div>
              <div className="arc__bar arc__bar--up" data-rk-a57006=""><span data-rk-a57006="">{upliftLabel}</span><span className="arc__fill" data-bar="up" data-rk-a57006=""></span><strong data-r="upRevenue" data-rk-a57006="">–</strong></div>
              <p className="arc__gain" data-rk-a57006="">+<span data-r="gain" data-rk-a57006="">–</span> per month · ROAS <span data-r="upRoas" data-rk-a57006="">–</span></p>
            </div>
          </div>
          <p className="sr-only" aria-live="polite" data-live data-rk-a57006=""></p>
          {cta && <a className="arc__cta" href={cta.href} data-rk-a57006="">{cta.label}<span aria-hidden="true" data-rk-a57006="">→</span></a>}
          {disclaimer && <p className="arc__disc" data-rk-a57006="">{disclaimer}</p>}
        </div>
      </section>
      </div>
    </>
  );
}

export default AgencyRoiCalculator;
