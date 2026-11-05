'use client';

import './SearchOverlayFullscreen.css';

/** SearchOverlayFullscreen */
export interface SearchOverlayFullscreenProps {
}

export function SearchOverlayFullscreen({}: SearchOverlayFullscreenProps) {
  return (
    <>
      <div className="search-hero" data-rk-a5f9ea="">
        <div className="close" data-rk-a5f9ea="">Esc</div>
        <input type="text" placeholder="Start searching..." autoFocus data-rk-a5f9ea="" />
        <div className="hints" data-rk-a5f9ea="">Search for <span data-rk-a5f9ea="">components</span>, <span data-rk-a5f9ea="">guides</span>, or <span data-rk-a5f9ea="">authors</span></div>
      </div>
    </>
  );
}

export default SearchOverlayFullscreen;
