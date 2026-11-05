'use client';

import './FileTreeView.css';

/** FileTreeView — ported from astro-component-kit. */
export interface FileTreeViewProps {
}

export function FileTreeView({}: FileTreeViewProps) {
  return (
    <>
      <div className="tree" data-rk-7f8c09="">
        <div className="folder active" data-rk-7f8c09="">📁 src</div>
        <div className="indent" data-rk-7f8c09="">
          <div className="folder" data-rk-7f8c09="">📁 components</div>
          <div className="indent" data-rk-7f8c09="">
            <div className="file" data-rk-7f8c09="">📄 Button.astro</div>
            <div className="file" data-rk-7f8c09="">📄 Card.astro</div>
          </div>
          <div className="file" data-rk-7f8c09="">📄 styles.css</div>
        </div>
        <div className="file" data-rk-7f8c09="">📄 astro.config.mjs</div>
      </div>
    </>
  );
}

export default FileTreeView;
