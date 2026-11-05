'use client';

import { useEffect, useRef } from 'react';
import './ChipInput.css';

/**
 * ChipInput — An interactive input for managing a list of tags or chips.
 * 
 * @param {string} label - Input labeling title.
 * @param {string[]} initialChips - Optional array of strings to pre-populate.
 * @param {string} name - HTML name for form submission.
 * @param {string} placeholder - Placeholder text for the input area.
 */
export interface ChipInputProps {
  label?: string;
  initialChips?: string[];
  name?: string;
  placeholder?: string;
}

export function ChipInput({ label, initialChips = [], name, placeholder = "Add tag..." }: ChipInputProps) {

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    // Simplified client-side logic for adding/removing chips
      document.querySelectorAll('[data-chip-input]').forEach(container => {
        const list = container.querySelector('[data-chip-list]');
        const input = container.querySelector('[data-chip-field]') as HTMLInputElement;
        const name = "tags"; // Should ideally be passed from props but hidden inputs solve this for now
    
        const addChip = (value: string) => {
          if (!value.trim() || !list) return;
          const chip = document.createElement('span');
          chip.className = 'chip';
          chip.innerHTML = `${value}<button type="button" aria-label="Remove ${value}" data-remove-chip>×</button>`;
          
          const hidden = document.createElement('input');
          hidden.type = 'hidden';
          hidden.name = 'chips[]';
          hidden.value = value;
          chip.appendChild(hidden);
          
          list.appendChild(chip);
          input.value = '';
          input.placeholder = '';
        };
    
        input?.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addChip(input.value);
          }
          if (e.key === 'Backspace' && !input.value && list?.lastElementChild) {
            list.removeChild(list.lastElementChild);
            if (list.children.length === 0) input.placeholder = "Add tag...";
          }
        });
    
        container.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          if (target.hasAttribute('data-remove-chip')) {
            target.closest('.chip')?.remove();
            if (list?.children.length === 0) input.placeholder = "Add tag...";
          }
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="chip-input-container" data-rk-36ed34="">
        {label && <label className="chip-input-label" data-rk-36ed34="">{label}</label>}
        <div className="chip-input" data-chip-input data-rk-36ed34="">
          <div className="chip-input__list" data-chip-list data-rk-36ed34="">
            {initialChips.map((chip, __i: number) => (
              <span key={__i} className="chip" data-rk-36ed34="">
                {chip}
                <button type="button" aria-label={`Remove ${chip}`} data-remove-chip data-rk-36ed34="">×</button>
                <input type="hidden" name={`${name}[]`} defaultValue={chip} data-rk-36ed34="" />
              </span>
            ))}
          </div>
          <input type="text" className="chip-input__field" placeholder={initialChips.length > 0 ? "" : placeholder} data-chip-field data-rk-36ed34="" />
        </div>
      </div>
    </>
  );
}

export default ChipInput;
