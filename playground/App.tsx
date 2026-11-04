import { useEffect, useMemo, useState } from 'react';
import { categories } from './demos';

function useHashSlug() {
  const [hash, setHash] = useState(() => window.location.hash.slice(1));
  useEffect(() => {
    const on = () => setHash(window.location.hash.slice(1));
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return hash;
}

export function App() {
  const slug = useHashSlug();
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try { return (localStorage.getItem('rck-theme') as 'dark' | 'light') || 'dark'; } catch { return 'dark'; }
  });
  const [query, setQuery] = useState('');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('rck-theme', theme); } catch { /* ignore */ }
  }, [theme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .map((cat) => ({ ...cat, items: cat.items.filter((d) => !q || d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)) }))
      .filter((cat) => cat.items.length);
  }, [query]);

  const active = categories.find((c) => c.id === slug);
  const single = categories.flatMap((c) => c.items).find((d) => d.slug === slug);
  const shown = single ? [single] : (active?.items ?? filtered.flatMap((c) => c.items));

  return (
    <div className="pg">
      <aside className="pg__side">
        <a href="#" className="pg__brand">
          <span className="gradient-text">React</span> Component Kit
        </a>
        <input className="pg__search" placeholder="Search components…" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search components" />
        <nav>
          {filtered.map((cat) => (
            <div key={cat.id} className="pg__group">
              <a href={`#${cat.id}`} className={`pg__cat ${slug === cat.id ? 'is-active' : ''}`}>
                {cat.label} <span>{cat.items.length}</span>
              </a>
              {cat.items.map((d) => (
                <a key={d.slug} href={`#${d.slug}`} className={`pg__link ${slug === d.slug ? 'is-active' : ''}`}>{d.name}</a>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      <main className="pg__main">
        <header className="pg__head">
          <h1>{single?.name ?? active?.label ?? 'All components'}</h1>
          <button className="pg__theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? 'Light' : 'Dark'} theme
          </button>
        </header>
        <div className="pg__grid">
          {shown.map((d) => (
            <section key={d.slug} id={d.slug} className="pg__card">
              <div className="pg__card-head">
                <a href={`#${d.slug}`}><h2>{d.name}</h2></a>
                <p>{d.description}</p>
              </div>
              <div className="pg__preview">{d.demo()}</div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
