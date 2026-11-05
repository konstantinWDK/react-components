'use client';

import { useEffect, useRef } from 'react';
import './HousekeepingBoard.css';

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

type Status = 'clean' | 'dirty' | 'inspecting' | 'occupied' | 'ooo';

interface Room { number: string; floor: string; type?: string; status: Status; guest?: string; note?: string; assignee?: string }

/**
 * HousekeepingBoard — Room status board grouped by floor: clean, dirty, inspecting, occupied and
 * out of order, with live counters, status filter and a quick "next status" action per room.
 *
 * @param {Array<{number: string, floor: string, type?: string, status: Status, guest?: string, note?: string, assignee?: string}>} rooms - Rooms to show.
 * @param {string} title - Card title. Default 'Housekeeping'.
 * @param {boolean} interactive - Clicking a tile advances dirty → inspecting → clean (demo/workflow). Default true.
 * @param {string} variant - Style (card|plain). Default 'card'.
 * @param {string} size - Tile size (sm|md). Default 'md'.
 * @param {string} className - Extra class.
 *
 * Statuses: clean · dirty · inspecting · occupied · ooo (out of order).
 * Emits `app:room-status` with `{ room, status }` on change.
 *
 * Accessibility: status is written in text on every tile (not colour only); tiles are buttons
 * with full labels; counters live in a polite region; the filter is a set of toggle buttons.
 */
export interface HousekeepingBoardProps {
  rooms?: Room[];
  title?: string;
  interactive?: boolean;
  variant?: 'card' | 'plain';
  size?: 'sm' | 'md';
  className?: string;
}

export function HousekeepingBoard({
  rooms = [
    { number: '101', floor: 'Floor 1', type: 'Standard', status: 'clean' },
    { number: '102', floor: 'Floor 1', type: 'Standard', status: 'occupied', guest: 'A. Tanaka' },
    { number: '103', floor: 'Floor 1', type: 'Standard', status: 'dirty', assignee: 'Rosa' },
    { number: '104', floor: 'Floor 1', type: 'Twin', status: 'inspecting', assignee: 'Luis' },
    { number: '201', floor: 'Floor 2', type: 'Deluxe', status: 'ooo', note: 'A/C repair' },
    { number: '202', floor: 'Floor 2', type: 'Deluxe', status: 'occupied', guest: 'J. Whitfield' },
    { number: '203', floor: 'Floor 2', type: 'Deluxe', status: 'dirty', assignee: 'Rosa' },
    { number: '204', floor: 'Floor 2', type: 'Deluxe', status: 'clean' },
  ],
  title = 'Housekeeping',
  interactive = true,
  variant = 'card',
  size = 'md',
  className = '',
}: HousekeepingBoardProps) {
  const labels: Record<Status, string> = { clean: 'Clean', dirty: 'Dirty', inspecting: 'Inspecting', occupied: 'Occupied', ooo: 'Out of order' };
  const order: Status[] = ['clean', 'dirty', 'inspecting', 'occupied', 'ooo'];
  const floors = Array.from(new Set(rooms.map((r) => r.floor)));
  const counts = Object.fromEntries(order.map((s) => [s, rooms.filter((r) => r.status === s).length]));

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const LABELS: Record<string, string> = { clean: 'Clean', dirty: 'Dirty', inspecting: 'Inspecting', occupied: 'Occupied', ooo: 'Out of order' };
      const NEXT: Record<string, string> = { dirty: 'inspecting', inspecting: 'clean' };
    
      document.querySelectorAll<HTMLElement>('[data-hk]:not([data-bound])').forEach((hk) => {
        hk.dataset.bound = '';
        const filters = Array.from(hk.querySelectorAll<HTMLButtonElement>('[data-f]'));
        const announce = hk.querySelector<HTMLElement>('[data-announce]')!;
        let active = '';
    
        const recount = () => {
          const items = Array.from(hk.querySelectorAll<HTMLElement>('li[data-status]'));
          hk.querySelectorAll<HTMLElement>('[data-c]').forEach((c) => {
            const s = c.dataset.c;
            c.textContent = String(s ? items.filter((i) => i.dataset.status === s).length : items.length);
          });
          items.forEach((i) => { i.hidden = Boolean(active) && i.dataset.status !== active; });
          hk.querySelectorAll<HTMLElement>('.hk__floor').forEach((f) => { f.hidden = !f.querySelector('li:not([hidden])'); });
        };
    
        filters.forEach((f) => f.addEventListener('click', () => {
          active = f.dataset.f || '';
          filters.forEach((x) => x.setAttribute('aria-pressed', String(x === f)));
          recount();
        }));
    
        if (hk.hasAttribute('data-interactive')) {
          hk.querySelectorAll<HTMLButtonElement>('.hk__room').forEach((btn) => btn.addEventListener('click', () => {
            const next = NEXT[btn.dataset.status || ''];
            if (!next) return;
            btn.classList.remove(`hk__room--${btn.dataset.status}`);
            btn.classList.add(`hk__room--${next}`);
            btn.dataset.status = next;
            btn.closest('li')!.dataset.status = next;
            btn.querySelector('[data-label]')!.textContent = LABELS[next];
            btn.setAttribute('aria-label', btn.getAttribute('aria-label')!.replace(/, (Dirty|Inspecting|Clean)/, `, ${LABELS[next]}`));
            announce.textContent = `Room ${btn.dataset.room} is now ${LABELS[next].toLowerCase()}.`;
            hk.dispatchEvent(new CustomEvent('app:room-status', { bubbles: true, detail: { room: btn.dataset.room, status: next } }));
            recount();
          }));
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={cx(['hk', `hk--${variant}`, `hk--${size}`, className])} data-hk data-interactive={interactive ? '' : undefined} aria-labelledby="hk-title" data-rk-66fdf4="">
        <header className="hk__head" data-rk-66fdf4="">
          <h2 className="hk__title" id="hk-title" data-rk-66fdf4="">{title}</h2>
          <div className="hk__filters" role="group" aria-label="Filter rooms by status" data-rk-66fdf4="">
            <button type="button" className="hk__filter" aria-pressed="true" data-f="" data-rk-66fdf4="">All <span data-c="" data-rk-66fdf4="">{rooms.length}</span></button>
            {order.map((s, __i: number) => (
              <button key={__i} type="button" className={cx(['hk__filter', `hk__filter--${s}`])} aria-pressed="false" data-f={s} data-rk-66fdf4="">
                <i aria-hidden="true" data-rk-66fdf4=""></i>{labels[s]} <span data-c={s} data-rk-66fdf4="">{counts[s]}</span>
              </button>
            ))}
          </div>
        </header>
      
        <p className="sr-only" aria-live="polite" data-announce data-rk-66fdf4=""></p>
      
        {floors.map((floor, __i: number) => (
          <div key={__i} className="hk__floor" data-rk-66fdf4="">
            <h3 className="hk__floor-title" data-rk-66fdf4="">{floor}</h3>
            <ul className="hk__grid" data-rk-66fdf4="">
              {rooms.filter((r) => r.floor === floor).map((r, __i: number) => (
                <li key={__i} data-status={r.status} data-rk-66fdf4="">
                  <button type="button" className={cx(['hk__room', `hk__room--${r.status}`])} data-room={r.number} data-status={r.status} aria-label={`Room ${r.number}, ${labels[r.status]}${r.guest ? `, ${r.guest}` : ''}${r.assignee ? `, assigned to ${r.assignee}` : ''}${interactive && (r.status === 'dirty' || r.status === 'inspecting') ? '. Activate to advance status' : ''}`} data-rk-66fdf4="">
                    <span className="hk__num" data-rk-66fdf4="">{r.number}</span>
                    {r.type && <span className="hk__type" data-rk-66fdf4="">{r.type}</span>}
                    <span className="hk__state" data-rk-66fdf4=""><i aria-hidden="true" data-rk-66fdf4=""></i><span data-label data-rk-66fdf4="">{labels[r.status]}</span></span>
                    {(r.guest || r.note || r.assignee) && <span className="hk__meta" data-rk-66fdf4="">{r.guest ?? r.note ?? `→ ${r.assignee}`}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}

export default HousekeepingBoard;
