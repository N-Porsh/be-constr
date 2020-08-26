FROM node:12.18.3-alpine

# for priveleges and we also create 'node' user as their owner
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

# all apps will be owned by 'node' user and not 'root'
USER node

RUN npm install

# for production
# RUN npm ci --only=production

# copy app files with appropriate priveleges
COPY --chown=node:node . .

EXPOSE 8080

CMD npm start
