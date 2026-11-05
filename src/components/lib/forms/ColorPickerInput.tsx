'use client';

import { useEffect, useRef } from 'react';
import './ColorPickerInput.css';

/**
 * ColorPickerInput — A specialized input for selecting hex colors with a circular preview.
 * 
 * @param {string} label - Input labeling title.
 * @param {string} id - HTML ID for the picker.
 * @param {string} value - Default starting color value (hex). Default is '#6366f1'.
 * @param {string} name - HTML name binding.
 */
export interface ColorPickerInputProps {
  label: string;
  id: string;
  value?: string;
  name?: string;
}

export function ColorPickerInput({ label, id, value = "#6366f1", name }: ColorPickerInputProps) {

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll('.color-input').forEach(input => {
        const parent = input.closest('.color-picker-wrap');
        const display = parent?.querySelector('[data-color-value]');
        input.addEventListener('input', (e) => {
          if (display) display.textContent = (e.target as HTMLInputElement).value;
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="color-picker-wrap" data-rk-e8d0de="">
        <div className="color-input-container" data-rk-e8d0de="">
          <input type="color" className="color-input" id={id} name={name} defaultValue={value} data-rk-e8d0de="" />
          <label htmlFor={id} className="color-label" data-rk-e8d0de="">{label}</label>
        </div>
        <span className="color-value" data-color-value data-rk-e8d0de="">{value}</span>
      </div>
    </>
  );
}

export default ColorPickerInput;
