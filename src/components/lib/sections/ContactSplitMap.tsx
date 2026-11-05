'use client';

import type { CSSProperties } from 'react';
import './ContactSplitMap.css';

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

interface Office { city: string; address: string; x: number; y: number }

interface Channel { label: string; value: string; href: string; icon: 'mail' | 'phone' | 'chat' }

/**
 * ContactSplitMap — Contact section with office cards and contact channels on
 * one side and a stylised SVG dot-map with location pins on the other.
 *
 * @param {string} title - Section heading.
 * @param {string} subtitle - Section description.
 * @param {Array<{city: string, address: string, x: number, y: number}>} offices - Offices with map coords (0–100).
 * @param {Array<{label: string, value: string, href: string, icon: 'mail'|'phone'|'chat'}>} channels - Contact channels.
 * @param {string} variant - Map style (dots|grid|plain).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface ContactSplitMapProps {
  title?: string;
  subtitle?: string;
  offices?: Office[];
  channels?: Channel[];
  variant?: 'dots' | 'grid' | 'plain';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ContactSplitMap({
  title = 'Talk to a human',
  subtitle = 'We’re distributed across three time zones, so someone is usually awake.',
  offices = [
    { city: 'San Francisco', address: '548 Market St, CA 94104', x: 17, y: 40 },
    { city: 'Barcelona', address: 'Carrer de Pallars 99, 08018', x: 49, y: 36 },
    { city: 'Singapore', address: '1 Raffles Place, 048616', x: 77, y: 58 },
  ],
  channels = [
    { label: 'Email', value: 'hello@example.com', href: 'mailto:hello@example.com', icon: 'mail' },
    { label: 'Phone', value: '+1 (555) 010-2030', href: 'tel:+15550102030', icon: 'phone' },
    { label: 'Live chat', value: 'Mon–Fri, 9am–6pm', href: '#', icon: 'chat' },
  ],
  variant = 'dots',
  size = 'md',
  className = '',
}: ContactSplitMapProps) {
  const id = `csm-${Math.random().toString(36).slice(2, 8)}`;
  const icon = {
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  };
  
  // Very rough continent silhouettes as a coarse dot grid (deterministic).
  const land = (x: number, y: number) =>
    (x > 8 && x < 30 && y > 22 && y < 52) ||
    (x > 22 && x < 34 && y > 52 && y < 88) ||
    (x > 44 && x < 58 && y > 22 && y < 46) ||
    (x > 46 && x < 60 && y > 46 && y < 80) ||
    (x > 58 && x < 88 && y > 20 && y < 56) ||
    (x > 78 && x < 92 && y > 68 && y < 84);
  const dots: Array<[number, number]> = [];
  for (let y = 6; y < 94; y += 3) for (let x = 2; x < 98; x += 2) if (land(x, y)) dots.push([x, y]);
  
  // The map box is 16:11, so the SVG uses the same aspect ratio and scales 0–100 coords onto it.
  const VW = 160;
  const VH = 110;
  const SX = VW / 100;
  const SY = VH / 100;
  return (
    <>
      <div className="cq-contact-split-map-cq" data-rk-06aea3="">
      <section className={`csm csm--${variant} csm--${size} ${className}`} aria-labelledby={id} data-rk-06aea3="">
        <div className="csm__inner" data-rk-06aea3="">
          <div className="csm__info" data-rk-06aea3="">
            <h2 id={id} className="csm__title" data-rk-06aea3="">{title}</h2>
            <p className="csm__subtitle" data-rk-06aea3="">{subtitle}</p>
            <ul className="csm__channels" data-rk-06aea3="">
              {channels.map((c, __i: number) => (
                <li key={__i} data-rk-06aea3="">
                  <a className="csm__channel" href={c.href} data-rk-06aea3="">
                    <span className="csm__icon" aria-hidden="true" data-rk-06aea3=""><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: icon[c.icon] }} data-rk-06aea3=""></svg></span>
                    <span data-rk-06aea3=""><span className="csm__label" data-rk-06aea3="">{c.label}</span><span className="csm__value" data-rk-06aea3="">{c.value}</span></span>
                  </a>
                </li>
              ))}
            </ul>
            <ul className="csm__offices" data-rk-06aea3="">
              {offices.map((o, __i: number) => (
                <li key={__i} data-rk-06aea3=""><address data-rk-06aea3=""><strong data-rk-06aea3="">{o.city}</strong>{o.address}</address></li>
              ))}
            </ul>
          </div>
          <div className="csm__map" role="img" aria-label={`Map showing offices in ${offices.map((o) => o.city).join(', ')}`} data-rk-06aea3="">
            <svg viewBox={`0 0 ${VW} ${VH}`} aria-hidden="true" data-rk-06aea3="">
              {variant !== 'plain' && dots.map(([x, y]) => (
                variant === 'grid'
                  ? <rect x={x * SX - 0.8} y={y * SY - 0.8} width="1.6" height="1.6" fill="rgb(var(--ink-rgb, 255 255 255) / 0.14)" data-rk-06aea3="" />
                  : <circle cx={x * SX} cy={y * SY} r="0.75" fill="rgb(var(--ink-rgb, 255 255 255) / 0.18)" data-rk-06aea3="" />
              ))}
              {offices.map((o, __i: number) => (
                <g key={__i} data-rk-06aea3="">
                  <circle className="csm__ping" cx={o.x * SX} cy={o.y * SY} r="3" fill="none" stroke="var(--c-primary-light, #d4a017)" strokeWidth="0.4" data-rk-06aea3="" />
                  <circle cx={o.x * SX} cy={o.y * SY} r="1.6" fill="var(--c-primary-light, #d4a017)" data-rk-06aea3="" />
                </g>
              ))}
            </svg>
            {offices.map((o, __i: number) => (
              <span key={__i} className="csm__pin" style={st(`left:${o.x}%; top:${o.y}%`)} aria-hidden="true" data-rk-06aea3="">{o.city}</span>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default ContactSplitMap;
