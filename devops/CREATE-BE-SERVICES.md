#Docker


To create a BE Services such as cast-grpc-ms,movies-ms,tvshows-ms we will use single dockerfile.

Basically we will have single docker image with all be serviced built in it.
But during container creaeation, 'docker run' we will define which server and on what port we want to run it

For this we have two environment variables: `SERVICE_NAME` and `PORT`

Also we will add a npm script `buildBeServices:nx run-many --target=build --projects=cast-grpc-ms,movies-ms,tvshows-ms --parallel --maxParallel=3` to build all relevant services at once.

```dockerfile
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
```

Let's build it:
```shell
docker build -t be-service -f devops/dockers/be-services.Dockerfile .
```

Now with the same image we are able to run all services, all we need is to provide relevant environment variables.

```shell
# in docker container service will run on port 5000
# Externally this service will be available on port 7500
docker run -d --name movies-ms --env PORT=5000 -p 7500:5000 --env SERVICE_NAME=movies-ms be-service
docker run -d --name tvshows-ms --env PORT=5001 -p 7501:5001 --env SERVICE_NAME=tvshows-ms be-service
docker run -d --name cast-grpc-ms --env PORT=5002 -p 7502:5002 --env SERVICE_NAME=cast-grpc-ms be-service
```
go to http://localhost:7500/api/

Pros
- save us build time
- managing one build/dockerfile only

Cons
- Separate versioning not possible



