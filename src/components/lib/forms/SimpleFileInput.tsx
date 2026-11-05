'use client';

import './SimpleFileInput.css';

/**
 * SimpleFileInput — A minimalist file upload button that masks the native browser input.
 * 
 * @param {string} label - The text displayed on the button. Default is "Choose File".
 * @param {string} id - HTML ID for the file input.
 * @param {string} name - HTML name binding.
 * @param {string} accept - Allowed file formats.
 */
export interface SimpleFileInputProps {
  label?: string;
  id: string;
  name?: string;
  accept?: string;
}

export function SimpleFileInput({ label = "Choose File", id, name, accept }: SimpleFileInputProps) {
  return (
    <>
      <label className="file-btn" htmlFor={id} data-rk-908bfa="">
        <input type="file" id={id} name={name} accept={accept} className="file-btn__input" data-rk-908bfa="" />
        <span className="file-btn__label" data-rk-908bfa="">{label}</span>
      </label>
    </>
  );
}

export default SimpleFileInput;
