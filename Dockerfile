FROM node:21-alpine

WORKDIR /api
COPY . .

RUN yarn install\
&& yarn build\
&& yarn db:generate

EXPOSE 3000


CMD ["sh","-c", "yarn db:sync && yarn start:prod"]