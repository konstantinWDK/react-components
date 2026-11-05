'use client';

import './GlassTextarea.css';

/**
 * GlassTextarea — A multiline text input with glassmorphism surface styling.
 * 
 * @param {string} label - Input grouping label title.
 * @param {string} id - The ID mapping the label to the textbox.
 * @param {number} rows - Starting HTML rows count height. Default is 4.
 * @param {string} placeholder - Displayed placeholder within the box when empty.
 * @param {string} name - Form data extraction name binding.
 * @param {boolean} required - HTML required indicator.
 */
export interface GlassTextareaProps { 
  label: string; 
  id: string; 
  rows?: number;
  placeholder?: string;
  name?: string;
  required?: boolean;
}

export function GlassTextarea({ label, id, rows = 4, placeholder = "Start typing...", name, required = false }: GlassTextareaProps) {
  return (
    <>
      <div className="glass-textarea-wrap" data-rk-3bd942="">
        <label htmlFor={id} className="glass-label" data-rk-3bd942="">{label}</label>
        <textarea id={id} name={name} rows={rows} placeholder={placeholder} required={required} className="glass-textarea" data-rk-3bd942=""></textarea>
      </div>
    </>
  );
}

export default GlassTextarea;
