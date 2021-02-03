
const writeFile = require('../utils/writeFile')

module.exports = async () => {
  const data = {
    jestConfigContent: `module.exports = {
        moduleFileExtensions: ['ts', 'js', 'json', 'node'],
        testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)s$',
        transform: {
          '^.+\\.(t|j)s$': 'ts-jest'
        }
      }
      `,
    jestConfigFile: 'jest.config.js'
  }

  await Promise.all([
    writeFile(data.jestConfigFile, data.jestConfigContent),
  ])
}
