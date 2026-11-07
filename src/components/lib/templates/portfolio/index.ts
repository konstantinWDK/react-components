// src/components/lib/templates/portfolio/index.ts
// Developer portfolio template ("Keycap"): a monochrome, keyboard-inspired personal site with 3D
// sections (projects showcase, typing keyboard, contribution matrix, monitor), projects, blog and
// contact — built from the Dev* sections in the library. Design originally created for konstantink.dev.
//
//   npm install three   // optional peer dependency used by the 3D sections
//   import { PortfolioHomePage } from 'react-component-kit-ui/templates/portfolio';
//   <PortfolioHomePage theme="light" />

export { default as PortfolioLayout } from './PortfolioLayout';
export { default as PortfolioHomePage } from './PortfolioHomePage';
export { default as PortfolioProjectsPage } from './PortfolioProjectsPage';
export { default as PortfolioProjectPage } from './PortfolioProjectPage';
export { default as PortfolioBlogPage } from './PortfolioBlogPage';
export { default as PortfolioPostPage } from './PortfolioPostPage';
export { default as PortfolioContactPage } from './PortfolioContactPage';

export { keycapPortfolio, portfolioRoutes, portfolioProjectHref, portfolioPostHref, portfolioDate } from './data';
export type { PortfolioSite, PortfolioRoutes, PortfolioProject, PortfolioRepo, PortfolioPost, PortfolioContact, PortfolioSkillGroup } from './data';
