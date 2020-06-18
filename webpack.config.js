const path = require("path")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const isDev = process.NODE_ENV === "development"
const isProd = !isDev


module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: ["@babel/polyfill", "./index.js"],
    devServer: {
        port: 3000,
        hot: isDev
    },
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".js", ".scss"],
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@core": path.resolve(__dirname, "src/core")
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({template: "index.html", minify: {removeComments: isProd, collapseWhitespace: isProd}}),
        new MiniCssExtractPlugin({filename: "bindle.[hash].css"}),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'sass-loader'
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                  loader: 'babel-loader',
                  options: {
                    plugins: ["@babel/plugin-proposal-class-properties"]
                  }
                }
              }
        ]
    }
}