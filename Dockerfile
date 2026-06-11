# Root Dockerfile for multi‑stage build
# -------------------------------------------------
# 1️⃣ Build the frontend (React) using Node.js
# -------------------------------------------------
FROM node:20-alpine AS frontend-builder
WORKDIR /frontend
COPY package*.json ./
RUN npm ci --only=production
COPY . ./
RUN npm run build

# -------------------------------------------------
# 2️⃣ Build the backend (Node.js API)
# -------------------------------------------------
FROM node:20-alpine AS backend-builder
WORKDIR /backend
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ ./
RUN npm run build || echo "No build script, skipping"

# -------------------------------------------------
# 3️⃣ Runtime image – combines backend and serves static frontend via Nginx
# -------------------------------------------------
FROM nginx:alpine AS runtime
# Copy built frontend assets into Nginx html directory
COPY --from=frontend-builder /frontend/dist /usr/share/nginx/html

# Copy backend runtime files
COPY --from=backend-builder /backend /app/backend
WORKDIR /app/backend
EXPOSE 5000
ENV PORT=5000
CMD ["node", "server.js"]
