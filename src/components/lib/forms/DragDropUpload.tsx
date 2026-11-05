'use client';

import { useEffect, useRef } from 'react';
import './DragDropUpload.css';

/**
 * DragDropUpload — A prominent file upload zone with drag-and-drop support and visual feedback.
 * 
 * @param {string} label - Primary instruction text. Default is "Drag files here or browse".
 * @param {string} id - HTML ID for the file input.
 * @param {string} name - HTML name binding.
 * @param {string} accept - Allowed file types (e.g. "image/*").
 * @param {boolean} multiple - Enable multiple file selection.
 */
export interface DragDropUploadProps {
  label?: string;
  id: string;
  name?: string;
  accept?: string;
  multiple?: boolean;
}

export function DragDropUpload({ label = "Drag files here or browse", id, name, accept, multiple = false }: DragDropUploadProps) {

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll('[data-upload-zone]').forEach(zone => {
        const input = zone.querySelector('[data-upload-input]') as HTMLInputElement;
    
        zone.addEventListener('click', () => input.click());
    
        zone.addEventListener('dragover', (e) => {
          e.preventDefault();
          zone.classList.add('upload-zone--dragging');
        });
    
        ['dragleave', 'drop'].forEach(evt => {
          zone.addEventListener(evt, () => zone.classList.remove('upload-zone--dragging'));
        });
    
        zone.addEventListener('drop', (e) => {
          e.preventDefault();
          if ((e as DragEvent).dataTransfer?.files) {
            input.files = (e as DragEvent).dataTransfer!.files;
            // Trigger change
            input.dispatchEvent(new Event('change'));
          }
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="upload-zone" data-upload-zone data-rk-e188c4="">
        <div className="upload-zone__icon" aria-hidden="true" data-rk-e188c4="">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" data-rk-e188c4="">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-rk-e188c4="" />
            <polyline points="17 8 12 3 7 8" data-rk-e188c4="" />
            <line x1="12" y1="3" x2="12" y2="15" data-rk-e188c4="" />
          </svg>
        </div>
        <p className="upload-zone__text" data-rk-e188c4="">
          {label.split('browse').map((part, i) => (
            i === 0 ? <span data-rk-e188c4="">{part} <span className="upload-zone__link" data-rk-e188c4="">browse</span></span> : part
          ))}
        </p>
        <input type="file" id={id} name={name} accept={accept} multiple={multiple} hidden className="upload-zone__input" data-upload-input data-rk-e188c4="" />
      </div>
    </>
  );
}

export default DragDropUpload;
