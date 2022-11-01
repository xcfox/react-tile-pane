/* eslint-disable */
import glob from 'glob'
import * as fs from 'fs'
import shell from 'shelljs'

const outDir = "dist"
const themeOutDir = "theme"

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true })
}

if (fs.existsSync(themeOutDir)) {
  fs.rmSync(themeOutDir, { recursive: true })
}

shell.exec("yarn rollup -c")
shell.exec("yarn tsc -p tsconfig.pack.json")
shell.exec("yarn tsc -p tsconfig.theme.json")

if (fs.existsSync(outDir + '/components')) {
  fs.rmSync(outDir + '/components', { recursive: true })
}

// copy css files
const staticFiles = glob.sync("src/theme/**/*.{css,json}")
staticFiles.forEach((file) => {
  console.debug('copy: ', file)
  const dest = file.slice().replace('src/', `${outDir}/`)
  const destPath = dest.split("/")
  destPath.pop()
  makeDir(destPath.join("/"))
  fs.copyFileSync(file, dest)
})

const files = glob.sync(`${outDir}/theme/**/*.{js,ts}`)
files.forEach((file) => {
  console.log('rewrite: ', file)
  rewrite(file, c =>
    c.replaceAll("require('components')", "require('react-tile-pane')")
      .replaceAll("from 'components'", "from 'react-tile-pane'")
  )
})

// move theme folder
shell.mv(`${outDir}/theme`, themeOutDir)

function makeDir(dir = "") {
  const folders = dir.split("/")
  let next = folders.shift()
  let path = ''
  while (next) {
    path += path.length ? ("/" + next) : next
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }
    next = folders.shift()
  }
}

function rewrite(path, fn = (c = "") => c) {
  const contentBefore = fs.readFileSync(path).toString()
  const content = fn(contentBefore)
  fs.writeFileSync(path, content)
}
