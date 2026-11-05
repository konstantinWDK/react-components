'use client';

import AppLayout from './AppLayout';
import PageHeader from '../../app/PageHeader';
import RoomRack from '../../app/RoomRack';
import DataTable from '../../app/DataTable';
import { lobbyData, saasRoutes, type LobbyData, type SaasRoutes } from './data';

/**
 * ReservationsPage — Room rack (tape chart) for the next two weeks plus a searchable, sortable
 * reservations table with status filters, bulk actions and pagination.
 *
 * Usage (app/app/reservations/page.tsx, Next.js):
 *   import { ReservationsPage } from 'react-component-kit-ui/templates/saas-hotel';
 *   <ReservationsPage />
 *
 * @param {LobbyData} data - Workspace data.
 * @param {SaasRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'light'.
 */
export interface ReservationsPageProps {
  data?: LobbyData;
  routes?: SaasRoutes;
  theme?: 'light' | 'dark' | 'auto';
}

export function ReservationsPage({ data = lobbyData, routes = saasRoutes, theme = 'light' }: ReservationsPageProps) {
  const count = (s: string) => data.reservations.filter((r) => r.status === s).length;
  return (
    <>
      <AppLayout title="Reservations" current="reservations" data={data} routes={routes} theme={theme}>
        <PageHeader title="Reservations" description={`${data.reservations.length} bookings in the next 14 days · ${count('Pending')} waiting for confirmation`} breadcrumb={[{ label: data.workspace.name, href: routes.dashboard }, { label: 'Reservations' }]} actions={[{ label: 'Import', icon: 'download' }, { label: 'New booking', icon: 'plus', primary: true }]} periods={[]} />
        <RoomRack days={data.days} today={1} rooms={data.rooms} bookings={data.bookings as any} />
        <DataTable id="reservations" title="All reservations" rows={data.reservations} searchPlaceholder="Search guest, booking or room…" bulkActions={['Send confirmation', 'Export CSV', 'Assign rooms']} pageSize={8} currency={data.currency} locale={data.locale} />
      </AppLayout>
    </>
  );
}

export default ReservationsPage;
