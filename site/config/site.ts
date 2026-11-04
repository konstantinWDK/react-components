// src/config/site.ts
/**
 * Global Site, SEO, Analytics & i18n Configuration
 * 
 * Supports environment variables:
 * - PUBLIC_GTM_ID: Google Tag Manager container ID (e.g., GTM-XXXXXXX)
 * - PUBLIC_GA_ID: Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXXX)
 * - PUBLIC_GSC_VERIFICATION: Google Search Console verification meta content
 */

export type Locale = 'en' | 'es' | 'ru';

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
  htmlLang: string;
  ogLocale: string;
  dir: 'ltr' | 'rtl';
}

export const LOCALES: Record<Locale, LocaleConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    htmlLang: 'en',
    ogLocale: 'en_US',
    dir: 'ltr',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    htmlLang: 'es',
    ogLocale: 'es_ES',
    dir: 'ltr',
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    htmlLang: 'ru',
    ogLocale: 'ru_RU',
    dir: 'ltr',
  },
};

export const DEFAULT_LOCALE: Locale = 'en';
export const SUPPORTED_LOCALES: Locale[] = ['en', 'es', 'ru'];

export const siteConfig = {
  name: 'React Components Kit',
  shortName: 'ReactKit',
  url: 'https://reactcomponents.dev',
  author: 'React Components Kit',
  github: 'https://github.com/konstantinWDK/react-components',
  npm: 'https://www.npmjs.com/package/react-component-kit-ui',
  packageName: 'react-component-kit-ui',
  sister: { name: 'Astro Components Kit', url: 'https://astrocomponents.dev' },
  ogImage: '/og-image.png',

  // Google Services (configurable via environment variables at build time)
  googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID || '',
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
  googleSearchConsoleVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',

  // Localized SEO defaults
  seo: {
    en: {
      title: 'React Components Kit — Free, Accessible React UI Components & Templates',
      description: 'Free open-source React component library for React 18 & 19. Accessible, dark & light mode UI components, landing sections and production templates. Zero dependencies, fully typed, MIT licensed.',
      keywords: 'react, react 19, react components, free components, ui library, component library, templates, nextjs, typescript, open source, glassmorphism, accessible, design system, frontend',
    },
    es: {
      title: 'React Components Kit — Componentes UI y Plantillas Gratis para React',
      description: 'Librería open-source de componentes para React 18 y 19. Componentes UI gratuitos y accesibles, con modo claro y oscuro, secciones de landing y plantillas de producción. Cero dependencias, tipado completo, licencia MIT.',
      keywords: 'react, react 19, componentes react, componentes gratis, libreria ui, plantillas, nextjs, typescript, codigo abierto, glassmorphism, accesible, sistema de diseño, frontend',
    },
    ru: {
      title: 'React Components Kit — Бесплатные UI-компоненты и шаблоны для React',
      description: 'Бесплатная библиотека компонентов с открытым исходным кодом для React 18 и 19. Доступные UI-компоненты с тёмной и светлой темой, секции лендингов и готовые шаблоны. Без зависимостей, полная типизация, лицензия MIT.',
      keywords: 'react, react 19, компоненты react, бесплатные компоненты, ui библиотека, шаблоны, nextjs, typescript, открытый исходный код, глассморфизм, доступность, дизайн-система, фронтенд',
    },
  },
};
