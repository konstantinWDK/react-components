'use client';

import './ErrorInput.css';

/**
 * ErrorInput — A styled input strictly formatted to demonstrate error or invalid validation states.
 * 
 * @param {string} id - The ID for the input form element.
 * @param {string} errorMessage - The message text presented below the input field.
 * @param {string} value - Default starting value mimicking failed data.
 * @param {string} placeholder - Optional standard placeholder.
 * @param {string} name - HTML name binding.
 */
export interface ErrorInputProps {
  id: string;
  errorMessage: string;
  value?: string;
  placeholder?: string;
  name?: string;
}

export function ErrorInput({ id, errorMessage, value = '', placeholder, name }: ErrorInputProps) {
  return (
    <>
      <div className="error-wrap" data-rk-3b29fa="">
        <input type="text" id={id} name={name} defaultValue={value} placeholder={placeholder} className="input-error" aria-invalid="true" aria-describedby={`${id}-error`} data-rk-3b29fa="" />
        <span id={`${id}-error`} className="error-msg" aria-live="polite" data-rk-3b29fa="">{errorMessage}</span>
      </div>
    </>
  );
}

export default ErrorInput;
