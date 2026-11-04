'use client';

import { useState, type ComponentType, type ReactNode } from 'react';
import {
  AnimatedIconButton, BorderDrawButton, CyberpunkButton, DoubleBorderButton, GhostOutlineButton, GlassButton,
  GlowButton, LiquidButton, LoadingButton, MagneticButton, MinimalPillButton, NeonBorderButton, NeumorphicButton,
  PulseButton, RetroArcadeButton, RetroShadowButton, RippleButton, ShimmerButton, ShinyButton, SlideRevealButton,
  ThreeDPushButton, TiltGlowButton,
} from '../../src/components/lib/buttons';

/*
 * Same examples as astrocomponents.dev (PreviewRenderer.astro → buttonPreviewExamples).
 * Each entry: [label, props]. Unlisted buttons use Primary / Secondary / Ghost.
 */
type Example = [string, Record<string, unknown>?];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const C: Record<string, ComponentType<any>> = {
  'glass-button': GlassButton, 'glow-button': GlowButton, 'neumorphic-button': NeumorphicButton, 'cyberpunk-button': CyberpunkButton,
  'pulse-button': PulseButton, 'shiny-button': ShinyButton, 'retro-arcade-button': RetroArcadeButton, '3d-push-button': ThreeDPushButton,
  'loading-button': LoadingButton, 'shimmer-button': ShimmerButton, 'magnetic-button': MagneticButton, 'double-border-button': DoubleBorderButton,
  'animated-icon-button': AnimatedIconButton, 'border-draw-button': BorderDrawButton, 'ghost-outline-button': GhostOutlineButton,
  'liquid-button': LiquidButton, 'minimal-pill-button': MinimalPillButton, 'retro-shadow-button': RetroShadowButton,
  'tilt-glow-button': TiltGlowButton, 'ripple-button': RippleButton, 'neon-border-button': NeonBorderButton, 'slide-reveal-button': SlideRevealButton,
};

const EXAMPLES: Record<string, Example[]> = {
  'glass-button': [['Primary'], ['Secondary', { variant: 'secondary' }], ['Ghost', { variant: 'ghost' }], ['Small', { size: 'sm' }], ['Large', { size: 'lg' }], ['Disabled', { disabled: true }]],
  'glow-button': [['Launch'], ['Pink Glow', { color: '#ec4899' }], ['Go Green', { color: '#10b981' }], ['Amber', { color: '#f59e0b' }]],
  'neumorphic-button': [['Soft UI'], ['Canvas', { size: 'sm' }], ['Pressed', { size: 'lg', variant: 'concave' }]],
  'cyberpunk-button': [['Engage'], ['Alert', { primaryColor: '#facc15' }], ['Access', { primaryColor: '#22c55e' }]],
  'pulse-button': [['Buy Now'], ['Notify Me', { variant: 'ghost' }], ['Stand By', { disabled: true }]],
  'shiny-button': [['Upgrade'], ['Compare', { variant: 'secondary' }], ['Preview', { variant: 'ghost' }]],
  'retro-arcade-button': [['Start'], ['Insert Coin', { variant: 'blue', size: 'sm' }], ['Paused', { variant: 'green' }]],
  '3d-push-button': [['Push'], ['Confirm', { color: '#10b981' }], ['Large', { size: 'lg' }]],
  'loading-button': [['Submit'], ['Saving', { isLoading: true }], ['Outline', { variant: 'ghost' }]],
  'shimmer-button': [['Join Waitlist'], ['Secondary', { variant: 'secondary' }], ['Ghost', { variant: 'ghost' }]],
  'magnetic-button': [['Explore'], ['Hover Me', { variant: 'primary', strength: 0.3 }]],
  'double-border-button': [['Contact Us'], ['Secondary', { variant: 'secondary' }], ['Ghost', { variant: 'ghost' }]],
  'liquid-button': [['Hover Me'], ['Violet', { color: '#8b5cf6' }], ['Gold', { color: '#d4a017' }]],
  'retro-shadow-button': [['Click Me'], ['Info', { variant: 'cyan' }], ['Paper', { variant: 'yellow' }]],
  'minimal-pill-button': [['Login'], ['Primary', { variant: 'primary' }], ['Ghost', { variant: 'ghost' }]],
  'border-draw-button': [['Start Project'], ['Preview', { color: '#8b5cf6' }], ['Large', { size: 'lg' }]],
  'ghost-outline-button': [['Sign Up'], ['Launch', { primaryColor: '#10b981', secondaryColor: '#06b6d4' }], ['Upgrade', { size: 'lg' }]],
  'tilt-glow-button': [['Enter Metaverse'], ['Tilt Me', { primaryColor: '#ec4899', secondaryColor: '#8b5cf6' }]],
  'animated-icon-button': [['Next Step'], ['Back', { iconPos: 'left', variant: 'secondary' }], ['Ghost CTA', { variant: 'ghost' }]],
};
const DEFAULT: Example[] = [['Primary'], ['Secondary', { variant: 'secondary' }], ['Ghost', { variant: 'ghost' }]];

function LoadingSubmit() {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingButton isLoading={loading} onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1800); }}>
      Submit
    </LoadingButton>
  );
}

export default function ButtonsDemo({ slug }: { slug: string }) {
  const Comp = C[slug];
  if (!Comp) return null;
  const examples = EXAMPLES[slug] ?? DEFAULT;
  return (
    <>
      {examples.map(([label, props], i): ReactNode => (
        <div className="preview-demo__item" key={label}>
          {slug === 'loading-button' && i === 0 ? <LoadingSubmit /> : <Comp {...props}>{label}</Comp>}
        </div>
      ))}
    </>
  );
}
