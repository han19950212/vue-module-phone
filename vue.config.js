const path = require('path')
//去除console.log()  开启多线程打包等等 压缩代码
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  // webpack配置
  chainWebpack: (config) => {
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'

      // 将每个依赖包打包成单独的js文件
      let optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name (module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({    //这个地方原本总是报错，最后把库降低成了4.2.3成功了。
                cache:true,  //使用缓存，加快我们构建速度
                parallel: 4,  //启动多线程 并设置进程的数量
                terserOptions:{
                    compress:{
                        unused:true,  //剔除没有用的代码
                        drop_debugger:true,  //删除项目中的debug
                        drop_console:true,  //删除项目中的console
                        dead_code:true,  //也是移除无用代码
                    }
                }
            })
        ],
      }
      Object.assign(config, {
        optimization
      })


    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
          '@p': path.resolve(__dirname, './src/pages')
        } // 别名配置
      }
    })
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // css相关配置
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
        css: {}, // 这里的选项会传递给 css-loader
        postcss: {} // 这里的选项会传递给 postcss-loader
    }, // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
    // requireModuleExtension: false //  启动这个vant的包会报错
  },
  parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0', // 允许外部ip访问
    port: 8080, // 端口
    https: false, // 启用https
    overlay: {
      warnings: true,
      errors: true
    }, // 错误、警告在页面弹出
    proxy: {
        '/api': {
            // 目标 API 地址
            target: process.env.VUE_APP_URL,
            // 如果要代理 websockets
            ws: false,
            changeOrigin: true, // 允许websockets跨域
            pathRewrite: {
              '/api/proxy': ''
            }
          }
    }, // 代理转发配置，用于调试环境
    disableHostCheck: true,
  },
  // 第三方插件配置
  pluginOptions: {}
}

