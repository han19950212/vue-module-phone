
const {merge} = require('webpack-merge');
const path= require('path')
const common = require('./webpack.common.js')
const webpack  = require('webpack')



module.exports=merge(common,{
    mode:'development',  //生产环境
    watch:true,  //开启监听，热更新

    watchOptions:{
      ignored:/node_modules/,  //忽略node_modules
      aggregateTimeout:300,  //改变代码后，300毫米后再去监听，节流功能
      poll:1000,  //每个1s查看，文件是否有改变
    },

    devServer:{  //开启本地服务器
        // contentBase:'../public',  //从哪个地方开启服务
        // publicPath:'./',
        compress:true,  //开启gzip压缩功能
        hot:true,   //开启热更新
        open:false,  //自动开启浏览器
        port:8801,  //默认开启的端口
        proxy:{
          //开启跨域，将本地的/api代理到3000端口号
          // '/api':'http://localhost:3000'
        }
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                     /* 
                    开启多进程打包。 
                    进程启动大概为600ms，进程通信也有开销。
                    只有项目超级大，才需要多进程打包
                  */
                  {
                    loader: 'thread-loader',   //重点
                    options: {
                      workers: 2 // 进程2个
                    }
                  },
                ],
                     // 排除 node_modules 目录下的文件
                 exclude: /node_modules/
            }
        ],
    },

    plugins:[
        new webpack.NamedChunksPlugin(),  //给打包的模块，命名的
        new webpack.HotModuleReplacementPlugin(), //启动热更新 
       
    ] 
})