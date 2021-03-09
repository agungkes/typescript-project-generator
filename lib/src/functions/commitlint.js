const writeFile = require('../utils/writeFile')

module.exports = async () => {
  const data = {
    content: `module.exports = { extends: ['@commitlint/config-conventional'] }
    `,
    file: 'commitlint.config.js',
  }

  await Promise.all([
    writeFile(data.file, data.content),
  ])
}
