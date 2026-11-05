'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import './AnimatedCounterText.css';

/** "a: b; --c: d" → style object */
function st(css: string | undefined): CSSProperties {
  const o: Record<string, string> = {};
  for (const decl of String(css ?? '').split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const k = decl.slice(0, i).trim();
    if (k) o[k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = decl.slice(i + 1).trim();
  }
  return o as CSSProperties;
}

/**
 * AnimatedCounterText — Kinetic statistic counter display with animated number progression and unit suffixes.
 * 
 * @param {number} target - Numerical target value (e.g. 99, 120, 2400). Default is 120.
 * @param {string} prefix - Optional string prefix (e.g. '$', '+').
 * @param {string} suffix - Optional string suffix (e.g. '%', 'k', '+'). Default is '+'.
 * @param {string} label - Descriptive text below the counter.
 * @param {string} color - Text accent color. Default is '#d4a017'.
 */
export interface AnimatedCounterTextProps {
  target?: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  color?: string;
}

export function AnimatedCounterText({
  target = 120,
  prefix = '',
  suffix = '+',
  label = 'Components Ready to Ship',
  color = '#d4a017',
}: AnimatedCounterTextProps) {

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    function setupCounters() {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const targetEl = entry.target.querySelector('[data-counter-target]') as HTMLElement;
            if (!targetEl || targetEl.getAttribute('data-counted')) return;
    
            targetEl.setAttribute('data-counted', 'true');
            const finalVal = parseInt(targetEl.getAttribute('data-counter-target') || '0', 10);
            const duration = 1500;
            const start = performance.now();
    
            function step(now: number) {
              const progress = Math.min((now - start) / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              targetEl.textContent = Math.floor(eased * finalVal).toLocaleString();
    
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                targetEl.textContent = finalVal.toLocaleString();
              }
            }
    
            requestAnimationFrame(step);
          });
        }, { threshold: 0.2 });
    
        document.querySelectorAll('[data-counter-wrap]').forEach((el) => observer.observe(el));
      }
    
      setupCounters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="stat-counter" data-counter-wrap style={st(`--counter-color: ${color};`)} data-rk-89b130="">
        <div className="stat-counter__number" data-rk-89b130="">
          {prefix && <span className="affix" data-rk-89b130="">{prefix}</span>}
          <span className="value" data-counter-target={target} data-rk-89b130="">0</span>
          {suffix && <span className="affix" data-rk-89b130="">{suffix}</span>}
        </div>
        {label && <p className="stat-counter__label" data-rk-89b130="">{label}</p>}
      </div>
    </>
  );
}

export default AnimatedCounterText;
