const writeFile = require('../utils/writeFile')

module.exports = async () => {
  const data = {
    dockerContent: `# Build Stage 1
# This build created a staging docker image 
FROM node:12-alpine  AS build

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

USER node
WORKDIR /home/node/app/

COPY --chown=node:node package.json ./
COPY --chown=node:node tsconfig.json ./
COPY --chown=node:node yarn.lock ./

RUN yarn install --frozen-lockfile

COPY ./src ./src

RUN yarn compile

# Build Stage 2
# This build takes the production build from staging build
#
FROM node:12-alpine as deploy

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

USER node
WORKDIR /home/node/app/

COPY --chown=node:node package.json ./
COPY --chown=node:node tsconfig.json ./
COPY --chown=node:node yarn.lock ./

RUN yarn --production --frozen-lockfile

COPY --from=build --chown=node:node /home/node/app/dist ./dist

EXPOSE 8787

CMD [ "node",  "dist/index.js" ]
    
`,
    dockerFile: 'Dockerfile'
  }

  await writeFile(data.dockerFile, data.dockerContent)
}