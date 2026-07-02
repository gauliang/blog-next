const path = require('path')

const pagesDir = path.join(__dirname, 'pages')

module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    '@next/next/no-img-element': 'off',
    '@next/next/no-page-custom-font': 'off',
    '@next/next/no-head-import-in-document': 'off',
    '@next/next/no-duplicate-head': 'off',
    '@next/next/no-html-link-for-pages': ['error', pagesDir]
  },
  settings: {
    next: {
      rootDir: __dirname
    }
  }
}
