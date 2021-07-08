FROM node:14-alpine

WORKDIR /usr/app/animes-review-api

COPY package*.json ./

RUN npm install --only=prod

RUN apk add --no-cache bash

COPY public/ ./public/

COPY wait-for-it.sh ./

RUN chmod +x ./wait-for-it.sh
