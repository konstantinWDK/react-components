'use client';

import { useId } from 'react';
import './AgencyCaseResults.css';

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
 * AgencyCaseResults — Body of a case study: the challenge, the numbered approach, a before/after
 * metrics table, a 12-month results chart (SVG area line, no dependencies) and the client quote.
 *
 * @param {string} challengeTitle - Heading for the challenge. Default 'The challenge'.
 * @param {string} challenge - Challenge text.
 * @param {string} approachTitle - Heading for the approach. Default 'What we did'.
 * @param {string[]} approach - Steps taken.
 * @param {Array<{label: string, before: string, after: string, change: string}>} metrics - Before/after rows.
 * @param {number[]} series - Values for the chart (e.g. 12 months).
 * @param {string} seriesLabel - Chart caption. Default 'Revenue from ads (€k / month)'.
 * @param {string[]} periods - X labels (defaults to M1…Mn).
 * @param {{quote: string, name: string, role: string, company: string}} quote - Client quote (optional).
 * @param {string} className - Extra class.
 *
 * Accessibility: real <table> for metrics; the chart is a figure with a text summary (first,
 * last and change) and a visually hidden data table.
 */
export interface AgencyCaseResultsProps {
  challengeTitle?: string;
  challenge?: string;
  approachTitle?: string;
  approach?: string[];
  metrics?: Array<{ label: string; before: string; after: string; change: string }>;
  series?: number[];
  seriesLabel?: string;
  periods?: string[];
  quote?: { quote: string; name: string; role: string; company: string };
  className?: string;
}

export function AgencyCaseResults({
  challengeTitle = 'The challenge',
  challenge = 'Rising CPMs, a single hero ad that had fatigued and tracking that missed 30% of purchases after iOS changes.',
  approachTitle = 'What we did',
  approach = [
    'Server-side tracking with Conversions API recovered the missing purchase data.',
    'A simple three-campaign structure with broad audiences.',
    'Twelve new creatives every two weeks, led by founder and customer videos.',
  ],
  metrics = [
    { label: 'ROAS', before: '2.1×', after: '6.2×', change: '+195%' },
    { label: 'Monthly revenue from ads', before: '€42k', after: '€188k', change: '+348%' },
    { label: 'Cost per purchase', before: '€38', after: '€19', change: '−50%' },
  ],
  series = [42, 48, 55, 61, 78, 92, 104, 118, 131, 149, 166, 188],
  seriesLabel = 'Revenue from ads (€k / month)',
  periods,
  quote = { quote: 'Volta treated our ad budget like their own money. We tripled revenue without tripling spend.', name: 'Freja Lund', role: 'Co-founder', company: 'Nordlys' },
  className = '',
}: AgencyCaseResultsProps) {
  const labels = periods ?? series.map((_, i) => `M${i + 1}`);
  const W = 600, H = 240, P = 8;
  const max = Math.max(...series) * 1.08;
  const min = Math.min(0, Math.min(...series));
  const x = (i: number) => P + (i * (W - P * 2)) / Math.max(1, series.length - 1);
  const y = (v: number) => H - P - ((v - min) / (max - min || 1)) * (H - P * 2);
  const line = series.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  const area = `${line} L${x(series.length - 1).toFixed(1)} ${H - P} L${x(0).toFixed(1)} ${H - P} Z`;
  const first = series[0];
  const last = series[series.length - 1];
  const pct = first ? Math.round(((last - first) / Math.abs(first)) * 100) : 0;
  const fmtV = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(2));
  const gid = `acr-g-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <>
      <div className="acr-cq" data-rk-59ce98="">
      <section className={cx(['acr', className])} data-rk-59ce98="">
        <div className="acr__story" data-rk-59ce98="">
          <div data-rk-59ce98="">
            <h2 className="acr__h" data-rk-59ce98="">{challengeTitle}</h2>
            <p className="acr__p" data-rk-59ce98="">{challenge}</p>
          </div>
          <div data-rk-59ce98="">
            <h2 className="acr__h" data-rk-59ce98="">{approachTitle}</h2>
            <ol className="acr__steps" data-rk-59ce98="">{approach.map((a, __i: number) => <li key={__i} data-rk-59ce98="">{a}</li>)}</ol>
          </div>
        </div>
      
        <div className="acr__data" data-rk-59ce98="">
          <table className="acr__table" data-rk-59ce98="">
            <caption className="acr__h" data-rk-59ce98="">Results</caption>
            <thead data-rk-59ce98=""><tr data-rk-59ce98=""><th scope="col" data-rk-59ce98="">Metric</th><th scope="col" data-rk-59ce98="">Before</th><th scope="col" data-rk-59ce98="">After</th><th scope="col" data-rk-59ce98="">Change</th></tr></thead>
            <tbody data-rk-59ce98="">
              {metrics.map((m, __i: number) => (
                <tr key={__i} data-rk-59ce98=""><th scope="row" data-rk-59ce98="">{m.label}</th><td data-rk-59ce98="">{m.before}</td><td data-rk-59ce98=""><strong data-rk-59ce98="">{m.after}</strong></td><td data-rk-59ce98=""><span className="acr__chg" data-rk-59ce98="">{m.change}</span></td></tr>
              ))}
            </tbody>
          </table>
      
          <figure className="acr__chart" data-rk-59ce98="">
            <figcaption data-rk-59ce98="">
              <span data-rk-59ce98="">{seriesLabel}</span>
              <strong data-rk-59ce98="">{pct >= 0 ? '+' : ''}{pct}%</strong>
            </figcaption>
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${seriesLabel}: from ${fmtV(first)} to ${fmtV(last)} over ${series.length} periods (${pct >= 0 ? '+' : ''}${pct}%).`} data-rk-59ce98="">
              <defs data-rk-59ce98="">
                <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1" data-rk-59ce98="">
                  <stop offset="0%" style={{ stopColor: "var(--agency-accent, var(--c-primary-light, #d4a017))", stopOpacity: "0.45" }} data-rk-59ce98="" />
                  <stop offset="100%" style={{ stopColor: "var(--agency-accent, var(--c-primary-light, #d4a017))", stopOpacity: "0" }} data-rk-59ce98="" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((f, __i: number) => <line key={__i} x1="0" x2={W} y1={H * f} y2={H * f} className="acr__grid" data-rk-59ce98="" />)}
              <path d={area} fill={`url(#${gid})`} data-rk-59ce98="" />
              <path d={line} className="acr__line" pathLength="1" data-rk-59ce98="" />
              <circle cx={x(series.length - 1)} cy={y(last)} r="6" className="acr__dot" data-rk-59ce98="" />
            </svg>
            <div className="acr__axis" aria-hidden="true" data-rk-59ce98=""><span data-rk-59ce98="">{labels[0]}</span><span data-rk-59ce98="">{labels[labels.length - 1]}</span></div>
            <table className="sr-only" data-rk-59ce98="">
              <caption data-rk-59ce98="">{seriesLabel}</caption>
              <tbody data-rk-59ce98="">{series.map((v, i) => <tr key={i} data-rk-59ce98=""><th scope="row" data-rk-59ce98="">{labels[i]}</th><td data-rk-59ce98="">{fmtV(v)}</td></tr>)}</tbody>
            </table>
          </figure>
        </div>
      
        {quote && (
          <figure className="acr__quote" data-rk-59ce98="">
            <blockquote data-rk-59ce98=""><p data-rk-59ce98="">“{quote.quote}”</p></blockquote>
            <figcaption data-rk-59ce98=""><strong data-rk-59ce98="">{quote.name}</strong> — {quote.role}, {quote.company}</figcaption>
          </figure>
        )}
      </section>
      </div>
    </>
  );
}

export default AgencyCaseResults;
