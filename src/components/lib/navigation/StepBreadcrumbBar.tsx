'use client';

import './StepBreadcrumbBar.css';

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
 * StepBreadcrumbBar — Stepped workflow breadcrumb indicator for checkout, multi-step forms, or wizards.
 * 
 * @param {Array<{step: number, label: string, status: 'complete' | 'active' | 'upcoming', href?: string}>} steps - Step definitions.
 */
export interface StepBreadcrumbBarProps {
  steps?: Array<{
    step: number;
    label: string;
    status: 'complete' | 'active' | 'upcoming';
    href?: string;
  }>;
}

export function StepBreadcrumbBar({
  steps = [
    { step: 1, label: 'Account', status: 'complete', href: '#step-1' },
    { step: 2, label: 'Plan & Billing', status: 'active', href: '#step-2' },
    { step: 3, label: 'Preferences', status: 'upcoming', href: '#step-3' },
    { step: 4, label: 'Review', status: 'upcoming', href: '#step-4' },
  ],
}: StepBreadcrumbBarProps) {
  return (
    <>
      <nav className="step-nav" aria-label="Workflow progress" data-rk-71122f="">
        <ol className="step-nav__list" data-rk-71122f="">
          {steps.map((st, i) => (
            <li key={i} className={cx(['step-nav__item', `step-nav__item--${st.status}`])} data-rk-71122f="">
              <a href={st.href || '#'} className="step-nav__link" aria-current={st.status === 'active' ? 'step' : undefined} data-rk-71122f="">
                <span className="step-nav__circle" data-rk-71122f="">
                  {st.status === 'complete' ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" data-rk-71122f="">
                      <polyline points="20 6 9 17 4 12" data-rk-71122f="" />
                    </svg>
                  ) : (
                    st.step
                  )}
                </span>
                <span className="step-nav__label" data-rk-71122f="">{st.label}</span>
              </a>
              {i < steps.length - 1 && (
                <div className="step-nav__line" aria-hidden="true" data-rk-71122f=""></div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export default StepBreadcrumbBar;
