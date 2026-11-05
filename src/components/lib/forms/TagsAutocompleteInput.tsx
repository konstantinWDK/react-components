'use client';

import { useEffect, useRef } from 'react';
import './TagsAutocompleteInput.css';

/**
 * TagsAutocompleteInput — Tag entry field with pill badges, keyboard deletion, and suggestion dropdown.
 * 
 * @param {string} id - HTML ID for the tag input.
 * @param {string} label - Input label. Default is 'Tags'.
 * @param {string[]} initialTags - Pre-populated list of tags. Default is ['Astro', 'TypeScript'].
 * @param {string[]} suggestions - Autocomplete candidate options.
 * @param {string} placeholder - Input placeholder. Default is 'Add tag & press Enter...'.
 */
export interface TagsAutocompleteInputProps {
  id: string;
  label?: string;
  initialTags?: string[];
  suggestions?: string[];
  placeholder?: string;
}

export function TagsAutocompleteInput({
  id = 'tags-autocomplete',
  label = 'Tags',
  initialTags = ['Astro', 'TypeScript'],
  suggestions = ['React', 'Tailwind', 'Three.js', 'SSR', 'Vite', 'GraphQL'],
  placeholder = 'Add tag & press Enter...',
}: TagsAutocompleteInputProps) {

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    function setupTagsFields() {
        document.querySelectorAll('[data-tags-root]').forEach((root) => {
          const input = root.querySelector('[data-tags-input]') as HTMLInputElement;
          const list = root.querySelector('[data-tags-list]') as HTMLElement;
          const suggestions = root.querySelector('[data-tags-suggestions]') as HTMLElement;
          if (!input || !list) return;
    
          function addTag(text: string) {
            const clean = text.trim();
            if (!clean) return;
    
            // Check duplicate
            const exists = Array.from(list.querySelectorAll('.tag-pill__name')).some(
              (el) => el.textContent?.toLowerCase() === clean.toLowerCase()
            );
            if (exists) return;
    
            const pill = document.createElement('span');
            pill.className = 'tag-pill';
            pill.setAttribute('data-tag', clean);
            pill.innerHTML = `
              <span class="tag-pill__name">${clean}</span>
              <button type="button" class="tag-pill__remove" aria-label="Remove tag ${clean}" data-tag-remove>×</button>
            `;
            list.appendChild(pill);
            input.value = '';
          }
    
          list.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.matches('[data-tag-remove]')) {
              const pill = target.closest('.tag-pill');
              if (pill) pill.remove();
            }
          });
    
          input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              addTag(input.value);
            } else if (e.key === 'Backspace' && !input.value) {
              const last = list.querySelector('.tag-pill:last-child');
              if (last) last.remove();
            }
          });
    
          input.addEventListener('focus', () => {
            if (suggestions) suggestions.hidden = false;
          });
    
          if (suggestions) {
            suggestions.addEventListener('click', (e) => {
              const btn = (e.target as HTMLElement).closest('[data-sug-val]') as HTMLElement;
              if (btn) {
                const val = btn.getAttribute('data-sug-val');
                if (val) addTag(val);
              }
            });
          }
        });
      }
    
      setupTagsFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="tags-field" data-tags-root data-rk-ba8ccd="">
        <label htmlFor={id} className="tags-field__label" data-rk-ba8ccd="">{label}</label>
      
        <div className="tags-field__box" data-tags-box data-rk-ba8ccd="">
          <div className="tags-field__list" data-tags-list data-rk-ba8ccd="">
            {initialTags.map((tag, __i: number) => (
              <span key={__i} className="tag-pill" data-tag={tag} data-rk-ba8ccd="">
                <span className="tag-pill__name" data-rk-ba8ccd="">{tag}</span>
                <button type="button" className="tag-pill__remove" aria-label={`Remove tag ${tag}`} data-tag-remove data-rk-ba8ccd="">×</button>
              </span>
            ))}
          </div>
      
          <input type="text" id={id} placeholder={placeholder} className="tags-field__input" data-tags-input autoComplete="off" data-rk-ba8ccd="" />
        </div>
      
        <div className="tags-field__suggestions" data-tags-suggestions hidden data-rk-ba8ccd="">
          {suggestions.map((sug, __i: number) => (
            <button key={__i} type="button" className="sug-item" data-sug-val={sug} data-rk-ba8ccd="">
              + {sug}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default TagsAutocompleteInput;
