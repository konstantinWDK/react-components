'use client';

import './TestimonialGridSection.css';

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
 * TestimonialGridSection — Bento grid showcase of verified customer reviews with dark glass styling and star ratings.
 * 
 * @param {string} eyebrow - Small uppercase category lead. Default is 'WALL OF LOVE'.
 * @param {string} title - Section main headline. Default is 'Trusted by innovative engineering teams'.
 * @param {string} subtitle - Subtitle description.
 */
export interface TestimonialGridSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function TestimonialGridSection({
  eyebrow = 'WALL OF LOVE',
  title = 'Trusted by thousands of React builders',
  subtitle = 'Discover why developers, indie hackers, and creative agencies rely on React Components Kit for production websites.',
}: TestimonialGridSectionProps) {
  const testimonials = [
    {
      name: 'Elena Rostova',
      role: 'Principal Architect @ Veloce Labs',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      quote: 'The pure zero-JS philosophy with React 5 is game-changing. Our Core Web Vitals score hit 100 on every audited route without tweaking hydration.',
      stars: 5,
      highlight: true,
    },
    {
      name: 'Marcus Vance',
      role: 'Founder @ HyperSync',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      quote: 'Copying and pasting self-contained React components directly shaved two full sprints off our SaaS launch timeline.',
      stars: 5,
    },
    {
      name: 'Sofia Chen',
      role: 'Senior UI/UX Designer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      quote: 'The glassmorphic dark palette with gold accents feels extraordinarily premium right out of the box. Highly recommended.',
      stars: 5,
    },
  ];
  return (
    <>
      <section className="testi-section" data-rk-6335bb="">
        <div className="testi-section__header" data-rk-6335bb="">
          <span className="testi-section__eyebrow" data-rk-6335bb="">{eyebrow}</span>
          <h2 className="testi-section__title" data-rk-6335bb="">{title}</h2>
          <p className="testi-section__subtitle" data-rk-6335bb="">{subtitle}</p>
        </div>
      
        <div className="testi-section__grid" data-rk-6335bb="">
          {testimonials.map((t, __i: number) => (
            <article key={__i} className={cx(['testi-card', { 'testi-card--highlight': t.highlight }])} data-rk-6335bb="">
              <div className="testi-card__stars" aria-label={`${t.stars} out of 5 stars`} data-rk-6335bb="">
                {Array.from({ length: t.stars }).map((_, __i: number) => (
                  <span key={__i} data-rk-6335bb="">★</span>
                ))}
              </div>
              <blockquote className="testi-card__quote" data-rk-6335bb="">
                "{t.quote}"
              </blockquote>
              <div className="testi-card__author" data-rk-6335bb="">
                <img src={t.avatar} alt={t.name} className="testi-card__avatar" loading="lazy" data-rk-6335bb="" />
                <div className="testi-card__meta" data-rk-6335bb="">
                  <h5 className="testi-card__name" data-rk-6335bb="">{t.name}</h5>
                  <span className="testi-card__role" data-rk-6335bb="">{t.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default TestimonialGridSection;
