FROM node:22.15.1-alpine

WORKDIR /app

RUN npm install -g serve

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["serve", "-s", "build", "-l", "3001"]
