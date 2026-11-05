'use client';

import './DataShowcase.css';

// DataShowcase — Premium data display section with live preview

/** DataShowcase */
export interface DataShowcaseProps {
  title?: string;
  subtitle?: string;
}

export function DataShowcase({ title = "Data Display", subtitle = "Stats, tables, and visualization elements." }: DataShowcaseProps) {
  return (
    <>
      <div className="cq-data-showcase-cq" data-rk-f95777="">
      <section className="data-showcase" data-rk-f95777="">
        <div className="container" data-rk-f95777="">
          <div className="showcase-header" data-rk-f95777="">
            <span className="showcase-eyebrow" data-rk-f95777="">📊 Data Display</span>
            <h2 className="showcase-title" data-rk-f95777="">{title}</h2>
            <p className="showcase-subtitle" data-rk-f95777="">{subtitle}</p>
          </div>
      
          <div className="preview-stage" data-rk-f95777="">
            <div className="preview-stage__inner" data-rk-f95777="">
              <div className="data-mockups" data-rk-f95777="">
                {/* Stats Row */}
                <div className="stats-row" data-rk-f95777="">
                  <div className="stat-card" data-rk-f95777="">
                    <span className="stat-value" data-rk-f95777="">12,847</span>
                    <span className="stat-label" data-rk-f95777="">Total Users</span>
                  </div>
                  <div className="stat-card" data-rk-f95777="">
                    <span className="stat-value" data-rk-f95777="">94.2%</span>
                    <span className="stat-label" data-rk-f95777="">Uptime</span>
                  </div>
                  <div className="stat-card" data-rk-f95777="">
                    <span className="stat-value" data-rk-f95777="">3.6s</span>
                    <span className="stat-label" data-rk-f95777="">Avg. Response</span>
                  </div>
                </div>
      
                {/* Mini Table */}
                <div className="mini-table" data-rk-f95777="">
                  <div className="table-header" data-rk-f95777="">
                    <span className="col col--name" data-rk-f95777="">Endpoint</span>
                    <span className="col col--status" data-rk-f95777="">Status</span>
                    <span className="col col--latency" data-rk-f95777="">Latency</span>
                  </div>
                  <div className="table-row" data-rk-f95777="">
                    <span className="col col--name" data-rk-f95777="">/api/users</span>
                    <span className="col col--status" data-rk-f95777=""><span className="badge badge--ok" data-rk-f95777="">200</span></span>
                    <span className="col col--latency" data-rk-f95777="">12ms</span>
                  </div>
                  <div className="table-row" data-rk-f95777="">
                    <span className="col col--name" data-rk-f95777="">/api/products</span>
                    <span className="col col--status" data-rk-f95777=""><span className="badge badge--warn" data-rk-f95777="">301</span></span>
                    <span className="col col--latency" data-rk-f95777="">48ms</span>
                  </div>
                  <div className="table-row" data-rk-f95777="">
                    <span className="col col--name" data-rk-f95777="">/api/orders</span>
                    <span className="col col--status" data-rk-f95777=""><span className="badge badge--err" data-rk-f95777="">500</span></span>
                    <span className="col col--latency" data-rk-f95777="">210ms</span>
                  </div>
                </div>
      
                {/* Progress Bar / Chart */}
                <div className="progress-section" data-rk-f95777="">
                  <div className="progress-labels" data-rk-f95777="">
                    <span className="progress-label" data-rk-f95777="">CPU Usage</span>
                    <span className="progress-value" data-rk-f95777="">73%</span>
                  </div>
                  <div className="progress-track" data-rk-f95777="">
                    <div className="progress-fill" data-rk-f95777=""></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <div className="usage-code" data-rk-f95777="">
            <code dangerouslySetInnerHTML={{ __html: `&lt;DataTable data={items} variant="glass" /&gt;` }} data-rk-f95777=""></code>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default DataShowcase;
