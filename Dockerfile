FROM node:alpine as base

WORKDIR /discord-bot

COPY package*.json ./

RUN rm -rf node_modules && npm i

COPY . .

CMD npm start
