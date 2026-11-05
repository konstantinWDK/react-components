'use client';

import { useEffect, useRef } from 'react';
import './HackerDecodeText.css';

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
 * HackerDecodeText — Cyberpunk Matrix-style randomized character deciphering effect on hover.
 * 
 * @param {string} text - Final decoded text string. Default is 'CYBERNETIC SYSTEM READY'.
 * @param {string} tag - HTML heading or paragraph tag. Default is 'h3'.
 * @param {string} className - Optional CSS class names.
 */
export interface HackerDecodeTextProps {
  text?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
}

export function HackerDecodeText({
  text = 'CYBERNETIC PROTOCOL ONLINE',
  tag: Tag = 'h3',
  className = '',
}: HackerDecodeTextProps) {

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    
      function setupHackerText() {
        document.querySelectorAll('[data-hacker-text]').forEach((el) => {
          if (el.getAttribute('data-hacker-init')) return;
          el.setAttribute('data-hacker-init', 'true');
    
          const original = el.getAttribute('data-hacker-text') || el.textContent || '';
          let interval: any = null;
    
          el.addEventListener('pointerenter', () => {
            let iteration = 0;
            clearInterval(interval);
    
            interval = setInterval(() => {
              el.textContent = original
                .split('')
                .map((char, index) => {
                  if (char === ' ') return ' ';
                  if (index < iteration) {
                    return original[index];
                  }
                  return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
    
              if (iteration >= original.length) {
                clearInterval(interval);
              }
              iteration += 1 / 2;
            }, 30);
          });
        });
      }
    
      setupHackerText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Tag className={cx(['hacker-text', className])} data-hacker-text={text} title="Hover to decode" data-rk-415ed5="">
        {text}
      </Tag>
    </>
  );
}

export default HackerDecodeText;
