var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require("webpack");
var noVisualization = process.env.NODE_ENV === 'production' || process.argv.slice(-1)[0] == '-p'

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
		chunkFilename:"[name]-[chunkhash].js",
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
	plugins:[
		new webpack.ContextReplacementPlugin(/graphql-language-service-interface[\/\\]dist/, /\.js$/),
		/*
		!noVisualization ? new BundleAnalyzerPlugin({analyzerMode: 'static' }) : null,
		
		new webpack.optimize.CommonsChunkPlugin({
		  name: 'common',
		  minChunks: ({context, resource }) => /node_modules/.test(resource),
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['docx-template'],
			minChunks: ({context, resource }) => /(docx4js|docx-template|jszip|escodegen)/.test(resource),
		}),
		new webpack.optimize.CommonsChunkPlugin('manifest'),
		new HtmlWebpackPlugin({
			title:"超级奶爸",
		})*/
	].filter(p=>!!p),
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
