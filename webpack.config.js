var path = require('path');
var webpack = require("webpack");

module.exports={
	entry:"./src/index.js",
	output:{
		filename:"index.js",
		path:path.resolve(__dirname, 'dist')
	},
	module:{
		loaders:[{
			test: /.js?$/,
			loaders: ['react-hot-loader','babel-loader'],
			exclude: /node_modules/
		},{
			test:/.html?$/,
			loader: "file-loader?name=[name].[ext]"
		},{
			test:/.less?$/,
			use: [
				'style-loader',
				{ loader: 'css-loader', options: { importLoaders: 1 } },
				'less-loader'
			]
		}]
	},
	node:{
		fs: "empty"
	},
	devServer:{
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9081
	}
}