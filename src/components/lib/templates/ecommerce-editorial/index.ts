// src/components/lib/templates/ecommerce-editorial/index.ts
// Editorial e-commerce template ("E-commerce 2"): complete store pages built from
// library sections (ShopHeaderEditorial, ShopHeroEditorial, ShopProductRail…) and components.
//
//   import { EditorialHomePage } from 'react-component-kit-ui/templates/ecommerce-editorial';
//   <EditorialHomePage theme="light" />

export { default as EditorialLayout } from './EditorialLayout';
export { default as EditorialHomePage } from './EditorialHomePage';
export { default as EditorialShopPage } from './EditorialShopPage';
export { default as EditorialProductPage } from './EditorialProductPage';
export { default as EditorialBagPage } from './EditorialBagPage';
export { default as EditorialCheckoutPage } from './EditorialCheckoutPage';

export { formaStore, editorialRoutes, editorialProductHref, editorialCategoryHref, pickEditorial } from './data';
export type { EditorialStore, EditorialRoutes } from './data';
