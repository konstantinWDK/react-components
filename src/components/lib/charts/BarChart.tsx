'use client';

import { useEffect, useRef } from 'react';
import './BarChart.css';

/**
 * BarChart — A premium bar chart component.
 */
export interface BarChartProps {
  title?: string;
  subtitle?: string;
  categories?: any[];
  series?: any[];
  height?: number | string;
  colors?: string[];
  horizontal?: boolean;
  stacked?: boolean;
  className?: string;
}

export function BarChart({
  title,
  subtitle,
  categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  series = [{ name: 'Sessions', data: [44, 55, 41, 67, 22] }],
  height = 350,
  colors = ['var(--c-accent, #b8860b)', '#3b82f6', '#10b981'],
  horizontal = false,
  stacked = false,
  className = '',
}: BarChartProps) {
  const chartConfig = {
    categories,
    series,
    height,
    colors,
    horizontal,
    stacked,
  };

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    async function initCharts() {
        const charts = document.querySelectorAll('.premium-chart-card[data-chart-type="bar"]');
        if (charts.length === 0) return;
    
        let ApexChartsModule;
        try {
          ApexChartsModule = await import('apexcharts');
        } catch (e) {
          console.error('ApexCharts failed to load:', e);
          return;
        }
        
        const ApexCharts = ApexChartsModule.default || ApexChartsModule;
        
        charts.forEach(container => {
          if (container.getAttribute('data-initialized')) return;
          
          const configStr = container.getAttribute('data-config');
          if (!configStr) return;
          
          const config = JSON.parse(configStr);
          config.colors = (config.colors || []).map((c: string) => {
            const m = /^var\((--[\w-]+)\s*(?:,\s*([^)]+))?\)$/.exec(String(c).trim());
            return m ? getComputedStyle(container as Element).getPropertyValue(m[1]).trim() || (m[2] || '').trim() : c;
          });
          const target = container.querySelector('.chart-container');
          const fallback = container.querySelector('.chart-fallback');
          
          if (!target) return;
    
          const options = {
            series: config.series,
            chart: {
              type: 'bar',
              height: config.height,
              stacked: config.stacked,
              toolbar: { show: false },
              background: 'transparent',
              fontFamily: 'Inter, sans-serif',
            },
            plotOptions: {
              bar: {
                horizontal: config.horizontal,
                columnWidth: '55%',
                borderRadius: 8,
                borderRadiusApplication: 'end',
              },
            },
            colors: config.colors,
            dataLabels: { enabled: false },
            xaxis: {
              categories: config.categories,
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { style: { colors: '#64748b', fontSize: '12px' } },
            },
            yaxis: {
              labels: { style: { colors: '#64748b', fontSize: '12px' } },
            },
            grid: {
              borderColor: 'rgba(148, 163, 184, 0.12)',
              strokeDashArray: 4,
            },
            legend: {
              show: true,
              position: 'top',
              horizontalAlign: 'right',
              labels: { colors: '#94a3b8' },
            },
            tooltip: { theme: 'dark' },
            theme: { mode: 'dark' }
          };
    
          try {
            const chart = new ApexCharts(target, options);
            chart.render().then(() => {
              if (fallback) (fallback as HTMLElement).style.display = 'none';
            });
            container.setAttribute('data-initialized', 'true');
          } catch (err) {
            console.error('Failed to render chart:', err);
            if (fallback) fallback.textContent = 'Failed to load chart';
          }
        });
      }
    
      initCharts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`premium-chart-card ${className}`} data-chart-type="bar" data-config={JSON.stringify(chartConfig)} data-rk-006992="">
        {(title || subtitle) && (
          <div className="premium-chart-card__header" data-rk-006992="">
            {title && <h3 className="premium-chart-card__title" data-rk-006992="">{title}</h3>}
            {subtitle && <p className="premium-chart-card__subtitle" data-rk-006992="">{subtitle}</p>}
          </div>
        )}
        <div className="premium-chart-card__body" data-rk-006992="">
          <div className="chart-container" data-rk-006992=""></div>
          <div className="chart-fallback" data-rk-006992="">Loading Chart...</div>
        </div>
      </div>
    </>
  );
}

export default BarChart;
