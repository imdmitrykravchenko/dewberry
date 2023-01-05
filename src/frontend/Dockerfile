FROM node:18-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN sed -i 's/localhost/host.docker.internal/g' package-lock.json

RUN npm ci --registry=http://host.docker.internal:4873

COPY ./src/client ./src/client/
COPY ./src/server ./src/server/
COPY ./src/frontend ./src/frontend/

# common utils
COPY ./tsconfig.json ./
COPY ./craq.config.json ./
COPY ./global.d.ts ./

EXPOSE 9000

CMD npm run start:front
