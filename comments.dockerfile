FROM node:16.3.0

WORKDIR /app
COPY package*.json /app/
RUN yarn install
COPY . /app/
RUN yarn build

EXPOSE 3000