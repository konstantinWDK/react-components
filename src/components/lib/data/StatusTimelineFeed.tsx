'use client';

import './StatusTimelineFeed.css';

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
 * StatusTimelineFeed — Chronological event audit feed with status icons, timestamps, and detail lines.
 * 
 * @param {Array<{title: string, desc: string, time: string, status: 'done' | 'active' | 'pending'}>} events - Timeline events.
 */
export interface StatusTimelineFeedProps {
  events?: Array<{
    title: string;
    desc: string;
    time: string;
    status: 'done' | 'active' | 'pending';
  }>;
}

export function StatusTimelineFeed({
  events = [
    {
      title: 'Production Deployment #104',
      desc: 'Container vtzmu4t7 synchronized with latest Git commit.',
      time: 'Just now',
      status: 'done',
    },
    {
      title: 'Automated Playwright Audits',
      desc: 'All 214 pages verified with 0 visual regressions.',
      time: '12 mins ago',
      status: 'done',
    },
    {
      title: 'Edge Cache Invalidation',
      desc: 'Purging stale Cloudflare and Traefik edge routes.',
      time: 'In progress',
      status: 'active',
    },
    {
      title: 'Global CDN Replication',
      desc: 'Waiting for European and US west points of presence.',
      time: 'Queued',
      status: 'pending',
    },
  ],
}: StatusTimelineFeedProps) {
  return (
    <>
      <div className="status-feed" data-rk-e25d10="">
        <div className="status-feed__line" aria-hidden="true" data-rk-e25d10=""></div>
        {events.map((evt, __i: number) => (
          <div key={__i} className={cx(['status-feed__item', `status-feed__item--${evt.status}`])} data-rk-e25d10="">
            <div className="status-feed__bullet" data-rk-e25d10="">
              {evt.status === 'done' && '✓'}
              {evt.status === 'active' && '●'}
              {evt.status === 'pending' && '○'}
            </div>
            <div className="status-feed__content" data-rk-e25d10="">
              <div className="status-feed__header" data-rk-e25d10="">
                <h5 className="status-feed__title" data-rk-e25d10="">{evt.title}</h5>
                <span className="status-feed__time" data-rk-e25d10="">{evt.time}</span>
              </div>
              <p className="status-feed__desc" data-rk-e25d10="">{evt.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default StatusTimelineFeed;
