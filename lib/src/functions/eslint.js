const writeFile = require('../utils/writeFile')

module.exports = async () => {
  const data = {
    eslintContent: `module.exports = {
  extends: [
    './node_modules/gts',
    'plugin:typescript-sort-keys/recommended'
  ],
  plugins: [
    'typescript-sort-keys', 
    'sort-keys-fix',
    'simple-import-sort',
    'import'
  ],
  rules: {
    'sort-keys': 'error',
    'sort-keys-fix/sort-keys-fix': 'warn',
    'simple-import-sort/imports': [ 'error',
      {
        'groups': [
          [
              '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)'
          ],

          // Packages. next or react related packages come first.
          ['^(next|react)', '^@?\\w'],

          // Internal packages.
          [
              '^(@components|@utils|@hooks|@features|@screens|@hooks|@contexts|@ui)(/.*|$)'
          ],

          // Side effect imports.
          ['^\\u0000'],

          // Parent imports. Put .. last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

          // Other relative imports. Put same-folder imports and \`.\` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

          // Style imports.
          ['^.+\\.s?css$']
        ]
      }
    ],
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off',
    'import/order': 'off'
  }
}
`,
    eslintFile: '.eslintrc.js',
    eslintIgnoreContent: `/dist
.eslintrc.js
webpack.config.js
`,
    eslintIgnoreFile: '.eslintignore'
  }

  await Promise.all([
    writeFile(data.eslintFile, data.eslintContent),
    writeFile(data.eslintIgnoreFile, data.eslintIgnoreContent)
  ])
}
