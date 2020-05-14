FROM node:12.16.3
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

# for production
# RUN npm ci --only=production

COPY . .

EXPOSE 8080

CMD npm start
