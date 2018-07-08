const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	devtool: 'source-map',
	entry: './src/app.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {

		rules: [
			{
				test: /\.(jpg|png)$/,
				loader: 'url-loader?name=img/[name].[ext]'
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts/'
					}
				}]
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
			template: "./src/screens/home/index.html",
			filename: "index.html"
		})
	]
}