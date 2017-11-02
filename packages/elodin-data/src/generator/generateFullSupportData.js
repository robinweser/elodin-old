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
        // only add if version is available
        if (versions[browser].y) {
          supportData[prop][browser] = versions[browser].y
        }
      }
    })
  }

  supportData.animationFillMode.android = 2.4
  return `var fullSupport = ${JSON.stringify(
    supportData
  )}; module.exports = fullSupport`
}
fs.writeFile('./src/data/compatibilityFull.js', gatherInformation(), (err) => {
  if (err) {
    throw err
  }
  console.log('Successfully generated full support data.')
})
