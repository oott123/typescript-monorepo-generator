const g = require('glob').sync
const fs = require('fs-extra')
const srcList = g('src/*/templates', { dot: true })
for (const src of srcList) {
  const dest = src.replace(/src/, 'generators')
  fs.copySync(src, dest)
}
