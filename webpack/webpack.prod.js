const {merge} = require('webpack-merge');
const path= require('path')
const common = require('./webpack.common.js')
const webpack  = require('webpack')

// 压缩js
const TerserPlugin = require('terser-webpack-plugin');

//可视化打包结果优化
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

//开启Scope Hosting 作用：把所有的函数放到一个作用域里面，在上线模式使用
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')

module.exports=merge(common,{
    mode:'production',


     //显示原始源代码，使用这个，才能开启多线程压缩
     devtool:'source-map',



     //optimization是webpack4新增的，专门用来分割代码用的。
    optimization:{  //设置chunks  代码分割
        splitChunks:{ 
            chunks:'all',  //设置为all代表分离公共代码和第三方代码，
            minChunks:1, //设置如果一个文件多余1次被多次引用，就只引用一次

            // 缓存分组
            cacheGroups: {
                vendors: {  //自定义打包模块
                    test: /[\\/]node_modules[\\/]/, 
                    priority: 1, //优先级，先打包到哪个组里面，值越大，优先级越高
                    filename: 'vendors.js',
                    minChunks:1 //最少复用几次
                  },

                  //抽离出来的公共模块
                common:{
                    name:'common',  //chunk的名称
                    priority:0, //优先级
                    minChunks:2 //公共模块最少复用过几次
                }
            },
           
        },
        
   
        // 压缩js  uglifyJs是专门用来多线程压缩js代码用的，
        minimize: true,
        minimizer: [
            new TerserPlugin({
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
        
    },
    plugins:[
        new ModuleConcatenationPlugin(),
        new BundleAnalyzer()
    ]
})