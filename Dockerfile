FROM node:16-slim

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

COPY server.js /app/server.js

ENV CHECK_INTERVAL='1min' \
    SLACK_API_BASE_URL=https://slack.com/api \
    SLACK_COOKIE= \
    SLACK_TOKEN= \
    SLACK_DISPLAY_NAME= \
    SLACK_REAL_NAME=

CMD ["npm", "start"]
