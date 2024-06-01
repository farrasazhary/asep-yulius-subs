FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV port=3000

ENV MODEL_URL=https://storage.googleapis.com/asepyulius-storage/submissions-model/model.json

CMD [ "npm", "start" ]