FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./src src

RUN npm run build:main

CMD [ "npm", "run", "start:main" ]