'use client';

import { useState, type ReactNode } from 'react';

/** npm / yarn / pnpm tabs. Panels are rendered on the server and passed in. */
export function InstallTabs({ panels }: { panels: Record<string, ReactNode> }) {
  const ids = Object.keys(panels);
  const [active, setActive] = useState(ids[0]);
  return (
    <div className="install-tabs">
      <div className="install-tabs__bar" role="tablist">
        {ids.map((id) => (
          <button key={id} className={`install-tabs__tab ${active === id ? 'active' : ''}`} role="tab" aria-selected={active === id} onClick={() => setActive(id)}>
            {id}
          </button>
        ))}
      </div>
      <div className="install-tabs__panels">
        {ids.map((id) => (
          <div key={id} className={`install-tabs__panel ${active === id ? 'active' : ''}`} role="tabpanel">
            {panels[id]}
          </div>
        ))}
      </div>
    </div>
  );
}
