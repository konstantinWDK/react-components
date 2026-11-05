'use client';

import type { ReactNode } from 'react';
import LogoWithGalaxy from '../LogoWithGalaxy';
import './GlassNavbar.css';

/** GlassNavbar — ported from astro-component-kit. */
export interface GlassNavbarProps {
  /** Accepted for compatibility with the Astro demo (the logo is rendered instead). */
  brand?: string;
  brandHref?: string;
  links?: ReactNode;
  actions?: ReactNode;
}

export function GlassNavbar({ brandHref = '/',
  links,
  actions
}: GlassNavbarProps) {
  return (
    <>
      <header className="glass-nav" data-rk-947bdc="">
        <div className="glass-nav__inner" data-rk-947bdc="">
          <a href={brandHref} className="glass-nav__brand" data-rk-947bdc="">
            <LogoWithGalaxy size="small" />
          </a>
          <nav className="glass-nav__links" data-rk-947bdc="">{links}</nav>
          <div className="glass-nav__actions" data-rk-947bdc="">{actions}</div>
        </div>
      </header>
    </>
  );
}

export default GlassNavbar;
