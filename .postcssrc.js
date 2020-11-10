// postcss浏览器兼容配置文件 
//同时做一些 适配屏幕的比例
const path = require('path')
module.exports =({ file }) =>  {

  //如果读取到了vant，则设置为375固定宽度
  const designWidth = file.dirname.includes(path.join('node_modules', 'vant')) ? 375 : 750;

    return{
        // parser: 'postcss-scss',
        plugins: {
          'autoprefixer':{
            overrideBrowserslist: ["last 5 version", ">1%", "ie >=8"]  //兼容ie8
          },
          "postcss-aspect-ratio-mini": {}, // 主要用来处理元素容器宽高比
          "postcss-write-svg": { utf8: false }, // 用来画1像素线
          // "postcss-cssnext": {},  //css兼容性用的
          "postcss-viewport-units":{},  //使用这个插件，可以避免ios下面的img标签，添加上class
          'postcss-px-to-viewport': {
            unitToConvert: "px", // 要转化的单位
            viewportWidth: designWidth, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750 
            propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置 
            unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除） 
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw 
            selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名 
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值 
            mediaQuery: false, // 允许在媒体查询中转换`px`
            unitToConvert: "px", // 要转化的单位
            exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
            landscape: false // 是否处理横屏情况
          }
        }
    }
      
  }
  