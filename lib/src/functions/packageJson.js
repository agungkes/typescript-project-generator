const writeFile = require('../utils/writeFile')

module.exports = async (
  author,
  projectName,
  projectDescription,
  projectVersion,
  license,
  ) => {
  const data = {
    content    : '',
    file       : 'package.json'
  }

  data.content = `{
  "name": "${projectName.toLowerCase().replace(/ /g, '-')}",
  "version": "${projectVersion}",
  "main": "dist/index",
  "types": "dist/index",
  "description": "${projectDescription}",
  "scripts": {
    "build:dev": "webpack --mode development",
    "build": "webpack --mode production",
    "lint": "eslint src/* --ext .ts",
    "service": "nodemon",
    "test": "jest --config jest.config.js",
    "start": "node dist/index.js",
    "prepublishOnly": "yarn test && yarn build",
    "preversion": "yarn lint && yarn test",
    "postversion": "auto-changelog -p && git add CHANGELOG.md"
  },
  "files": [
    "dist/**/*"
  ],
  "publishConfig": {
    "access": "public"
  },
  "author": "${author}",
  "license": "${license.toUpperCase()}",
  "dependencies": {},
  "devDependencies": {}
}
`
  await writeFile(data.file, data.content)
}