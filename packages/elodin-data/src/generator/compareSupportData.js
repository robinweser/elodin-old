const propertyMap = require('../modules/data/propertyMap')
const fullSupport = require('./fullSupport')
const partialSupport = require('./partialSupport')

const changedPartial = {}
const changedFull = {}

Object.keys(fullSupport).forEach((property) => {
  const mapValues = propertyMap[property]
  if (mapValues && mapValues.compatibility) {
    if (mapValues.compatibility.full) {
      Object.keys(fullSupport[property]).forEach((browser) => {
        if (
          mapValues.compatibility.full[browser] !=
          fullSupport[property][browser]
        ) {
          if (!changedFull[property]) {
            changedFull[property] = {}
          }
          changedFull[property][browser] = {
            old: mapValues.compatibility.full[browser],
            new: fullSupport[property][browser]
          }
        }
      })
    }
  }
})

Object.keys(partialSupport).forEach((property) => {
  const mapValues = propertyMap[property]
  if (mapValues && mapValues.compatibility) {
    if (mapValues.compatibility.partial) {
      Object.keys(partialSupport[property]).forEach((browser) => {
        if (
          mapValues.compatibility.partial[browser] !==
          partialSupport[property][browser]
        ) {
          if (!changedPartial[property]) {
            changedPartial[property] = {}
          }
          changedPartial[property][browser] = {
            old: mapValues.compatibility.partial[browser],
            new: partialSupport[property][browser]
          }
        }
      })
    }
  }
})

console.log('\nComparing caniuse data was successful.')
let error = false
if (Object.keys(changedPartial).length >= 1) {
  console.log('\n---- Partial Support changed: ---- \n')

  Object.keys(changedPartial).forEach((prop) => {
    console.log(`- ${prop}:`)
    Object.keys(changedPartial[prop]).forEach((browser) => {
      console.log(
        `\t${browser} (old: ${changedPartial[prop][browser]
          .old}, new: ${changedPartial[prop][browser].new})`
      )
    })
  })
  error = true
}
if (Object.keys(changedFull).length >= 1) {
  console.log('\n---- Full Support changed: ---- \n')

  Object.keys(changedFull).forEach((prop) => {
    console.log(`- ${prop}:`)
    Object.keys(changedFull[prop]).forEach((browser) => {
      console.log(
        `\t${browser} (old: ${changedFull[prop][browser]
          .old}, new: ${changedFull[prop][browser].new})`
      )
    })
  })
  error = true
}

if (error) {
  process.exit(1)
}

console.log('Caniuse data is up to date!')
process.exit(0)
