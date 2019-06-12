'usr strict'
const fs = require('fs');

module.exports = function(content) {
  if (this.resourcePath.indexOf('bg-city.jpg') > -1) {
    let result = require('url-loader').call({
      resourcePath: this.resourcePath.replace('bg-city.jpg', 'bg-dark.jpg')
    }, Buffer.from(fs.readFileSync(this.resourcePath.replace('bg-city.jpg', 'bg-dark.jpg'))));
    console.log(result);
    return result;
  }
  return content;
}