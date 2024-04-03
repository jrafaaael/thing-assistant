FROM node:18-alpine3.17

WORKDIR /usr/src/app

RUN chown node:node /usr/src/app

COPY --chown=node:node package.json yarn.lock ./

RUN yarn install

COPY --chown=node:node . .
