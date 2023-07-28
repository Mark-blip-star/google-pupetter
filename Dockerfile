FROM ghcr.io/puppeteer/puppeteer:19.7.2

# ... (other parts of your Dockerfile)

USER root

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i
COPY . .
CMD [ "node", "index.js" ]
