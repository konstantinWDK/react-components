'use client';

import { useEffect, useRef } from 'react';
import './GlassSlider.css';

/**
 * GlassSlider — A translucent range slider with a glowing thumb and backdrop-blur track.
 * 
 * @param {string} label - Optional descriptive text title.
 * @param {string} id - HTML ID for the range input.
 * @param {string} name - HTML name binding.
 * @param {number} min - Minimum value. Default is 0.
 * @param {number} max - Maximum value. Default is 100.
 * @param {number} value - Initial starting value. Default is 50.
 * @param {number} step - Step increment. Default is 1.
 */
export interface GlassSliderProps {
  label?: string;
  id: string;
  name?: string;
  min?: number;
  max?: number;
  value?: number;
  step?: number;
}

export function GlassSlider({ label, id, name, min = 0, max = 100, value = 50, step = 1 }: GlassSliderProps) {

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll('[data-slider-input]').forEach(slider => {
        const display = slider.closest('.slider-container')?.querySelector('[data-slider-value]');
        slider.addEventListener('input', (e) => {
          if (display) display.textContent = (e.target as HTMLInputElement).value;
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="slider-container" data-rk-0cd7ec="">
        {label && <div className="slider-header" data-rk-0cd7ec=""><label htmlFor={id} data-rk-0cd7ec="">{label}</label> <span data-slider-value data-rk-0cd7ec="">{value}</span></div>}
        <input type="range" className="glass-slider" id={id} name={name} min={min} max={max} step={step} defaultValue={value} data-slider-input data-rk-0cd7ec="" />
      </div>
    </>
  );
}

export default GlassSlider;
