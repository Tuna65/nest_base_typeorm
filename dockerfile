FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./src src

RUN npm run build:dev

CMD [ "npm", "run", "start:dev" ]