'use client';

import './CurrencyInput.css';

/**
 * CurrencyInput — A numeric input prefixed with a currency symbol for financial data entry.
 * 
 * @param {string} label - Input labeling title.
 * @param {string} id - HTML ID for attribution.
 * @param {string} symbol - Currency symbol to display (e.g. "$", "€"). Default is "$".
 * @param {number} value - Pre-filled numeric value.
 * @param {string} name - HTML name binding.
 * @param {number} step - Numeric increment. Default is 0.01.
 */
export interface CurrencyInputProps {
  label: string;
  id: string;
  symbol?: string;
  value?: number;
  name?: string;
  step?: number;
}

export function CurrencyInput({ label, id, symbol = "$", value = 0.00, name, step = 0.01 }: CurrencyInputProps) {
  return (
    <>
      <div className="curr-input-container" data-rk-a847a3="">
        <label htmlFor={id} className="curr-label" data-rk-a847a3="">{label}</label>
        <div className="curr-wrap" data-rk-a847a3="">
          <span className="curr-symbol" data-rk-a847a3="">{symbol}</span>
          <input type="number" id={id} name={name} step={step} defaultValue={value.toFixed(2)} className="curr-field" data-rk-a847a3="" />
        </div>
      </div>
    </>
  );
}

export default CurrencyInput;
