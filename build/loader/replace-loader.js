'usr strict'
const fs = require('fs');

module.exports = function(content) {
  // if (this.resourcePath.indexOf('bg-city.jpg') > -1) {
  //   let result = require('url-loader').call({
  //     resourcePath: this.resourcePath.replace('bg-city.jpg', 'bg-dark.jpg')
  //   }, Buffer.from(fs.readFileSync(this.resourcePath.replace('bg-city.jpg', 'bg-dark.jpg'))));
  //   console.log('result: ', result);
  //   return result;
  // }
  // console.log('content: ', content);
  // return content;
  if (~this.resourcePath.indexOf('bg-city.jpg')) {
    console.log('path: ', this.resourcePath);
    const r = require('url-loader').call({
      ...this,
      resourcePath: this.resourcePath.replace('bg-city.jpg', 'bg-dark.jpg'),
    }, Buffer.from(fs.readFileSync(this.resourcePath.replace('bg-city.jpg', 'bg-dark.jpg'))))
    return r
  }
  return require('url-loader').call(this, content)
}