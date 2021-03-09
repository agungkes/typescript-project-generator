const writeFile = require('../utils/writeFile')

module.exports = async () => {
  const data = {
    dockerContent: `# Build Stage 1
    # This build created a staging docker image 
    #
    FROM node:lts-alpine3.12 AS build
    
    WORKDIR /usr/src/app
    
    COPY package.json ./
    COPY tsconfig.json ./
    
    RUN npm install --only=prod
    
    COPY ./src ./src
    
    RUN npm run compile
    
    # Build Stage 2
    # This build takes the production build from staging build
    #
    FROM node:lts-alpine3.12

    WORKDIR /usr/src/app

    COPY package.json ./
    COPY tsconfig.json ./

    RUN npm install --only=prod

    COPY --from=build /usr/src/app/dist ./dist

    EXPOSE 4002

    CMD [ "npm",  "start" ]
`,
    dockerFile: 'Dockerfile'
  }

  await writeFile(data.dockerFile, data.dockerContent)
}