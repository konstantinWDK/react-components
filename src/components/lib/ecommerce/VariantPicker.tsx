'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import './VariantPicker.css';

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

interface Option { label: string; value?: string; hex?: string; disabled?: boolean }

/**
 * VariantPicker — Colour swatches or size pills as an accessible radio group.
 * Can keep an add-to-cart button's `data-variant` in sync with the selection.
 *
 * @param {string} label - Group legend. Default 'Colour'.
 * @param {string} name - Radio name. Default 'variant'.
 * @param {string} type - Picker style (swatch|pill). Default 'swatch'.
 * @param {Array<{label: string, value?: string, hex?: string, disabled?: boolean}>} options - Choices.
 * @param {number} selected - Index of the pre-selected option. Default 0.
 * @param {string} target - id of an add-to-cart button whose `data-variant` follows the choice.
 * @param {string} size - Control size (sm|md|lg). Default 'md'.
 * @param {string} className - Extra class.
 *
 * Theming: --vp-active-bg, --vp-active-color, --vp-active-border, --vp-ring, --vp-radius.
 *
 * Accessibility: native radios (arrow keys work), visible focus ring, the chosen value is
 * printed next to the legend; disabled options are announced as unavailable.
 */
export interface VariantPickerProps {
  label?: string;
  name?: string;
  type?: 'swatch' | 'pill';
  options?: Option[];
  selected?: number;
  target?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function VariantPicker({
  label = 'Colour',
  name = 'variant',
  type = 'swatch',
  options = [
    { label: 'Graphite', hex: '#2b2b2f' },
    { label: 'Sand', hex: '#d8c3a5' },
    { label: 'Ocean', hex: '#3d6f9e' },
    { label: 'Clay', hex: '#b5654a', disabled: true },
  ],
  selected = 0,
  target,
  size = 'md',
  className = '',
}: VariantPickerProps) {
  const uid = `vp-${name}`;

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLFieldSetElement>('[data-variant-picker]:not([data-bound])').forEach((fs) => {
        fs.dataset.bound = '';
        const out = fs.querySelector<HTMLElement>('[data-variant-value]');
        const sync = () => {
          const checked = fs.querySelector<HTMLInputElement>('input:checked');
          if (!checked) return;
          if (out) out.textContent = checked.dataset.label || checked.value;
          const btn = fs.dataset.target ? document.getElementById(fs.dataset.target) : null;
          if (btn) {
            // Combine every picker that targets the same button: "Sand / M"
            const parts = Array.from(document.querySelectorAll<HTMLElement>(`[data-variant-picker][data-target="${fs.dataset.target}"]`))
              .map((p) => p.querySelector<HTMLInputElement>('input:checked')?.dataset.label)
              .filter(Boolean);
            btn.dataset.variant = parts.join(' / ');
          }
        };
        fs.addEventListener('change', sync);
        sync();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <fieldset className={cx(['v-picker', `v-picker--${type}`, `v-picker--${size}`, className])} data-variant-picker data-target={target} data-rk-799908="">
        <legend className="v-picker__legend" data-rk-799908="">
          {label}: <span className="v-picker__value" data-variant-value data-rk-799908="">{options[selected]?.label}</span>
        </legend>
        <div className="v-picker__options" data-rk-799908="">
          {options.map((o, i) => (
            <label key={i} className={cx(['v-picker__opt', { 'is-disabled': o.disabled }])} style={st(o.hex ? `--sw: ${o.hex}` : '')} title={o.label} data-rk-799908="">
              <input type="radio" name={`${uid}`} defaultValue={o.value ?? o.label} data-label={o.label} defaultChecked={i === selected} disabled={o.disabled} data-rk-799908="" />
              {type === 'swatch'
                ? <span className="v-picker__dot" aria-hidden="true" data-rk-799908=""></span>
                : <span className="v-picker__pill" data-rk-799908="">{o.label}</span>}
              {type === 'swatch' && <span className="sr-only" data-rk-799908="">{o.label}{o.disabled ? ' (sold out)' : ''}</span>}
              {type === 'pill' && o.disabled && <span className="sr-only" data-rk-799908=""> (sold out)</span>}
            </label>
          ))}
        </div>
      </fieldset>
    </>
  );
}

export default VariantPicker;
