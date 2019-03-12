FROM node:10-alpine

RUN npm install -g yarn && \
    yarn global add serve

COPY public public
COPY src src
COPY .env.production .env
COPY package.json .
COPY yarn.lock .

RUN yarn && \
    yarn build

CMD serve -s build