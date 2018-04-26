const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {ContextReplacementPlugin} = require("webpack")

module.exports=(base,HTML,port=require("./package.json").config.devPort)=>{
	return {
		...base,
		entry:{
			index: ["babel-polyfill","./.test.js","./src/index.js"],
		},
		devtool: 'source-map',
		devServer:{
			contentBase: path.join(__dirname, "dist"),
			port,
			host:"0.0.0.0",
			disableHostCheck:true,
			setup(app){
				app.get("/app.apk.version",(req, res)=>res.json(require("./package.json").version))
			}
		},
		plugins:[
			new ContextReplacementPlugin(/graphql-language-service-interface[\/\\]dist/, /\.js$/),
			new ContextReplacementPlugin(/transformation[\/\\]file/, /\.js$/),
			new ContextReplacementPlugin(/source-map[\/\\]lib/, /\.js$/),
			
			new HtmlWebpackPlugin({
				...HTML
			}),

			new HtmlWebpackPlugin({
				...HTML,
				extra:'<script type="text/javascript" src="cordova.js"></script>',
				filename:"cordova.html",
			})

		]
	}
}
