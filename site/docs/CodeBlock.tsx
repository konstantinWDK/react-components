import { codeToHtml } from 'shiki';
import { CopyButton } from './CopyButton';
import '../styles/code-block.css';

/** Server component: highlights at build time (github-dark, like astrocomponents.dev). No code ships as JS. */
export async function CodeBlock({ code, lang = 'tsx', title, id }: { code: string; lang?: string; title?: string; id?: string }) {
  const html = await codeToHtml(code.trim(), { lang, theme: 'github-dark' });
  return (
    <div className="code-block" id={id} data-nosnippet="">
      <div className="code-block__header">
        <span className="code-block__lang">{title ?? lang}</span>
        <CopyButton code={code.trim()} />
      </div>
      <div className="code-block__pre" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
