const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: './js/script.js',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: './build/'
	},
	module: {
		rules: [
			{
				test: /\.(jpg|png)$/,
				loader: 'file-loader?name=/fonts/[name].[ext]'
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
						//preserts: ["env"] 
					}
				]
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	]
}