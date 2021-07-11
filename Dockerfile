FROM node:16-alpine

LABEL MAINTAINER="Lio <lion@himbo.cat>"

RUN apk update && apk add git ca-certificates

WORKDIR /opt/thaldrin
COPY . .
RUN apk add --no-cache git
RUN npm i -g typescript

RUN npm i
RUN rm -rf build 
RUN tsc 
RUN cp -r src/utils/lingua/langs build/src/utils/lingua/langs


RUN rm -rf src
RUN npm cache clean --force

ENTRYPOINT [ "npm", "run", "node:start"]