'use client';

import { useEffect, useRef, useId } from 'react';
import type { CSSProperties } from 'react';
import './TestimonialCarousel.css';

/** "a: b; --c: d" → style object */
function st(css: string | undefined): CSSProperties {
  const o: Record<string, string> = {};
  for (const decl of String(css ?? '').split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const k = decl.slice(0, i).trim();
    if (k) o[k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = decl.slice(i + 1).trim();
  }
  return o as CSSProperties;
}

interface Item { quote: string; name: string; role: string; rating?: number }

/**
 * TestimonialCarousel — Scroll-snap testimonial carousel with previous/next
 * buttons, keyboard support and no autoplay (respects user control).
 *
 * @param {string} title - Section heading.
 * @param {Array<{quote: string, name: string, role: string, rating?: number}>} items - Testimonials.
 * @param {string} variant - Card style (glass|solid|quote).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface TestimonialCarouselProps {
  title?: string;
  items?: Item[];
  variant?: 'glass' | 'solid' | 'quote';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function TestimonialCarousel({
  title = 'Loved by builders worldwide',
  items = [
    { quote: 'We rebuilt our marketing site in two days. The sections are gorgeous and Lighthouse went straight to 100.', name: 'Alicia Gómez', role: 'Head of Growth, Northwind', rating: 5 },
    { quote: 'The SVG charts replaced a 200 kB library in our dashboard. Same features, zero runtime.', name: 'Marcus Lee', role: 'Staff Engineer, Lumen', rating: 5 },
    { quote: 'Finally a component kit that takes accessibility seriously. Our audit came back clean.', name: 'Priya Natarajan', role: 'Accessibility Lead, Civic', rating: 5 },
    { quote: 'Copy, paste, tweak tokens, done. It feels like a design system we built ourselves.', name: 'Tom Becker', role: 'Founder, Driftly', rating: 4 },
    { quote: 'Our agency ships every client landing page on top of this kit now.', name: 'Sofía Ruiz', role: 'Creative Director, Studio Alba', rating: 5 },
  ],
  variant = 'glass',
  size = 'md',
  className = '',
}: TestimonialCarouselProps) {
  const id = `tc-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const initials = (n: string) => n.split(' ').map((p) => p[0]).slice(0, 2).join('');
  const hues = ['var(--chart-1, #3987e5)', 'var(--chart-2, #d95926)', 'var(--chart-3, #199e70)', 'var(--chart-5, #d55181)', 'var(--chart-7, #9085e9)'];

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-tc]').forEach((root) => {
        const track = root.querySelector<HTMLElement>('.tc__track');
        const btns = root.querySelectorAll<HTMLButtonElement>('.tc__btn');
        if (!track) return;
        const update = () => {
          const max = track.scrollWidth - track.clientWidth - 2;
          btns[0].disabled = track.scrollLeft <= 2;
          btns[1].disabled = track.scrollLeft >= max;
        };
        const step = () => (track.querySelector<HTMLElement>('.tc__slide')?.offsetWidth ?? 300) + 20;
        btns.forEach((b) => b.addEventListener('click', () => {
          const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          track.scrollBy({ left: Number(b.dataset.dir) * step(), behavior: reduce ? 'auto' : 'smooth' });
        }));
        track.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        update();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="cq-testimonial-carousel-cq" data-rk-a626d8="">
      <section className={`tc tc--${variant} tc--${size} ${className}`} aria-labelledby={id} aria-roledescription="carousel" data-tc data-rk-a626d8="">
        <div className="tc__inner" data-rk-a626d8="">
          <header className="tc__head" data-rk-a626d8="">
            <h2 id={id} className="tc__title" data-rk-a626d8="">{title}</h2>
            <div className="tc__controls" data-rk-a626d8="">
              <button type="button" className="tc__btn" data-dir="-1" aria-label="Previous testimonials" data-rk-a626d8="">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-a626d8=""><path d="M15 18l-6-6 6-6" data-rk-a626d8="" /></svg>
              </button>
              <button type="button" className="tc__btn" data-dir="1" aria-label="Next testimonials" data-rk-a626d8="">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-a626d8=""><path d="M9 18l6-6-6-6" data-rk-a626d8="" /></svg>
              </button>
            </div>
          </header>
      
          <ul className="tc__track" tabIndex={0} aria-label="Testimonials, scroll horizontally" data-rk-a626d8="">
            {items.map((t, i) => (
              <li key={i} className="tc__slide" aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`} data-rk-a626d8="">
                <figure className="tc__card" data-rk-a626d8="">
                  {t.rating && (
                    <div className="tc__stars" role="img" aria-label={`${t.rating} out of 5 stars`} data-rk-a626d8="">
                      {Array.from({ length: 5 }, (_, s) => (
                        <svg key={s} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className={(t.rating ?? 0) > s ? 'is-on' : ''} data-rk-a626d8=""><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" fill="currentColor" data-rk-a626d8="" /></svg>
                      ))}
                    </div>
                  )}
                  <blockquote className="tc__quote" data-rk-a626d8=""><p data-rk-a626d8="">“{t.quote}”</p></blockquote>
                  <figcaption className="tc__author" data-rk-a626d8="">
                    <span className="tc__avatar" style={st(`background:${hues[i % hues.length]}`)} aria-hidden="true" data-rk-a626d8="">{initials(t.name)}</span>
                    <span data-rk-a626d8=""><strong data-rk-a626d8="">{t.name}</strong><span className="tc__role" data-rk-a626d8="">{t.role}</span></span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </div>
    </>
  );
}

export default TestimonialCarousel;
