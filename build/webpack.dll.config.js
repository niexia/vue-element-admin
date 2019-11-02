const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
  entry: {
    // 项目中用到第三方库
    vendor: [
      'echarts',
      'element-ui',
      'vue',
      'vue-infinite-scroll',
      'vue-router'
    ]
  },
  output: {
    filename: '[name].dll.js', 
    path: path.resolve(__dirname, 'dist'),
    // 存放相关的dll文件的全局变量名称，加上hash是为了防止全局变量冲突。
    library: '[name]_[hash]'
  },
  plugins: [
    new DllPlugin({
      // 该插件的name属性值需要和 output.library保存一致，该字段值，也就是输出的 manifest.json文件中name字段的值。
      name: '[name]_[hash]',
      // 生成manifest文件输出的位置和文件名称
      path: path.join(__dirname, 'dist', '[name].manifest.json'),
      context: __dirname
    })
  ]
};