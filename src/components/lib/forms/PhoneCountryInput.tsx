'use client';

import './PhoneCountryInput.css';

/**
 * PhoneCountryInput — Accessible phone input with country dial code selector and dark glass styling.
 * 
 * @param {string} id - HTML ID for the phone input.
 * @param {string} label - Input label text. Default is 'Phone Number'.
 * @param {string} name - Form field name. Default is 'phone'.
 * @param {string} placeholder - Phone placeholder. Default is '612 345 678'.
 * @param {boolean} required - HTML required field attribute.
 */
export interface PhoneCountryInputProps {
  id: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
}

export function PhoneCountryInput({
  id = 'phone-number-input',
  label = 'Phone Number',
  name = 'phone',
  placeholder = '612 345 678',
  required = false,
}: PhoneCountryInputProps) {
  const countries = [
    { code: '+34', flag: '🇪🇸', name: 'ES' },
    { code: '+1', flag: '🇺🇸', name: 'US' },
    { code: '+44', flag: '🇬🇧', name: 'UK' },
    { code: '+49', flag: '🇩🇪', name: 'DE' },
    { code: '+33', flag: '🇫🇷', name: 'FR' },
    { code: '+52', flag: '🇲🇽', name: 'MX' },
    { code: '+54', flag: '🇦🇷', name: 'AR' },
  ];
  return (
    <>
      <div className="phone-group" data-rk-8315ab="">
        <label htmlFor={id} className="phone-group__label" data-rk-8315ab="">{label}</label>
      
        <div className="phone-group__wrap" data-rk-8315ab="">
          <div className="phone-group__prefix" data-rk-8315ab="">
            <select className="phone-group__select" aria-label="Country calling code" name={`${name}_country`} data-rk-8315ab="">
              {countries.map((c, __i: number) => (
                <option key={__i} value={c.code} data-rk-8315ab="">
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
            <span className="phone-group__arrow" aria-hidden="true" data-rk-8315ab="">▾</span>
          </div>
      
          <input type="tel" id={id} name={name} placeholder={placeholder} required={required} className="phone-group__input" autoComplete="tel-national" data-rk-8315ab="" />
        </div>
      </div>
    </>
  );
}

export default PhoneCountryInput;
