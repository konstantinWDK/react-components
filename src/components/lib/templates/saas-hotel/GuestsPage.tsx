'use client';

import AppLayout from './AppLayout';
import PageHeader from '../../app/PageHeader';
import DataTable from '../../app/DataTable';
import GuestProfileCard from '../../app/GuestProfileCard';
import { lobbyData, saasRoutes, type LobbyData, type SaasRoutes } from './data';

/**
 * GuestsPage — Guest CRM: searchable guest table (tier, stays, lifetime spend, tags) next to a
 * guest profile with contact, stats, preferences, upcoming stay and staff notes.
 *
 * Usage (src/pages/app/guests.astro):
 *   import { GuestsPage } from 'astro-component-kit/templates/saas-hotel';
 *   <GuestsPage />
 *
 * @param {LobbyData} data - Workspace data.
 * @param {SaasRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'light'.
 */
export interface GuestsPageProps {
  data?: LobbyData;
  routes?: SaasRoutes;
  theme?: 'light' | 'dark' | 'auto';
}

export function GuestsPage({ data = lobbyData, routes = saasRoutes, theme = 'light' }: GuestsPageProps) {
  const first = data.guests[0];
  return (
    <>
      <AppLayout title="Guests" current="guests" data={data} routes={routes} theme={theme}>
        <PageHeader title="Guests" description={`${data.guests.length} profiles · ${data.guests.filter((g) => g.tier === 'Gold' || g.tier === 'Platinum').length} loyalty members`} breadcrumb={[{ label: data.workspace.name, href: routes.dashboard }, { label: 'Guests' }]} actions={[{ label: 'Export', icon: 'download' }, { label: 'Add guest', icon: 'plus', primary: true }]} periods={[]} />
        <div className="lobby-grid lobby-grid--2-1">
          <DataTable id="guests" title="Guest directory" columns={[
              { key: 'guest', label: 'Guest', type: 'person', sortable: true },
              { key: 'country', label: 'Country', sortable: true },
              { key: 'tier', label: 'Tier', type: 'status' },
              { key: 'stays', label: 'Stays', type: 'number', align: 'right', sortable: true },
              { key: 'spend', label: 'Lifetime', type: 'money', align: 'right', sortable: true },
              { key: 'tags', label: 'Tags', type: 'tags' },
            ]} rows={data.guests} statusTones={{ Platinum: 'info', Gold: 'warning', Silver: 'default', Member: 'default' }} filterKey="tier" bulkActions={['Send offer', 'Export']} searchPlaceholder="Search guests…" pageSize={8} currency={data.currency} locale={data.locale} />
          <GuestProfileCard guest={{ name: first.guest.name, email: first.guest.sub, phone: '+34 612 345 678', country: first.country, since: 'Mar 2022' }} tier={first.tier} stats={[{ label: 'Stays', value: String(first.stays) }, { label: 'Nights', value: '19' }, { label: 'Lifetime', value: `€${first.spend.toLocaleString('en-GB')}` }, { label: 'Rating', value: '4.9' }]} />
        </div>
      </AppLayout>
    </>
  );
}

export default GuestsPage;
