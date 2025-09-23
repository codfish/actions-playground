FROM node:22.18.0

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml ./
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm install

COPY ./src ./src
COPY ./public ./public

ENV RELEASE_VERSION=6.7.1

RUN pnpm build

EXPOSE 80
CMD ["pnpm", "start"]
