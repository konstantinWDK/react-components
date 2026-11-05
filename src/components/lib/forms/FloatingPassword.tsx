'use client';

import { useEffect, useRef } from 'react';
import './FloatingPassword.css';

/**
 * FloatingPassword — A password input field featuring a reveal/hide toggle inside the frame.
 * 
 * @param {string} id - Unique identifier linking toggle state securely.
 * @param {string} placeholder - Default text visible when empty. Default is "Password".
 * @param {string} name - HTML name binding.
 * @param {boolean} required - HTML required indicator.
 */
export interface FloatingPasswordProps {
  id: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
}

export function FloatingPassword({ id, placeholder = "Password", name, required = false }: FloatingPasswordProps) {

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    // Setup functional toggle without polluting global namespaces or clashing IDs
      document.querySelectorAll('.pass-wrap').forEach(wrap => {
        const btn = wrap.querySelector('[data-pwd-toggle]');
        const pass = wrap.querySelector('[data-pwd-input]') as HTMLInputElement;
        
        if (btn && pass) {
          btn.addEventListener('click', () => {
            const isPass = pass.type === 'password';
            pass.type = isPass ? 'text' : 'password';
            btn.textContent = isPass ? '🙈' : '👁️';
          });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="pass-wrap" data-rk-1ae42d="">
        <input type="password" id={id} name={name} placeholder={placeholder} required={required} className="pass-input" data-pwd-input data-rk-1ae42d="" />
        <button type="button" className="toggle-pass" aria-label="Toggle password visibility" data-pwd-toggle data-rk-1ae42d="">👁️</button>
      </div>
    </>
  );
}

export default FloatingPassword;
