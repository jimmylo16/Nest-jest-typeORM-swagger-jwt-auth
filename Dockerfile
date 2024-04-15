FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN git clone https://github.com/vishnubob/wait-for-it.git

EXPOSE 3000


# CMD ["npm", "run", "start:prod"]