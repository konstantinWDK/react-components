'use client';

import { useEffect, useMemo, useRef } from 'react';
import { demoContributions, type ContributionWeek } from '../three/contributions-scene';
import './DevContributions.css';

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
 * DevContributions — Full-width 3D contribution matrix (GitHub style, "Keycap" design). Each day is
 * a barely-rounded cube whose height and tone encode activity. On first view the cubes fly in from
 * the sky and from both sides and assemble on a board; afterwards a few keep detaching and flying
 * back, and hovering sends water-like ripples around the cursor. Tooltips show the date and count.
 * Needs the optional `three` peer dependency.
 *
 * Data: pass `weeks` directly, or `src` (a URL returning `{ weeks: [{ days: [{ date, count }] }] }`),
 * or nothing for a deterministic demo year (`seed`).
 *
 * @param {Array<{days: Array<{date: string, count: number}>}>} weeks - Contribution weeks (Sunday first).
 * @param {string} src - URL to fetch the weeks from on the client.
 * @param {number} seed - Demo data seed. Default 7.
 * @param {string} title - Heading above the board (optional).
 * @param {string} summary - Text next to the heading, e.g. "1,284 contributions in the last year".
 * @param {string} locale - Date locale for tooltips. Default 'en-US'.
 * @param {object} labels - { months[12], weekdays[7], weekdaysLong[7], less, more, one, many }.
 * @param {[number, number, number]} thresholds - Upper bounds of levels 1–3. Default [2, 5, 8].
 * @param {boolean} debris - Loose cubes drifting in front of the board. Default true.
 * @param {string} className - Extra class.
 *
 * Accessibility: the board has role="img" with an aria-label summarising the year; the tooltip is
 * mirrored to a polite live region; reduced motion renders the board fully assembled and still.
 */
export interface DevContributionsProps {
  weeks?: ContributionWeek[];
  src?: string;
  seed?: number;
  title?: string;
  summary?: string;
  locale?: string;
  labels?: Partial<{ months: string[]; weekdays: string[]; weekdaysLong: string[]; less: string; more: string; one: string; many: string }>;
  thresholds?: [number, number, number];
  debris?: boolean;
  className?: string;
}

export function DevContributions({ weeks, src, seed = 7, title, summary, locale = 'en-US', labels = {}, thresholds = [2, 5, 8], debris = true, className = '' }: DevContributionsProps) {
  const L = {
    months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    weekdays: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    weekdaysLong: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    less: 'LESS',
    more: 'MORE',
    one: 'contribution',
    many: 'contributions',
    ...labels,
  };
  const data = useMemo(() => weeks ?? (src ? undefined : demoContributions(seed)), [weeks, src, seed]);
  const total = data?.reduce((n, w) => n + w.days.reduce((m, d) => m + d.count, 0), 0);
  const aria = total !== undefined ? `${total.toLocaleString(locale)} ${L.many}` : (summary ?? L.many);

  // 3D contribution matrix: three.js is loaded on demand (optional peer dependency); weeks come from
  // the `weeks` prop, the `src` URL or the demo data. Disposed on unmount.
  const rootRef = useRef<HTMLElement>(null);
  const labelsKey = JSON.stringify(L);
  const thresholdsKey = thresholds.join(',');
  useEffect(() => {
    const root = rootRef.current;
    const canvas = root?.querySelector<HTMLElement>('[data-canvas]');
    const tip = root?.querySelector<HTMLElement>('[data-tip]');
    const a = root?.querySelector<HTMLElement>('[data-tip-a]');
    const b = root?.querySelector<HTMLElement>('[data-tip-b]');
    if (!root || !canvas || !tip || !a || !b) return;
    const live = root.querySelector<HTMLElement>('[data-live]');
    let cancelled = false;
    let dispose: (() => void) | undefined;

    const loadWeeks = async (): Promise<ContributionWeek[]> => {
      if (data) return data;
      if (!src) return demoContributions(seed);
      try {
        const json = await (await fetch(src)).json();
        const w = Array.isArray(json?.weeks) ? (json.weeks as ContributionWeek[]) : [];
        return w.length ? w : demoContributions(seed);
      } catch {
        return demoContributions(seed);
      }
    };

    Promise.all([import('three'), import('three/addons/geometries/RoundedBoxGeometry.js'), import('../three/contributions-scene'), loadWeeks()])
      .then(([THREE, { RoundedBoxGeometry }, { mountContributions }, weeksData]) => {
        if (cancelled) return;
        const fmt = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
        dispose = mountContributions(canvas, THREE, RoundedBoxGeometry, {
          weeks: weeksData,
          months: L.months,
          weekdays: L.weekdays,
          legend: { less: L.less, more: L.more },
          thresholds,
          debris,
          onHover: (info, x, y) => {
            if (!info) {
              tip.classList.remove('is-visible');
              return;
            }
            if (info.kind === 'day') {
              a.textContent = `${info.count.toLocaleString(locale)} ${info.count === 1 ? L.one : L.many}`;
              b.textContent = fmt.format(new Date(`${info.date}T00:00:00Z`));
            } else {
              a.textContent = L.weekdaysLong?.[info.index] ?? '';
              b.textContent = L.weekdays?.[info.index] ?? '';
            }
            tip.style.left = `${x}px`;
            tip.style.top = `${y}px`;
            tip.classList.add('is-visible');
            if (live) live.textContent = `${a.textContent}, ${b.textContent}`;
          },
        });
      })
      .catch((err) => console.warn('[DevContributions] the 3D matrix needs the optional `three` peer dependency.', err));
    return () => {
      cancelled = true;
      dispose?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, src, seed, locale, labelsKey, thresholdsKey, debris]);
  return (
    <>
      <section ref={rootRef} className={cx(['dvct', className])} data-dev-contrib data-src={src} data-locale={locale} data-labels={JSON.stringify(L)} data-thresholds={JSON.stringify(thresholds)} data-debris={debris ? '1' : '0'} data-rk-06b22a="">
        {(title || summary) && (
          <div className="dvct__head" data-rk-06b22a="">
            {title && <h2 className="dvct__title" data-rk-06b22a="">{title}</h2>}
            {summary && <p className="dvct__summary" data-rk-06b22a="">{summary}</p>}
          </div>
        )}
        <div className="dvct__viewport" data-rk-06b22a="">
          <div className="dvct__tip" data-tip aria-hidden="true" data-rk-06b22a=""><strong data-tip-a data-rk-06b22a=""></strong><span data-rk-06b22a="">•</span><span data-tip-b data-rk-06b22a=""></span></div>
          <div className="dvct__canvas" data-canvas role="img" aria-label={aria} data-rk-06b22a=""></div>
        </div>
        <p className="dvct__live" aria-live="polite" data-live data-rk-06b22a=""></p>
      </section>
    </>
  );
}

export default DevContributions;
