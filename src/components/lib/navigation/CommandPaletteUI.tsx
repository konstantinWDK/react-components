'use client';

import './CommandPaletteUI.css';

/** CommandPaletteUI */
export interface CommandPaletteUIProps {
}

export function CommandPaletteUI({}: CommandPaletteUIProps) {
  return (
    <>
      <div className="cmd-palette" data-rk-edffd8="">
        <div className="cmd-search" data-rk-edffd8="">🔍 Type a command...</div>
        <div className="cmd-list" data-rk-edffd8="">
          <div className="cmd-item" data-rk-edffd8=""><span data-rk-edffd8="">📄 Create new page</span><kbd data-rk-edffd8="">⌘N</kbd></div>
          <div className="cmd-item" data-rk-edffd8=""><span data-rk-edffd8="">🚀 Deploy to Vercel</span><kbd data-rk-edffd8="">⌘D</kbd></div>
          <div className="cmd-item" data-rk-edffd8=""><span data-rk-edffd8="">⚙️ Open settings</span><kbd data-rk-edffd8="">⌘,</kbd></div>
        </div>
      </div>
    </>
  );
}

export default CommandPaletteUI;
