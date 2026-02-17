FROM node:24.13.1

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml ./
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm install

COPY ./src ./src
COPY ./public ./public

ENV RELEASE_VERSION=6.11.1

RUN pnpm build

EXPOSE 80
CMD ["pnpm", "start"]
