var caniuse = require('caniuse-api');
var searchMap = require('./searchMap');
var fs = require('fs');

var browsers = [ 'chrome', 'safari', 'firefox', 'opera', 'ie', 'edge', 'ios_saf', 'android', 'and_chr', 'and_uc', 'op_mini', 'ie_mob' ];

function gatherInformation() {
  var supportData = { };
  var search;
  for (search in searchMap) {
    var properties = searchMap[search];
    var versions = caniuse.getSupport(search, true);
    if (properties instanceof Array !== true) {
      properties = [ properties ];
    }
    properties.forEach(function(prop) {
      if (!supportData[prop]) {
        supportData[prop] = { }
      }
      var browser;
      for (browser in versions) {
        supportData[prop][browser] = versions[browser].n || 0
      }
    })
  }
  return 'var partialSupport = ' + JSON.stringify(supportData) + '; module.exports = partialSupport';
}
fs.writeFile('./generator/partialSupport.js', gatherInformation(), function(err) {
  if (err) {
    throw err;
  }
  console.log('Successfully generated partial support data.');
  console.log('Support following browser: ', browsers.join(', '));
})
