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
    ],
    // webpack-dev-server
    devtool: 'eval',
    devServer: {
        contentBase: __dirname + '/src', // 当前服务器监听的路径
        hot: true,  // 热更新
        port:8080,  // 定义端口号
        host: 'localhost',
        open:true,    // 是否自动打开浏览器
        // openPage:''
    }
}