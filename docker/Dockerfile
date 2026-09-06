FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 1. Staging / Pruner
FROM base AS pruner
WORKDIR /app
RUN pnpm add -g turbo@^2
COPY . .
RUN turbo prune --scope=@styfla/store --docker

# 2. Builder
FROM base AS builder
WORKDIR /app

# Copy lockfile and package.jsons from pruned workspace
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# Copy source code
COPY --from=pruner /app/out/full/ .

# Generate Prisma client and build standalone Next.js app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV DOCKER_BUILD=1

RUN pnpm --filter @styfla/database db:generate
RUN pnpm --filter @styfla/store build

# 3. Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3030
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy static assets and standalone server output
COPY --from=builder /app/apps/store/public ./apps/store/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/store/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/store/.next/static ./apps/store/.next/static

USER nextjs

EXPOSE 3030

CMD ["node", "apps/store/server.js"]
