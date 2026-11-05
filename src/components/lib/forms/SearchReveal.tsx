'use client';

import './SearchReveal.css';

/**
 * SearchReveal — A dynamic minimal search pod that expands smoothly into a full input field on hover or focus.
 * 
 * @param {string} id - Standard HTML ID property.
 * @param {string} placeholder - Default placeholder ("Search...").
 * @param {string} name - Standard HTML name grouping.
 */
export interface SearchRevealProps {
  id: string;
  placeholder?: string;
  name?: string;
}

export function SearchReveal({ id, placeholder = "Search...", name }: SearchRevealProps) {
  return (
    <>
      <div className="search-box" data-rk-85c2fd="">
        <input type="search" id={id} name={name} placeholder={placeholder} className="search-input" aria-label="Search content" data-rk-85c2fd="" />
        <button type="button" aria-label="Submit search" className="search-btn" data-rk-85c2fd="">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-85c2fd="">
            <circle cx="11" cy="11" r="8" data-rk-85c2fd=""></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65" data-rk-85c2fd=""></line>
          </svg>
        </button>
      </div>
    </>
  );
}

export default SearchReveal;
