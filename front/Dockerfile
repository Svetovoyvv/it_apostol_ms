FROM node:latest

WORKDIR /front

COPY package.json package.json
RUN npm install --legacy-peer-deps
RUN npm install -g serve
COPY . .
CMD ["/bin/bash", "start.sh"]
