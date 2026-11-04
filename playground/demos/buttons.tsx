import { useState } from 'react';
import {
  AnimatedIconButton, BorderDrawButton, CyberpunkButton, DoubleBorderButton, GhostOutlineButton, GlassButton,
  GlowButton, LiquidButton, LoadingButton, MagneticButton, MinimalPillButton, NeonBorderButton, NeumorphicButton,
  PulseButton, RetroArcadeButton, RetroShadowButton, RippleButton, ShimmerButton, ShinyButton, SlideRevealButton,
  ThreeDPushButton, TiltGlowButton,
} from '../../src/components/lib/buttons';
import type { ComponentDemo } from './types';

const c = 'buttons';

function LoadingDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingButton
      isLoading={loading}
      onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1800);
      }}
    >
      Save changes
    </LoadingButton>
  );
}

export const buttons: ComponentDemo[] = [
  { slug: 'glass-button', name: 'Glass Button', category: c, description: 'A premium button with glassmorphism effect, gradient border and smooth hover animations.',
    demo: () => (<><GlassButton>Primary</GlassButton><GlassButton variant="secondary">Secondary</GlassButton><GlassButton variant="ghost">Ghost</GlassButton><GlassButton disabled>Disabled</GlassButton></>) },
  { slug: 'animated-icon-button', name: 'Animated Icon Button', category: c, description: 'A button that elegantly slides an icon into view on hover.',
    demo: () => (<><AnimatedIconButton>Continue</AnimatedIconButton><AnimatedIconButton variant="secondary" iconPos="left">Back</AnimatedIconButton><AnimatedIconButton variant="ghost">Learn more</AnimatedIconButton></>) },
  { slug: 'border-draw-button', name: 'Border Draw Button', category: c, description: 'A button that animates its border being drawn on hover.',
    demo: () => (<><BorderDrawButton>Hover me</BorderDrawButton><BorderDrawButton color="#d4a017">Gold</BorderDrawButton></>) },
  { slug: 'cyberpunk-button', name: 'Cyberpunk Button', category: c, description: 'A glitchy, neon-styled button inspired by futuristic sci-fi aesthetics.',
    demo: () => (<><CyberpunkButton /><CyberpunkButton label="HACK" primaryColor="#00e0ff" secondaryColor="#ff003c" /></>) },
  { slug: 'double-border-button', name: 'Double Border Button', category: c, description: 'A button with a sophisticated offset double-border effect.',
    demo: () => (<><DoubleBorderButton>Primary</DoubleBorderButton><DoubleBorderButton variant="secondary">Secondary</DoubleBorderButton><DoubleBorderButton variant="ghost">Ghost</DoubleBorderButton></>) },
  { slug: 'ghost-outline-button', name: 'Ghost Outline Button', category: c, description: 'A minimalist transparent button with gradient outlines and animated borders.',
    demo: () => (<><GhostOutlineButton>Explore</GhostOutlineButton><GhostOutlineButton primaryColor="#b8860b" secondaryColor="#fef3c7">Gold</GhostOutlineButton></>) },
  { slug: 'glow-button', name: 'Glow Button', category: c, description: 'A button with an animated glow effect that pulsates on hover.',
    demo: () => (<><GlowButton>Glow</GlowButton><GlowButton color="#d4a017">Gold glow</GlowButton></>) },
  { slug: 'liquid-button', name: 'Liquid Button', category: c, description: 'A button featuring a fluid, liquid-like animated background layer.',
    demo: () => (<><LiquidButton>Hover me</LiquidButton><LiquidButton color="#d4a017">Liquid gold</LiquidButton></>) },
  { slug: 'loading-button', name: 'Loading Button', category: c, description: 'A button supporting async states with a built-in spinner and disabled logic.',
    demo: () => (<><LoadingDemo /><LoadingButton isLoading variant="secondary">Loading</LoadingButton></>) },
  { slug: 'magnetic-button', name: 'Magnetic Button', category: c, description: "A button that follows the user's cursor when hovered.",
    demo: () => (<><MagneticButton>Magnetic</MagneticButton><MagneticButton variant="primary" strength={0.3}>Primary</MagneticButton></>) },
  { slug: 'minimal-pill-button', name: 'Minimal Pill Button', category: c, description: 'A cleanly rounded pill button optimized for minimal interactions and tags.',
    demo: () => (<><MinimalPillButton>Primary</MinimalPillButton><MinimalPillButton variant="secondary">Secondary</MinimalPillButton><MinimalPillButton variant="ghost" size="sm">Ghost</MinimalPillButton></>) },
  { slug: 'neon-border-button', name: 'Neon Border Button', category: c, description: 'Futuristic button wrapped in an animated rotating neon conic-gradient border.',
    demo: () => (<><NeonBorderButton>Neon</NeonBorderButton><NeonBorderButton color="#00e0ff" size="lg">Cyan</NeonBorderButton></>) },
  { slug: 'neumorphic-button', name: 'Neumorphic Button', category: c, description: 'A premium Soft UI button with beveled surface gradients and hue-tinted shadows.',
    demo: () => (<><NeumorphicButton>Convex</NeumorphicButton><NeumorphicButton variant="concave">Concave</NeumorphicButton></>) },
  { slug: 'pulse-button', name: 'Pulse Button', category: c, description: 'A button with a persistent circular pulse effect to draw attention.',
    demo: () => (<><PulseButton>Pulse</PulseButton><PulseButton variant="secondary" color="#d4a017">Secondary</PulseButton></>) },
  { slug: 'retro-arcade-button', name: 'Retro Arcade Button', category: c, description: 'An 8-bit style arcade button with chunky borders and pixelated interactions.',
    demo: () => (<>{(['yellow', 'red', 'blue', 'green'] as const).map((v) => <RetroArcadeButton key={v} variant={v}>{v}</RetroArcadeButton>)}</>) },
  { slug: 'retro-shadow-button', name: 'Retro Shadow Button', category: c, description: 'A sharp-edged neo-brutalist button with a thick solid block shadow.',
    demo: () => (<>{(['pink', 'cyan', 'yellow', 'lime'] as const).map((v) => <RetroShadowButton key={v} variant={v}>{v}</RetroShadowButton>)}</>) },
  { slug: 'ripple-button', name: 'Ripple Button', category: c, description: 'Interactive button featuring an expanding click ripple effect with glass styling.',
    demo: () => (<><RippleButton>Click me</RippleButton><RippleButton variant="secondary">Secondary</RippleButton><RippleButton variant="ghost">Ghost</RippleButton></>) },
  { slug: 'shimmer-button', name: 'Shimmer Button', category: c, description: 'A clean, elegant button with a continuous diagonal shimmer sweeping animation.',
    demo: () => (<><ShimmerButton>Shimmer</ShimmerButton><ShimmerButton variant="secondary">Secondary</ShimmerButton><ShimmerButton variant="ghost">Ghost</ShimmerButton></>) },
  { slug: 'shiny-button', name: 'Shiny Button', category: c, description: 'A button with a metallic shine effect that sweeps across on hover.',
    demo: () => (<><ShinyButton>Shiny</ShinyButton><ShinyButton variant="secondary">Secondary</ShinyButton><ShinyButton variant="ghost">Ghost</ShinyButton></>) },
  { slug: 'slide-reveal-button', name: 'Slide Reveal Button', category: c, description: 'Action button with a sliding icon drawer and kinetic typography transition.',
    demo: () => (<><SlideRevealButton>Get started</SlideRevealButton><SlideRevealButton variant="secondary">Secondary</SlideRevealButton><SlideRevealButton variant="accent" icon="★">Accent</SlideRevealButton></>) },
  { slug: 'three-d-push-button', name: '3D Push Button', category: c, description: 'A tactile 3D button that depresses when clicked, with depth layers.',
    demo: () => (<><ThreeDPushButton>Push me</ThreeDPushButton><ThreeDPushButton color="#b8860b">Gold</ThreeDPushButton></>) },
  { slug: 'tilt-glow-button', name: 'Tilt Glow Button', category: c, description: 'An interactive 3D button that tilts towards the cursor with dynamic lighting.',
    demo: () => (<><TiltGlowButton>Tilt me</TiltGlowButton><TiltGlowButton size="lg" primaryColor="#b8860b" secondaryColor="#fef3c7">Gold</TiltGlowButton></>) },
];
