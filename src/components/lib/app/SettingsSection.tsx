'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import './SettingsSection.css';

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
 * SettingsSection — Settings page block: title and description on the left, fields in a card on
 * the right, with an optional footer holding Save / Cancel and a "saved" confirmation.
 *
 * @param {string} title - Section title. Default 'Profile'.
 * @param {string} description - Help text under the title.
 * @param {boolean} form - Wrap the fields in a <form> with Save/Cancel. Default true.
 * @param {string} saveLabel - Save button label. Default 'Save changes'.
 * @param {string} savedText - Confirmation after saving. Default 'Changes saved'.
 * @param {string} id - Base id. Default 'settings-section'.
 * @param {string} variant - Layout (split|stacked). Default 'split'.
 * @param {string} className - Extra class.
 *
 * Slots: default (fields — SwitchRow, AnimatedInput, ModernSelect…), `footer-start` (extra text).
 *
 * Accessibility: a labelled section; the form validates natively and announces the saved state
 * in a polite live region. Emits `app:settings-save` with the FormData.
 */
export interface SettingsSectionProps {
  title?: string;
  description?: string;
  form?: boolean;
  saveLabel?: string;
  savedText?: string;
  id?: string;
  variant?: 'split' | 'stacked';
  className?: string;
  children?: ReactNode;
  footerStart?: ReactNode;
}

export function SettingsSection({
  title = 'Profile',
  description = 'This information is visible to your team.',
  form = true,
  saveLabel = 'Save changes',
  savedText = 'Changes saved',
  id = 'settings-section',
  variant = 'split',
  className = '',
  children,
  footerStart
}: SettingsSectionProps) {
  const Body = form ? 'form' : 'div';

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLFormElement>('form[data-settings-form]:not([data-bound])').forEach((f) => {
        f.dataset.bound = '';
        const saved = f.querySelector<HTMLElement>('[data-saved]');
        f.addEventListener('submit', (e) => {
          e.preventDefault();
          if (!f.checkValidity()) {
            f.querySelector<HTMLElement>(':invalid')?.focus();
            return;
          }
          if (saved) {
            saved.textContent = `✓ ${saved.dataset.text}`;
            window.setTimeout(() => { saved.textContent = ''; }, 2600);
          }
          f.dispatchEvent(new CustomEvent('app:settings-save', { bubbles: true, detail: new FormData(f) }));
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={cx(['set', `set--${variant}`, className])} aria-labelledby={`${id}-title`} data-rk-d579d6="">
        <div className="set__intro" data-rk-d579d6="">
          <h2 className="set__title" id={`${id}-title`} data-rk-d579d6="">{title}</h2>
          {description && <p className="set__desc" data-rk-d579d6="">{description}</p>}
        </div>
        <Body className="set__card" data-settings-form={form ? '' : undefined} noValidate={form ? true : undefined} data-rk-d579d6="">
          <div className="set__fields" data-rk-d579d6="">{children}</div>
          {form && (
            <div className="set__foot" data-rk-d579d6="">
              {footerStart}
              <p className="set__saved" aria-live="polite" data-saved data-text={savedText} data-rk-d579d6=""></p>
              <button type="reset" className="set__btn" data-rk-d579d6="">Cancel</button>
              <button type="submit" className="set__btn set__btn--primary" data-rk-d579d6="">{saveLabel}</button>
            </div>
          )}
        </Body>
      </section>
    </>
  );
}

export default SettingsSection;
