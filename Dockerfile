FROM node:10-alpine

RUN npm config set unsafe-perm true && \ 
    npm install -g yarn && \
    yarn global add serve

COPY public public
COPY src src
COPY package.json .
COPY yarn.lock .

RUN yarn && \
    yarn build

CMD serve -s build