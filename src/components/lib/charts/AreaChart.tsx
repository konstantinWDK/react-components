'use client';

import { useEffect, useRef } from 'react';
import './AreaChart.css';

/**
 * AreaChart — A premium, smooth area chart component.
 */
export interface AreaChartProps {
  title?: string;
  subtitle?: string;
  categories?: any[];
  series?: any[];
  height?: number | string;
  colors?: string[];
  showGrid?: boolean;
  className?: string;
}

export function AreaChart({
  title,
  subtitle,
  categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  series = [{ name: 'Data', data: [31, 40, 28, 51, 42, 109, 100] }],
  height = 350,
  colors = ['var(--c-accent, #b8860b)', 'var(--c-primary, #1e40af)', '#3b82f6'],
  showGrid = true,
  className = '',
}: AreaChartProps) {
  const chartConfig = {
    categories,
    series,
    height,
    colors,
    showGrid,
  };

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    async function initCharts() {
        const charts = document.querySelectorAll('.premium-chart-card[data-chart-type="area"]');
        if (charts.length === 0) return;
    
        // Dynamic import to handle SSR and bundling better in production
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
              type: 'area',
              height: config.height,
              toolbar: { show: false },
              zoom: { enabled: false },
              background: 'transparent',
              fontFamily: 'Inter, sans-serif',
              animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
              }
            },
            colors: config.colors,
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 3 },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100],
              },
            },
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
              show: config.showGrid,
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
    
      // Initial load
      initCharts();
    
      // Handle navigations
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`premium-chart-card ${className}`} data-chart-type="area" data-config={JSON.stringify(chartConfig)} data-rk-163adb="">
        {(title || subtitle) && (
          <div className="premium-chart-card__header" data-rk-163adb="">
            {title && <h3 className="premium-chart-card__title" data-rk-163adb="">{title}</h3>}
            {subtitle && <p className="premium-chart-card__subtitle" data-rk-163adb="">{subtitle}</p>}
          </div>
        )}
        <div className="premium-chart-card__body" data-rk-163adb="">
          <div className="chart-container" data-rk-163adb=""></div>
          <div className="chart-fallback" data-rk-163adb="">Loading Chart...</div>
        </div>
      </div>
    </>
  );
}

export default AreaChart;
