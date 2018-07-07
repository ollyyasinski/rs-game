const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	// devtool: 'source-map',
	entry: './src/script.js',
	// output: {
	// 	path: path.join(__dirname, 'build'),
	// 	filename: 'bundle.js',
	// 	publicPath: './build/'
	// },
	// devServer: {
	// publicPath: "./build/",
	// 	contentBase: path.join(__dirname, '/'),
	// 	watchContentBase: true,
	// 	hot: true
	// },
	module: {
		rules: [
			{
				test: /\.(jpg|png)$/,
				loader: 'file-loader?name=/assets/img/**/[name].[ext]'
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file-loader?name=/fonts/[name].[ext]'
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader?url=false"
				]
			},
			{
				test: /\.js$/,
				exclude: [path.resolve(__dirname, 'node_modules')],
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.html$/,
				use: [{
					loader: "html-loader"
				}
				]
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new HtmlWebpackPlugin({
			template: "index.html",
			filename: "./index.html"
		})
	]
}