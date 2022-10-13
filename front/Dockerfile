FROM node:latest

WORKDIR /front

COPY package.json package.json
RUN npm install --legacy-peer-deps
COPY . .
CMD ["npm", "start"]