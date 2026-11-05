'use client';

import type { CSSProperties } from 'react';
import './RadarMetricChart.css';

/** "a: b; --c: d" → style object */
function st(css: string | undefined): CSSProperties {
  const o: Record<string, string> = {};
  for (const decl of String(css ?? '').split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const k = decl.slice(0, i).trim();
    if (k) o[k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = decl.slice(i + 1).trim();
  }
  return o as CSSProperties;
}

/**
 * RadarMetricChart — Pure SVG radar / spider chart for multi-axis skill and performance visualization.
 * 
 * @param {string} title - Chart title. Default is 'Performance Metrics'.
 * @param {Array<{axis: string, value: number}>} data - 5 or 6 axis points (values 0 to 100).
 * @param {string} color - Primary chart fill & stroke color. Default is '#d4a017'.
 * @param {number} size - Pixel width/height of the radar. Default is 320.
 */
export interface RadarMetricChartProps {
  title?: string;
  data?: Array<{ axis: string; value: number }>;
  color?: string;
  size?: number;
}

export function RadarMetricChart({
  title = 'System Capabilities',
  data = [
    { axis: 'Speed', value: 95 },
    { axis: 'A11y', value: 98 },
    { axis: 'SEO', value: 100 },
    { axis: 'Design', value: 92 },
    { axis: 'Zero-JS', value: 96 },
    { axis: 'Security', value: 90 },
  ],
  color = '#d4a017',
  size = 320,
}: RadarMetricChartProps) {
  const center = size / 2;
  const radius = (size - 70) / 2;
  const totalAxes = data.length;
  const angleSlice = (Math.PI * 2) / totalAxes;
  
  // Concentric polygon grid levels (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const gridPolygons = levels.map((lvl) => {
    return data
      .map((_, i) => {
        const r = radius * lvl;
        const x = center + r * Math.cos(angleSlice * i - Math.PI / 2);
        const y = center + r * Math.sin(angleSlice * i - Math.PI / 2);
        return `${x},${y}`;
      })
      .join(' ');
  });
  
  // Data polygon points
  const dataPoints = data
    .map((d, i) => {
      const r = radius * (Math.min(100, Math.max(0, d.value)) / 100);
      const x = center + r * Math.cos(angleSlice * i - Math.PI / 2);
      const y = center + r * Math.sin(angleSlice * i - Math.PI / 2);
      return `${x},${y}`;
    })
    .join(' ');
  return (
    <>
      <div className="radar-card" style={st(`--radar-size: ${size}px; --radar-color: ${color};`)} data-rk-5aa1c8="">
        {title && <h5 className="radar-card__title" data-rk-5aa1c8="">{title}</h5>}
      
        <div className="radar-card__wrap" data-rk-5aa1c8="">
          <svg width={size} height={size} className="radar-card__svg" data-rk-5aa1c8="">
            {/* Background concentric webs */}
            {gridPolygons.map((pts, __i: number) => (
              <polygon key={__i} points={pts} className="radar-web" data-rk-5aa1c8="" />
            ))}
      
            {/* Axes radial spokes */}
            {data.map((_, i) => {
              const x2 = center + radius * Math.cos(angleSlice * i - Math.PI / 2);
              const y2 = center + radius * Math.sin(angleSlice * i - Math.PI / 2);
              return <line key={i} x1={center} y1={center} x2={x2} y2={y2} className="radar-spoke" data-rk-5aa1c8="" />;
            })}
      
            {/* Data polygon */}
            <polygon points={dataPoints} className="radar-data" data-rk-5aa1c8="" />
      
            {/* Data nodes */}
            {data.map((d, i) => {
              const r = radius * (d.value / 100);
              const cx = center + r * Math.cos(angleSlice * i - Math.PI / 2);
              const cy = center + r * Math.sin(angleSlice * i - Math.PI / 2);
              return <circle key={i} cx={cx} cy={cy} r="4" className="radar-node" data-rk-5aa1c8="" />;
            })}
      
            {/* Axis Labels */}
            {data.map((d, i) => {
              const labelRadius = radius + 22;
              const lx = center + labelRadius * Math.cos(angleSlice * i - Math.PI / 2);
              const ly = center + labelRadius * Math.sin(angleSlice * i - Math.PI / 2);
              return (
                <text key={i} x={lx} y={ly} className="radar-label" textAnchor="middle" dominantBaseline="central" data-rk-5aa1c8="">
                  {d.axis} ({d.value})
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    </>
  );
}

export default RadarMetricChart;
