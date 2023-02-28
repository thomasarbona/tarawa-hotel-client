FROM node:16-alpine

ENV PORT 3000

WORKDIR /app

EXPOSE 3000

COPY ./ .

RUN yarn

CMD yarn build && yarn start
