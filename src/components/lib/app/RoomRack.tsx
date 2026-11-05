'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import './RoomRack.css';

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

interface Booking { room: string; guest: string; start: number; nights: number; status: 'confirmed' | 'checked-in' | 'pending' | 'blocked'; ref?: string; channel?: string }

/**
 * RoomRack — Booking timeline ("tape chart"): rooms as rows, days as columns and reservations as
 * coloured bars by status, with a today marker, room-type groups and a detail panel on click.
 *
 * @param {string[]} days - Column labels, e.g. ['Mon 3', 'Tue 4', …].
 * @param {number} today - Index of today's column (-1 hides the marker). Default 1.
 * @param {Array<{id: string, name: string, type?: string}>} rooms - Rows.
 * @param {Array<{room: string, guest: string, start: number, nights: number, status: 'confirmed'|'checked-in'|'pending'|'blocked', ref?: string, channel?: string}>} bookings - Bars; `start` is a day index.
 * @param {string} title - Card title. Default 'Room rack'.
 * @param {number} dayWidth - Column width in px. Default 64.
 * @param {string} variant - Style (card|plain). Default 'card'.
 * @param {string} className - Extra class.
 *
 * Accessibility: each booking is a button labelled with guest, room, dates and status; the detail
 * panel is a polite live region; the grid scrolls horizontally with the keyboard.
 */
export interface RoomRackProps {
  days?: string[];
  today?: number;
  rooms?: Array<{ id: string; name: string; type?: string }>;
  bookings?: Booking[];
  title?: string;
  dayWidth?: number;
  variant?: 'card' | 'plain';
  className?: string;
}

export function RoomRack({
  days = ['Mon 3', 'Tue 4', 'Wed 5', 'Thu 6', 'Fri 7', 'Sat 8', 'Sun 9', 'Mon 10', 'Tue 11', 'Wed 12'],
  today = 1,
  rooms = [
    { id: '101', name: '101', type: 'Standard' },
    { id: '102', name: '102', type: 'Standard' },
    { id: '201', name: '201', type: 'Deluxe' },
    { id: '202', name: '202', type: 'Deluxe' },
    { id: '301', name: '301', type: 'Suite' },
  ],
  bookings = [
    { room: '101', guest: 'Elena Duarte', start: 0, nights: 3, status: 'checked-in', ref: 'MR-2830', channel: 'Booking.com' },
    { room: '101', guest: 'Tom Becker', start: 4, nights: 2, status: 'confirmed', ref: 'MR-2852' },
    { room: '102', guest: 'Aiko Tanaka', start: 1, nights: 5, status: 'confirmed', ref: 'MR-2839', channel: 'Expedia' },
    { room: '201', guest: 'Maintenance', start: 2, nights: 2, status: 'blocked' },
    { room: '202', guest: 'James Whitfield', start: 0, nights: 2, status: 'checked-in', ref: 'MR-2840' },
    { room: '202', guest: 'Sofía Ramos', start: 3, nights: 4, status: 'pending', ref: 'MR-2861' },
    { room: '301', guest: 'The Okafor family', start: 1, nights: 6, status: 'confirmed', ref: 'MR-2844', channel: 'Direct' },
  ],
  title = 'Room rack',
  dayWidth = 64,
  variant = 'card',
  className = '',
}: RoomRackProps) {
  const labels: Record<Booking['status'], string> = { confirmed: 'Confirmed', 'checked-in': 'Checked in', pending: 'Pending', blocked: 'Blocked' };
  const groups = Array.from(new Set(rooms.map((r) => r.type ?? ''))).map((type) => ({ type, rooms: rooms.filter((r) => (r.type ?? '') === type) }));
  const occupied = days.map((_, d) => bookings.filter((b) => b.status !== 'blocked' && d >= b.start && d < b.start + b.nights).length);

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-rack]:not([data-bound])').forEach((rack) => {
        rack.dataset.bound = '';
        const out = rack.querySelector<HTMLElement>('[data-detail-out]')!;
        const bars = Array.from(rack.querySelectorAll<HTMLButtonElement>('.rack__bar'));
        bars.forEach((bar) => bar.addEventListener('click', () => {
          bars.forEach((b) => b.removeAttribute('aria-pressed'));
          bar.setAttribute('aria-pressed', 'true');
          const d = JSON.parse(bar.dataset.detail || '{}');
          const dl = document.createElement('dl');
          dl.className = 'rack__dl';
          const rows: Array<[string, string | undefined]> = [
            ['Guest', d.guest], ['Room', `${d.room}${d.type ? ` · ${d.type}` : ''}`], ['Arrival', d.from],
            ['Nights', String(d.nights)], ['Status', d.status], ['Booking', d.ref], ['Channel', d.channel],
          ];
          rows.filter(([, v]) => v).forEach(([k, v]) => {
            const wrap = document.createElement('div');
            const dt = document.createElement('dt'); dt.textContent = k;
            const dd = document.createElement('dd'); dd.textContent = v!;
            wrap.append(dt, dd);
            dl.append(wrap);
          });
          out.replaceChildren(dl);
        }));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={cx(['rack', `rack--${variant}`, className])} style={st(`--day-w: ${dayWidth}px; --days: ${days.length}`)} data-rack aria-labelledby="rack-title" data-rk-0d1031="">
        <header className="rack__head" data-rk-0d1031="">
          <h2 className="rack__title" id="rack-title" data-rk-0d1031="">{title}</h2>
          <ul className="rack__legend" aria-label="Legend" data-rk-0d1031="">
            {(Object.keys(labels) as Booking['status'][]).map((s, __i: number) => <li key={__i} data-rk-0d1031=""><i className={`rack__swatch rack__swatch--${s}`} aria-hidden="true" data-rk-0d1031=""></i>{labels[s]}</li>)}
          </ul>
        </header>
      
        <div className="rack__scroll" tabIndex={0} role="region" aria-label={`${title}, scroll horizontally`} data-rk-0d1031="">
          <div className="rack__grid" data-rk-0d1031="">
            <div className="rack__corner" data-rk-0d1031="">Room</div>
            {days.map((d, i) => (
              <div key={i} className={cx(['rack__day', { 'is-today': i === today, 'is-weekend': /^(Sat|Sun|Sáb|Dom)/i.test(d) }])} data-rk-0d1031="">
                <span data-rk-0d1031="">{d}</span>
                <small data-rk-0d1031="">{Math.round((occupied[i] / Math.max(1, rooms.length)) * 100)}%</small>
              </div>
            ))}
      
            {groups.map((g) => (
              <>
                {g.type && <div className="rack__group" style={st(`grid-column: 1 / span ${days.length + 1}`)} data-rk-0d1031="">{g.type} <span data-rk-0d1031="">{g.rooms.length}</span></div>}
                {g.rooms.map((room) => (
                  <>
                    <div className="rack__room" data-rk-0d1031="">{room.name}</div>
                    <div className="rack__lane" style={st(`grid-column: 2 / span ${days.length}`)} data-rk-0d1031="">
                      {today >= 0 && <span className="rack__now" style={st(`left: calc(${today} * var(--day-w) + var(--day-w) / 2)`)} aria-hidden="true" data-rk-0d1031=""></span>}
                      {bookings.filter((b) => b.room === room.id).map((b, __i: number) => (
                        <button key={__i} type="button" className={cx(['rack__bar', `rack__bar--${b.status}`])} style={st(`left: calc(${b.start} * var(--day-w) + 3px); width: calc(${Math.min(b.nights, days.length - b.start)} * var(--day-w) - 6px)`)} aria-label={`${b.guest}, room ${room.name}, ${days[b.start]} for ${b.nights} ${b.nights === 1 ? 'night' : 'nights'}, ${labels[b.status]}`} data-detail={JSON.stringify({ guest: b.guest, room: room.name, type: room.type, from: days[b.start], nights: b.nights, status: labels[b.status], ref: b.ref, channel: b.channel })} data-rk-0d1031="">
                          <span data-rk-0d1031="">{b.guest}</span>
                        </button>
                      ))}
                    </div>
                  </>
                ))}
              </>
            ))}
          </div>
        </div>
      
        <div className="rack__detail" aria-live="polite" data-detail-out data-rk-0d1031="">
          <p className="rack__hint" data-rk-0d1031="">Select a booking to see its details.</p>
        </div>
      </section>
    </>
  );
}

export default RoomRack;
