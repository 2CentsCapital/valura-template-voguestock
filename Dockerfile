# syntax=docker/dockerfile:1

# ---------- Build stage: compile the Vite app ----------
FROM node:20-alpine AS build
WORKDIR /app

# Reproducible install from the lockfile
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

# Public origin used for the canonical and Open Graph URLs in index.html
ARG VITE_SITE_URL=https://voguestock.valura.ai
ENV VITE_SITE_URL=${VITE_SITE_URL}

RUN npm run build

# ---------- Runtime stage: serve dist with nginx ----------
FROM nginx:alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
