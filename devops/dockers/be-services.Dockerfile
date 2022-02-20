FROM node:14-alpine
ARG SERVICE_NAME=''
ENV SERVICE_NAME=$SERVICE_NAME

ARG PORT=
ENV PORT=$PORT

WORKDIR /usr/src/app

COPY package*.json ./

RUN CYPRESS_INSTALL_BINARY=0 npm i --cilent --no-audit

COPY . .

RUN npm run buildBeServices

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

CMD node dist/apps/$SERVICE_NAME/main.js

EXPOSE $PORT
