'use client';

import { useEffect, useRef } from 'react';
import './FloatingFeedbackWidget.css';

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
 * FloatingFeedbackWidget — Fixed corner floating pill that expands into an interactive feedback survey card.
 * 
 * @param {string} title - Widget title. Default is 'Was this helpful?'.
 * @param {string} position - Screen anchor ('bottom-right' | 'bottom-left'). Default is 'bottom-right'.
 */
export interface FloatingFeedbackWidgetProps {
  title?: string;
  position?: 'bottom-right' | 'bottom-left';
}

export function FloatingFeedbackWidget({
  title = 'Send Feedback',
  position = 'bottom-right',
}: FloatingFeedbackWidgetProps) {

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    function setupFeedbackWidgets() {
        document.querySelectorAll('[data-feedback-widget]').forEach((widget) => {
          const trigger = widget.querySelector('[data-fb-trigger]');
          const card = widget.querySelector('[data-fb-card]') as HTMLElement;
          const close = widget.querySelector('[data-fb-close]');
          const send = widget.querySelector('[data-fb-send]');
          if (!trigger || !card) return;
    
          trigger.addEventListener('click', () => {
            card.hidden = !card.hidden;
          });
    
          close?.addEventListener('click', () => {
            card.hidden = true;
          });
    
          send?.addEventListener('click', () => {
            card.innerHTML = `<p style="text-align:center;font-size:0.85rem;color:#10b981;font-weight:700;margin:1rem 0;">✓ Thank you for your feedback!</p>`;
            setTimeout(() => { card.hidden = true; }, 2000);
          });
        });
      }
    
      setupFeedbackWidgets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={cx(['fb-widget', `fb-widget--${position}`])} data-feedback-widget data-rk-2e965a="">
        <button type="button" className="fb-widget__trigger" aria-label="Open feedback modal" data-fb-trigger data-rk-2e965a="">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-2e965a="">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" data-rk-2e965a="" />
          </svg>
          <span data-rk-2e965a="">Feedback</span>
        </button>
      
        <div className="fb-widget__card" data-fb-card hidden data-rk-2e965a="">
          <div className="fb-widget__head" data-rk-2e965a="">
            <h5 className="fb-widget__title" data-rk-2e965a="">{title}</h5>
            <button type="button" className="fb-widget__close" aria-label="Close" data-fb-close data-rk-2e965a="">×</button>
          </div>
      
          <div className="fb-widget__emojis" data-rk-2e965a="">
            <button type="button" className="emoji-btn" aria-label="Sad" data-rk-2e965a="">🙁</button>
            <button type="button" className="emoji-btn" aria-label="Neutral" data-rk-2e965a="">😐</button>
            <button type="button" className="emoji-btn emoji-btn--selected" aria-label="Happy" data-rk-2e965a="">😊</button>
            <button type="button" className="emoji-btn" aria-label="Love it" data-rk-2e965a="">🤩</button>
          </div>
      
          <textarea placeholder="Any details to share? (optional)" className="fb-widget__textarea" rows={2} data-rk-2e965a=""></textarea>
      
          <button type="button" className="fb-widget__send" data-fb-send data-rk-2e965a="">
            Send Feedback
          </button>
        </div>
      </div>
    </>
  );
}

export default FloatingFeedbackWidget;
