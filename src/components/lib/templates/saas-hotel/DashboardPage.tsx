'use client';

import AppLayout from './AppLayout';
import PageHeader from '../../app/PageHeader';
import ArrivalsBoard from '../../app/ArrivalsBoard';
import KpiStatTile from '../../charts/KpiStatTile';
import StackedAreaChart from '../../charts/StackedAreaChart';
import GaugeChart from '../../charts/GaugeChart';
import PieChart from '../../charts/PieChart';
import GroupedBarChart from '../../charts/GroupedBarChart';
import StatusTimelineFeed from '../../data/StatusTimelineFeed';
import { lobbyData, saasRoutes, type LobbyData, type SaasRoutes } from './data';

/**
 * DashboardPage — Hotel SaaS overview: KPI tiles, revenue mix, tonight's occupancy gauge,
 * front-desk arrivals/departures, booking channels, occupancy by room type and live activity.
 *
 * Usage (src/pages/app/index.astro):
 *   import { DashboardPage } from 'astro-component-kit/templates/saas-hotel';
 *   <DashboardPage />
 *
 * @param {LobbyData} data - Workspace data. Default: Hotel Mirador demo.
 * @param {SaasRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'light'.
 */
export interface DashboardPageProps {
  data?: LobbyData;
  routes?: SaasRoutes;
  theme?: 'light' | 'dark' | 'auto';
}

export function DashboardPage({ data = lobbyData, routes = saasRoutes, theme = 'light' }: DashboardPageProps) {
  const occupiedTonight = data.housekeeping.filter((r) => r.status === 'occupied').length + data.arrivals.length;
  const tonightPct = Math.min(100, Math.round((occupiedTonight / data.rooms.length) * 100));
  return (
    <>
      <AppLayout title="Dashboard" description="Hotel performance at a glance" current="dashboard" data={data} routes={routes} theme={theme}>
        <PageHeader title="Dashboard" description={`Good morning, ${data.user.name.split(' ')[0]} — here is what is happening at ${data.workspace.name} today.`} actions={[{ label: 'Export', icon: 'download' }, { label: 'New booking', icon: 'plus', primary: true, href: routes.reservations }]} periods={['Today', '7 days', '30 days', 'Year']} activePeriod={2} />
      
        <div className="lobby-grid lobby-grid--kpis">
          {data.kpis.map((k, __i: number) => <KpiStatTile key={__i} label={k.label} value={k.value} change={k.change} invert={k.invert} trend={k.trend} period="vs last month" variant="solid" />)}
        </div>
      
        <div className="lobby-grid lobby-grid--2-1">
          <StackedAreaChart title="Revenue by department" subtitle="Weekly, in € thousands" categories={data.revenue.categories} series={data.revenue.series} prefix="€" suffix="k" variant="solid" height={260} />
          <GaugeChart prefix="" title="Tonight" subtitle={`${occupiedTonight} of ${data.rooms.length} rooms sold`} value={tonightPct} max={100} label="Occupancy" suffix="%" variant="solid" />
        </div>
      
        <div className="lobby-grid lobby-grid--1-1">
          <ArrivalsBoard arrivals={data.arrivals} departures={data.departures} inHouse={data.inHouse} />
          <PieChart prefix="" title="Bookings by channel" subtitle="Share of room nights, last 30 days" slices={data.channels} donut centerLabel="Direct 38%" suffix="%" variant="solid" />
        </div>
      
        <div className="lobby-grid lobby-grid--2-1">
          <GroupedBarChart prefix="" title="Occupancy by room type" subtitle="May – Nov" categories={data.occupancyByType.categories} series={data.occupancyByType.series} suffix="%" variant="solid" height={240} />
          <section className="lobby-card" aria-labelledby="activity-title">
            <h2 id="activity-title" className="lobby-card__title">Live activity</h2>
            <StatusTimelineFeed events={data.activity} />
          </section>
        </div>
      </AppLayout>
    </>
  );
}

export default DashboardPage;
