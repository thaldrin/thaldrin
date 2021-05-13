FROM node:16-alpine

LABEL MAINTAINER="Lio <lion@himbo.cat>"

RUN apk update && apk add git ca-certificates

WORKDIR /opt/thaldrin
COPY . .
RUN apk add --no-cache git
RUN npm i -g typescript
RUN rm -rf build

RUN tsc --sourceMap false

RUN rm -rf src
RUN npm cache clean --force

ENTRYPOINT [ "npm", "run", "start"]