'use client';

import { useEffect, useRef } from 'react';
import './DonutChart.css';

/**
 * DonutChart — A minimalist donut chart component.
 */
export interface DonutChartProps {
  title?: string;
  labels?: string[];
  series?: number[];
  height?: number | string;
  colors?: string[];
  centerLabel?: string;
  pie?: boolean;
  className?: string;
}

export function DonutChart({
  title,
  labels = ['Direct', 'Social', 'Referral'],
  series = [44, 33, 23],
  height = 350,
  colors = ['var(--c-accent, #b8860b)', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
  centerLabel = 'Total',
  pie = false,
  className = '',
}: DonutChartProps) {
  const chartConfig = {
    labels,
    series,
    height,
    colors,
    centerLabel,
    pie,
  };

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    async function initCharts() {
        const charts = document.querySelectorAll('.premium-chart-card[data-chart-type="donut"]');
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
            labels: config.labels,
            chart: {
              type: config.pie ? 'pie' : 'donut',
              height: config.height,
              background: 'transparent',
              fontFamily: 'Inter, sans-serif',
            },
            colors: config.colors,
            stroke: { show: false },
            dataLabels: { enabled: false },
            plotOptions: {
              pie: {
                donut: {
                  size: '75%',
                  labels: {
                    show: !config.pie,
                    name: { show: true, color: '#94a3b8', fontSize: '14px' },
                    value: { show: true, color: '#ffffff', fontSize: '24px', fontWeight: 800 },
                    total: {
                      show: true,
                      label: config.centerLabel,
                      color: '#94a3b8',
                      formatter: (w: any) => w.globals.seriesTotals.reduce((a: any, b: any) => a + b, 0),
                    },
                  },
                },
              },
            },
            legend: {
              show: true,
              position: 'bottom',
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
      <div className={`premium-chart-card ${className}`} data-chart-type="donut" data-config={JSON.stringify(chartConfig)} data-rk-ab60a1="">
        {title && (
          <div className="premium-chart-card__header" data-rk-ab60a1="">
            <h3 className="premium-chart-card__title" data-rk-ab60a1="">{title}</h3>
          </div>
        )}
        <div className="premium-chart-card__body" data-rk-ab60a1="">
          <div className="chart-container" data-rk-ab60a1=""></div>
          <div className="chart-fallback" data-rk-ab60a1="">Loading Chart...</div>
        </div>
      </div>
    </>
  );
}

export default DonutChart;
