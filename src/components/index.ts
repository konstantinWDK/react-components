// react-component-kit-ui — root barrel export.
// Prefer category imports (`react-component-kit-ui/buttons`) for better tree-shaking.
export * from './lib/app';
export * from './lib/buttons';
export * from './lib/cards';
export * from './lib/charts';
export * from './lib/data';
export * from './lib/ecommerce';
export * from './lib/feedback';
export * from './lib/forms';
export * from './lib/layout';
export * from './lib/navigation';
export * from './lib/overlays';
export * from './lib/sections';
export * from './lib/typography';

// Root-level components (no category folder)
export { AnimatedGalaxy } from './lib/AnimatedGalaxy';
export { LogoWithGalaxy } from './lib/LogoWithGalaxy';

// Components with optional peer dependencies live in their own entry points so that
// bundlers never try to resolve a peer you did not install:
//   react-component-kit-ui/apexcharts → AreaChart, BarChart, DonutChart (needs `apexcharts`)
//   react-component-kit-ui/three      → Galaxy3D (needs `three`)
