'use client';

import './AgencyServiceOverview.css';

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
 * AgencyServiceOverview — Service detail block: a sticky column with the pitch, outcome figures,
 * tool stack and CTA, next to a numbered "What's included" list.
 *
 * @param {string} eyebrow - Small label. Default "What's included".
 * @param {string} title - Heading. Default 'Everything you need to scale paid ads'.
 * @param {string} text - Pitch paragraph.
 * @param {Array<{title: string, text: string}>} included - Included items.
 * @param {Array<{value: string, label: string}>} outcomes - Outcome figures (max 3).
 * @param {string[]} tools - Tool / platform stack.
 * @param {string} toolsLabel - Label above the tools. Default 'Tools we use'.
 * @param {{label: string, href: string}} cta - Optional call to action.
 * @param {string} className - Extra class.
 *
 * Accessibility: included items are an ordered list with h3 headings; outcomes are a description list.
 */
export interface AgencyServiceOverviewProps {
  eyebrow?: string;
  title?: string;
  text?: string;
  included?: Array<{ title: string; text: string }>;
  outcomes?: Array<{ value: string; label: string }>;
  tools?: string[];
  toolsLabel?: string;
  cta?: { label: string; href: string };
  className?: string;
}

export function AgencyServiceOverview({
  eyebrow = "What's included",
  title = 'Everything you need to scale paid ads',
  text = 'We plan, build and optimise paid campaigns across search, social and video. Every euro is tracked from impression to revenue.',
  included = [
    { title: 'Full-funnel strategy', text: 'Prospecting, retargeting and retention mapped to your margins and LTV.' },
    { title: 'Creative that converts', text: 'Hooks, static and short-form video variants tested every two weeks.' },
    { title: 'Tracking you can trust', text: 'GA4, Conversions API and server-side tagging.' },
    { title: 'Budget pacing', text: 'Daily checks on spend, CPA and ROAS with automatic alerts.' },
  ],
  outcomes = [
    { value: '4.8×', label: 'average ROAS' },
    { value: '−38%', label: 'cost per acquisition' },
  ],
  tools = ['Google Ads', 'Meta Ads', 'TikTok Ads', 'GA4'],
  toolsLabel = 'Tools we use',
  cta = { label: 'Get a free ads audit', href: '#audit' },
  className = '',
}: AgencyServiceOverviewProps) {
  return (
    <>
      <div className="aso-cq" data-rk-31a82e="">
      <section className={cx(['aso', className])} data-rk-31a82e="">
        <div className="aso__side" data-rk-31a82e="">
          <div className="aso__sticky" data-rk-31a82e="">
            {eyebrow && <p className="aso__eyebrow" data-rk-31a82e="">{eyebrow}</p>}
            <h2 className="aso__title" data-rk-31a82e="">{title}</h2>
            {text && <p className="aso__text" data-rk-31a82e="">{text}</p>}
            {outcomes.length > 0 && (
              <dl className="aso__outcomes" data-rk-31a82e="">
                {outcomes.slice(0, 3).map((o, __i: number) => <div key={__i} data-rk-31a82e=""><dt data-rk-31a82e="">{o.label}</dt><dd data-rk-31a82e="">{o.value}</dd></div>)}
              </dl>
            )}
            {tools.length > 0 && (
              <div className="aso__tools" data-rk-31a82e="">
                <p data-rk-31a82e="">{toolsLabel}</p>
                <ul data-rk-31a82e="">{tools.map((t, __i: number) => <li key={__i} data-rk-31a82e="">{t}</li>)}</ul>
              </div>
            )}
            {cta && <a className="aso__cta" href={cta.href} data-rk-31a82e="">{cta.label}<span aria-hidden="true" data-rk-31a82e="">→</span></a>}
          </div>
        </div>
        <ol className="aso__list" data-rk-31a82e="">
          {included.map((it, i) => (
            <li key={i} className="aso__item" data-rk-31a82e="">
              <span className="aso__num" aria-hidden="true" data-rk-31a82e="">{String(i + 1).padStart(2, '0')}</span>
              <div data-rk-31a82e="">
                <h3 data-rk-31a82e="">{it.title}</h3>
                <p data-rk-31a82e="">{it.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      </div>
    </>
  );
}

export default AgencyServiceOverview;
