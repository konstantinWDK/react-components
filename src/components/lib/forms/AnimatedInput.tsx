'use client';

import './AnimatedInput.css';

/**
 * AnimatedInput — A form input with a floating label animation and focus glow effect.
 * 
 * @param {string} label - The visible indicator for the input field.
 * @param {string} id - The HTML id and for attribute linkage.
 * @param {string} type - Input element type. Default is 'text'.
 * @param {string} placeholder - Passed placeholder. Default is ' '. (Space is needed for CSS :placeholder-shown to work).
 * @param {boolean} required - HTML required attribute parameter. Default is false.
 * @param {string} name - HTML input name binding.
 * @param {string} autocomplete - HTML autocomplete hint (e.g. 'email', 'given-name'). Default is 'off'.
 */
export interface AnimatedInputProps { 
  label: string; 
  id: string; 
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'; 
  placeholder?: string; 
  required?: boolean; 
  name?: string; 
  autocomplete?: string; 
}

export function AnimatedInput({ label, id, type = 'text', placeholder = ' ', required = false, name, autocomplete = 'off' }: AnimatedInputProps) {
  return (
    <>
      <div className="anim-input-wrap" data-rk-75a992="">
        <input id={id} name={name} type={type} placeholder={placeholder} required={required} className="anim-input" autoComplete={autocomplete} data-rk-75a992="" />
        <label htmlFor={id} className="anim-input-label" data-rk-75a992="">{label}</label>
      </div>
    </>
  );
}

export default AnimatedInput;
