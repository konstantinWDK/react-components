'use client';

import type { CSSProperties, ReactNode } from 'react';
import './ProfileCard.css';

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
 * ProfileCard — Image-centric profile card with social links and blur effect.
 * 
 * @param {string} name - The person's full name.
 * @param {string} role - Their job title or role.
 * @param {string} avatarUrl - Optional URL string pointing to their avatar image.
 */
export interface ProfileCardProps {
  name: string;
  role: string;
  avatarUrl?: string;
  socials?: ReactNode;
}

export function ProfileCard({ name, role, avatarUrl,
  socials
}: ProfileCardProps) {
  return (
    <>
      <div className="profile-card" data-rk-97abf6="">
        <div className="profile-card__banner" data-rk-97abf6=""></div>
        <div className="profile-card__avatar" style={st(avatarUrl ? `background-image: url('${avatarUrl}'); background-size: cover;` : '')} data-rk-97abf6=""></div>
        <h3 className="profile-card__name" data-rk-97abf6="">{name}</h3>
        <p className="profile-card__role" data-rk-97abf6="">{role}</p>
        <div className="profile-card__socials" data-rk-97abf6="">
          {socials ?? (<>
            {/* Fallback generic icons if no socials slot passed */}
            <span aria-hidden="true" data-rk-97abf6="">🐦</span>
            <span aria-hidden="true" data-rk-97abf6="">💼</span>
            <span aria-hidden="true" data-rk-97abf6="">🌐</span>
          </>)}
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
