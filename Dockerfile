FROM node:22 as base

WORKDIR /usr/src/app

COPY package*.json .

FROM base as development

RUN npm ci --ignore-scripts

COPY . .

FROM base as production

RUN npm ci --ignore-scripts

COPY . .

RUN npm run build