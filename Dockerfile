FROM node:12-alpine

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm i
RUN npm run build

CMD npm run start:prod
