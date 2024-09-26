FROM node:latest
WORKDIR /
COPY . .

RUN rm -rf node_modules
COPY package*.json ./
RUN npm install
RUN npm run build
CMD [ "npm", "start" ]
EXPOSE 443

