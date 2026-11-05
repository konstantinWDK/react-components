'use client';

import type { CSSProperties } from 'react';
import './TeamGridSection.css';

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

/**
 * TeamGridSection — Full-page team & leadership section with glass profile cards, social links, and open positions banner.
 * 
 * @param {string} badge - Eyebrow badge text.
 * @param {string} title - Section main heading.
 * @param {string} subtitle - Description text.
 */
export interface TeamGridSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function TeamGridSection({
  badge = "Our Team",
  title = "Built by Engineers, Designers & Open Source Believers",
  subtitle = "Meet the passionate team behind the Astro Components Kit, crafting tools to elevate modern web interfaces.",
  className = ""
}: TeamGridSectionProps) {
  const members = [
    {
      name: "Alexandre Moreau",
      role: "Lead Architect & Founder",
      bio: "Passionate about zero-runtime systems and developer experience.",
      initials: "AM",
      avatarColor: "linear-gradient(135deg, #6366f1, #a855f7)",
      github: "https://github.com",
      twitter: "https://x.com"
    },
    {
      name: "Elena Rostova",
      role: "Head of Design & UI/UX",
      bio: "Design systems veteran specializing in dark-mode glassmorphism and WCAG compliance.",
      initials: "ER",
      avatarColor: "linear-gradient(135deg, #eab308, #d97706)",
      github: "https://github.com",
      twitter: "https://x.com"
    },
    {
      name: "Liam Chen",
      role: "Senior 3D & Graphics Engineer",
      bio: "Creator of the WebGL and Three.js shader particle background engines.",
      initials: "LC",
      avatarColor: "linear-gradient(135deg, #06b6d4, #3b82f6)",
      github: "https://github.com",
      twitter: "https://x.com"
    },
    {
      name: "Sophia Martinez",
      role: "Core Maintainer & DX Lead",
      bio: "Obsessed with strict TypeScript typings, automated testing, and bundling performance.",
      initials: "SM",
      avatarColor: "linear-gradient(135deg, #10b981, #059669)",
      github: "https://github.com",
      twitter: "https://x.com"
    }
  ];
  return (
    <>
      <div className="cq-team-grid-section-cq" data-rk-e56c49="">
      <section className={`team-section ${className}`} aria-labelledby="team-title" data-rk-e56c49="">
        <div className="team-bg" aria-hidden="true" data-rk-e56c49="">
          <div className="team-glow" data-rk-e56c49=""></div>
        </div>
      
        <div className="container" data-rk-e56c49="">
          {/* Header */}
          <div className="section-header" data-rk-e56c49="">
            {badge && <span className="section-badge" data-rk-e56c49="">{badge}</span>}
            <h2 id="team-title" className="section-title" data-rk-e56c49="">{title}</h2>
            <p className="section-subtitle" data-rk-e56c49="">{subtitle}</p>
          </div>
      
          {/* Team Grid */}
          <div className="team-grid" data-rk-e56c49="">
            {members.map((member, __i: number) => (
              <article key={__i} className="member-card" data-rk-e56c49="">
                <div className="member-avatar" style={st(`background: ${member.avatarColor};`)} data-rk-e56c49="">
                  <span data-rk-e56c49="">{member.initials}</span>
                </div>
                <h3 className="member-name" data-rk-e56c49="">{member.name}</h3>
                <span className="member-role" data-rk-e56c49="">{member.role}</span>
                <p className="member-bio" data-rk-e56c49="">{member.bio}</p>
                <div className="member-socials" data-rk-e56c49="">
                  <a href={member.github} target="_blank" rel="noopener" aria-label={`${member.name} on GitHub`} className="social-icon" data-rk-e56c49="">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-e56c49=""><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" data-rk-e56c49="" /><path d="M9 18c-4.51 2-5-2-7-2" data-rk-e56c49="" /></svg>
                  </a>
                  <a href={member.twitter} target="_blank" rel="noopener" aria-label={`${member.name} on Twitter`} className="social-icon" data-rk-e56c49="">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-e56c49=""><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" data-rk-e56c49="" /></svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
      
          {/* Hiring Banner */}
          <div className="hiring-banner" data-rk-e56c49="">
            <div className="hiring-info" data-rk-e56c49="">
              <span className="hiring-tag" data-rk-e56c49="">WE ARE HIRING</span>
              <h4 data-rk-e56c49="">Want to help shape the future of React components?</h4>
              <p data-rk-e56c49="">We are looking for frontend wizards, designers, and open-source contributors.</p>
            </div>
            <a href="#careers" className="hiring-btn" data-rk-e56c49="">View Open Roles →</a>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default TeamGridSection;
