'use client';

import { useEffect, useRef } from 'react';
import '../../../../styles/global.css';
import './lobby-theme.css';
import AuthCard from '../../app/AuthCard';
import { saasRoutes, type SaasRoutes } from './data';

/**
 * SignInPage — Split-screen sign-in (or sign-up) for the hotel SaaS using AuthCard.
 *
 * Usage (src/pages/sign-in.astro):
 *   import { SignInPage } from 'astro-component-kit/templates/saas-hotel';
 *   <SignInPage />
 *
 * @param {string} mode - 'signin' or 'signup'. Default 'signin'.
 * @param {SaasRoutes} routes - Page URLs (demo sign-in goes to `routes.dashboard`).
 * @param {string} theme - Initial theme (light|dark|auto). Default 'light'.
 * @param {boolean} noindex - Add robots noindex. Default true.
 */
export interface SignInPageProps {
  mode?: 'signin' | 'signup';
  routes?: SaasRoutes;
  theme?: 'light' | 'dark' | 'auto';
  noindex?: boolean;
}

export function SignInPage({ mode = 'signin', routes = saasRoutes, theme = 'light', noindex = true }: SignInPageProps) {

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    // <html>/<body> attributes of the Astro layout
    if (!document.documentElement.hasAttribute("lang")) document.documentElement.setAttribute("lang", String("en"));
    document.documentElement.classList.add(...String("theme-lobby").split(/\s+/).filter(Boolean));
    if (!document.documentElement.hasAttribute("data-theme")) document.documentElement.setAttribute("data-theme", String((theme === 'auto' ? 'light' : theme)));
    document.body.classList.add(...String("lobby").split(/\s+/).filter(Boolean));

    const { initial }: Record<string, any> = { initial: theme };
    
          (function () {
            var t = initial;
            try { t = localStorage.getItem('ack-theme') || t; } catch (e) {}
            if (t === 'auto') t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.documentElement.dataset.theme = t;
          })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <>
        <>
          
          
          <title>{mode === 'signin' ? 'Sign in' : 'Start your free trial'} — Lobby</title>
          {noindex && <meta name="robots" content="noindex, follow" />}
          
        </>
        <>
          <main>
            <AuthCard mode={mode} brand="Lobby" successHref={routes.dashboard} switchHref={routes.landing} />
          </main>
        </>
      </>
    </>
  );
}

export default SignInPage;
