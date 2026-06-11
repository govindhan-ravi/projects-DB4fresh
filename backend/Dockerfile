# Backend Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app

# Install production dependencies
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy source code and build (if a build script exists)
COPY backend/ ./
RUN npm run build || echo "No build script, skipping"

# Runtime stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app /app

# Expose the port the server runs on (default 5000, can be overridden by env)
EXPOSE 5000

# Use environment variable for port if defined, otherwise default to 5000
ENV PORT=5000
CMD ["node", "server.js"]
