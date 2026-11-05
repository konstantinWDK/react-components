'use client';

import './FileTreeView.css';

/** FileTreeView */
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
            <div className="file" data-rk-7f8c09="">📄 Button.react</div>
            <div className="file" data-rk-7f8c09="">📄 Card.react</div>
          </div>
          <div className="file" data-rk-7f8c09="">📄 styles.css</div>
        </div>
        <div className="file" data-rk-7f8c09="">📄 vite.config.ts</div>
      </div>
    </>
  );
}

export default FileTreeView;
