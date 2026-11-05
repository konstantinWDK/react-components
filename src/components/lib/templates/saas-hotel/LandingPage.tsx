'use client';

import { useEffect, useRef } from 'react';
import '../../../../styles/global.css';
import './lobby-theme.css';
import HeroDashboardPreview from '../../sections/HeroDashboardPreview';
import LogoWallGrid from '../../sections/LogoWallGrid';
import FeatureIconGrid from '../../sections/FeatureIconGrid';
import HowItWorksSteps from '../../sections/HowItWorksSteps';
import StatsCounterBand from '../../sections/StatsCounterBand';
import PricingToggleCards from '../../sections/PricingToggleCards';
import TestimonialCarousel from '../../sections/TestimonialCarousel';
import FaqTwoColumn from '../../sections/FaqTwoColumn';
import FooterMegaSection from '../../sections/FooterMegaSection';
import { saasRoutes, type SaasRoutes } from './data';
import './LandingPage.css';

/**
 * LandingPage — Marketing site for the hotel SaaS: navbar, dashboard hero, customer logos,
 * features, how it works, stats, pricing with monthly/yearly toggle, testimonials, FAQ and footer.
 * Built entirely from existing library sections, themed with the Lobby tokens.
 *
 * Usage (app/page.tsx, Next.js):
 *   import { LandingPage } from 'react-component-kit-ui/templates/saas-hotel';
 *   <LandingPage />
 *
 * @param {SaasRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'light'.
 * @param {boolean} noindex - Add robots noindex. Default false.
 */
export interface LandingPageProps {
  routes?: SaasRoutes;
  theme?: 'light' | 'dark' | 'auto';
  noindex?: boolean;
}

export function LandingPage({ routes = saasRoutes, theme = 'light', noindex = false }: LandingPageProps) {

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    // <html>/<body> attributes of the React layout
    if (!document.documentElement.hasAttribute("lang")) document.documentElement.setAttribute("lang", String("en"));
    document.documentElement.classList.add(...String("theme-lobby").split(/\s+/).filter(Boolean));
    if (!document.documentElement.hasAttribute("data-theme")) document.documentElement.setAttribute("data-theme", String((theme === 'auto' ? 'light' : theme)));
    document.body.classList.add(...String("lobby lobby--site").split(/\s+/).filter(Boolean));

    const { initial }: Record<string, any> = { initial: theme };
    
          (function () {
            var t = initial;
            try { t = localStorage.getItem('ack-theme') || t; } catch (e) {}
            if (t === 'auto') t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.documentElement.dataset.theme = t;
          })();

    document.querySelector('[data-site-theme]')?.addEventListener('click', () => {
        const root = document.documentElement;
        const next = root.dataset.theme === 'light' ? 'dark' : 'light';
        root.dataset.theme = next;
        try { window.localStorage.setItem('ack-theme', next); } catch { /* ignore */ }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <>
        <>
          
          
          <title data-rk-757ecd="">Lobby — the operating system for independent hotels</title>
          <meta name="description" content="Reservations, housekeeping, guest CRM and revenue reports in one calm workspace. Built for independent hotels." data-rk-757ecd="" />
          {noindex && <meta name="robots" content="noindex, follow" data-rk-757ecd="" />}
          
        </>
        <>
          <a className="lobby__skip" href="#main" data-rk-757ecd="">Skip to content</a>
          <header className="site-nav" data-rk-757ecd="">
            <div className="site-nav__inner" data-rk-757ecd="">
              <a className="site-nav__brand" href={routes.landing} data-rk-757ecd=""><span aria-hidden="true" data-rk-757ecd="">L</span>Lobby</a>
              <nav aria-label="Main" data-rk-757ecd="">
                <ul data-rk-757ecd="">
                  <li data-rk-757ecd=""><a href="#features" data-rk-757ecd="">Product</a></li>
                  <li data-rk-757ecd=""><a href="#how" data-rk-757ecd="">How it works</a></li>
                  <li data-rk-757ecd=""><a href="#pricing" data-rk-757ecd="">Pricing</a></li>
                  <li data-rk-757ecd=""><a href="#faq" data-rk-757ecd="">FAQ</a></li>
                </ul>
              </nav>
              <div className="site-nav__cta" data-rk-757ecd="">
                <button type="button" className="site-nav__theme" aria-label="Switch theme" data-site-theme data-rk-757ecd="">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" data-rk-757ecd=""><circle cx="12" cy="12" r="8" data-rk-757ecd="" /><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" data-rk-757ecd="" /></svg>
                </button>
                <a className="site-nav__link" href={routes.signIn} data-rk-757ecd="">Sign in</a>
                <a className="site-nav__btn" href={routes.dashboard} data-rk-757ecd="">Open demo</a>
              </div>
            </div>
          </header>
      
          <main id="main" tabIndex={-1} data-rk-757ecd="">
            <HeroDashboardPreview badge="New · AI rate suggestions" title="The calm way to run an independent hotel" subtitle="Reservations, housekeeping, guest profiles and revenue reports in one workspace your whole team will actually enjoy using." primary={{ label: 'Start free trial', href: routes.signIn }} secondary={{ label: 'Explore the demo', href: routes.dashboard }} variant="browser" data-rk-757ecd="" />
      
            <LogoWallGrid title="Trusted by 2,400+ independent hotels" columns={6} variant="plain" logos={[{ name: 'Casa Mirador' }, { name: 'Hotel Alba' }, { name: 'The Linden' }, { name: 'Nordlys Inn' }, { name: 'Villa Sole' }, { name: 'Harbour House' }]} />
      
            <div id="features" data-rk-757ecd="">
              <FeatureIconGrid eyebrow="Everything in one place" title="Built for the front desk, loved by the back office" subtitle="Replace spreadsheets, sticky notes and three logins with one fast, accessible workspace." columns={3} features={[
                  { icon: 'layers', title: 'Room rack', text: 'Drag-free tape chart for the next 90 days with live occupancy per night.' },
                  { icon: 'users', title: 'Guest CRM', text: 'Preferences, stays and notes follow every guest — across every channel.' },
                  { icon: 'sparkles', title: 'Housekeeping board', text: 'Clean, dirty, inspecting: rooms update in real time on any device.' },
                  { icon: 'chart', title: 'Revenue reports', text: 'Forecasts, booking pace and channel mix without exporting a single CSV.' },
                  { icon: 'globe', title: 'Channel manager', text: 'Booking.com, Expedia and Airbnb in sync — no more overbookings.' },
                  { icon: 'shield', title: 'Secure by default', text: 'Role-based access, audit log and PCI-compliant payments.' },
                ]} />
            </div>
      
            <div id="how" data-rk-757ecd="">
              <HowItWorksSteps eyebrow="Up and running in a day" title="From signup to first check-in" steps={[
                  { title: 'Import your rooms', text: 'Upload your room list or connect your current PMS — we map types and rates for you.', time: '10 min' },
                  { title: 'Connect your channels', text: 'Link Booking.com, Expedia and your website booking engine in a few clicks.', time: '20 min' },
                  { title: 'Invite your team', text: 'Give front desk, housekeeping and managers exactly the access they need.', time: '5 min' },
                ]} cta={{ label: 'Start your free trial', href: routes.signIn }} />
            </div>
      
            <StatsCounterBand title="What hotels see after three months" stats={[
                { value: 9, prefix: '+', suffix: '%', label: 'occupancy' },
                { value: 38, suffix: '%', label: 'less admin time' },
                { value: 2.4, prefix: '+€', suffix: 'k', decimals: 1, label: 'direct revenue / month' },
                { value: 4.9, suffix: '/5', decimals: 1, label: 'support rating' },
              ]} />
      
            <div id="pricing" data-rk-757ecd="">
              <PricingToggleCards title="Simple pricing, per property" subtitle="All plans include unlimited reservations, guest profiles and support in your language." currency="€" plans={[
                  { name: 'Starter', monthly: 69, yearly: 55, description: 'Up to 15 rooms', features: ['Room rack & reservations', 'Housekeeping board', 'Guest CRM', '2 channels'], cta: 'Start free', href: routes.signIn },
                  { name: 'Pro', monthly: 149, yearly: 119, description: 'Up to 50 rooms', features: ['Everything in Starter', 'Revenue reports', '5 channels', 'Team roles & audit log'], cta: 'Start free trial', href: routes.signIn, featured: true },
                  { name: 'Business', monthly: 299, yearly: 239, description: 'Unlimited rooms', features: ['Everything in Pro', 'Multi-property', 'API & webhooks', 'Dedicated success manager'], cta: 'Talk to sales', href: '#' },
                ]} />
            </div>
      
            <TestimonialCarousel title="Hoteliers on Lobby" items={[
                { quote: 'We replaced three tools with Lobby. Check-in takes half the time and occupancy is up 9% this season.', name: 'Lucía Ortega', role: 'GM, Hotel Mirador', rating: 5 },
                { quote: 'Housekeeping finally knows which rooms to prioritise. No more radio calls.', name: 'Rosa Jiménez', role: 'Head of housekeeping, Casa Alba', rating: 5 },
                { quote: 'The reports alone paid for the subscription in the first month.', name: 'Daniel Kim', role: 'Revenue manager, The Linden', rating: 5 },
              ]} />
      
            <div id="faq" data-rk-757ecd="">
              <FaqTwoColumn title="Questions, answered" subtitle="Can’t find what you need? Our team replies in under 2 hours." support={{ label: 'Contact support', href: '#' }} items={[
                  { q: 'Can I migrate from my current PMS?', a: 'Yes. We import rooms, rates, future reservations and guest profiles from the most common systems at no cost.' },
                  { q: 'Do you charge per booking?', a: 'No commissions, ever. You pay a flat monthly price per property.' },
                  { q: 'Does it work on tablets and phones?', a: 'Every screen is responsive and accessible, so housekeeping can update rooms from any device.' },
                  { q: 'Is my data safe?', a: 'Data is encrypted at rest and in transit, hosted in the EU, with daily backups and role-based access.' },
                ]} />
            </div>
          </main>
      
          <FooterMegaSection brand="Lobby" tagline="The calm operating system for independent hotels." columns={[
              { title: 'Product', links: [{ label: 'Room rack', href: '#features' }, { label: 'Housekeeping', href: '#features' }, { label: 'Reports', href: '#features' }, { label: 'Pricing', href: '#pricing' }] },
              { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Contact', href: '#' }] },
              { title: 'Resources', links: [{ label: 'Help center', href: '#' }, { label: 'API docs', href: '#' }, { label: 'Status', href: '#' }] },
              { title: 'Legal', links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }, { label: 'DPA', href: '#' }] },
            ]} copyright={`© ${new Date().getFullYear()} Lobby. Demo template built with React Components Kit.`} />
        </>
      </>
    </>
  );
}

export default LandingPage;
