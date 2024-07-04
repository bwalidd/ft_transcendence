# front/Dockerfile

FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --save-dev webpack webpack-cli

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
