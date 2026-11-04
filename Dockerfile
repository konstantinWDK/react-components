# ==========================================
# reactcomponents.dev — documentation website
# Stage 1: build the static site with Next.js (output: 'export' → /app/out)
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies from the lockfile (cached layer)
COPY package.json package-lock.json ./
RUN npm ci

ENV NEXT_TELEMETRY_DISABLED=1

# Copy source and build the static site to /app/out
COPY . .
RUN npm run check-css && npm run build:site

# ==========================================
# Stage 2: serve with Nginx
# ==========================================
FROM nginx:alpine AS runner

RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

# Lightweight healthcheck for Coolify
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
