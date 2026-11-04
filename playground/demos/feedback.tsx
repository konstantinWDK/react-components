import { useState } from 'react';
import {
  AnimatedCheckmark, Badge, CircleProgress, ConfettiFeedback, CyberGlitchAlert, EmptyStateCard, GlassAlert, GlassModal,
  GlassProgress, IndicatorBadgeMinimal, NeonSpinner, ProgressRingCounter, PulseDot, RatingPill, ShakeErrorGroup,
  SimpleTooltip, SkeletonList, Spotlight, StepProgress, ToastNotif, ToastNotificationGroup, TypingIndicator,
} from '../../src/components/lib/feedback';
import { GlassButton } from '../../src/components/lib/buttons';
import type { ComponentDemo } from './types';

const c = 'feedback';

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <GlassButton onClick={() => setOpen(true)}>Open modal</GlassButton>
      <GlassModal open={open} onClose={() => setOpen(false)} onConfirm={() => setOpen(false)} title="Delete project?">
        <p>This action cannot be undone. All deployments will be removed.</p>
      </GlassModal>
    </>
  );
}

function ShakeDemo() {
  const [n, setN] = useState(0);
  return (
    <div style={{ display: 'grid', gap: '1rem', justifyItems: 'center' }}>
      <ShakeErrorGroup key={n} active={n > 0} message="Invalid password. Please try again." />
      <GlassButton variant="secondary" onClick={() => setN(n + 1)}>Trigger error</GlassButton>
    </div>
  );
}

function StepDemo() {
  const [i, setI] = useState(1);
  return (
    <div style={{ width: 'min(480px, 100%)', display: 'grid', gap: '1.5rem', justifyItems: 'center' }}>
      <div style={{ width: '100%' }}><StepProgress activeIndex={i} /></div>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <GlassButton variant="secondary" size="sm" onClick={() => setI(Math.max(0, i - 1))}>Back</GlassButton>
        <GlassButton size="sm" onClick={() => setI(Math.min(2, i + 1))}>Next</GlassButton>
      </div>
    </div>
  );
}

function ToastGroupDemo() {
  const [k, setK] = useState(0);
  return (
    <div style={{ display: 'grid', gap: '1rem', justifyItems: 'center' }}>
      <ToastNotificationGroup key={k} />
      <ToastNotificationGroup key={k + 1000} type="error" title="Deploy failed" message="Build exited with code 1." actionText="Retry" />
      <GlassButton variant="ghost" size="sm" onClick={() => setK(k + 1)}>Reset toasts</GlassButton>
    </div>
  );
}

function ToastDemo() {
  const [toast, setToast] = useState<null | 'success' | 'info' | 'error'>(null);
  const show = (v: 'success' | 'info' | 'error') => {
    setToast(v);
    window.setTimeout(() => setToast(null), 2500);
  };
  const msg = { success: 'Profile updated', info: 'New message received', error: 'Upload failed' };
  const icon = { success: '✅', info: '💬', error: '⛔' };
  return (
    <>
      <GlassButton size="sm" onClick={() => show('success')}>Success toast</GlassButton>
      <GlassButton size="sm" variant="secondary" onClick={() => show('info')}>Info toast</GlassButton>
      <GlassButton size="sm" variant="ghost" onClick={() => show('error')}>Error toast</GlassButton>
      <ToastNotif show={toast !== null} variant={toast ?? 'success'} message={msg[toast ?? 'success']} icon={icon[toast ?? 'success']} />
    </>
  );
}

function SpotlightDemo() {
  const [on, setOn] = useState(false);
  return (
    <Spotlight active={on}>
      <GlassButton onClick={() => setOn(!on)}>{on ? 'Turn off spotlight' : 'Spotlight me'}</GlassButton>
    </Spotlight>
  );
}

const avatar = { width: 44, height: 44, borderRadius: 12, background: 'var(--c-bg-2)', border: '1px solid var(--c-border)', display: 'grid', placeItems: 'center' } as const;

export const feedback: ComponentDemo[] = [
  { slug: 'animated-checkmark', name: 'Animated Checkmark', category: c, description: 'A decorative SVG checkmark with a circular fill and draw animation.',
    demo: () => (<><AnimatedCheckmark /><AnimatedCheckmark size={80} color="#d4a017" /></>) },
  { slug: 'badge', name: 'Badge', category: c, description: 'A compact visual indicator for labels, categories, or status tags.',
    demo: () => (<><Badge>Default</Badge><Badge variant="success" dot pulse>Live</Badge><Badge variant="warning">Pending</Badge><Badge variant="danger" dot>Failed</Badge><Badge variant="info">Beta</Badge></>) },
  { slug: 'circle-progress', name: 'Circle Progress', category: c, description: 'A circular chart indicating a percentage of completion.',
    demo: () => (<><CircleProgress percent={35} /><CircleProgress percent={72} size={110} color="#d4a017" /></>) },
  { slug: 'confetti-feedback', name: 'Confetti Feedback', category: c, description: 'A celebration component that triggers a falling confetti animation.',
    demo: () => <ConfettiFeedback label="Order placed!" color="#d4a017" /> },
  { slug: 'cyber-glitch-alert', name: 'Cyber Glitch Alert', category: c, description: 'A loud, high-contrast alert box with a CSS glitch animation effect.',
    demo: () => <CyberGlitchAlert /> },
  { slug: 'empty-state-card', name: 'Empty State Card', category: c, description: 'A placeholder component for empty views or failed searches.',
    demo: () => <EmptyStateCard ctaLabel="Create item" /> },
  { slug: 'glass-alert', name: 'Glass Alert', category: c, description: 'A translucent feedback bar for displaying situational messages.',
    demo: () => (
      <div style={{ display: 'grid', gap: '0.75rem', width: 'min(520px, 100%)' }}>
        <GlassAlert title="Heads up">A new version is available.</GlassAlert>
        <GlassAlert type="success" title="Saved">Your changes were stored.</GlassAlert>
        <GlassAlert type="warning" title="Storage almost full">You have used 92% of your quota.</GlassAlert>
        <GlassAlert type="error" title="Payment failed">Your card was declined.</GlassAlert>
      </div>
    ) },
  { slug: 'glass-modal', name: 'Glass Modal', category: c, description: 'A premium overlay dialog for critical confirmations or focused interactions.', demo: () => <ModalDemo /> },
  { slug: 'glass-progress', name: 'Glass Progress', category: c, description: 'A horizontal linear progress bar with glassmorphism and gradient fill.',
    demo: () => <div style={{ width: 'min(420px, 100%)' }}><GlassProgress value={64} /></div> },
  { slug: 'indicator-badge-minimal', name: 'Indicator Badge Minimal', category: c, description: 'A small notification dot placed on the corner of an icon or avatar.',
    demo: () => (<><IndicatorBadgeMinimal><div style={avatar}>🔔</div></IndicatorBadgeMinimal><IndicatorBadgeMinimal pulse color="#34d399" position="bottom-right"><div style={avatar}>KW</div></IndicatorBadgeMinimal></>) },
  { slug: 'neon-spinner', name: 'Neon Spinner', category: c, description: 'A sleek, glowing loading spinner with customizable color and size.',
    demo: () => (<><NeonSpinner size="sm" /><NeonSpinner /><NeonSpinner size="lg" color="#d4a017" /></>) },
  { slug: 'progress-ring-counter', name: 'Progress Ring Counter', category: c, description: 'Circular SVG progress ring with centered countdown or metric value.',
    demo: () => (<><ProgressRingCounter /><ProgressRingCounter value={8} max={10} size={120} color="#34d399" label="TASKS" /></>) },
  { slug: 'pulse-dot', name: 'Pulse Dot', category: c, description: 'A status indicator with a labeled text and a pulsing dot animation.',
    demo: () => (<><PulseDot label="All systems operational" /><PulseDot label="Degraded" color="#fbbf24" /></>) },
  { slug: 'rating-pill', name: 'Rating Pill', category: c, description: 'A compact badge displaying a numeric score or rating stars.',
    demo: () => (<><RatingPill score={4.8} /><RatingPill score={3.4} /><RatingPill score={2.1} /></>) },
  { slug: 'shake-error-group', name: 'Shake Error Group', category: c, description: 'A container that shakes horizontally to indicate failure or invalid input.', demo: () => <ShakeDemo /> },
  { slug: 'simple-tooltip', name: 'Simple Tooltip', category: c, description: 'A lightweight hover-based hint for buttons or icons.',
    demo: () => (<>{(['top', 'bottom', 'left', 'right'] as const).map((p) => <SimpleTooltip key={p} text={`Tooltip ${p}`} position={p}><GlassButton variant="secondary" size="sm">{p}</GlassButton></SimpleTooltip>)}</>) },
  { slug: 'skeleton-list', name: 'Skeleton List', category: c, description: 'Shimmering loading placeholder for lists or feed items.',
    demo: () => <div style={{ width: 'min(420px, 100%)' }}><SkeletonList /></div> },
  { slug: 'spotlight', name: 'Spotlight', category: c, description: 'Dims the page and highlights its children.', demo: () => <SpotlightDemo /> },
  { slug: 'step-progress', name: 'Step Progress', category: c, description: 'A multi-stage stepper indicating flow through several discrete points.', demo: () => <StepDemo /> },
  { slug: 'toast-notif', name: 'Toast Notif', category: c, description: 'A transient snackbar notification.',
    demo: () => <ToastDemo /> },
  { slug: 'toast-notification-group', name: 'Toast Notification Group', category: c, description: 'Stackable notification banner with auto-timed progress bar, icon, and dismiss action.', demo: () => <ToastGroupDemo /> },
  { slug: 'typing-indicator', name: 'Typing Indicator', category: c, description: 'A classic three-dot animation indicating a message is being composed.',
    demo: () => (<><TypingIndicator /><TypingIndicator dotColor="#d4a017" /></>) },
];
