'use client';

import './AnchorSideNav.css';

/** AnchorSideNav — ported from astro-component-kit. */
export interface AnchorSideNavProps {
}

export function AnchorSideNav({}: AnchorSideNavProps) {
  return (
    <>
      <ul className="anchor-nav" data-rk-f60bfc="">
        <li data-rk-f60bfc=""><a href="#intro" className="active" data-rk-f60bfc="">Introduction</a></li>
        <li data-rk-f60bfc=""><a href="#features" data-rk-f60bfc="">Features</a></li>
        <li data-rk-f60bfc=""><a href="#pricing" data-rk-f60bfc="">Pricing</a></li>
        <li data-rk-f60bfc=""><a href="#faq" data-rk-f60bfc="">FAQ</a></li>
      </ul>
    </>
  );
}

export default AnchorSideNav;
