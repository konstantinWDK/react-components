'use client';

import { useId } from 'react';
import './CareersOpenings.css';

interface Job { title: string; department: string; location: string; type: string; remote?: boolean; href: string }

/**
 * CareersOpenings — Job listings section grouped by department, with location,
 * type and remote badges, plus perks strip and a general-application CTA.
 *
 * @param {string} title - Section heading.
 * @param {string} subtitle - Section description.
 * @param {Array<{title: string, department: string, location: string, type: string, remote?: boolean, href: string}>} jobs - Open roles.
 * @param {string[]} perks - Short perk labels.
 * @param {{label: string, href: string}} cta - General application link.
 * @param {string} variant - Row style (list|cards|minimal).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface CareersOpeningsProps {
  title?: string;
  subtitle?: string;
  jobs?: Job[];
  perks?: string[];
  cta?: { label: string; href: string };
  variant?: 'list' | 'cards' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CareersOpenings({
  title = 'Join the team',
  subtitle = 'We’re a small, remote-first crew building tools for the open web.',
  jobs = [
    { title: 'Senior Frontend Engineer', department: 'Engineering', location: 'Europe', type: 'Full-time', remote: true, href: '#' },
    { title: 'Design Systems Engineer', department: 'Engineering', location: 'Americas', type: 'Full-time', remote: true, href: '#' },
    { title: 'Product Designer', department: 'Design', location: 'Barcelona', type: 'Full-time', href: '#' },
    { title: 'Developer Advocate', department: 'Marketing', location: 'Anywhere', type: 'Contract', remote: true, href: '#' },
  ],
  perks = ['Remote-first', '4-day work week', 'Learning budget', 'Equity for everyone'],
  cta = { label: 'Send an open application', href: '#' },
  variant = 'list',
  size = 'md',
  className = '',
}: CareersOpeningsProps) {
  const id = `co-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const departments = [...new Set(jobs.map((j) => j.department))];
  return (
    <>
      <div className="cq-careers-openings-cq" data-rk-6d35fa="">
      <section className={`co co--${variant} co--${size} ${className}`} aria-labelledby={id} data-rk-6d35fa="">
        <div className="co__inner" data-rk-6d35fa="">
          <header className="co__head" data-rk-6d35fa="">
            <div data-rk-6d35fa="">
              <h2 id={id} className="co__title" data-rk-6d35fa="">{title}</h2>
              <p className="co__subtitle" data-rk-6d35fa="">{subtitle}</p>
            </div>
            <span className="co__count" data-rk-6d35fa="">{jobs.length} open roles</span>
          </header>
      
          <ul className="co__perks" aria-label="Perks" data-rk-6d35fa="">
            {perks.map((p, __i: number) => <li key={__i} data-rk-6d35fa="">{p}</li>)}
          </ul>
      
          {departments.map((d, __i: number) => (
            <div key={__i} className="co__dept" data-rk-6d35fa="">
              <h3 className="co__dept-title" data-rk-6d35fa="">{d}</h3>
              <ul className="co__jobs" data-rk-6d35fa="">
                {jobs.filter((j) => j.department === d).map((j, __i: number) => (
                  <li key={__i} data-rk-6d35fa="">
                    <a className="co__job" href={j.href} data-rk-6d35fa="">
                      <span className="co__job-title" data-rk-6d35fa="">{j.title}</span>
                      <span className="co__meta" data-rk-6d35fa="">
                        <span className="co__tag" data-rk-6d35fa="">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" data-rk-6d35fa=""><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" data-rk-6d35fa="" /><circle cx="12" cy="10" r="3" data-rk-6d35fa="" /></svg>
                          {j.location}
                        </span>
                        <span className="co__tag" data-rk-6d35fa="">{j.type}</span>
                        {j.remote && <span className="co__tag co__tag--remote" data-rk-6d35fa="">Remote</span>}
                      </span>
                      <svg className="co__arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-6d35fa=""><path d="M7 17 17 7M8 7h9v9" data-rk-6d35fa="" /></svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      
          {cta && (
            <p className="co__cta" data-rk-6d35fa="">Don’t see your role? <a href={cta.href} data-rk-6d35fa="">{cta.label}</a></p>
          )}
        </div>
      </section>
      </div>
    </>
  );
}

export default CareersOpenings;
