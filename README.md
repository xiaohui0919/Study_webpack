# webpack 笔记

## 为什么使用 webpack？

1. 对 CommonJS 、 AMD 、ES6的语法做了兼容
2. 对js、css、图片等资源文件都支持打包
3. 串联式模块加载器以及插件机制，让其具有更好的灵活性和扩展性，例如提供对CoffeeScript、ES6的支持
4. 有独立的配置文件webpack.config.js
5. 可以将代码切割成不同的chunk，实现按需加载，降低了初始化时间
6. 支持 SourceUrls 和 SourceMaps，易于调试
7. 具有强大的Plugin接口，大多是内部插件，使用起来比较灵活
8.webpack 使用异步 IO 并具有多级缓存。这使得 webpack 很快且在增量编译上更加快

## 引入webpack依赖

在项目根目录打开命令窗口引入项目依赖，全局安装

`npm  install  webpack  -g // 全局安装webpack`

## 创建配置文件

在项目根目录创建三个或多个webpack配置文件

（1）webpack.base.config.js  //公用的配置放在这里面（可通过插件继承）

（2）webpack.develop.config.js  //开发环境中用到的配置文件

（3）webpack.publish.config.js   //生产环境中用到的配置文件


## webpack基本使用

```javascript
// 导入路径模块
var path=require('path')
var webpack=require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    // 配置要打包的文件入口和打包到哪里的文件出口
    entry:path.join(__dirname , 'src/main.js'),
    output:{
        path:path.join(__dirname , 'dist'),
        filename:'bundle.js'
    },
    // 添加加载器
    module:{
        rules:[ // 数组中存放加载器的配置信息
            // vue-loader 加载器用于解析vue文件
            {
                test:/\.vue$/,
                use:'vue-loader'
            },
            // css-loader 加载器用于解析css文件
            // {
            //     test: /\.css$/,
            //     use: [ 'style-loader', 'css-loader' ]
            // },
            // 下面用于提取css插件写法
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            // babel-loader 加载器用于ES6转ES5
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,//过滤不加载的文件
                //include: /(node_modules|bower_components)/, //跟上句相反
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            // 处理图片的加载器，使用的是url-loader和file-loader
            {
               test: /\.(png|jpg|gif|jpeg)$/,
               use: [
                   {
                       loader: 'url-loader',
                       options: {
                           limit: 90000
                      }
                  }
              ]
            }
            //{
            //    test: /\.(png|jpg|gif|jpeg)$/,
            //    use: [
            //        {
            //            loader: 'url-loader?limit=8192',
            //       }
            //   ]
            //}
        ]
    },
    plugins:[
        // 压缩的插件,但是我们一般不用,用-p
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        // 提取css的插件 （从 bundle.js中提取）
        new ExtractTextPlugin("app.css"),
        // 自动生成html文件插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            htmlWebpackPlugin: {
                "files": {
                    "css":["app.css"],
                    "js": ["bundle.js"]
                }
            },
            // 压缩
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
    ]
}
```

## Npm的script的使用
1、你首先需要安装webpack，这时候不全局安装

`npm i webpack --save`

2、配置npm的package.json文件中

```json
"scripts" : {
  	"test": "echo \"Error: no test specified\" && exit 1",
  	"develop": "webpack --config webpack.develop.config.js",
  	"publish": "webpack --config webpack.publish.config.js"
}
```
3、在根目录打开的命令窗口运行

`npm  run  develop`

