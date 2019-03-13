const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //css分离工具
const ProgressBarPlugin = require("progress-bar-webpack-plugin"); //打包显示进度条
const HtmlWebpackPlugin = require('html-webpack-plugin'); //动态生成html
const CleanWebpackPlugin = require('clean-webpack-plugin'); //每次打包删除之前的文件
const Uglifyjs=require('uglifyjs-webpack-plugin')//压缩工具
// const WebpackDevServer=require('webpack-dev-server');//这个是开发用的服务器
module.exports = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name]_[hash].js',
        libraryTarget: "umd"
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.less$/,
                // exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    // 注意 1
                    fallback: {
                        loader: "style-loader"
                    },
                    use: [{
                            loader: "css-loader",
                        },
                        {
                            loader: "less-loader"
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                use: [
                     {
                         loader: 'style-loader'  // 可以把css放在页面上
                     },
                     {
                         loader: 'css-loader'    // 放在后面的先被解析
                     }
                ]
            },
            {
                test: /\.scss$/,
                // exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    // 注意 1
                    fallback: {
                        loader: "style-loader"
                    },
                    use: [{
                            loader: "css-loader",
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                })
            }

        ]
    },
    // devtool: 'source-map',
    //不生成map文件
    // productionSourceMap:false,
    //     //配置开发服务器
    //     devServer: {
    //     // contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')],
    //     compress:true,
    //     port: 8080,
    //     hot:true,
    //     inline:true,

    //   },
    resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
    plugins: [
        new ExtractTextPlugin("css/[name]_[hash].css"),
        new ProgressBarPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html'),
            inject: 'body',
        }),
        new CleanWebpackPlugin(['dist'],{
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false
        }),
        // new Uglifyjs()
        // new WebpackDevServer()
    ],
    //跨域设置
    // proxy: "http://b4s3yp.natappfree.cc"

}
