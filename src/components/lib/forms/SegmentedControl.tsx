'use client';

import './SegmentedControl.css';

/**
 * SegmentedControl — A horizontal group of button-like radio choices for switching views or modes.
 * 
 * @param {string} name - Shared HTML name for the internal radio inputs.
 * @param {Array<{label: string, value: string, checked?: boolean}>} options - Selectable segments.
 * @param {string} idPrefix - Prefix for auto-generating input IDs.
 */
export interface SegmentedControlProps {
  name: string;
  options: Array<{ label: string; value: string; checked?: boolean }>;
  idPrefix?: string;
}

export function SegmentedControl({ name, options = [], idPrefix = "seg" }: SegmentedControlProps) {
  return (
    <>
      <div className="segmented" data-rk-260788="">
        {options.map((opt, i) => (
          <div key={i} className="segmented-item" data-rk-260788="">
            <input type="radio" name={name} id={`${idPrefix}-${i}`} defaultValue={opt.value} defaultChecked={opt.checked} className="segmented-input" data-rk-260788="" />
            <label htmlFor={`${idPrefix}-${i}`} className="segmented-label" data-rk-260788="">{opt.label}</label>
          </div>
        ))}
      </div>
    </>
  );
}

export default SegmentedControl;
