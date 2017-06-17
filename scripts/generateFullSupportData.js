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
        if (versions[browser].y) {
          supportData[prop][browser] = versions[browser].y
        }
      }
    })
  }

  supportData.animationFillMode.android = 2.4
  return 'var fullSupport = ' + JSON.stringify(supportData) + '; module.exports = fullSupport';
}
fs.writeFile('./generator/fullSupport.js', gatherInformation(), function(err) {
  if (err) {
    throw err;
  }
  console.log('Successfully generated full support data.');
  console.log('Support following browser: ', browsers.join(', '));
})
