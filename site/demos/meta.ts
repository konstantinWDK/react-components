// Server-safe demo metadata: which slugs are ported, their source file and the usage snippet.
// The interactive previews live in ./<category>.tsx (client components).

import type { DemoMeta } from './meta-types';
import { generatedMeta } from './generated-meta';

export type { DemoMeta };

const b = (file: string, usage: string): DemoMeta => ({ file, category: 'buttons', usage });
const f = (file: string, usage: string): DemoMeta => ({ file, category: 'feedback', usage });

/** Buttons whose preview stage needs extra room for glow / tilt / magnet effects (same list as React). */
export const SPACIOUS_PREVIEW = new Set(['glow-button', 'pulse-button', 'magnetic-button', 'tilt-glow-button', 'double-border-button']);

const manualMeta: Record<string, DemoMeta> = {
  // ── Buttons ──────────────────────────────────────────────
  'glass-button': b('GlassButton', `<GlassButton variant="primary" onClick={save}>Save changes</GlassButton>
<GlassButton variant="secondary">Secondary</GlassButton>
<GlassButton variant="ghost" href="/docs">Read the docs</GlassButton>`),
  'animated-icon-button': b('AnimatedIconButton', `<AnimatedIconButton>Continue</AnimatedIconButton>
<AnimatedIconButton variant="secondary" iconPos="left">Back</AnimatedIconButton>`),
  'border-draw-button': b('BorderDrawButton', `<BorderDrawButton color="#d4a017">Hover me</BorderDrawButton>`),
  'cyberpunk-button': b('CyberpunkButton', `<CyberpunkButton label="EXECUTE">CYBER RUN</CyberpunkButton>`),
  'double-border-button': b('DoubleBorderButton', `<DoubleBorderButton variant="primary">Get started</DoubleBorderButton>`),
  'ghost-outline-button': b('GhostOutlineButton', `<GhostOutlineButton primaryColor="#6366f1" secondaryColor="#c084fc">Explore</GhostOutlineButton>`),
  'glow-button': b('GlowButton', `<GlowButton color="#d4a017">Glow pulse</GlowButton>`),
  'liquid-button': b('LiquidButton', `<LiquidButton color="#8b5cf6">Fluid flow</LiquidButton>`),
  'loading-button': b('LoadingButton', `const [saving, setSaving] = useState(false);

<LoadingButton isLoading={saving} onClick={async () => {
  setSaving(true);
  await save();
  setSaving(false);
}}>
  Save changes
</LoadingButton>`),
  'magnetic-button': b('MagneticButton', `<MagneticButton strength={0.4}>Magnetic</MagneticButton>`),
  'minimal-pill-button': b('MinimalPillButton', `<MinimalPillButton variant="secondary" size="sm">Design</MinimalPillButton>`),
  'neon-border-button': b('NeonBorderButton', `<NeonBorderButton color="#d4a017">Launch</NeonBorderButton>`),
  'neumorphic-button': b('NeumorphicButton', `<NeumorphicButton variant="convex">Convex</NeumorphicButton>
<NeumorphicButton variant="concave">Concave</NeumorphicButton>`),
  'pulse-button': b('PulseButton', `<PulseButton color="#8b5cf6">Join live</PulseButton>`),
  'retro-arcade-button': b('RetroArcadeButton', `<RetroArcadeButton variant="yellow">START 1P</RetroArcadeButton>`),
  'retro-shadow-button': b('RetroShadowButton', `<RetroShadowButton variant="lime">Subscribe</RetroShadowButton>`),
  'ripple-button': b('RippleButton', `<RippleButton variant="primary" onClick={handleClick}>Click me</RippleButton>`),
  'shimmer-button': b('ShimmerButton', `<ShimmerButton variant="primary">Deploy project</ShimmerButton>`),
  'shiny-button': b('ShinyButton', `<ShinyButton variant="primary">Upgrade</ShinyButton>`),
  'slide-reveal-button': b('SlideRevealButton', `<SlideRevealButton icon="→">Get started</SlideRevealButton>`),
  '3d-push-button': b('ThreeDPushButton', `<ThreeDPushButton color="#6366f1">Push me</ThreeDPushButton>`),
  'tilt-glow-button': b('TiltGlowButton', `<TiltGlowButton primaryColor="#b8860b" secondaryColor="#fef3c7">Tilt me</TiltGlowButton>`),

  // ── Feedback ─────────────────────────────────────────────
  'animated-checkmark': f('AnimatedCheckmark', `<AnimatedCheckmark size={64} color="#34d399" />`),
  badge: f('Badge', `<Badge variant="success" dot pulse>Live</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger" dot>Failed</Badge>`),
  'circle-progress': f('CircleProgress', `<CircleProgress percent={72} size={110} color="#d4a017" />`),
  'confetti-feedback': f('ConfettiFeedback', `<ConfettiFeedback label="Order placed!" active={done} />`),
  'cyber-glitch-alert': f('CyberGlitchAlert', `<CyberGlitchAlert message="CRITICAL ERROR" accentColor="#00e0ff" />`),
  'empty-state-card': f('EmptyStateCard', `<EmptyStateCard
  title="No results found"
  message="Try adjusting your filters or adding a new item."
  ctaLabel="Create item"
  onCtaClick={openCreate}
/>`),
  'glass-alert': f('GlassAlert', `<GlassAlert type="success" title="Saved">
  Your changes were stored.
</GlassAlert>`),
  'glass-modal': f('GlassModal', `const [open, setOpen] = useState(false);

<GlassButton onClick={() => setOpen(true)}>Delete project</GlassButton>
<GlassModal
  open={open}
  title="Delete project?"
  onClose={() => setOpen(false)}
  onConfirm={() => { remove(); setOpen(false); }}
>
  This action cannot be undone.
</GlassModal>`),
  'glass-progress': f('GlassProgress', `<GlassProgress value={64} label="Upload progress" />`),
  'indicator-badge-minimal': f('IndicatorBadgeMinimal', `<IndicatorBadgeMinimal pulse color="#34d399" position="top-right">
  <Avatar />
</IndicatorBadgeMinimal>`),
  'neon-spinner': f('NeonSpinner', `<NeonSpinner size="lg" color="#d4a017" />`),
  'progress-ring-counter': f('ProgressRingCounter', `<ProgressRingCounter value={8} max={10} label="TASKS" color="#34d399" />`),
  'pulse-dot': f('PulseDot', `<PulseDot label="All systems operational" color="#34d399" />`),
  'rating-pill': f('RatingPill', `<RatingPill score={4.8} />`),
  'shake-error-group': f('ShakeErrorGroup', `// Change the key to replay the shake on every new error
<ShakeErrorGroup key={attempt} active={attempt > 0} message="Invalid password. Please try again." />`),
  'simple-tooltip': f('SimpleTooltip', `<SimpleTooltip text="Copy to clipboard" position="top">
  <button>Copy</button>
</SimpleTooltip>`),
  'skeleton-list': f('SkeletonList', `{loading ? <SkeletonList count={3} /> : <Feed items={items} />}`),
  spotlight: f('Spotlight', `<Spotlight active={tourStep === 2} opacity={0.7}>
  <NewFeature />
</Spotlight>`),
  'step-progress': f('StepProgress', `<StepProgress
  steps={[{ label: 'Details' }, { label: 'Payment' }, { label: 'Finish' }]}
  activeIndex={1}
/>`),
  'toast-notif': f('ToastNotif', `<ToastNotif show={saved} variant="success" message="Profile updated" />`),
  'toast-notification-group': f('ToastNotificationGroup', `<ToastNotificationGroup
  type="success"
  title="Changes saved"
  message="Your project settings were synchronized with production."
  actionText="Undo"
  onAction={undo}
  onDismiss={() => setToast(null)}
/>`),
  'typing-indicator': f('TypingIndicator', `<TypingIndicator label="Ana is typing…" dotColor="#d4a017" />`),
};

/** Every ported component: generated from the React registry, hand-written entries win. */
export const demoMeta: Record<string, DemoMeta> = { ...generatedMeta, ...manualMeta };
