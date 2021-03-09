const writeFile = require('../utils/writeFile')
const titleCase = require('../utils/titleCase')

module.exports = async (projectName, projectDescription) => {
  const data = {
    readmeContent: `
    [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
    
    # ${titleCase(projectName)}\n\n${projectDescription}.\n`,
    readmeFile   : 'readme.md'
  }
  
  await writeFile(data.readmeFile, data.readmeContent)
}
