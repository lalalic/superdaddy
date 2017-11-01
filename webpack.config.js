var path = require('path');
var webpack = require("webpack");

function envwebpack(env){
	try{
		return require(`./webpack.${env}.js`)
	}catch(e){
		return {}
	}
}

module.exports=env=>Object.assign({
	entry:{
		index:["babel-polyfill","./style/index.less","./src/index.js"],
		//tv: ["babel-polyfill","./src/tv/index.js"],
		//parser: "./src/knowledge/parse.js"
	},
	output:{
		filename:"[name].js",
		path:path.resolve(__dirname, 'dist')
	},
	devtool: 'source-map',
	module:{
		rules:[{
			test: /.js?$/,
			use: ['react-hot-loader','babel-loader'],
			include: a=>a.indexOf("node_modules")==-1 || 
				/node_modules[\\\/](qili-app|docx4js|docx-template)[\\\/]src/.test(a),
		},{
			test:/.less?$/,
			use: [
				'style-loader',
				{ loader: 'css-loader', options: { importLoaders: 1 } },
				'less-loader'
			]
		}]
	},/*
	resolve:{
		alias:{
			qili: path.resolve(__dirname, 'node_modules/qili-app/src/'),
		}
	},*/
	node:{
		fs: "empty",
		net: "empty",
		module: "empty"
	},
	plugins:[new webpack.ContextReplacementPlugin(/graphql-language-service-interface[\/\\]dist/, /\.js$/)],
	devServer:{
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9081,
		overlay: {
			errors: true
		},
		stats:{
			warnings: false
		}
	}
}, envwebpack(env))
