FROM node:20.9.0-alpine

WORKDIR /home/migrations

COPY . .

RUN npm install -g pnpm

RUN pnpm install

ENTRYPOINT ["npx", "knex", "migrate:latest"]
