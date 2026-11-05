'use client';

import type { CSSProperties } from 'react';
import './GithubRepoCard.css';

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
 * GithubRepoCard — Dark glass card highlighting repository statistics, language dot, license, and stars.
 * 
 * @param {string} repoName - Repository name (e.g. 'react-components').
 * @param {string} owner - Repo owner or organization (e.g. 'konstantinWDK').
 * @param {string} description - Brief summary of the repo.
 * @param {string} language - Primary programming language. Default is 'TypeScript'.
 * @param {string} languageColor - Hex color for the language dot. Default is '#3178c6'.
 * @param {number} stars - Star count figure. Default is 248.
 * @param {number} forks - Fork count figure. Default is 32.
 * @param {string} href - Link to the GitHub repository.
 */
export interface GithubRepoCardProps {
  repoName: string;
  owner?: string;
  description?: string;
  language?: string;
  languageColor?: string;
  stars?: number;
  forks?: number;
  href?: string;
}

export function GithubRepoCard({
  repoName = 'react-components',
  owner = 'konstantinWDK',
  description = 'Premium open-source UI component library for React with glassmorphism and accessibility.',
  language = 'TypeScript',
  languageColor = '#3178c6',
  stars = 248,
  forks = 32,
  href = '#',
}: GithubRepoCardProps) {
  return (
    <>
      <a href={href} target="_blank" rel="noopener noreferrer" className="gh-repo-card" data-rk-02caec="">
        <div className="gh-repo-card__head" data-rk-02caec="">
          <svg className="gh-repo-card__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-02caec="">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" data-rk-02caec="" />
            <path d="M6 6h10" data-rk-02caec="" />
            <path d="M6 10h10" data-rk-02caec="" />
          </svg>
          <div className="gh-repo-card__title-wrap" data-rk-02caec="">
            <span className="owner" data-rk-02caec="">{owner}/</span>
            <h4 className="name" data-rk-02caec="">{repoName}</h4>
          </div>
          <span className="gh-repo-card__badge" data-rk-02caec="">Public</span>
        </div>
      
        <p className="gh-repo-card__desc" data-rk-02caec="">{description}</p>
      
        <div className="gh-repo-card__meta" data-rk-02caec="">
          <div className="gh-repo-card__lang" data-rk-02caec="">
            <span className="lang-dot" style={st(`background-color: ${languageColor};`)} data-rk-02caec=""></span>
            <span data-rk-02caec="">{language}</span>
          </div>
      
          <div className="gh-repo-card__stat" data-rk-02caec="">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" data-rk-02caec="">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" data-rk-02caec="" />
            </svg>
            <span data-rk-02caec="">{stars.toLocaleString()}</span>
          </div>
      
          <div className="gh-repo-card__stat" data-rk-02caec="">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-rk-02caec="">
              <line x1="6" y1="3" x2="6" y2="15" data-rk-02caec="" />
              <circle cx="18" cy="6" r="3" data-rk-02caec="" />
              <circle cx="6" cy="18" r="3" data-rk-02caec="" />
              <path d="M18 9a9 9 0 0 1-9 9" data-rk-02caec="" />
            </svg>
            <span data-rk-02caec="">{forks.toLocaleString()}</span>
          </div>
        </div>
      </a>
    </>
  );
}

export default GithubRepoCard;
