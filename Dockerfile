FROM ghcr.io/puppeteer/puppeteer:19.7.2

# ... (other parts of your Dockerfile)
RUN apt-get update && apt-get install -y firefox

# Switch back to the non-root user provided by the base image
USER pptruser

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i
COPY . .
CMD [ "node", "index.js" ]
