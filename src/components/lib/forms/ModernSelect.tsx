'use client';

import './ModernSelect.css';

/**
 * ModernSelect — A styled dropdown selector with a custom arrow and glassmorphism styling.
 * 
 * @param {string} label - Input labeling title.
 * @param {string} id - HTML ID for the select element.
 * @param {string} name - HTML name binding.
 * @param {Array<{label: string, value: string, disabled?: boolean}>} options - List of select options.
 * @param {boolean} required - HTML required attribute.
 */
export interface ModernSelectProps {
  label: string;
  id: string;
  name?: string;
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  required?: boolean;
}

export function ModernSelect({ label, id, name, options = [], required = false }: ModernSelectProps) {
  return (
    <>
      <div className="select-container" data-rk-9684b2="">
        <label htmlFor={id} className="select-label" data-rk-9684b2="">{label}</label>
        <div className="select-wrap" data-rk-9684b2="">
          <select className="custom-select" id={id} name={name} required={required} data-rk-9684b2="">
            {options.map((opt, __i: number) => (
              <option key={__i} value={opt.value} disabled={opt.disabled} data-rk-9684b2="">{opt.label}</option>
            ))}
          </select>
          <div className="select-arrow" aria-hidden="true" data-rk-9684b2="">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" data-rk-9684b2="">
              <path d="M6 9l6 6 6-6" data-rk-9684b2="" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModernSelect;
