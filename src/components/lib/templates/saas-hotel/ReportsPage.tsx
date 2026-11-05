'use client';

import AppLayout from './AppLayout';
import PageHeader from '../../app/PageHeader';
import ForecastLineChart from '../../charts/ForecastLineChart';
import HeatmapChart from '../../charts/HeatmapChart';
import FunnelChart from '../../charts/FunnelChart';
import SegmentedBarChart from '../../charts/SegmentedBarChart';
import HorizontalBarChart from '../../charts/HorizontalBarChart';
import MetricDeltaTable from '../../charts/MetricDeltaTable';
import { lobbyData, saasRoutes, type LobbyData, type SaasRoutes } from './data';

/**
 * ReportsPage — Revenue management reports: occupancy forecast with confidence band, booking
 * pace heatmap, direct-booking funnel, guest segments, ADR by channel and month-over-month deltas.
 *
 * Usage (src/pages/app/reports.astro):
 *   import { ReportsPage } from 'astro-component-kit/templates/saas-hotel';
 *   <ReportsPage />
 *
 * @param {LobbyData} data - Workspace data.
 * @param {SaasRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'light'.
 */
export interface ReportsPageProps {
  data?: LobbyData;
  routes?: SaasRoutes;
  theme?: 'light' | 'dark' | 'auto';
}

export function ReportsPage({ data = lobbyData, routes = saasRoutes, theme = 'light' }: ReportsPageProps) {
  return (
    <>
      <AppLayout title="Reports" current="reports" data={data} routes={routes} theme={theme}>
        <PageHeader title="Reports" description="Revenue, pace and conversion — updated every hour." breadcrumb={[{ label: data.workspace.name, href: routes.dashboard }, { label: 'Reports' }]} actions={[{ label: 'Schedule', icon: 'calendar' }, { label: 'Download PDF', icon: 'download', primary: true }]} periods={['30 days', 'Quarter', 'Year']} activePeriod={0} />
        <ForecastLineChart prefix="" title="Occupancy forecast" subtitle="Actual vs. forecast with 90% confidence" categories={data.forecast.categories} actual={data.forecast.actual} forecast={data.forecast.forecast} suffix="%" variant="solid" height={260} />
        <div className="lobby-grid lobby-grid--1-1">
          <HeatmapChart title="Booking pace" subtitle="Rooms booked by arrival weekday and lead time" rows={data.pace.rows} columns={data.pace.columns} values={data.pace.values} showValues variant="solid" />
          <FunnelChart title="Direct booking funnel" subtitle="Website, last 30 days" stages={data.funnel} variant="solid" />
        </div>
        <div className="lobby-grid lobby-grid--1-1">
          <SegmentedBarChart title="Guest segments" segments={data.segments} total="Room nights" suffix="%" variant="solid" />
          <HorizontalBarChart title="ADR by channel" items={[{ label: 'Direct', value: 182 }, { label: 'Corporate', value: 171 }, { label: 'Booking.com', value: 164 }, { label: 'Expedia', value: 158 }, { label: 'Airbnb', value: 149 }]} highlight="Direct" prefix="€" variant="solid" />
        </div>
        <MetricDeltaTable title="Month over month" currentLabel="October" previousLabel="September" rows={[
            { label: 'Occupancy (%)', current: 84, previous: 79, trend: [70, 74, 79, 84] },
            { label: 'ADR (€)', current: 168, previous: 162, trend: [150, 158, 162, 168] },
            { label: 'RevPAR (€)', current: 141, previous: 128, trend: [105, 117, 128, 141] },
            { label: 'Cancellation rate (%)', current: 3.1, previous: 4.2, invert: true, trend: [5.1, 4.8, 4.2, 3.1] },
          ]} variant="solid" />
      </AppLayout>
    </>
  );
}

export default ReportsPage;
