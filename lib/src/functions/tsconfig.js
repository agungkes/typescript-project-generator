const writeFile = require('../utils/writeFile')

module.exports = async () => {
  const data = {
    tsconfigContent: `{
  "extends": "./node_modules/gts/tsconfig-google.json",
  "compilerOptions": {
    "rootDir": ".",
    "outDir": "dist"
  },
  "include": ["./src/**/*.ts"]
}
`,
    tsconfigFile: 'tsconfig.json'
  }

  await writeFile(data.tsconfigFile, data.tsconfigContent)
}