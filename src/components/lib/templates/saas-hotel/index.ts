// src/components/lib/templates/saas-hotel/index.ts
// Hotel SaaS template ("Lobby · Hotel OS"): marketing landing, sign-in and a complete app
// (dashboard, reservations, rooms, guests, reports, settings) built from library components.
//
//   import { DashboardPage } from 'react-component-kit-ui/templates/saas-hotel';
//   <DashboardPage theme="light" />

export { default as AppLayout } from './AppLayout';
export { default as LandingPage } from './LandingPage';
export { default as SignInPage } from './SignInPage';
export { default as DashboardPage } from './DashboardPage';
export { default as ReservationsPage } from './ReservationsPage';
export { default as RoomsPage } from './RoomsPage';
export { default as GuestsPage } from './GuestsPage';
export { default as ReportsPage } from './ReportsPage';
export { default as SettingsPage } from './SettingsPage';

export { lobbyData, saasRoutes } from './data';
export type { LobbyData, SaasRoutes } from './data';
