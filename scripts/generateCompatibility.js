import searchMap from './searchMap'
import fs from 'fs'

const caniuse = require('caniuse-api')

function gatherInformation() {
  const compatibility = { }

  Object.keys(searchMap).forEach(key => {
    const props = [ ].concat(searchMap[key])
    const versions = caniuse.getSupport(key, true)

    props.forEach(property => {
      if (!compatibility[property]) {
        compatibility[property] = {
          partial: { },
          full: { }
        }
      }

      Object.keys(versions).forEach(browser => {
        compatibility[property].partial[browser] = versions[browser].n || 0
        compatibility[property].full[browser] = versions[browser].y || Object.keys(versions[browser]).length === 0 && 0
      })
    })
  })

  compatibility.animationFillMode.android = 2.4
  return compatibility
}

const file = 'export default ' + JSON.stringify(gatherInformation(), null, 2)
fs.writeFile('./modules/data/compatibility.js', file.replace(/"/g, ''), err => {
  if (err) {
    throw err
  }
  console.log('Successfully generated full support data.')
})
