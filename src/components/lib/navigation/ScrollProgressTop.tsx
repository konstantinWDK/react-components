'use client';

import { useEffect, useRef } from 'react';
import './ScrollProgressTop.css';

/** ScrollProgressTop */
export interface ScrollProgressTopProps {
}

export function ScrollProgressTop({}: ScrollProgressTopProps) {

  // Client-side behaviour: runs once after mount.
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
