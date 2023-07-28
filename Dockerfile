FROM selenium/standalone-firefox:latest

# Установка Node.js та npm
RUN sudo apt-get update && sudo apt-get install -y nodejs npm

# ... (other parts of your Dockerfile)
RUN sudo npm i puppeteer

USER root

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i
COPY . .

# Залишайте решту Dockerfile без змін

CMD [ "node", "index.js" ]
