'use client';

import './LogoCloudSection.css';

/**
 * LogoCloudSection — High-trust partner and client brand wall with monochrome glass badges.
 * 
 * @param {string} title - Section headline. Default is 'TRUSTED BY MODERN TECH STACKS'.
 * @param {Array<{name: string, symbol: string}>} logos - Partner entries list.
 */
export interface LogoCloudSectionProps {
  title?: string;
  logos?: Array<{ name: string; symbol: string }>;
}

export function LogoCloudSection({
  title = 'POWERING FORWARD-THINKING WEB PROJECTS',
  logos = [
    { name: 'Vercel', symbol: '▲' },
    { name: 'Cloudflare', symbol: '☁' },
    { name: 'Supabase', symbol: '⚡' },
    { name: 'TailwindCSS', symbol: '≋' },
    { name: 'Netlify', symbol: '◈' },
    { name: 'Docker', symbol: '⚓' },
  ],
}: LogoCloudSectionProps) {
  return (
    <>
      <section className="logo-cloud" data-rk-b88031="">
        <div className="logo-cloud__inner" data-rk-b88031="">
          <p className="logo-cloud__title" data-rk-b88031="">{title}</p>
          <div className="logo-cloud__grid" data-rk-b88031="">
            {logos.map((logo, __i: number) => (
              <div key={__i} className="logo-badge" data-rk-b88031="">
                <span className="logo-badge__symbol" data-rk-b88031="">{logo.symbol}</span>
                <span className="logo-badge__name" data-rk-b88031="">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default LogoCloudSection;
