const path = require('path')
const HappyPack = require('happypack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const os = require('os')
const threadPool = HappyPack.ThreadPool({
  // 根据当前计算机的 CUP 数量来决定进程池的进程数量
  size: os.cpus().length
})
module.exports = {
   resolve: {
     alias: {
       '@': path.resolve(__dirname, '../src')
     },
     extensions: ['.ts','.mjs', '.js', '.svelte', '.less','.css'],
   },
  // 生成 Source Map 文件
  devtool: 'eval-source-map',
  entry: './src/main.ts',

  output: {

    path: path.join(__dirname, '../dist'),
    filename: 'bundle.[fullhash].js'
  },
  optimization:{
      // 是否删除未被使用到的导出内容
      usedExports: true,
      // 是否开启代码压缩
      minimize: true,
      // 作用域提升
      concatenateModules:true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, {
          loader:'css-loader',
          options:{
            modules:true
          }
        },{
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                'postcss-import',
                ["postcss-preset-env", {
                  browsers: ['last 2 versions']
                }]
              ],
            },}
        }]
      },
      {
        // 正则匹配less
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, {
          loader:'css-loader',
          options:{
            modules:true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                'postcss-import',
                ["postcss-preset-env", {
                  browsers: ['last 2 versions']
                }]
              ],
            },}
        },'less-loader',]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: "asset"
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.ts$/,
        loader:'ts-loader'
        // 使用tsloader 运行ts文件
      },
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          },
        },
        exclude: /(node_modules|bower_components)/,
        use: 'happypack/loader?id=happyBabel'
      },
    
      {
        // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),

    new HtmlWebpackPlugin({
      // 模板html文件路径
      template: './public/index.html'
    }),
    new ESLintPlugin({
        // 是否尝试自动修复
        fix: true
      }),
      new StyleLintPlugin({
        // 是否尝试自动修复
        fix: false
      }),
    new CleanWebpackPlugin(),

    new CssMinimizerPlugin(),
    new HappyPack({
      id: 'happyBabel',
      loaders: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }],
      threadPool,
      verbose: true
    })
  ],
}
