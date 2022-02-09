FROM node:12-alpine

RUN npm install -g @nestjs/cli@8.0.0

USER node

WORKDIR /home/node/app