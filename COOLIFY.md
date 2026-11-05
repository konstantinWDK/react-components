# 🚀 Despliegue de reactcomponents.dev en Coolify

Guía para desplegar la web/playground de **React Component Kit** (`reactcomponents.dev`) en Coolify (VPS `vps3`) con despliegue automático desde GitHub.

> La web y el paquete npm son independientes: la web la sirve Coolify a partir del `Dockerfile`, y el paquete se publica con `npm publish` (ver [PUBLISHING.md](./PUBLISHING.md)).

---

## 1. Requisitos previos

- Repositorio en GitHub: `https://github.com/konstantinWDK/react-components` (rama `main`).
- Coolify funcionando en el VPS (`ssh vps3`).
- Dominio `reactcomponents.dev` en tu proveedor DNS.

---

## 2. DNS

En el panel DNS del dominio:

| Tipo | Nombre | Valor |
|------|--------|-------|
| `A` | `@` | IP pública del VPS `vps3` |
| `CNAME` | `www` | `reactcomponents.dev` |

Puedes comprobar la propagación con `dig +short reactcomponents.dev`.

---

## 3. Crear el recurso en Coolify

### Método A: Dockerfile (⭐ recomendado)

1. **+ New Resource** → **Application** → **Public Repository** (o *Private Repository (with GitHub App)* si el repo es privado).
2. URL: `https://github.com/konstantinWDK/react-components`, rama `main`.
3. Configuración:
   - **Build Pack:** `Dockerfile` (lo detecta solo)
   - **Dockerfile Location:** `/Dockerfile`
   - **Ports Exposes:** `80`
   - **Domains (FQDN):** `https://reactcomponents.dev,https://www.reactcomponents.dev`
4. **Deploy**.

Qué hace el [`Dockerfile`](./Dockerfile):
- Etapa 1 (`node:22-alpine`): `npm ci`, comprueba colisiones CSS (`npm run check-css`) y genera la web estática con Next.js (`npm run build:site` → `out/`, una página HTML por ruta en EN/ES/RU).
- Etapa 2 (`nginx:alpine`): sirve la web con [`nginx.conf`](./nginx.conf) + [`security-headers.conf`](./security-headers.conf): gzip, caché inmutable de 1 año para `/_next/static/*` (archivos con hash), HTML sin caché para que cada despliegue se vea al momento, cabeceras de seguridad y página `404.html` propia.
- Incluye `HEALTHCHECK`, así Coolify sabe cuándo el contenedor está listo (despliegue sin caída).
- Las cabeceras de seguridad están en un archivo aparte que se incluye en cada `location`, porque nginx descarta las cabeceras del bloque `server` en cuanto un `location` define las suyas.

### Método B: sin Dockerfile (Static / Nixpacks)

- **Build Pack:** `Nixpacks` o `Static`
- **Install Command:** `npm ci`
- **Build Command:** `npm run build:site`
- **Publish Directory:** `out`

---

## 4. SSL, redirección www y auto-deploy

1. **SSL:** Coolify genera el certificado Let's Encrypt automáticamente al poner dominios con `https://`.
2. **www → raíz:** en *Configuration → Advanced* activa **Redirect to non-www** (o la opción equivalente de tu versión de Coolify).
3. **Auto Deploy:** actívalo en la aplicación. Con la GitHub App de Coolify, cada `git push` a `main` reconstruye y despliega.
   - Con repo público sin GitHub App: copia el **Webhook URL** de Coolify (*Webhooks → Manual Git Webhooks*) y añádelo en GitHub → *Settings → Webhooks* (evento `push`).

---

## 5. Probar localmente antes de subir

```bash
npm run typecheck
npm run build:site            # genera out/

# Contenedor igual que en producción
docker build -t react-components-site .
docker run --rm -p 8080:80 react-components-site
# → http://localhost:8080
```

---

## 6. Comprobaciones tras desplegar

```bash
curl -I https://reactcomponents.dev                 # 200 + cabeceras de seguridad
curl -I https://reactcomponents.dev/_next/static/<file>.js # Cache-Control: immutable
ssh vps3 'docker ps --filter "ancestor=nginx" --format "{{.Names}}  {{.Status}}"'
```

Si algo falla, revisa en Coolify: *Deployments → último despliegue → Logs*.

## MCP server — mcp.reactcomponents.dev

A second Coolify application from the **same repository**:

| Setting | Value |
|---|---|
| Build pack | Dockerfile |
| Dockerfile location | `/Dockerfile.mcp` |
| Domain | `https://mcp.reactcomponents.dev` |
| Port exposed | `3000` |
| Health check | `GET /health` (also built into the image) |
| Env (optional) | `RATE_LIMIT_MAX` (requests/min per IP, default 120) |

The image bundles the server with esbuild and only ships `mcp-dist/` plus the component sources it serves. Redeploy it whenever components change, so agents get the new code.

