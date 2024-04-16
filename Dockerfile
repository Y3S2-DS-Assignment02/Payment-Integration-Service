ARG NODE_VERSION=18.17.0
FROM node:${NODE_VERSION}-alpine
WORKDIR /usr/src/index
COPY package*.json ./ index.js ./
RUN npm install
EXPOSE 3004
CMD ["node", "index.js"]