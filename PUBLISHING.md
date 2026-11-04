# 📦 Publicar y actualizar el paquete en npm

Paquete: [`react-component-kit-ui`](https://www.npmjs.com/package/react-component-kit-ui)

> El nombre `react-component-kit` ya estaba ocupado en npm por otro autor, así que se publica como `react-component-kit-ui`.

---

## Qué se publica

Solo la carpeta `dist/` compilada (más `LICENSE`, `README.md` y `CHANGELOG.md`):

```
dist/
├── index.js, buttons.js, feedback.js, …  # ESM, una entrada por categoría, con 'use client'
├── chunks/…                               # código compartido
├── styles.css                             # CSS de todos los componentes
├── global.css                             # tokens de diseño + reset
└── types/…                                # declaraciones .d.ts
```

Compruébalo sin publicar:

```bash
npm run pack:check     # build + lista de archivos que irían al paquete
```

---

## Primera publicación

```bash
npm whoami                 # debe mostrar: konstantinwdk  (si no: npm login)
npm run typecheck
npm run pack:check
npm publish                # prepublishOnly vuelve a ejecutar typecheck + build
```

`publishConfig.access` ya está a `public`.

---

## Publicar una actualización (manual)

Sigue [SemVer](https://semver.org/lang/es/):

| Cambio | Comando | Ejemplo |
|--------|---------|---------|
| Arreglos sin cambiar la API | `npm run release:patch` | 0.1.0 → 0.1.1 |
| Componentes o categorías nuevas | `npm run release:minor` | 0.1.0 → 0.2.0 |
| Cambios que rompen la API (props renombradas, etc.) | `npm run release:major` | 0.9.0 → 1.0.0 |

Pasos:

1. Anota los cambios en `CHANGELOG.md` en una sección nueva `## [x.y.z] - AAAA-MM-DD`.
2. Haz commit de todo (`npm version` exige el árbol de trabajo limpio).
3. Ejecuta `npm run release:minor` (o el que toque). Esto:
   - sube la versión en `package.json` y `package-lock.json`,
   - crea el commit `release: vX.Y.Z` y la etiqueta git `vX.Y.Z`,
   - ejecuta `prepublishOnly` (typecheck + build) y publica.
4. Sube commit y etiqueta: `git push --follow-tags`.

---

## Publicar automáticamente desde GitHub (opcional, recomendado)

El repo incluye [`.github/workflows/publish.yml`](./.github/workflows/publish.yml): cuando subes una etiqueta `v*`, GitHub Actions compila y publica en npm con *provenance* (sello de origen verificado en npmjs.com).

Configuración (una sola vez):

1. En npmjs.com → *Access Tokens* → **Generate New Token** → *Granular Access Token* con permiso **Read and write** sobre `react-component-kit-ui` (o *Automation token* clásico).
2. En GitHub → repo → *Settings → Secrets and variables → Actions* → **New repository secret**: `NPM_TOKEN` = el token.

Flujo de publicación:

```bash
# 1. actualiza CHANGELOG.md y haz commit
npm version minor -m "release: v%s"   # sube la versión y crea la etiqueta (sin publicar)
git push --follow-tags                # GitHub Actions publica en npm
```

> Usa **uno** de los dos flujos. Si publicas a mano con `npm run release:*` y luego subes la etiqueta, el workflow fallará porque esa versión ya existe (no rompe nada).

También está [`.github/workflows/ci.yml`](./.github/workflows/ci.yml), que en cada push/PR ejecuta typecheck, build de la librería y build de la web.

---

## Problemas frecuentes

| Error | Solución |
|-------|----------|
| `E403 You cannot publish over the previously published versions` | Sube la versión (`npm version patch`). |
| `E403 … do not have permission` | El nombre es de otro usuario o el token no tiene permisos. |
| `npm ERR! Git working directory not clean` | Haz commit antes de `npm version`. |
| `ENEEDAUTH` | `npm login` (manual) o revisa el secreto `NPM_TOKEN` (CI). |

Para retirar una versión rota: `npm deprecate react-component-kit-ui@0.1.1 "Bug grave, usa 0.1.2"` (mejor que `unpublish`).
