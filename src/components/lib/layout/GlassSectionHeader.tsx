'use client';

import './GlassSectionHeader.css';

/** class:list → className */
function cx(...args: unknown[]): string {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (!v) return;
    if (typeof v === 'string' || typeof v === 'number') out.push(String(v));
    else if (Array.isArray(v)) v.forEach(walk);
    else if (typeof v === 'object') for (const [k, on] of Object.entries(v as Record<string, unknown>)) if (on) out.push(k);
  };
  args.forEach(walk);
  return out.join(' ');
}

/**
 * GlassSectionHeader — A section header with glassmorphism styling and accent underline.
 *
 * Displays a title with an optional subtitle and a decorative accent line.
 * The accent line uses the primary color from design tokens.
 * Suitable for introducing new sections on landing pages or documentation.
 *
 * @param {string} title - Main heading text. Required.
 * @param {string} subtitle - Supporting description. Optional.
 * @param {'left' | 'center'} align - Text alignment. Default: 'left'.
 * @param {string} className - Additional CSS class to apply.
 *
 * @example
 * ```astro
 * <GlassSectionHeader
 *   title="Why Astro Components Kit"
 *   subtitle="Build faster with premium components"
 *   align="center"
 * />
 * ```
 */
export interface GlassSectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function GlassSectionHeader({ title, subtitle = '', align = 'left', className = '' }: GlassSectionHeaderProps) {
  return (
    <>
      <div className={cx(['glass-section-header', { 'is-centered': align === 'center' }, className])} data-rk-7395fc="">
        <h2 className="glass-section-header__title" data-rk-7395fc="">{title}</h2>
        {subtitle && <p className="glass-section-header__subtitle" data-rk-7395fc="">{subtitle}</p>}
        <div className="glass-section-header__line" aria-hidden="true" data-rk-7395fc=""></div>
      </div>
    </>
  );
}

export default GlassSectionHeader;
