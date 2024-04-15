FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN git clone https://github.com/vishnubob/wait-for-it.git

EXPOSE 3000
