'use client';

import type { CSSProperties } from 'react';
import './FeatureTimelineFlow.css';

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
 * FeatureTimelineFlow — Full-page step-by-step product architecture and workflow section with glowing nodes.
 * 
 * @param {string} badge - Eyebrow badge text.
 * @param {string} title - Section main heading.
 * @param {string} subtitle - Description text.
 */
export interface FeatureTimelineFlowProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function FeatureTimelineFlow({
  badge = "Step-by-Step Workflow",
  title = "From Idea to Production in 3 Simple Steps",
  subtitle = "Streamline your frontend engineering lifecycle with an intuitive, pre-tested architecture.",
  className = ""
}: FeatureTimelineFlowProps) {
  const steps = [
    {
      number: "01",
      tag: "Install & Setup",
      title: "One Command Installation",
      desc: "Add astro-component-kit to your React project with npm. Zero complex configuration files or build tool plugins required.",
      code: "npm install astro-component-kit",
      color: "#6366f1"
    },
    {
      number: "02",
      tag: "Compose & Theme",
      title: "Import Modular Components",
      desc: "Import accessible cards, navigation bars, interactive inputs, and 3D scenes directly into your React frontmatter with strict TypeScript typings.",
      code: "import { GlassCard, StatCard } from 'astro-component-kit';",
      color: "#eab308"
    },
    {
      number: "03",
      tag: "Build & Deploy",
      title: "Deploy Anywhere at 100/100 Speed",
      desc: "Generate static pre-rendered HTML with zero runtime JavaScript. Deploy effortlessly to Coolify, Vercel, Cloudflare Pages, or Docker.",
      code: "npm run build && coolify deploy",
      color: "#10b981"
    }
  ];
  return (
    <>
      <div className="cq-feature-timeline-flow-cq" data-rk-1e8845="">
      <section className={`timeline-section ${className}`} aria-labelledby="timeline-title" data-rk-1e8845="">
        <div className="timeline-bg" aria-hidden="true" data-rk-1e8845="">
          <div className="timeline-glow" data-rk-1e8845=""></div>
        </div>
      
        <div className="container" data-rk-1e8845="">
          {/* Header */}
          <div className="section-header" data-rk-1e8845="">
            {badge && <span className="section-badge" data-rk-1e8845="">{badge}</span>}
            <h2 id="timeline-title" className="section-title" data-rk-1e8845="">{title}</h2>
            <p className="section-subtitle" data-rk-1e8845="">{subtitle}</p>
          </div>
      
          {/* Timeline Steps */}
          <div className="steps-flow" data-rk-1e8845="">
            <div className="flow-line" aria-hidden="true" data-rk-1e8845=""></div>
      
            {steps.map((step, __i: number) => (
              <div key={__i} className="step-card" data-rk-1e8845="">
                <div className="step-badge-circle" style={st(`--step-color: ${step.color};`)} data-rk-1e8845="">
                  <span data-rk-1e8845="">{step.number}</span>
                </div>
                <div className="step-card__body" data-rk-1e8845="">
                  <span className="step-tag" style={st(`color: ${step.color};`)} data-rk-1e8845="">{step.tag}</span>
                  <h3 className="step-title" data-rk-1e8845="">{step.title}</h3>
                  <p className="step-desc" data-rk-1e8845="">{step.desc}</p>
                  <div className="step-code" data-rk-1e8845="">
                    <code data-rk-1e8845="">{step.code}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default FeatureTimelineFlow;
