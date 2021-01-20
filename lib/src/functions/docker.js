const writeFile = require('../utils/writeFile')

module.exports = async () => {
  const data = {
    dockerContent: `FROM node:lts

WORKDIR /app

COPY package.json ./

RUN yarn install --prod

COPY dist /app/dist

CMD [ "yarn", "start" ]
`,
    dockerFile: 'Dockerfile'
  }

  await writeFile(data.dockerFile, data.dockerContent)
}