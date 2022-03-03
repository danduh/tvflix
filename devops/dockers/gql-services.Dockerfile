FROM node:16-alpine3.15

RUN apk --no-cache add --virtual .builds-deps build-base python3

ARG SERVICE_NAME=''
ENV SERVICE_NAME=$SERVICE_NAME

ARG PORT=
ENV PORT=$PORT

WORKDIR /usr/src/app

COPY package*.json ./

RUN CYPRESS_INSTALL_BINARY=0 npm i --cilent --no-audit --ignore-scripts

COPY . .

RUN npm run buildBffServices

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

CMD node dist/apps/$SERVICE_NAME/main.js

EXPOSE $PORT
