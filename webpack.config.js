var path = require('path');
var webpack = require("webpack");

function envwebpack(env){
	try{
		return require(`./webpack.${env}.js`)
	}catch(e){
		return {}
	}
}

const Mine="qili-app|docx4js|docx-template".split("|")

module.exports=env=>Object.assign({
	entry:{
		index:["babel-polyfill","./src/index.js"],
		tv: ["babel-polyfill","./src/tv/index.js"],
	},
	output:{
		filename:"[name].js",
		path:path.resolve(__dirname, 'dist')
	},
	devtool: 'source-map',
	module:{
		rules:[{
			test: /\.js$/,
			use: ["source-map-loader"],
			enforce: "pre",
			include:/(qili-app|docx4js|docx-template)/
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
	externals:{

	},
	node:{
		fs: "empty"
	},
	devServer:{
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9081,
		overlay: {
			errors: true
		}
	}
}, envwebpack(env))
