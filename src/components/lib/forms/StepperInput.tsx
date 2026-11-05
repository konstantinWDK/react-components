'use client';

import { useEffect, useRef } from 'react';
import './StepperInput.css';

/**
 * StepperInput — A numeric input with increment and decrement buttons for precise control.
 * 
 * @param {string} label - Optional input label.
 * @param {string} id - HTML ID for the number input.
 * @param {string} name - HTML name binding.
 * @param {number} value - Initial default value. Default is 1.
 * @param {number} min - Minimum allowed value.
 * @param {number} max - Maximum allowed value.
 * @param {number} step - Numeric increment step. Default is 1.
 */
export interface StepperInputProps {
  label?: string;
  id: string;
  name?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
}

export function StepperInput({ label, id, name, value = 1, min, max, step = 1 }: StepperInputProps) {

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll('[data-stepper]').forEach(wrapper => {
        const input = wrapper.querySelector('[data-step-input]') as HTMLInputElement;
        const minus = wrapper.querySelector('[data-step-minus]');
        const plus = wrapper.querySelector('[data-step-plus]');
        
        if (!input || !minus || !plus) return;
    
        const step = parseFloat(input.step) || 1;
        const min = input.min !== "" ? parseFloat(input.min) : -Infinity;
        const max = input.max !== "" ? parseFloat(input.max) : Infinity;
    
        minus.addEventListener('click', () => {
          const current = parseFloat(input.value) || 0;
          if (current - step >= min) input.value = (current - step).toString();
        });
    
        plus.addEventListener('click', () => {
          const current = parseFloat(input.value) || 0;
          if (current + step <= max) input.value = (current + step).toString();
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="stepper-container" data-rk-dbf2a1="">
        {label && <label className="stepper-label" htmlFor={id} data-rk-dbf2a1="">{label}</label>}
        <div className="stepper" data-stepper data-rk-dbf2a1="">
          <button type="button" className="stepper-btn stepper-btn--minus" data-step-minus aria-label="Decrease value" data-rk-dbf2a1="">−</button>
          <input type="number" id={id} name={name} min={min} max={max} step={step} defaultValue={value} className="stepper-input" data-step-input data-rk-dbf2a1="" />
          <button type="button" className="stepper-btn stepper-btn--plus" data-step-plus aria-label="Increase value" data-rk-dbf2a1="">+</button>
        </div>
      </div>
    </>
  );
}

export default StepperInput;
