'use client';

import './CyberpunkCheckbox.css';

/**
 * CyberpunkCheckbox — A bold, neon-themed checkbox with angular borders and glitch-toggle effect.
 * 
 * @param {string} label - Text label displayed alongside the checkbox.
 * @param {string} id - HTML ID for the checkbox.
 * @param {string} name - HTML name binding.
 * @param {boolean} checked - Initial toggle state.
 */
export interface CyberpunkCheckboxProps {
  label: string;
  id: string;
  name?: string;
  checked?: boolean;
}

export function CyberpunkCheckbox({ label, id, name, checked = false }: CyberpunkCheckboxProps) {
  return (
    <>
      <label className="cyber-check" htmlFor={id} data-rk-43f10f="">
        <input type="checkbox" id={id} name={name} defaultChecked={checked} data-rk-43f10f="" />
        <span className="checkmark" aria-hidden="true" data-rk-43f10f=""></span>
        <span className="cyber-text" data-rk-43f10f="">{label}</span>
      </label>
    </>
  );
}

export default CyberpunkCheckbox;
