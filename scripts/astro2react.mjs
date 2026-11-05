#!/usr/bin/env node
/**
 * astro2react.mjs — mechanical port of astro-component-kit components to React (.tsx + .css).
 *
 * Usage:
 *   node scripts/astro2react.mjs <category|file.astro ...> [--src ../astro-components] [--force] [--out <dir>]
 *
 * Handles: frontmatter (Props, defaults, logic, imports), class / class:list, SVG & HTML
 * attribute names, style strings → objects, set:html, <slot> → children / named props,
 * void elements, comments, keys in .map(), <Fragment>. CSS is extracted like extract-css.mjs.
 * Client <script> blocks are moved into a useEffect (DOM logic kept as-is, scoped to mount).
 *
 * Files already present are skipped unless --force (hand-tuned ports are never overwritten).
 * The output always needs a typecheck + visual review: anything ambiguous is marked `TODO(port)`.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import postcss from 'postcss';
import selectorParser from 'postcss-selector-parser';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n, d) => (args.indexOf(n) > -1 ? args[args.indexOf(n) + 1] : d);
const astroRoot = path.resolve(opt('--src', '../astro-components'));
const force = flag('--force');
const libIn = path.join(astroRoot, 'src/components/lib');
const libOut = path.resolve(opt('--out', 'src/components/lib'));
const targets = args.filter((a, i) => !a.startsWith('--') && !['--src', '--out'].includes(args[i - 1]));

/** Astro-style style scoping: every element of the component gets data-rk-<hash>. */
const scopeId = (category, name) => 'rk-' + crypto.createHash('sha1').update(`${category}/${name}`).digest('hex').slice(0, 6);

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

// ───────────────────────────── attributes ─────────────────────────────
const ATTR_MAP = {
  class: 'className', for: 'htmlFor', tabindex: 'tabIndex', readonly: 'readOnly', maxlength: 'maxLength',
  minlength: 'minLength', autocomplete: 'autoComplete', autofocus: 'autoFocus', inputmode: 'inputMode',
  enterkeyhint: 'enterKeyHint', colspan: 'colSpan', rowspan: 'rowSpan', crossorigin: 'crossOrigin',
  srcset: 'srcSet', 'xlink:href': 'xlinkHref', 'xml:space': 'xmlSpace', 'xmlns:xlink': 'xmlnsXlink',
  frameborder: 'frameBorder', allowfullscreen: 'allowFullScreen', novalidate: 'noValidate',
  spellcheck: 'spellCheck', contenteditable: 'contentEditable', datetime: 'dateTime', charset: 'charSet',
  'http-equiv': 'httpEquiv', 'accept-charset': 'acceptCharset', enctype: 'encType', formaction: 'formAction',
  playsinline: 'playsInline', autoplay: 'autoPlay', srclang: 'srcLang', usemap: 'useMap', referrerpolicy: 'referrerPolicy',
  fetchpriority: 'fetchPriority', autocapitalize: 'autoCapitalize', autocorrect: 'autoCorrect', popovertarget: 'popoverTarget', hreflang: 'hrefLang', accesskey: 'accessKey',
  'accept': 'accept', checked: 'defaultChecked', 'viewbox': 'viewBox', preserveaspectratio: 'preserveAspectRatio',
};
const toAttrName = (name) => {
  if (ATTR_MAP[name] !== undefined) return ATTR_MAP[name];
  if (/^(aria|data)-/.test(name)) return name;
  if (/^on[a-z]+$/.test(name)) return 'on' + name[2].toUpperCase() + name.slice(3); // onclick → onClick (string handlers flagged later)
  if (name.includes('-')) return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase()); // stroke-width → strokeWidth
  return name;
};

/** "a: 1px; --b: red" → `{ a: '1px', '--b': 'red' }` (static strings only). */
function styleObject(str) {
  const parts = str.split(';').map((d) => d.trim()).filter(Boolean);
  const entries = parts.map((d) => {
    const i = d.indexOf(':');
    if (i < 0) return null;
    const k = d.slice(0, i).trim();
    const v = d.slice(i + 1).trim();
    const key = k.startsWith('--') ? `'${k}'` : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    return `${key}: ${JSON.stringify(v)}`;
  });
  return `{ ${entries.filter(Boolean).join(', ')} }`;
}

// ───────────────────────────── markup scanner ─────────────────────────────
/** Reads a balanced {...} starting at s[i] === '{'. Returns index after the closing brace. */
function skipBraces(s, i) {
  let depth = 0;
  let q = null;
  for (; i < s.length; i++) {
    const c = s[i];
    if (q) {
      if (c === '\\') { i++; continue; }
      if (c === q) q = null;
      else if (q === '`' && c === '$' && s[i + 1] === '{') { /* template expr: treat as nested */ }
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') depth++;
    if (c === '}') { depth--; if (depth === 0) return i + 1; }
  }
  return i;
}

const VOID = new Set(['input', 'img', 'br', 'hr', 'meta', 'link', 'source', 'col', 'wbr', 'area', 'track', 'embed', 'param']);

function transformTag(raw, ctx) {
  // raw = full tag text "<name ...>" or "</name>"
  if (raw.startsWith('</')) {
    const name = raw.slice(2, -1).trim();
    if (name === 'slot') return '';
    if (name === 'Fragment' || name === 'html' || name === 'head' || name === 'body') return '</>';
    if (name === 'svg') ctx.svgDepth--;
    return raw;
  }
  let i = 1;
  const nameMatch = /^[A-Za-z][\w.:-]*/.exec(raw.slice(1));
  const name = nameMatch[0];
  i += name.length;
  const selfClosing = /\/\s*>$/.test(raw);
  const body = raw.slice(i, raw.length - (selfClosing ? 2 : 1));
  const attrs = [];
  let j = 0;
  while (j < body.length) {
    while (j < body.length && /\s/.test(body[j])) j++;
    if (j >= body.length) break;
    if (body[j] === '{') { // spread {...rest} or Astro shorthand {id}
      const end = skipBraces(body, j);
      const inner = body.slice(j + 1, end - 1).trim();
      if (/^[A-Za-z_$][\w$]*$/.test(inner)) attrs.push({ name: inner, val: { expr: inner } });
      else attrs.push({ spread: body.slice(j, end) });
      j = end;
      continue;
    }
    const m = /^[^\s=/>]+/.exec(body.slice(j));
    if (!m) { j++; continue; }
    const an = m[0];
    j += an.length;
    while (j < body.length && /\s/.test(body[j])) j++;
    let val = null;
    if (body[j] === '=') {
      j++;
      while (/\s/.test(body[j])) j++;
      if (body[j] === '"' || body[j] === "'") {
        const q = body[j];
        const end = body.indexOf(q, j + 1);
        val = { str: body.slice(j + 1, end) };
        j = end + 1;
      } else if (body[j] === '{') {
        const end = skipBraces(body, j);
        val = { expr: body.slice(j + 1, end - 1) };
        j = end;
      } else {
        const m2 = /^[^\s>]+/.exec(body.slice(j));
        val = { str: m2[0] };
        j += m2[0].length;
      }
    }
    attrs.push({ name: an, val });
  }

  // ── <slot> ──
  if (name === 'slot') {
    const slotName = attrs.find((a) => a.name === 'name')?.val?.str;
    let prop = slotName ? slotName.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) : 'children';
    if (/^\d/.test(prop)) prop = `slot${prop}`;
    if (slotName) ctx.namedSlots.add(prop);
    else ctx.usesChildren = true;
    if (selfClosing) return `{${prop}}`;
    ctx.openSlots.push(prop);
    return `{${prop} ?? (<>`; // closed by the matching </slot> handler below
  }

  // Full-document layouts (templates): <html>/<body> attributes are applied to the real
  // document after mount; <head> children are rendered in place (React 19 hoists title/meta/link).
  if (name === 'html' || name === 'body' || name === 'head') {
    if (name !== 'head') ctx.docAttrs.push({ el: name, attrs });
    return '<>';
  }
  if (name === 'meta' && attrs.some((a) => a.name === 'charset' || (a.name === 'name' && a.val?.str === 'viewport'))) return '';

  let tag = name === 'Fragment' ? '' : name;
  if (name === 'svg') ctx.svgDepth++;
  const out = [];
  for (const a of attrs) {
    if (a.spread) { out.push(a.spread); continue; }
    let n = a.name;
    if (n === 'set:html') {
      const v = a.val.expr ?? JSON.stringify(a.val.str);
      if (name === 'Fragment') tag = ctx.svgDepth > 0 ? 'g' : 'span';
      out.push(`dangerouslySetInnerHTML={{ __html: ${v} }}`);
      continue;
    }
    if (n === 'set:text') { ctx.setText = a.val.expr; continue; }
    if (n === 'class:list') { ctx.usesCx = true; out.push(`className={cx(${a.val.expr})}`); continue; }
    if (n.startsWith('is:') || n.startsWith('transition:') || n === 'define:vars' || n.startsWith('client:')) continue;
    if (n === 'style') {
      if (a.val?.str !== undefined) out.push(`style={${styleObject(a.val.str)}}`);
      else if (a.val?.expr !== undefined) {
        const e = a.val.expr.trim();
        if (e.startsWith('{')) out.push(`style={${e}}`);
        else { ctx.usesSt = true; out.push(`style={st(${e})}`); }
      }
      continue;
    }
    if (n === 'value' && ['input', 'textarea', 'select'].includes(name)) n = 'defaultValue';
    if (n === 'selected' && name === 'option') { ctx.todo.add('<option selected> → set defaultValue on the <select>'); continue; }
    const rn = /^[A-Z]/.test(name) ? (n === 'class' ? 'className' : n) : toAttrName(n);
    const NUMERIC = /^(tabIndex|colSpan|rowSpan|maxLength|minLength|rows|cols|span|start|aria-(valuenow|valuemin|valuemax|level|setsize|posinset|colcount|rowcount|colindex|rowindex))$/;
    if (a.val?.str !== undefined && NUMERIC.test(rn) && /^-?\d+(\.\d+)?$/.test(a.val.str)) { out.push(`${rn}={${a.val.str}}`); continue; }
    if (a.val === null) { out.push(rn === 'crossOrigin' ? 'crossOrigin="anonymous"' : rn); continue; }
    if (a.val.str !== undefined) {
      if (/^on[A-Z]/.test(rn)) { ctx.todo.add(`inline handler ${rn}="${a.val.str.slice(0, 40)}"`); continue; }
      out.push(`${rn}=${JSON.stringify(a.val.str)}`);
    } else out.push(`${rn}={${a.val.expr}}`);
  }
  if (name === 'Fragment' && !tag) {
    const key = out.find((o) => o.startsWith('key='));
    return key ? `<Fragment ${key}>` : '<>';
  }
  const isLocalComponent = /^[A-Z]/.test(tag) && !ctx.importedNames.has(tag.split('.')[0]);
  if (ctx.scope && tag && (/^[a-z]/.test(tag) || isLocalComponent)) out.push(`data-${ctx.scope}=""`);
  const isVoid = VOID.has(name);
  return `<${tag}${out.length ? ' ' + out.join(' ') : ''}${selfClosing || isVoid ? ' />' : '>'}`;
}

function transformMarkup(src, ctx) {
  let out = '';
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (src.startsWith('<!--', i)) {
      const end = src.indexOf('-->', i);
      const text = src.slice(i + 4, end).trim().replace(/\*\//g, '* /');
      out += `{/* ${text} */}`;
      i = end + 3;
      continue;
    }
    if (c === '<' && /[A-Za-z/]/.test(src[i + 1] ?? '') && !(src[i + 1] === '/' && !/[A-Za-z]/.test(src[i + 2] ?? ''))) {
      // scan to the end of the tag, skipping quotes and {...}
      let j = i + 1;
      let q = null;
      for (; j < src.length; j++) {
        const ch = src[j];
        if (q) { if (ch === q) q = null; continue; }
        if (ch === '"' || ch === "'") { q = ch; continue; }
        if (ch === '{') { j = skipBraces(src, j) - 1; continue; }
        if (ch === '>') break;
      }
      const raw = src.slice(i, j + 1);
      if (raw === '</slot>') {
        const prop = ctx.openSlots.pop();
        out += prop ? '</>)}' : '';
      } else {
        out += transformTag(raw, ctx);
        if (ctx.setText) { out += `{${ctx.setText}}`; ctx.setText = null; }
      }
      i = j + 1;
      continue;
    }
    out += c;
    i++;
  }
  return out;
}

/** Adds key={i} to the first element returned by `.map(...)` callbacks that lack one. */
function addMapKeys(code) {
  const re = /\.map\(\s*(\(([^()]*)\)|([A-Za-z_$][\w$]*))\s*=>\s*\(?\s*<([A-Za-z][\w.]*)/g;
  let out = '';
  let last = 0;
  let m;
  while ((m = re.exec(code))) {
    const tagEnd = code.indexOf('>', m.index + m[0].length);
    const openTag = code.slice(m.index + m[0].length, tagEnd);
    if (/\bkey=/.test(openTag)) continue;
    const inParens = m[2] !== undefined;
    const params = (inParens ? m[2] : m[3]).trim();
    // index param = second top-level param if it is a plain identifier
    let depth = 0, split = -1;
    for (let k = 0; k < params.length; k++) {
      const c = params[k];
      if ('{[('.includes(c)) depth++;
      else if ('}])'.includes(c)) depth--;
      else if (c === ',' && depth === 0) { split = k; break; }
    }
    let idx = split > -1 ? params.slice(split + 1).split(/[,:=]/)[0].trim() : '';
    let newParams = params;
    if (!/^[A-Za-z_$][\w$]*$/.test(idx)) { idx = '__i'; newParams = `${params || '_'}, __i: number`; }
    const head = `.map((${newParams}) =>${m[0].slice(m[0].indexOf('=>') + 2)}`;
    out += code.slice(last, m.index) + head + ` key={${idx}}`;
    last = m.index + m[0].length;
  }
  return out + code.slice(last);
}

// ───────────────────────────── frontmatter ─────────────────────────────
function convertFrontmatter(fm, ctx, compName) {
  const imports = [];
  let code = fm;
  // imports
  code = code.replace(/^import\s+([\s\S]*?)\s+from\s+['"]([^'"]+)['"];?\s*$/gm, (m, what, from) => {
    if (from.startsWith('astro')) return '';
    if (/\.astro$/.test(from)) {
      imports.push(`import ${what} from '${from.replace(/\.astro$/, '')}';`);
      return '';
    }
    imports.push(`import ${what} from '${from}';`);
    return '';
  });
  code = code.replace(/^import\s+['"][^'"]+['"];?\s*$/gm, (m) => { imports.push(m.trim()); return ''; });

  // Props interface / type
  let propsDecl = '';
  code = code.replace(/^(export\s+)?interface\s+Props\b([^{\n]*)\{([^\n]*)\}\s*$/m, (m, _e, _x, body) => {
    propsDecl = `export interface ${compName}Props {\n  ${body.trim().replace(/;\s*/g, ';\n  ').trim()}\n}`;
    return '';
  });
  if (!propsDecl) code = code.replace(/(export\s+)?(interface\s+Props\b[^{]*\{[\s\S]*?\n\})/, (m, _e, decl) => {
    propsDecl = decl.replace(/interface\s+Props\b[^{]*\{/, `export interface ${compName}Props {`);
    return '';
  });
  if (!propsDecl) {
    code = code.replace(/(export\s+)?type\s+Props\s*=\s*(\{[\s\S]*?\n\});/, (m, _e, body) => {
      propsDecl = `export interface ${compName}Props ${body}`;
      return '';
    });
  }

  // type / interface declarations → module level (Props may reference them)
  const hoisted = [];
  code = code.replace(/^(export\s+)?(type\s+\w+(?:<[^>]*>)?\s*=[^\n]*;)\s*$/gm, (m, _e, d) => { hoisted.push(d); return ''; });
  code = code.replace(/^(export\s+)?(type\s+\w+(?:<[^>]*>)?\s*=[^\n;]*\n[\s\S]*?\n\};?)/gm, (m, _e, d) => { hoisted.push(d); return ''; });
  code = code.replace(/^(export\s+)?(interface\s+\w+[^{\n]*\{[^\n]*\})\s*$/gm, (m, _e, d) => { hoisted.push(d); return ''; });
  code = code.replace(/^(export\s+)?(interface\s+\w+[^{\n]*\{[ \t]*\n[\s\S]*?\n\})/gm, (m, _e, d) => { hoisted.push(d); return ''; });
  ctx.hoisted = hoisted;

  // Code declared before `= Astro.props` cannot depend on props: keep it at module level
  // (prop defaults may reference it, and params are evaluated before the function body).
  const propsAt = code.search(/const\s+\{[\s\S]*?\}\s*(?::\s*Props\s*)?=\s*Astro\.props/);
  if (propsAt > 0) {
    const before = code.slice(0, propsAt).trim();
    if (before) ctx.hoisted.push(before);
    code = code.slice(propsAt);
  }

  // const { ... } = Astro.props;
  let params = '';
  code = code.replace(/const\s+(\{[\s\S]*?\})\s*(?::\s*Props\s*)?=\s*Astro\.props\s*(?:as\s+Props\s*)?;?/, (m, d) => {
    params = d;
    return '';
  });
  if (!params && /Astro\.props/.test(code)) {
    params = 'props';
    code = code.replace(/Astro\.props/g, 'props');
  }
  code = code.replace(/Astro\.slots\.has\(\s*['"]([\w-]+)['"]\s*\)/g, (m, n) => {
    const p = n === 'default' ? 'children' : n.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    if (p === 'children') ctx.usesChildren = true; else ctx.namedSlots.add(p);
    return `(${p} != null)`;
  });
  if (/Astro\./.test(code)) ctx.todo.add('frontmatter uses Astro.* (url/request/slots.render)');
  // `const Tag = href ? 'a' : 'button'` → ElementType so JSX accepts it
  code = code.replace(/const\s+(Tag|Element|Wrapper|Heading|As|Component)\s*=\s*/g, 'const $1: any = ');
  return { imports, propsDecl, params, body: code.trim() };
}

// ───────────────────────────── scripts ─────────────────────────────
function convertScripts(src, ctx) {
  const blocks = [...src.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)];
  const effects = [];
  for (const [, attrs, body] of blocks) {
    if (/type="application\/ld\+json"/.test(attrs)) { ctx.todo.add('JSON-LD script dropped'); continue; }
    let b = body;
    // define:vars={{ a: expr, b }} → const { a, b } = { a: expr, b }; at the top of the effect
    const dv = /define:vars=\{\{([\s\S]*?)\}\}/.exec(attrs);
    if (dv) {
      const names = dv[1].split(',').map((p) => p.split(':')[0].trim()).filter(Boolean);
      b = `const { ${names.join(', ')} }: Record<string, any> = { ${dv[1].trim()} };\n` + b;
    }
    // hoist imports
    b = b.replace(/^\s*import\s+([\s\S]*?)\s+from\s+['"]([^'"]+)['"];?\s*$/gm, (m, what, from) => {
      ctx.scriptImports.push(`import ${what} from '${from.replace(/\.astro$/, '')}';`);
      return '';
    });
    // side-effect imports touch the DOM: load them in the browser only
    b = b.replace(/^\s*import\s+['"]([^'"]+)['"];?\s*$/gm, (m, from) => `void import('${from.replace(/\.ts$/, '')}');`);
    b = b.replace(/^\s*document\.addEventListener\(\s*['"]astro:[\w-]+['"][^;\n]*\);?\s*$/gm, '');
    b = b.replace(/document\.addEventListener\(\s*['"]DOMContentLoaded['"]\s*,\s*\(\)\s*=>\s*\{([\s\S]*)\}\s*\);?\s*$/m, '$1');
    effects.push(b.trim());
  }
  return effects;
}

// ───────────────────────────── file ─────────────────────────────
function convertFile(file, category) {
  const compName = path.basename(file, '.astro').replace(/^[^A-Za-z]+/, '');
  const src = fs.readFileSync(file, 'utf8');
  const ctx = { docAttrs: [], scope: scopeId(category, path.basename(file, '.astro')), importedNames: new Set(), namedSlots: new Set(), usesChildren: false, usesCx: false, usesSt: false, svgDepth: 0, openSlots: [], todo: new Set(), scriptImports: [], setText: null };

  const fmMatch = /^---\r?\n([\s\S]*?)\r?\n?---\r?\n?/.exec(src);
  const fm = fmMatch ? fmMatch[1] : '';
  let markup = fmMatch ? src.slice(fmMatch[0].length) : src;
  const scripts = convertScripts(markup, ctx);
  markup = markup.replace(/<!doctype[^>]*>/i, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<script[\s\S]*?<\/script>/g, '').trim();

  const docMatch = /\/\*\*[\s\S]*?\*\//.exec(fm);
  const fmNoDoc = docMatch ? fm.replace(docMatch[0], '') : fm;
  const f = convertFrontmatter(fmNoDoc, ctx, compName);
  for (const imp of [...f.imports, ...ctx.scriptImports]) {
    const m = /^import\s+(?:type\s+)?([\s\S]*?)\s+from/.exec(imp);
    if (!m) continue;
    for (const n of m[1].replace(/[{}]/g, ',').split(',')) {
      const id = n.trim().split(/\s+as\s+/).pop();
      if (id) ctx.importedNames.add(id.trim());
    }
  }
  if (!/<style/.test(src)) ctx.scope = null;
  let jsx = addMapKeys(transformMarkup(markup, ctx));
  jsx = jsx.replace(/tabIndex=\{([^}]*)\}/g, (m, e) => `tabIndex={${e.replace(/'(-?\d+)'/g, '$1')}}`);
  jsx = jsx.replace(/style=\{(\{[^{}]*'--[\w-]+'[^{}]*\})\}/g, 'style={$1 as CSSProperties}');
  // Sample copy: the React kit talks about React (identifiers like Astro.props are already gone).
  jsx = jsx.replace(/\bAstro(?![.\w])/g, 'React');
  f.body = f.body.replace(/(['"`][^'"`\n]*?)\bAstro\b(?![.\w])([^'"`\n]*['"`])/g, '$1React$2');

  // Props: add children / named slots / className if referenced
  let propsDecl = f.propsDecl || `export interface ${compName}Props {\n}`;
  const extra = [];
  if (ctx.usesChildren && !/\bchildren\??:/.test(propsDecl)) extra.push('  children?: ReactNode;');
  for (const s of ctx.namedSlots) if (!new RegExp(`\\b${s}\\??:`).test(propsDecl)) extra.push(`  ${s}?: ReactNode;`);
  if (extra.length) propsDecl = propsDecl.replace(/\n\}\s*$/, `\n${extra.join('\n')}\n}`);

  let params = f.params || '{}';
  const addParam = (p) => {
    if (params === 'props') return;
    if (new RegExp(`\\b${p}\\b`).test(params)) return;
    const trimmed = params.replace(/\s*\}\s*$/, '').replace(/,\s*$/, '');
    params = trimmed.trim() === '{' ? `{ ${p} }` : `${trimmed},\n  ${p}\n}`;
  };
  if (ctx.usesChildren) addParam('children');
  for (const s of ctx.namedSlots) addParam(s);
  if (params === 'props' && (ctx.usesChildren || ctx.namedSlots.size)) {
    f.body = `const { ${[ctx.usesChildren ? 'children' : null, ...ctx.namedSlots].filter(Boolean).join(', ')} } = props;\n${f.body}`;
  }
  // keep the original multi-line formatting of the destructuring

  if (ctx.docAttrs.length) {
    const js = (a) => (a.val === null ? "''" : a.val.str !== undefined ? JSON.stringify(a.val.str) : `(${a.val.expr})`);
    const lines = [];
    for (const { el, attrs } of ctx.docAttrs) {
      const target = el === 'html' ? 'document.documentElement' : 'document.body';
      for (const a of attrs) {
        if (!a.name) continue;
        if (a.name === 'class') lines.push(`${target}.classList.add(...String(${js(a)}).split(/\\s+/).filter(Boolean));`);
        else if (a.name === 'class:list') lines.push(`${target}.classList.add(...cx(${a.val.expr}).split(/\\s+/).filter(Boolean));`);
        else lines.push(`if (!${target}.hasAttribute(${JSON.stringify(a.name)})) ${target}.setAttribute(${JSON.stringify(a.name)}, String(${js(a)}));`);
      }
    }
    scripts.unshift('// <html>/<body> attributes of the Astro layout\n' + lines.join('\n'));
  }
  const hasScripts = scripts.length > 0;
  const reactImports = new Set();
  if (hasScripts) { reactImports.add('useEffect'); reactImports.add('useRef'); }
  const typeImports = new Set();

  const helpers = [];
  if (ctx.usesCx) helpers.push(`/** class:list → className */
function cx(...args: unknown[]): string {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (!v) return;
    if (typeof v === 'string' || typeof v === 'number') out.push(String(v));
    else if (Array.isArray(v)) v.forEach(walk);
    else if (typeof v === 'object') for (const [k, on] of Object.entries(v as Record<string, unknown>)) if (on) out.push(k);
  };
  args.forEach(walk);
  return out.join(' ');
}`);
  if (ctx.usesSt) helpers.push(`/** "a: b; --c: d" → style object */
function st(css: string | undefined): CSSProperties {
  const o: Record<string, string> = {};
  for (const decl of String(css ?? '').split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const k = decl.slice(0, i).trim();
    if (k) o[k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = decl.slice(i + 1).trim();
  }
  return o as CSSProperties;
}`);
  if (ctx.usesSt) typeImports.add('CSSProperties');

  // Wrap the markup: scripts get a root ref when there is a single root element.
  let returned = jsx.trim();
  let effectCode = '';
  if (hasScripts) {
    effectCode = `
  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
${scripts.map((s) => s.split('\n').map((l) => '    ' + l).join('\n')).join('\n\n')}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
`;
  }

  if (/\bReactNode\b/.test(propsDecl + f.body)) typeImports.add('ReactNode');
  if (/\bCSSProperties\b/.test(propsDecl + f.body + jsx)) typeImports.add('CSSProperties');
  const doc = docMatch ? docMatch[0] : `/** ${compName} — ported from astro-component-kit. */`;
  const todo = [...ctx.todo].map((t) => `// TODO(port): ${t}`).join('\n');
  const cssExists = /<style/.test(src);
  const lines = [
    `'use client';`,
    '',
    reactImports.size ? `import { ${[...reactImports].join(', ')} } from 'react';` : null,
    typeImports.size ? `import type { ${[...typeImports].join(', ')} } from 'react';` : null,
    ...[...new Set([...f.imports, ...ctx.scriptImports])],
    cssExists ? `import './${path.basename(file, '.astro')}.css';` : null,
    todo || null,
    '',
    ...helpers.map((h) => h + '\n'),
    ...(ctx.hoisted ?? []).map((h) => h + '\n'),
    doc,
    propsDecl,
    '',
    `export function ${compName}(${params}: ${compName}Props) {`,
    f.body ? f.body.split('\n').map((l) => '  ' + l).join('\n') : null,
    effectCode || null,
    '  return (',
    '    <>',
    returned.split('\n').map((l) => '      ' + l).join('\n'),
    '    </>',
    '  );',
    '}',
    '',
    `export default ${compName};`,
    '',
  ].filter((l) => l !== null);
  return { name: path.basename(file, '.astro'), code: lines.join('\n'), todo: [...ctx.todo] };
}

// ───────────────────────────── css (same rules as extract-css.mjs) ─────────────────────────────
function unwrapGlobal(css) {
  let o = '', i = 0;
  while (i < css.length) {
    if (css.startsWith(':global(', i)) {
      i += 8; let d = 1, inner = '';
      while (i < css.length && d > 0) { const c = css[i]; if (c === '(') d++; if (c === ')') d--; if (d > 0) inner += c; i++; }
      o += inner;
    } else o += css[i++];
  }
  return o;
}
function prefixKeyframes(css, prefix) {
  const names = [...new Set([...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]))];
  return css.split('\n').map((line) => {
    if (!/@keyframes|animation/.test(line)) return line;
    let l = line;
    for (const n of names) if (!n.startsWith(prefix + '-')) l = l.replace(new RegExp(`(?<![\\w-])${n}(?![\\w-])`, 'g'), `${prefix}-${n}`);
    return l;
  }).join('\n');
}
function dedent(css) {
  const lines = css.replace(/^\n+|\s+$/g, '').split('\n');
  const ind = lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length);
  const min = ind.length ? Math.min(...ind) : 0;
  return lines.map((l) => l.slice(min)).join('\n') + '\n';
}
/** Rewrites selectors like Astro: `.a .b:hover::after` → `.a:where([data-rk-x]) .b:where([data-rk-x]):hover::after`. */
function scopeCss(css, scope) {
  const root = postcss.parse(css);
  const attr = `:where([data-${scope}])`;
  root.walkRules((rule) => {
    if (rule.parent?.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return;
    rule.selector = selectorParser((sels) => {
      sels.each((sel) => {
        // split into compounds
        const compounds = [[]];
        sel.each((node) => {
          if (node.type === 'combinator') compounds.push([]);
          else compounds[compounds.length - 1].push(node);
        });
        for (const comp of compounds) {
          if (!comp.length) continue;
          const isGlobal = comp.some((n) => n.type === 'pseudo' && n.value === ':global');
          if (isGlobal) {
            for (const n of comp) if (n.type === 'pseudo' && n.value === ':global') n.replaceWith(...n.nodes.flatMap((x) => x.nodes));
            continue;
          }
          if (comp.some((n) => (n.type === 'pseudo' && n.value === ':root') || (n.type === 'tag' && /^(html|body)$/i.test(n.value)))) continue;
          const pe = comp.find((n) => n.type === 'pseudo' && (n.value.startsWith('::') || /^:(before|after|first-line|first-letter|placeholder|selection|backdrop)$/i.test(n.value)));
          const scoped = selectorParser.pseudo({ value: ':where', nodes: [selectorParser.selector({ nodes: [selectorParser.attribute({ attribute: `data-${scope}` })] })] });
          if (pe) pe.parent.insertBefore(pe, scoped);
          else comp[comp.length - 1].parent.insertAfter(comp[comp.length - 1], scoped);
        }
      });
    }).processSync(rule.selector);
  });
  return root.toString();
}

function extractCss(file, category) {
  const src = fs.readFileSync(file, 'utf8');
  const blocks = [...src.matchAll(/<style([^>]*)>([\s\S]*?)<\/style>/g)];
  if (!blocks.length) return null;
  const name = path.basename(file, '.astro');
  let css = blocks
    .map(([, attrs, body]) => (/is:global/.test(attrs) ? dedent(body) : scopeCss(dedent(body), scopeId(category, name))))
    .join('\n'); // scopeCss also unwraps :global(...)
  css = unwrapGlobal(css);
  css = prefixKeyframes(css, kebab(name));
  return `/* ${name} — ported from astro-component-kit (${category}/${name}.astro) */\n\n${css}`;
}

// ───────────────────────────── main ─────────────────────────────
export { transformMarkup, addMapKeys };
export const newCtx = () => ({ docAttrs: [], scope: null, importedNames: new Set(), namedSlots: new Set(), usesChildren: false, usesCx: false, usesSt: false, svgDepth: 0, openSlots: [], todo: new Set(), scriptImports: [], setText: null });

const isMain = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) main();

function main() {
  const files = [];
  for (const t of targets) {
    if (t.endsWith('.astro')) files.push(path.resolve(t));
    else {
      const dir = path.join(libIn, t);
      for (const f of fs.readdirSync(dir)) if (f.endsWith('.astro')) files.push(path.join(dir, f));
    }
  }
  const report = [];
  for (const file of files) {
    const category = path.relative(libIn, path.dirname(file)) || '.';
    const outDir = path.join(libOut, category);
    fs.mkdirSync(outDir, { recursive: true });
    const base = path.basename(file, '.astro');
    const tsxPath = path.join(outDir, `${base}.tsx`);
    if (fs.existsSync(tsxPath) && !force) continue;
    const { code, todo } = convertFile(file, category);
    fs.writeFileSync(tsxPath, code);
    const css = extractCss(file, category);
    if (css) fs.writeFileSync(path.join(outDir, `${base}.css`), css);
    report.push(`${category}/${base}${todo.length ? `  [${todo.length} TODO]` : ''}`);
  }
  console.log(`astro2react: ${report.length} component(s) written`);
  for (const r of report) if (r.includes('TODO')) console.log('  ' + r);
}
