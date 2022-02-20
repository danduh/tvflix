FROM node:14 AS builder
WORKDIR /usr/local/opc

ARG VERSION

ENV APP_VERSION=$VERSION
RUN apt-get install -y bash git

# Clone tvflix-ui
WORKDIR /usr/local/tvflix-ui
COPY package.json .

RUN CYPRESS_INSTALL_BINARY=0 npm i --cilent --no-audit

COPY . .

RUN npm run -- ng build tvflix

# Final container that includes the built OPC app
FROM nginx:latest

# Set TCM application and version
ENV PORT=8080
ENV SECURED_PORT=8443

# Set and create log dir
ENV OPC_LOG_DIR=/var/log/tvflix

WORKDIR /var/log

COPY --from=builder /usr/local/tvflix-ui/dist/apps/tvflix /usr/share/nginx/html
COPY devops/dockers/tvflix-nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443
ARG VERSION
LABEL version=${VERSION}
