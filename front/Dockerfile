FROM node:latest

WORKDIR /front

COPY package.json package.json
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
RUN npm install -g serve
RUN echo "serve -s build -l $PORT" > start.sh
CMD ["/bin/bash", "start.sh"]
