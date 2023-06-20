FROM node:alpine As development 

WORKDIR /user/src/app

COPY package.json ./
COPY yarn.lock ./

# RUN npm install -g yarn
# RUN yarn install

COPY . .

RUN npm run build

FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package.json ./
COPY yarn.lock ./

# RUN npm install -g yarn
RUN yarn install

RUN npm install --prod 
COPY --from=development /user/src/app/dist ./dist

CMD [ "node", "dist/apps/notifications/main" ]
