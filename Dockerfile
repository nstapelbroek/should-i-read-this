FROM node:8.0.0-alpine

ENV APP_DIR /app/
WORKDIR $APP_DIR

COPY . /app
RUN yarn

CMD yarn start
EXPOSE 3000