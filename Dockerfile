FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ["package.json", "tsconfig.json", "tsconfig.build.json", "ecosystem.config.js", "./"]

COPY ./src ./src

RUN npm install

RUN npm run build

RUN rm -rf ./src

RUN npm prune --production

RUN chown -R node /usr/src/app

USER node

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
