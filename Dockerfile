FROM oven/bun:latest as base

WORKDIR /app

ENV NODE_ENV=production

COPY . .
RUN bun install --production
RUN bun run build
RUN mv ./packages/server/build/* ./
RUN mv ./packages/client/dist ./public


EXPOSE 3000/tcp
ENTRYPOINT ["bun", "run", "index.js"]
