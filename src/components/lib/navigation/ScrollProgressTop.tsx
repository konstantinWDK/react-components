'use client';

import { useEffect, useRef } from 'react';
import './ScrollProgressTop.css';

/** ScrollProgressTop — ported from astro-component-kit. */
export interface ScrollProgressTopProps {
}

export function ScrollProgressTop({}: ScrollProgressTopProps) {

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    window.addEventListener('scroll', () => {
        const bar = document.getElementById('scroll-bar');
        const scroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scroll / height) * 100;
        if (bar) bar.style.width = scrolled + '%';
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="scroll-ind" id="scroll-bar" data-rk-75c240=""></div>
    </>
  );
}

export default ScrollProgressTop;
