// src/components/lib/templates/ecommerce/index.ts
// E-commerce template: complete store pages built from library components.
//
//   import { StoreHomePage } from 'react-component-kit-ui/templates/ecommerce';
//   <StoreHomePage store={myStore} routes={{ home: '/', shop: '/shop/', product: '/product/', checkout: '/checkout/' }} />

export { default as StoreLayout } from './StoreLayout';
export { default as StoreHomePage } from './StoreHomePage';
export { default as StoreCategoryPage } from './StoreCategoryPage';
export { default as StoreProductPage } from './StoreProductPage';
export { default as StoreCheckoutPage } from './StoreCheckoutPage';

export { demoStore, defaultRoutes, productHref, categoryHref, categoryNames, pickProducts } from './data';
export type { StoreConfig, StoreRoutes } from './data';
