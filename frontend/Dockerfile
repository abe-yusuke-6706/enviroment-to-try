FROM node:20-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "tcp://0.0.0.0:3000"]