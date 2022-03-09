# Basic node image.
FROM node:16-alpine
RUN apk --no-cache add --virtual .builds-deps build-base python3

# Port this service will listen to (3000, 3001, 5000 etc)
ARG PORT=
ENV PORT=$PORT

WORKDIR /usr/src/app

COPY package*.json ./

# Npm i with minimum things.
RUN CYPRESS_INSTALL_BINARY=0 npm i --cilent --no-audit --ignore-scripts
RUN npm rebuild grpc --force

COPY . .

# Service name we want to build
ARG SERVICE_NAME=''
ENV SERVICE_NAME=$SERVICE_NAME

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Build specific service
RUN npm run ng -- build $SERVICE_NAME

CMD node dist/apps/$SERVICE_NAME/main.js

EXPOSE $PORT
