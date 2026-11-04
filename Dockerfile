# ==========================================
# reactcomponents.dev — docs / playground site
# Stage 1: build the static playground with Vite
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies from the lockfile (cached layer)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build the static site to /app/dist-playground
COPY . .
RUN npm run check-css && npm run build:site

# ==========================================
# Stage 2: serve with Nginx
# ==========================================
FROM nginx:alpine AS runner

RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=builder /app/dist-playground /usr/share/nginx/html

EXPOSE 80

# Lightweight healthcheck for Coolify
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
