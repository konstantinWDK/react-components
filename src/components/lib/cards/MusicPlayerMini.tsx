'use client';

import type { CSSProperties } from 'react';
import './MusicPlayerMini.css';

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
 * MusicPlayerMini — Compact player widget with controls and progress bar.
 * 
 * @param {string} title - The song track title.
 * @param {string} artist - The artist or band name.
 * @param {string} coverUrl - Optional string matching the album cover image URL.
 * @param {number} progress - The song progress representation (0 to 100). Default is 40.
 */
export interface MusicPlayerMiniProps {
  title: string;
  artist: string;
  coverUrl?: string;
  progress?: number;
}

export function MusicPlayerMini({ title, artist, coverUrl, progress = 40 }: MusicPlayerMiniProps) {
  return (
    <>
      <div className="music-mini" data-rk-ff2e10="">
        <div className="music-mini__art" style={st(coverUrl ? `background-image: url('${coverUrl}'); background-size: cover;` : '')} data-rk-ff2e10=""></div>
        <div className="music-mini__track" data-rk-ff2e10="">
          <h4 className="music-mini__title" data-rk-ff2e10="">{title}</h4>
          <p className="music-mini__artist" data-rk-ff2e10="">{artist}</p>
          <div className="music-mini__progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} data-rk-ff2e10="">
            <div className="music-mini__bar" style={st(`width: ${progress}%;`)} data-rk-ff2e10=""></div>
          </div>
        </div>
        <button className="music-mini__play" type="button" aria-label="Play track" data-rk-ff2e10="">▶</button>
      </div>
    </>
  );
}

export default MusicPlayerMini;
