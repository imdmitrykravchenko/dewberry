FROM node:18-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN sed -i 's/localhost/host.docker.internal/g' package-lock.json

RUN npm ci --registry=http://host.docker.internal:4873 --verbose

COPY ./src/api ./src/api
COPY ./src/database ./src/database

# common utils
COPY ./tsconfig.json ./
COPY ./nodemon.json ./

EXPOSE 3000

CMD npm run start:api
