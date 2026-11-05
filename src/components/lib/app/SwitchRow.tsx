'use client';

import './SwitchRow.css';

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
 * SwitchRow — Settings row with label, description and an accessible on/off switch.
 *
 * @param {string} label - Setting name. Default 'Email notifications'.
 * @param {string} description - Help text.
 * @param {string} name - Form field name (submitted as "on" when checked). Default 'setting'.
 * @param {boolean} checked - Initial state. Default true.
 * @param {boolean} disabled - Disable the switch. Default false.
 * @param {string} id - Input id (unique). Defaults to `sw-${name}`.
 * @param {string} size - Switch size (sm|md). Default 'md'.
 * @param {string} className - Extra class.
 *
 * Accessibility: native checkbox with role="switch", associated label and description
 * (aria-describedby), visible focus ring, 44px touch target.
 */
export interface SwitchRowProps {
  label?: string;
  description?: string;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function SwitchRow({
  label = 'Email notifications',
  description = 'Get an email for new bookings and cancellations.',
  name = 'setting',
  checked = true,
  disabled = false,
  id,
  size = 'md',
  className = '',
}: SwitchRowProps) {
  const inputId = id ?? `sw-${name}`;
  return (
    <>
      <div className={cx(['sw-row', `sw-row--${size}`, { 'is-disabled': disabled }, className])} data-rk-22e298="">
        <div className="sw-row__text" data-rk-22e298="">
          <label className="sw-row__label" htmlFor={inputId} data-rk-22e298="">{label}</label>
          {description && <p className="sw-row__desc" id={`${inputId}-desc`} data-rk-22e298="">{description}</p>}
        </div>
        <span className="sw-row__switch" data-rk-22e298="">
          <input type="checkbox" role="switch" id={inputId} name={name} defaultChecked={checked} disabled={disabled} aria-describedby={description ? `${inputId}-desc` : undefined} data-rk-22e298="" />
          <span className="sw-row__track" aria-hidden="true" data-rk-22e298=""></span>
        </span>
      </div>
    </>
  );
}

export default SwitchRow;
