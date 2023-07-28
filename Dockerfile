FROM selenium/standalone-firefox:latest

# ... (other parts of your Dockerfile)

USER root

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i
COPY . .
CMD [ "node", "index.js" ]
