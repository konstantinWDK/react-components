'use client';

import './NeumorphicSwitch.css';

/**
 * NeumorphicSwitch — A soft-UI checkbox toggle with realistic inset and outset shadow states.
 * 
 * @param {string} label - Optional descriptive text suffix.
 * @param {string} id - HTML ID for input linkage.
 * @param {string} name - HTML name binding.
 * @param {boolean} checked - Initial toggle state. Default is false.
 */
export interface NeumorphicSwitchProps {
  label?: string;
  id?: string;
  name?: string;
  checked?: boolean;
}

export function NeumorphicSwitch({ label, id, name, checked = false }: NeumorphicSwitchProps) {
  return (
    <>
      <div className="neu-switch-wrapper" data-rk-3cc0c3="">
        <label className="neu-switch" data-rk-3cc0c3="">
          <input type="checkbox" id={id} name={name} defaultChecked={checked} data-rk-3cc0c3="" />
          <span className="slider" data-rk-3cc0c3=""></span>
        </label>
        {label && <label htmlFor={id} className="neu-label" data-rk-3cc0c3="">{label}</label>}
      </div>
    </>
  );
}

export default NeumorphicSwitch;
