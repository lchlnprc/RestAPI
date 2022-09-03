FROM node:10-alpine

RUN mkdir -p /container

COPY package.json container/package.json

WORKDIR /container

RUN npm install

COPY . /container

CMD npm start