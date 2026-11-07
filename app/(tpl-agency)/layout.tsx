import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import '../../src/styles/global.css';

// Live preview of the agency template: own document shell (theme on <html>/<body> from the server).
export const metadata: Metadata = { robots: { index: false, follow: false }, icons: { icon: '/favicon.svg' } };

export default function TemplatePreviewLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="theme-volta" data-theme="dark" suppressHydrationWarning>
      <body className="volta" suppressHydrationWarning>{children}</body>
    </html>
  );
}
