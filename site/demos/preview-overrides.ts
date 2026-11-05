/**
 * Preview props for components whose React preview was hand-written in PreviewRenderer.react
 * (required props, or a richer example). Merged over the generated e-commerce/app props.
 */
export const previewOverrides: Record<string, { props?: Record<string, unknown>; maxWidth?: string }> = {
  'typewriter-text': { props: { text: 'Hello, World!' } },
};
