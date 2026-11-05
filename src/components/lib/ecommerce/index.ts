// src/components/lib/ecommerce/index.ts
// Barrel export for e-commerce components (shop UI + client cart store).

export { default as ProductMedia } from './ProductMedia';
export { default as ProductRating } from './ProductRating';
export { default as StoreProductCard } from './StoreProductCard';
export { default as ProductGrid } from './ProductGrid';
export { default as PromoBar } from './PromoBar';
export { default as StoreHeader } from './StoreHeader';
export { default as CartDrawer } from './CartDrawer';
export { default as StoreHero } from './StoreHero';
export { default as CategoryTiles } from './CategoryTiles';
export { default as TrustBadges } from './TrustBadges';
export { default as FilterSidebar } from './FilterSidebar';
export { default as ProductToolbar } from './ProductToolbar';
export { default as ProductGallery } from './ProductGallery';
export { default as VariantPicker } from './VariantPicker';
export { default as ProductBuyBox } from './ProductBuyBox';
export { default as OrderSummary } from './OrderSummary';
export { default as CheckoutForm } from './CheckoutForm';
export { default as CartToast } from './CartToast';
export { default as LiveActivityToast } from './LiveActivityToast';
export { default as CountdownBanner } from './CountdownBanner';
export { default as StockIndicator } from './StockIndicator';
export { default as ProductCardMinimal } from './ProductCardMinimal';
export { default as FilterBar } from './FilterBar';
export { default as CartPageList } from './CartPageList';

export { createCart, bindAddToCart, formatMoney, lineId, CART_EVENT, ADDED_EVENT, NOTIFY_EVENT } from './cart-store';
export { applyCatalogFilter, syncCatalogUrl } from './catalog-filter';
export type { CatalogState } from './catalog-filter';
export { productIcons, productIcon } from './product-icons';
export type { ProductIcon } from './product-icons';
export type { Product, ProductColor, StoreCategory, CartItem, ShippingRate, MoneyFormat } from './types';
