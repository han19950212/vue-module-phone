const path    = require('path');
const webpack = require('webpack');
module.exports = {
  mode:'production',
  entry: {
      vendor: ['vue-router','vuex','vue/dist/vue.common.js','vue/dist/vue.js','vue']
  },
  output: {
    path: path.join(__dirname, 'dll'), // 生成的文件存放路径
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve('./', '[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
};