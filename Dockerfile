# Build container
FROM node:12-alpine AS build

WORKDIR /usr/src/market/
COPY . /usr/src/market/

WORKDIR /usr/src/market/client/
RUN yarn install
RUN yarn build

WORKDIR /usr/src/market/server/
RUN npm install

FROM node:12-alpine

COPY --from=build /usr/src/market/server/ /usr/src/market/server/
COPY --from=build /usr/src/market/client/ /usr/src/market/client/

WORKDIR /usr/src/market/server/

EXPOSE 3000
CMD ["npm", "start"]
