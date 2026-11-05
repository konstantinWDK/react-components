'use client';

import { useEffect, useRef } from 'react';
import ProductRating from '../ecommerce/ProductRating';
import './ShopReviewsEditorial.css';

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

interface Review { quote: string; name: string; place?: string; product?: string; rating?: number }

/**
 * ShopReviewsEditorial — Customer voices as one large serif quote at a time, with product
 * context, star rating, numbered pager and an overall score.
 *
 * @param {string} eyebrow - Small label. Default 'Customer notes'.
 * @param {number} score - Average rating shown on the side. Default 4.9.
 * @param {number} count - Total reviews. Default 1284.
 * @param {Array<{quote: string, name: string, place?: string, product?: string, rating?: number}>} reviews - Quotes.
 * @param {number} interval - Auto-advance in ms (0 = manual only). Default 7000.
 * @param {string} variant - Style (plain|boxed). Default 'plain'.
 * @param {string} className - Extra class.
 *
 * Accessibility: a labelled carousel region; slides are figures with figcaption; auto-advance
 * pauses on hover/focus, is off with reduced motion, and pager buttons use aria-current.
 */
export interface ShopReviewsEditorialProps {
  eyebrow?: string;
  score?: number;
  count?: number;
  reviews?: Review[];
  interval?: number;
  variant?: 'plain' | 'boxed';
  className?: string;
}

export function ShopReviewsEditorial({
  eyebrow = 'Customer notes',
  score = 4.9,
  count = 1284,
  reviews = [
    { quote: 'The overshirt has been washed forty times and it only gets softer. It is the first thing I reach for.', name: 'Inés M.', place: 'Valencia', product: 'Linen Overshirt', rating: 5 },
    { quote: 'Packaging without plastic, a handwritten note, and a mug that feels made for my hands.', name: 'Jonas P.', place: 'Hamburg', product: 'Kiln Mug', rating: 5 },
    { quote: 'They repaired the strap of my tote for free, two years after I bought it. That is rare.', name: 'Amira S.', place: 'Lyon', product: 'Field Tote', rating: 5 },
  ],
  interval = 7000,
  variant = 'plain',
  className = '',
}: ShopReviewsEditorialProps) {

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-reviews]:not([data-bound])').forEach((root) => {
        root.dataset.bound = '';
        const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-slide]'));
        const pages = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-page]'));
        let index = 0;
        let paused = false;
        const go = (i: number) => {
          index = (i + slides.length) % slides.length;
          slides.forEach((s, n) => { s.hidden = n !== index; s.classList.toggle('is-active', n === index); });
          pages.forEach((p, n) => { if (n === index) p.setAttribute('aria-current', 'true'); else p.removeAttribute('aria-current'); });
        };
        pages.forEach((p, i) => p.addEventListener('click', () => go(i)));
        root.addEventListener('mouseenter', () => { paused = true; });
        root.addEventListener('mouseleave', () => { paused = false; });
        root.addEventListener('focusin', () => { paused = true; });
        root.addEventListener('focusout', () => { paused = false; });
        const ms = Number(root.dataset.interval) || 0;
        if (ms > 0 && slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          window.setInterval(() => { if (!paused && !document.hidden) go(index + 1); }, ms);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="sre-cq" data-rk-45af0e="">
      <section className={cx(['sre', `sre--${variant}`, className])} aria-roledescription="carousel" aria-label={eyebrow} data-reviews data-interval={interval} data-rk-45af0e="">
        <div className="sre__side" data-rk-45af0e="">
          <p className="sre__eyebrow" data-rk-45af0e="">{eyebrow}</p>
          <p className="sre__score" data-rk-45af0e="">{score.toFixed(1)}<span data-rk-45af0e="">/5</span></p>
          <ProductRating value={score} count={count} showValue={false} size="md" />
        </div>
        <div className="sre__main" data-rk-45af0e="">
          <div className="sre__slides" data-rk-45af0e="">
            {reviews.map((r, i) => (
              <figure key={i} className={cx(['sre__slide', { 'is-active': i === 0 }])} hidden={i !== 0} aria-roledescription="slide" aria-label={`${i + 1} of ${reviews.length}`} data-slide data-rk-45af0e="">
                <blockquote className="sre__quote" data-rk-45af0e=""><p data-rk-45af0e="">“{r.quote}”</p></blockquote>
                <figcaption className="sre__by" data-rk-45af0e="">
                  <strong data-rk-45af0e="">{r.name}</strong>{r.place && <span data-rk-45af0e="">, {r.place}</span>}
                  {r.product && <span className="sre__product" data-rk-45af0e="">on {r.product}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
          {reviews.length > 1 && (
            <div className="sre__pager" role="group" aria-label="Choose a review" data-rk-45af0e="">
              {reviews.map((_, i) => (
                <button key={i} type="button" className="sre__page" aria-label={`Review ${i + 1}`} aria-current={i === 0 ? 'true' : undefined} data-page={i} data-rk-45af0e="">{String(i + 1).padStart(2, '0')}</button>
              ))}
            </div>
          )}
        </div>
      </section>
      </div>
    </>
  );
}

export default ShopReviewsEditorial;
