var path = require('path');
var webpack = require("webpack");

module.exports={
	entry:"./src/index.js",
	output:{
		filename:"index.js",
		path:path.resolve(__dirname, 'dist')
	},
	module:{
		rules:[{
			test: /\.js$/,
			use: ["source-map-loader"],
			enforce: "pre",
			include:/(qili-app|docx4js)/
		  },{
			test: /.js?$/,
			use: ['react-hot-loader','babel-loader'],
			exclude: /node_modules/,
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