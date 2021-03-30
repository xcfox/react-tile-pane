/* eslint-disable */
const fs = require('fs')
const path = require('path')
const { ncp } = require('ncp')

ncp.limit = 16;

const filePath = path.resolve(__dirname, "../build/index.html")
const source = path.resolve(__dirname, "../build")
const destination = path.resolve(__dirname, "../docs/demo")

const buff = fs.readFileSync(filePath)
const html = buff.toString('utf-8')
console.log(html)
const demoPage = html
  .replace("=\"/", "=\"./")
  .replace("=\"/", "=\"./")
  .replace("=\"/", "=\"./")
  .replace("=\"/", "=\"./")
  .replace("=\"/", "=\"./")
  .replace("=\"/", "=\"./")
  .replace("=\"/", "=\"./")

fs.writeFileSync(filePath, demoPage)


ncp(source, destination, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('done!');
});