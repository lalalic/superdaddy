const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const {ContextReplacementPlugin} = require("webpack")

module.exports=env=>Object.assign({
	entry:{
		index:["babel-polyfill","./style/index.less","./src/index.js"]
	},
	output:{
		filename:"[name].js",
		path:path.resolve(__dirname, 'dist')
	},
	devtool:false,
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
	},
	node:{
		fs: "empty",
		net: "empty",
		module: "empty"
	},
	plugins:[
		new ContextReplacementPlugin(/graphql-language-service-interface[\/\\]dist/, /\.js$/),
		new HtmlWebpackPlugin({
			template: './dist/index.tmpl',
			title:"爸爸在",
			favicon: "./dist/favicon.ico",
			inject:true,
		}),
		new HtmlWebpackPlugin({
			template: './dist/index.tmpl',
			title:"爸爸在",
			favicon: "./dist/favicon.ico",
			extra: `<script type="text/javascript" src="cordova.js"></script>`,
			filename:"cordova.html",
		}),
	]
}, env ? require(`./webpack.${env}.js`) : {})
