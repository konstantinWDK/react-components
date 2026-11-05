'use client';

import { useEffect, useRef } from 'react';
import './OTPInput.css';

/**
 * OTPInput — A specialized input group for One-Time Password verification codes.
 * 
 * @param {string} label - Optional grouping label title.
 * @param {string} id - Base HTML ID for the inputs.
 * @param {number} length - Number of OTP digits. Default is 4.
 * @param {string} name - Base name for form submission (will be indexed).
 */
export interface OTPInputProps {
  label?: string;
  id: string;
  length?: number;
  name?: string;
}

export function OTPInput({ label, id, length = 4, name = "otp" }: OTPInputProps) {

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll('[data-otp-group]').forEach(group => {
        const inputs = group.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
        
        inputs.forEach((input, idx) => {
          // Auto-advance
          input.addEventListener('input', (e) => {
            const val = (e.target as HTMLInputElement).value;
            if (val && idx < inputs.length - 1) {
              inputs[idx + 1].focus();
            }
          });
    
          // Backspace logic
          input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !input.value && idx > 0) {
              inputs[idx - 1].focus();
            }
          });
    
          // Paste logic
          input.addEventListener('paste', (e) => {
            e.preventDefault();
            const data = e.clipboardData?.getData('text').slice(0, inputs.length).split('') || [];
            data.forEach((val, i) => {
              if (inputs[i]) inputs[i].value = val;
            });
            if (inputs[data.length - 1]) inputs[data.length - 1].focus();
          });
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="otp-container" data-rk-a692f6="">
        {label && <label className="otp-label" data-rk-a692f6="">{label}</label>}
        <div className="otp-wrap" data-otp-group data-rk-a692f6="">
          {Array.from({ length }).map((_, i) => (
            <input key={i} type="text" inputMode="numeric" maxLength={1} pattern="[0-9]*" autoComplete="one-time-code" id={`${id}-${i}`} name={`${name}[]`} className="otp-field" data-otp-index={i} data-rk-a692f6="" />
          ))}
        </div>
      </div>
    </>
  );
}

export default OTPInput;
