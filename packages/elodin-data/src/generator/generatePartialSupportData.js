const caniuse = require('caniuse-api')
const searchMap = require('./searchMap')
const fs = require('fs')

function gatherInformation() {
  const supportData = {}
  let search
  for (search in searchMap) {
    let properties = searchMap[search]
    var versions = caniuse.getSupport(search, true)
    if (properties instanceof Array !== true) {
      properties = [properties]
    }
    properties.forEach((prop) => {
      if (!supportData[prop]) {
        supportData[prop] = {}
      }
      let browser
      for (browser in versions) {
        supportData[prop][browser] = versions[browser].n || 0
      }
    })
  }
  return `var partialSupport = ${JSON.stringify(
    supportData
  )}; module.exports = partialSupport`
}
fs.writeFile('./src/data/compatibilityPartial.js', gatherInformation(), (err) => {
  if (err) {
    throw err
  }
  console.log('Successfully generated partial support data.')
})
