const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const {ContextReplacementPlugin} = require("webpack")
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

const HTML={
	template:'./node_modules/qili-app/index.tmpl',
	title:"激励馆",
	favicon: "./dist/images/icon.png",
}

module.exports=env=>{
	const base={
		entry:{
			app:["@babel/polyfill","./src/index.js"],
			index:["@babel/polyfill","./src/www/browser.js"]
		},
		output:{
			filename:"[name].js",
			path:path.resolve(__dirname, 'dist'),
			chunkFilename: '[name].js',
			devtoolNamespace:"superdaddy"
		},
		devtool:false,
		module:{
			rules:[{
				test: /.js?$/,
				use: 'source-map-loader',
				enforce:"pre",
			},{
				test: /.js?$/,
				use: 'babel-loader',
				exclude: /node_modules/,
				include: /src/,
			},{
				test:/.less?$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader',
				]
			},{
				test:/.graphql?$/,
				use: 'text-loader'
			},{
				test:path.resolve("./cloud","index.js"),
				use: "imports-loader?Cloud=qili-app/makeOfflineSchema"//path relative to test
			}]
		},
		resolve:{
			alias:{
				remount:"remount/dist/remount.es5"
			}
		},
		node:{
			fs: "empty",
			net: "empty",
			module: "empty"
		},
		mode:"production",
		plugins:[
			new ContextReplacementPlugin(/graphql-language-service-interface[\/\\]dist/, /\.js$/),
			new ContextReplacementPlugin(/transformation[\/\\]file/, /\.js$/),
			new ContextReplacementPlugin(/source-map[\/\\]lib/, /\.js$/),
			new HtmlWebpackPlugin({
				...HTML,
				inlineSource: 'app.js$',
				chunks:["app"],
				minify:true,
			}),

			new HtmlWebpackPlugin({
				...HTML,
				extra:'<script type="text/javascript" src="cordova.js"></script>',
				inlineSource: 'app.js$',
				filename:"cordova.html",
				chunks:["app"],
			}),

			new HtmlWebpackInlineSourcePlugin(),

		]
	}

	if(env){
		return require(`./webpack.${env}.js`)(base,HTML)
	}

	return base
}
