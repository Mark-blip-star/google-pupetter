# Use official Node.js image
FROM node:14

USER root

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i
COPY . .

# Set environment variable for Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/firefox"

CMD [ "node", "index.js" ]
