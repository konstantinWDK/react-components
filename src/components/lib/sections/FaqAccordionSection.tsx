'use client';

import { useEffect, useRef } from 'react';
import './FaqAccordionSection.css';

/**
 * FaqAccordionSection — Full-page interactive FAQ section with category tabs, search filter, and accessible accordions.
 * 
 * @param {string} badge - Eyebrow badge.
 * @param {string} title - Section main heading.
 * @param {string} subtitle - Supporting description text.
 */
export interface FaqAccordionSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function FaqAccordionSection({
  badge = "Frequently Asked Questions",
  title = "Got Questions? We Have Answers",
  subtitle = "Everything you need to know about the Astro Components Kit, licensing, updates, and custom integrations.",
  className = ""
}: FaqAccordionSectionProps) {
  const faqs = [
    {
      category: "general",
      q: "Is this library compatible with React 5.x?",
      a: "Yes! All components are built specifically for React 5.x and leverage Astro Content Collections, scoped styles, and zero-runtime architecture."
    },
    {
      category: "general",
      q: "Do I need Tailwind CSS to use these components?",
      a: "No. All components use pure Vanilla CSS with scoped design tokens defined in global.css. You do not need Tailwind or any heavy utility framework."
    },
    {
      category: "licensing",
      q: "Can I use these components in commercial client projects?",
      a: "Absolutely! The component kit is licensed under the permissive MIT license, allowing unlimited commercial and personal project usage with zero royalties."
    },
    {
      category: "performance",
      q: "How does this achieve 100/100 Lighthouse performance?",
      a: "By shipping zero client-side JavaScript by default. Interactive controls use pure CSS or lightweight unobtrusive native DOM events only where strictly necessary."
    },
    {
      category: "support",
      q: "How do I get help or report a bug?",
      a: "You can open an issue on our GitHub repository or join our Discord developer community where maintainers and contributors are active daily."
    },
    {
      category: "licensing",
      q: "How do I install the package in my project?",
      a: "Simply run `npm install astro-component-kit` and import any component: `import { GlassCard } from 'astro-component-kit';`."
    }
  ];

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    // Interactive category filter for FAQs
      const tabs = document.querySelectorAll('.faq-tab');
      const items = document.querySelectorAll<HTMLElement>('.faq-item');
    
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('faq-tab--active'));
          tab.classList.add('faq-tab--active');
    
          const targetCat = tab.getAttribute('data-cat');
          items.forEach(item => {
            const itemCat = item.getAttribute('data-category');
            if (targetCat === 'all' || itemCat === targetCat) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={`faq-section ${className}`} aria-labelledby="faq-title" data-rk-13b0ac="">
        <div className="faq-bg" aria-hidden="true" data-rk-13b0ac="">
          <div className="faq-glow" data-rk-13b0ac=""></div>
        </div>
      
        <div className="container" data-rk-13b0ac="">
          {/* Header */}
          <div className="section-header" data-rk-13b0ac="">
            {badge && <span className="section-badge" data-rk-13b0ac="">{badge}</span>}
            <h2 id="faq-title" className="section-title" data-rk-13b0ac="">{title}</h2>
            <p className="section-subtitle" data-rk-13b0ac="">{subtitle}</p>
      
            {/* Category Filter Pills */}
            <div className="faq-tabs" role="tablist" data-rk-13b0ac="">
              <button className="faq-tab faq-tab--active" data-cat="all" data-rk-13b0ac="">All Questions</button>
              <button className="faq-tab" data-cat="general" data-rk-13b0ac="">General</button>
              <button className="faq-tab" data-cat="licensing" data-rk-13b0ac="">Licensing</button>
              <button className="faq-tab" data-cat="performance" data-rk-13b0ac="">Performance</button>
              <button className="faq-tab" data-cat="support" data-rk-13b0ac="">Support</button>
            </div>
          </div>
      
          {/* FAQ Accordions List */}
          <div className="faq-list" data-rk-13b0ac="">
            {faqs.map((faq, i) => (
              <details key={i} className="faq-item" data-category={faq.category} data-rk-13b0ac="">
                <summary className="faq-question" data-rk-13b0ac="">
                  <span className="faq-question-text" data-rk-13b0ac="">{faq.q}</span>
                  <span className="faq-chevron" aria-hidden="true" data-rk-13b0ac="">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" data-rk-13b0ac=""><path d="m6 9 6 6 6-6" data-rk-13b0ac="" /></svg>
                  </span>
                </summary>
                <div className="faq-answer" data-rk-13b0ac="">
                  <p data-rk-13b0ac="">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
      
          {/* Support Box */}
          <div className="faq-support-box" data-rk-13b0ac="">
            <div className="support-icon" data-rk-13b0ac="">💬</div>
            <div className="support-info" data-rk-13b0ac="">
              <h4 data-rk-13b0ac="">Still have questions?</h4>
              <p data-rk-13b0ac="">Can't find the answer you're looking for? Chat to our friendly team.</p>
            </div>
            <a href="#contact" className="support-btn" data-rk-13b0ac="">Get in Touch</a>
          </div>
        </div>
      </section>
    </>
  );
}

export default FaqAccordionSection;
