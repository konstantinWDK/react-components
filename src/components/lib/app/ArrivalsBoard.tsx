'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { initials, hueFrom } from './app-icons';
import './ArrivalsBoard.css';

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

/** "a: b; --c: d" → style object */
function st(css: string | undefined): CSSProperties {
  const o: Record<string, string> = {};
  for (const decl of String(css ?? '').split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const k = decl.slice(0, i).trim();
    if (k) o[k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = decl.slice(i + 1).trim();
  }
  return o as CSSProperties;
}

interface Arrival { guest: string; room: string; time: string; nights?: number; vip?: boolean; note?: string; done?: boolean }

interface Departure { guest: string; room: string; time: string; balance?: string; done?: boolean }

/**
 * ArrivalsBoard — Front-desk list with Arrivals / Departures / In-house tabs: guest, room, time,
 * notes and a one-click check-in / check-out action with progress counter.
 *
 * @param {string} title - Card title. Default 'Today at the front desk'.
 * @param {Array<{guest: string, room: string, time: string, nights?: number, vip?: boolean, note?: string, done?: boolean}>} arrivals - Expected arrivals.
 * @param {Array<{guest: string, room: string, time: string, balance?: string, done?: boolean}>} departures - Expected departures.
 * @param {Array<{guest: string, room: string, until: string}>} inHouse - Current guests.
 * @param {string} variant - Style (card|plain). Default 'card'.
 * @param {string} className - Extra class.
 *
 * Accessibility: tabs follow the ARIA tabs pattern (arrow keys); action buttons say which guest
 * they act on and switch to a pressed "done" state; progress is announced politely.
 */
export interface ArrivalsBoardProps {
  title?: string;
  arrivals?: Arrival[];
  departures?: Departure[];
  inHouse?: Array<{ guest: string; room: string; until: string }>;
  variant?: 'card' | 'plain';
  className?: string;
}

export function ArrivalsBoard({
  title = 'Today at the front desk',
  arrivals = [
    { guest: 'Elena Duarte', room: '204', time: '14:00', nights: 3, vip: true, note: 'Late arrival, extra pillows' },
    { guest: 'Aiko Tanaka', room: '108', time: '15:30', nights: 4 },
    { guest: 'The Okafor family', room: '310', time: '16:00', nights: 6, note: 'Baby cot requested', done: true },
  ],
  departures = [
    { guest: 'Hans Müller', room: '112', time: '11:00', balance: '€0', done: true },
    { guest: 'Priya Nair', room: '207', time: '12:00', balance: '€48' },
  ],
  inHouse = [
    { guest: 'James Whitfield', room: '202', until: 'Fri 7' },
    { guest: 'Sofía Ramos', room: '305', until: 'Sun 9' },
  ],
  variant = 'card',
  className = '',
}: ArrivalsBoardProps) {
  const tabs = [
    { id: 'arr', label: 'Arrivals', count: arrivals.length, done: arrivals.filter((a) => a.done).length },
    { id: 'dep', label: 'Departures', count: departures.length, done: departures.filter((d) => d.done).length },
    { id: 'inh', label: 'In-house', count: inHouse.length },
  ];

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-frontdesk]:not([data-bound])').forEach((fd) => {
        fd.dataset.bound = '';
        const tabs = Array.from(fd.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
        const progress = fd.querySelector<HTMLElement>('[data-progress]')!;
        const words: Record<string, string> = { arr: 'checked in', dep: 'checked out' };
        let current = 'arr';
        const update = () => {
          const panel = fd.querySelector<HTMLElement>(`[data-panel="${current}"]`)!;
          const btns = Array.from(panel.querySelectorAll<HTMLButtonElement>('[data-act]'));
          progress.textContent = btns.length ? `${btns.filter((b) => b.getAttribute('aria-pressed') === 'true').length}/${btns.length} ${words[current]}` : `${panel.children.length} guests in-house`;
        };
        const select = (i: number, focus = false) => {
          tabs.forEach((t, n) => {
            t.setAttribute('aria-selected', String(n === i));
            t.tabIndex = n === i ? 0 : -1;
            fd.querySelector<HTMLElement>(`[data-panel="${t.dataset.tab}"]`)!.hidden = n !== i;
          });
          current = tabs[i].dataset.tab || 'arr';
          if (focus) tabs[i].focus();
          update();
        };
        tabs.forEach((t, i) => {
          t.addEventListener('click', () => select(i));
          t.addEventListener('keydown', (e) => {
            const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
            if (d) { e.preventDefault(); select((i + d + tabs.length) % tabs.length, true); }
          });
        });
        fd.querySelectorAll<HTMLButtonElement>('[data-act]').forEach((b) => b.addEventListener('click', () => {
          const done = b.getAttribute('aria-pressed') !== 'true';
          b.setAttribute('aria-pressed', String(done));
          b.firstElementChild!.textContent = done ? b.dataset.doneLabel! : b.dataset.label!;
          update();
        }));
        update();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={cx(['fd', `fd--${variant}`, className])} data-frontdesk aria-labelledby="fd-title" data-rk-d17d3a="">
        <header className="fd__head" data-rk-d17d3a="">
          <h2 className="fd__title" id="fd-title" data-rk-d17d3a="">{title}</h2>
          <p className="fd__progress" aria-live="polite" data-progress data-rk-d17d3a="">{tabs[0].done}/{tabs[0].count} checked in</p>
        </header>
        <div className="fd__tabs" role="tablist" aria-label="Front desk lists" data-rk-d17d3a="">
          {tabs.map((tab, i) => (
            <button key={i} type="button" role="tab" id={`fd-tab-${tab.id}`} aria-controls={`fd-panel-${tab.id}`} aria-selected={i === 0 ? 'true' : 'false'} tabIndex={i === 0 ? 0 : -1} data-tab={tab.id} data-rk-d17d3a="">
              {tab.label} <span data-rk-d17d3a="">{tab.count}</span>
            </button>
          ))}
        </div>
      
        <ul className="fd__list" role="tabpanel" id="fd-panel-arr" aria-labelledby="fd-tab-arr" data-panel="arr" data-rk-d17d3a="">
          {arrivals.map((a, __i: number) => (
            <li key={__i} className="fd__row" data-rk-d17d3a="">
              <span className="fd__avatar" style={st(`--h: ${hueFrom(a.guest)}`)} aria-hidden="true" data-rk-d17d3a="">{initials(a.guest)}</span>
              <span className="fd__who" data-rk-d17d3a="">
                <strong data-rk-d17d3a="">{a.guest}{a.vip && <em className="fd__vip" data-rk-d17d3a="">VIP</em>}</strong>
                <small data-rk-d17d3a="">Room {a.room}{a.nights && <> · {a.nights} nights</>}{a.note && <> · {a.note}</>}</small>
              </span>
              <time className="fd__time" data-rk-d17d3a="">{a.time}</time>
              <button type="button" className="fd__action" aria-pressed={a.done ? 'true' : 'false'} data-act="arr" data-done-label="Checked in" data-label="Check in" data-rk-d17d3a="">
                <span data-rk-d17d3a="">{a.done ? 'Checked in' : 'Check in'}</span>
                <span className="sr-only" data-rk-d17d3a=""> {a.guest}</span>
              </button>
            </li>
          ))}
        </ul>
        <ul className="fd__list" role="tabpanel" id="fd-panel-dep" aria-labelledby="fd-tab-dep" data-panel="dep" hidden data-rk-d17d3a="">
          {departures.map((d, __i: number) => (
            <li key={__i} className="fd__row" data-rk-d17d3a="">
              <span className="fd__avatar" style={st(`--h: ${hueFrom(d.guest)}`)} aria-hidden="true" data-rk-d17d3a="">{initials(d.guest)}</span>
              <span className="fd__who" data-rk-d17d3a=""><strong data-rk-d17d3a="">{d.guest}</strong><small data-rk-d17d3a="">Room {d.room}{d.balance && <> · Balance {d.balance}</>}</small></span>
              <time className="fd__time" data-rk-d17d3a="">{d.time}</time>
              <button type="button" className="fd__action" aria-pressed={d.done ? 'true' : 'false'} data-act="dep" data-done-label="Checked out" data-label="Check out" data-rk-d17d3a="">
                <span data-rk-d17d3a="">{d.done ? 'Checked out' : 'Check out'}</span>
                <span className="sr-only" data-rk-d17d3a=""> {d.guest}</span>
              </button>
            </li>
          ))}
        </ul>
        <ul className="fd__list" role="tabpanel" id="fd-panel-inh" aria-labelledby="fd-tab-inh" data-panel="inh" hidden data-rk-d17d3a="">
          {inHouse.map((g, __i: number) => (
            <li key={__i} className="fd__row" data-rk-d17d3a="">
              <span className="fd__avatar" style={st(`--h: ${hueFrom(g.guest)}`)} aria-hidden="true" data-rk-d17d3a="">{initials(g.guest)}</span>
              <span className="fd__who" data-rk-d17d3a=""><strong data-rk-d17d3a="">{g.guest}</strong><small data-rk-d17d3a="">Room {g.room}</small></span>
              <span className="fd__time" data-rk-d17d3a="">until {g.until}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default ArrivalsBoard;
