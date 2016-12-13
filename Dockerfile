FROM node:7.2.0

VOLUME [ "/home/node/toto-draw/data" ]

ADD "src" "/home/node/toto-draw/src"
ADD [ \
  "package.json", \
  "/home/node/toto-draw/" \
]

RUN chown -R node. /home/node/toto-draw
RUN apt-get update && \
    apt-get install -y --force-yes build-essential pkg-config libcairo2-dev libpango1.0-dev libssl-dev libjpeg62-turbo-dev libgif-dev

USER node
WORKDIR /home/node/toto-draw

RUN npm i 

EXPOSE 8080
CMD [ "node", "server.js" ]