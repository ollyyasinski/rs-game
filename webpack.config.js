const path = require('path');

module.exports = {
	devtool: 'source-map',
  entry: './js/script.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
  	rules: [
  		{
  			test: /\.js/,
  			use:[
  				{
  					loader: 'babel-loader'
  					//preserts: ["env"] 
  				}
  			] 
  		}
  	]
  }
}