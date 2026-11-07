'use client';

import './DevProjectDetail.css';

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
 * DevProjectDetail — Project case study for developer portfolios ("Keycap" design): a long-form
 * column (overview, challenge, solution, features) next to a sticky "spec sheet" with role, year,
 * status, stack, metrics and links, followed by previous / next project keys.
 *
 * @param {object} project - { title, description, challenge?, solution?, features?: string[], role?, year?, status?, technologies[], metrics?: [{value, label}], liveUrl?, repoUrl?, stars? }
 * @param {{title: string, href: string}} prev - Previous project link.
 * @param {{title: string, href: string}} next - Next project link.
 * @param {object} labels - { overview, challenge, solution, features, spec, role, year, status, stack, live, code, prev, next }.
 * @param {string} className - Extra class.
 *
 * Accessibility: headings structure the long-form column; the spec sheet is an aside with a
 * definition list; prev/next is a labelled nav.
 */
export interface DevProjectDetailProps {
  project?: {
    title: string;
    description: string;
    challenge?: string;
    solution?: string;
    features?: string[];
    role?: string;
    year?: string;
    status?: string;
    technologies: string[];
    metrics?: Array<{ value: string; label: string }>;
    liveUrl?: string;
    repoUrl?: string;
    stars?: number;
  };
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
  labels?: Partial<Record<'overview' | 'challenge' | 'solution' | 'features' | 'spec' | 'role' | 'year' | 'status' | 'stack' | 'live' | 'code' | 'prev' | 'next', string>>;
  className?: string;
}

export function DevProjectDetail({
  project: p = {
    title: 'Tidy',
    description: 'A cross-platform CLI that finds and safely removes stale build caches, node_modules and Docker layers, with a dry run and an undo log.',
    challenge: 'Developer machines quietly fill up with caches from a dozen tools, and cleaning them by hand is risky.',
    solution: 'A rule-based scanner that knows where each tool keeps its caches and moves files to a recoverable trash first.',
    features: ['Rules for 30+ tools', 'Dry run with sizes and last access', 'Undo log for every removal'],
    role: 'Author', year: '2025', status: 'Live', stars: 486,
    technologies: ['Rust', 'CLI', 'Docker'],
    metrics: [{ value: '12 GB', label: 'freed on average' }, { value: '3', label: 'platforms' }, { value: '<1s', label: 'scan' }],
    repoUrl: '#',
  },
  prev,
  next,
  labels = {},
  className = '',
}: DevProjectDetailProps) {
  const L = {
    overview: 'Overview', challenge: 'The challenge', solution: 'The solution', features: 'Highlights', spec: 'SPEC_SHEET',
    role: 'Role', year: 'Year', status: 'Status', stack: 'Stack', live: 'Visit live site', code: 'Source code', prev: 'Previous', next: 'Next',
    ...labels,
  };
  return (
    <>
      <section className={cx(['dvpd', className])} data-rk-8bc5e5="">
        <div className="dvpd__wrap" data-rk-8bc5e5="">
          <article className="dvpd__body" data-rk-8bc5e5="">
            <h2 data-rk-8bc5e5="">{L.overview}</h2>
            <p className="dvpd__lead" data-rk-8bc5e5="">{p.description}</p>
            {p.challenge && (<><h2 data-rk-8bc5e5="">{L.challenge}</h2><p data-rk-8bc5e5="">{p.challenge}</p></>)}
            {p.solution && (<><h2 data-rk-8bc5e5="">{L.solution}</h2><p data-rk-8bc5e5="">{p.solution}</p></>)}
            {p.features && p.features.length > 0 && (
              <>
                <h2 data-rk-8bc5e5="">{L.features}</h2>
                <ul className="dvpd__features" data-rk-8bc5e5="">{p.features.map((f, i) => <li key={i} data-rk-8bc5e5=""><span aria-hidden="true" data-rk-8bc5e5="">{String(i + 1).padStart(2, '0')}</span>{f}</li>)}</ul>
              </>
            )}
          </article>
      
          <aside className="dvpd__spec" aria-label={L.spec} data-rk-8bc5e5="">
            <p className="dvpd__spec-head" data-rk-8bc5e5=""><b data-rk-8bc5e5="">[</b>{` ${L.spec} `}<b data-rk-8bc5e5="">]</b></p>
            <dl data-rk-8bc5e5="">
              {p.role && <div data-rk-8bc5e5=""><dt data-rk-8bc5e5="">{L.role}</dt><dd data-rk-8bc5e5="">{p.role}</dd></div>}
              {p.year && <div data-rk-8bc5e5=""><dt data-rk-8bc5e5="">{L.year}</dt><dd data-rk-8bc5e5="">{p.year}</dd></div>}
              {p.status && <div data-rk-8bc5e5=""><dt data-rk-8bc5e5="">{L.status}</dt><dd data-rk-8bc5e5="">{p.status}</dd></div>}
              {!!p.stars && <div data-rk-8bc5e5=""><dt data-rk-8bc5e5="">GitHub</dt><dd data-rk-8bc5e5="">★ {p.stars.toLocaleString('en')}</dd></div>}
            </dl>
            <p className="dvpd__label" data-rk-8bc5e5="">{L.stack}</p>
            <ul className="dvpd__chips" data-rk-8bc5e5="">{p.technologies.map((t, __i: number) => <li key={__i} data-rk-8bc5e5="">{t}</li>)}</ul>
            {p.metrics && p.metrics.length > 0 && (
              <ul className="dvpd__metrics" data-rk-8bc5e5="">{p.metrics.map((m, __i: number) => <li key={__i} data-rk-8bc5e5=""><strong data-rk-8bc5e5="">{m.value}</strong><span data-rk-8bc5e5="">{m.label}</span></li>)}</ul>
            )}
            <div className="dvpd__links" data-rk-8bc5e5="">
              {p.liveUrl && <a className="dvpd__btn dvpd__btn--primary" href={p.liveUrl} target="_blank" rel="noopener noreferrer" data-rk-8bc5e5="">{L.live} ↗</a>}
              {p.repoUrl && <a className="dvpd__btn" href={p.repoUrl} target="_blank" rel="noopener noreferrer" data-rk-8bc5e5="">{L.code} ↗</a>}
            </div>
          </aside>
        </div>
      
        {(prev || next) && (
          <nav className="dvpd__pager" aria-label="More projects" data-rk-8bc5e5="">
            {prev ? <a className="dvpd__key" href={prev.href} rel="prev" data-rk-8bc5e5=""><span data-rk-8bc5e5="">← {L.prev}</span><strong data-rk-8bc5e5="">{prev.title}</strong></a> : <span data-rk-8bc5e5=""></span>}
            {next && <a className="dvpd__key dvpd__key--next" href={next.href} rel="next" data-rk-8bc5e5=""><span data-rk-8bc5e5="">{L.next} →</span><strong data-rk-8bc5e5="">{next.title}</strong></a>}
          </nav>
        )}
      </section>
    </>
  );
}

export default DevProjectDetail;
