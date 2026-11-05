'use client';

import { useEffect, useRef } from 'react';
import './GlassInlineToggleGroup.css';

/** class:list → className */
function cx(...args: unknown[]): string {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (!v) return;
    if (typeof v === 'string' || typeof v === 'number') out.push(String(v));
    else if (Array.isArray(v)) v.forEach(walk);
    else if (typeof v === 'object') for (const [k, on] of Object.entries(v as Record<string, unknown>)) if (on) out.push(k);
  };
  args.forEach(walk);
  return out.join(' ');
}

/**
 * GlassInlineToggleGroup — Segmented glassmorphism pill toggle for multi-option selection.
 * 
 * @param {string} name - HTML radio group name.
 * @param {Array<{label: string, value: string, icon?: string}>} options - Selectable options list.
 * @param {string} defaultValue - Value of the active option.
 * @param {'sm' | 'md' | 'lg'} size - Pill size scale. Default is 'md'.
 */
export interface GlassInlineToggleGroupProps {
  name: string;
  options?: Array<{ label: string; value: string; icon?: string }>;
  defaultValue?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function GlassInlineToggleGroup({
  name = 'toggle-options',
  options = [
    { label: 'Weekly', value: 'week' },
    { label: 'Monthly', value: 'month' },
    { label: 'Yearly', value: 'year' },
  ],
  defaultValue = 'month',
  size = 'md',
}: GlassInlineToggleGroupProps) {

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    function setupGlassToggleGroups() {
        document.querySelectorAll('[data-toggle-group]').forEach((group) => {
          const slider = group.querySelector('[data-toggle-slider]') as HTMLElement;
          const radios = group.querySelectorAll('[data-toggle-radio]') as NodeListOf<HTMLInputElement>;
          if (!slider || radios.length === 0) return;
    
          function updateSlider() {
            const checked = group.querySelector('[data-toggle-radio]:checked') as HTMLInputElement;
            if (!checked) return;
            const label = checked.closest('.glass-toggle-group__item') as HTMLElement;
            if (!label) return;
    
            const groupRect = group.getBoundingClientRect();
            const labelRect = label.getBoundingClientRect();
    
            const offsetLeft = labelRect.left - groupRect.left;
            slider.style.width = `${labelRect.width}px`;
            slider.style.transform = `translateX(${offsetLeft - 4}px)`;
          }
    
          radios.forEach((r) => r.addEventListener('change', updateSlider));
          updateSlider();
          window.addEventListener('resize', updateSlider);
        });
      }
    
      setupGlassToggleGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={cx(['glass-toggle-group', `glass-toggle-group--${size}`])} role="radiogroup" data-toggle-group data-rk-c99a88="">
        <div className="glass-toggle-group__slider" data-toggle-slider aria-hidden="true" data-rk-c99a88=""></div>
        {options.map((opt) => {
          const isChecked = opt.value === defaultValue;
          return (
            <label className="glass-toggle-group__item" data-rk-c99a88="">
              <input type="radio" name={name} defaultValue={opt.value} defaultChecked={isChecked} className="glass-toggle-group__radio" data-toggle-radio data-rk-c99a88="" />
              <span className="glass-toggle-group__label" data-rk-c99a88="">
                {opt.icon && <span className="glass-toggle-group__icon" dangerouslySetInnerHTML={{ __html: opt.icon }} data-rk-c99a88="" />}
                {opt.label}
              </span>
            </label>
          );
        })}
      </div>
    </>
  );
}

export default GlassInlineToggleGroup;
