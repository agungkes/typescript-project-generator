const writeFile = require('../utils/writeFile')

module.exports = async (
  author,
  projectName,
  projectDescription,
  projectVersion,
  license,
  mainFile
  ) => {
  const data = {
    content    : '',
    file       : 'package.json'
  }

  data.content = `{
  "name": "${projectName.toLowerCase().replace(/ /g, '-')}",
  "version": "${projectVersion}",
  "main": "${mainFile}",
  "types": "dist/index.d.ts",
  "description": "${projectDescription}",
  "scripts": {
    "build:dev": "webpack --mode development",
    "build": "webpack --mode production",
    "lint": "eslint src/* --ext .ts",
    "service": "nodemon",
    "start": "node dist/index.js",
    "prepare": "yarn build",
    "postversion": "git push --follow-tags"
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