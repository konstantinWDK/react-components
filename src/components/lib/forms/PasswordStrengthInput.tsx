'use client';

import { useEffect, useRef } from 'react';
import './PasswordStrengthInput.css';

/**
 * PasswordStrengthInput — Secure password input field with visual strength estimator bar and eye toggle.
 * 
 * @param {string} id - HTML ID for the password input.
 * @param {string} label - Input label text. Default is 'Password'.
 * @param {string} name - Form field name. Default is 'password'.
 * @param {string} placeholder - Placeholder text. Default is 'Enter secure password'.
 * @param {boolean} required - HTML required field attribute.
 */
export interface PasswordStrengthInputProps {
  id: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
}

export function PasswordStrengthInput({
  id = 'password-input',
  label = 'Password',
  name = 'password',
  placeholder = 'Enter secure password',
  required = false,
}: PasswordStrengthInputProps) {

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    function initPasswordGroups() {
        document.querySelectorAll('[data-pwd-group]').forEach((group) => {
          const input = group.querySelector('[data-pwd-input]') as HTMLInputElement;
          const toggle = group.querySelector('[data-pwd-toggle]') as HTMLButtonElement;
          const status = group.querySelector('[data-pwd-status]') as HTMLElement;
          if (!input || !toggle) return;
    
          const eyeOpen = toggle.querySelector('.eye-open') as HTMLElement;
          const eyeClosed = toggle.querySelector('.eye-closed') as HTMLElement;
    
          toggle.addEventListener('click', () => {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            if (eyeOpen && eyeClosed) {
              eyeOpen.style.display = isPassword ? 'none' : 'block';
              eyeClosed.style.display = isPassword ? 'block' : 'none';
            }
          });
    
          input.addEventListener('input', () => {
            const val = input.value;
            let score = 0;
            if (val.length >= 6) score++;
            if (val.length >= 10) score++;
            if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
            if (/[^A-Za-z0-9]/.test(val)) score++;
    
            group.setAttribute('data-level', String(score));
    
            const labels = ['Too weak', 'Weak', 'Fair', 'Strong', 'Secure & Robust'];
            if (status) {
              status.textContent = labels[score] || 'Too weak';
            }
          });
        });
      }
    
      initPasswordGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="pwd-group" data-pwd-group data-rk-7f0f04="">
        <div className="pwd-group__header" data-rk-7f0f04="">
          <label htmlFor={id} className="pwd-group__label" data-rk-7f0f04="">{label}</label>
          <span className="pwd-group__status" data-pwd-status data-rk-7f0f04="">Too weak</span>
        </div>
      
        <div className="pwd-group__field" data-rk-7f0f04="">
          <input type="password" id={id} name={name} placeholder={placeholder} required={required} className="pwd-group__input" data-pwd-input autoComplete="new-password" data-rk-7f0f04="" />
          <button type="button" className="pwd-group__toggle" aria-label="Toggle password visibility" data-pwd-toggle data-rk-7f0f04="">
            <svg className="eye-open" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-7f0f04="">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" data-rk-7f0f04="" />
              <circle cx="12" cy="12" r="3" data-rk-7f0f04="" />
            </svg>
            <svg className="eye-closed" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "none" }} data-rk-7f0f04="">
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" data-rk-7f0f04="" />
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" data-rk-7f0f04="" />
              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" data-rk-7f0f04="" />
              <line x1="2" x2="22" y1="2" y2="22" data-rk-7f0f04="" />
            </svg>
          </button>
        </div>
      
        {/* 4-segment strength meter */}
        <div className="pwd-group__meter" aria-hidden="true" data-rk-7f0f04="">
          <div className="pwd-group__segment" data-seg="1" data-rk-7f0f04=""></div>
          <div className="pwd-group__segment" data-seg="2" data-rk-7f0f04=""></div>
          <div className="pwd-group__segment" data-seg="3" data-rk-7f0f04=""></div>
          <div className="pwd-group__segment" data-seg="4" data-rk-7f0f04=""></div>
        </div>
      </div>
    </>
  );
}

export default PasswordStrengthInput;
