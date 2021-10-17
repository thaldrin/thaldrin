FROM node:16-alpine

LABEL MAINTAINER="Lio <lion@himbo.cat>"

RUN apk update && apk add git ca-certificates curl

WORKDIR /opt/thaldrin

COPY . .

RUN npm i -g typescript
RUN npm i
RUN rm -rf build
RUN tsc
RUN cp -r src/modules/lingua/langs build/src/modules/lingua/langs

# RUN rm -rf src
RUN npm cache clean --force

ENTRYPOINT ["npm", "run", "node:start"]