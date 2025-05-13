FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:20-alpine AS production

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/yarn.lock ./

RUN yarn install --frozen-lockfile --production

COPY --from=build /usr/src/app/dist ./dist

COPY --from=build /usr/src/app/nest-cli.json ./

EXPOSE 3000

CMD ["node", "dist/infra/framework/main"]