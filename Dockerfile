FROM node:16.14.0-alpine

WORKDIR /app

COPY . .

RUN apk update && \
    apk add --no-cache vim net-tools busybox-extras && \
    npm install -g npm@9.7.2 && \
    npm install

RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Kolkata /etc/localtime && \
    echo "Asia/Kolkata" > /etc/timezone


EXPOSE 3000

CMD ["npm", "run", "dev"]