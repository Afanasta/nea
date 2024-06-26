# syntax=docker/dockerfile:experimental

ARG NODE_VERSION=20.12.2

FROM node:$NODE_VERSION-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5175

CMD ["npm", "run", "dev"]
