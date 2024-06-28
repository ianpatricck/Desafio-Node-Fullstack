FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app/
COPY ./.env.development /app/.env

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]

EXPOSE 3000

CMD ["npm", "run", "start"]

