'use client';

import type { ReactNode } from 'react';
import './FormGroupVertical.css';

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
 * FormGroupVertical — A structural wrapper component for grouping an input with its label and validation messaging.
 * 
 * @param {string} label - The descriptive title for the field.
 * @param {string} forId - The target ID of the child input (for label association).
 * @param {string} helpText - Optional secondary guidance text below the input.
 * @param {string} error - Optional error message that applies error styling.
 * @param {boolean} required - Displays a required indicator if true.
 */
export interface FormGroupVerticalProps {
  label: string;
  forId: string;
  helpText?: string;
  error?: string;
  required?: boolean;
  children?: ReactNode;
}

export function FormGroupVertical({ label, forId, helpText, error, required = false,
  children
}: FormGroupVerticalProps) {
  return (
    <>
      <div className={cx(["form-group", { "form-group--error": error }])} data-rk-ec85ff="">
        <div className="form-group__header" data-rk-ec85ff="">
          <label htmlFor={forId} className="form-group__label" data-rk-ec85ff="">
            {label}
            {required && <span className="form-group__req" aria-hidden="true" data-rk-ec85ff="">*</span>}
          </label>
        </div>
        
        <div className="form-group__content" data-rk-ec85ff="">
          {children}
        </div>
        
        {error ? (
          <p className="form-group__error" id={`${forId}-error`} role="alert" data-rk-ec85ff="">{error}</p>
        ) : helpText ? (
          <p className="form-group__help" id={`${forId}-help`} data-rk-ec85ff="">{helpText}</p>
        ) : null}
      </div>
    </>
  );
}

export default FormGroupVertical;
