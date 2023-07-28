# Використовуйте образ puppeteer с Firefox
FROM buildkite/puppeteer:latest

# Установка Node.js та npm
RUN apt-get update && apt-get install -y nodejs npm

# Створення папки для додатку
WORKDIR /usr/src/app

# Копіюємо файл package.json та package-lock.json та встановлюємо залежності
COPY package*.json ./
RUN npm ci

# Копіюємо всі файли з директорії проекту
COPY . .

# Запуск додатку
CMD [ "node", "index.js" ]
