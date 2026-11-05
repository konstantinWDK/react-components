'use client';

import './CustomRadioGroup.css';

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
 * CustomRadioGroup — A group of styled radio buttons for vertical or horizontal options.
 * 
 * @param {string} label - Optional title for the fieldset.
 * @param {string} name - Common HTML name for the radio group.
 * @param {Array<{label: string, value: string, checked?: boolean}>} options - List of choices.
 * @param {boolean} horizontal - Layout orientation. Default is false (vertical).
 */
export interface CustomRadioGroupProps {
  label?: string;
  name: string;
  options: Array<{ label: string; value: string; checked?: boolean }>;
  horizontal?: boolean;
}

export function CustomRadioGroup({ label, name, options = [], horizontal = false }: CustomRadioGroupProps) {
  return (
    <>
      <fieldset className={cx(["radio-group", { "radio-group--horizontal": horizontal }])} data-rk-01df88="">
        {label && <legend className="radio-group-legend" data-rk-01df88="">{label}</legend>}
        <div className="radio-items" data-rk-01df88="">
          {options.map((opt, i) => (
            <label key={i} className="radio-item" data-rk-01df88="">
              <input type="radio" name={name} defaultValue={opt.value} defaultChecked={opt.checked} data-rk-01df88="" />
              <span className="radio-circle" aria-hidden="true" data-rk-01df88=""></span>
              <span className="radio-label" data-rk-01df88="">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </>
  );
}

export default CustomRadioGroup;
