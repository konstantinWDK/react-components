import fs from 'node:fs';
import path from 'node:path';

const LIB = path.join(process.cwd(), 'src/components/lib');

/** Reads a component's source files (build time only). */
export function readComponentSource(category: string, file: string) {
  const read = (ext: string) => {
    const p = path.join(LIB, category, `${file}.${ext}`);
    return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
  };
  return { tsx: read('tsx'), css: read('css') };
}
