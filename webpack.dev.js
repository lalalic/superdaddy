require("babel-register")

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {ContextReplacementPlugin} = require("webpack")

module.exports=(base,HTML,port=require("./package.json").config.devPort)=>{
	return {
		...base,
		entry:{
			www:["babel-polyfill","./src/www/browser.js"],
			app:["babel-polyfill","./.test.js","./src/index.js"],
		},
		devtool: 'source-map',
		devServer:{
			contentBase: path.join(__dirname, "dist"),
			port,
			host:"0.0.0.0",
			disableHostCheck:true,
			before(app){
				app.get("/app.apk.version",(req, res)=>res.json(require("./package.json").version))
				app.get("/knowledges/5cff754e2d060d2a0cb706a7/index.js",(req,res)=>{
					res.setHeader("content-type", "text/javascript")
					require("fs").createReadStream("./dist/knowledge/math-float.js").pipe(res)
				})
			},
			historyApiFallback:true,
			
			proxy:{
				"/www":{
					target:"http://localhost:9080",
					pathRewrite:{
						"/www":"/1/5746b2c5e4bb3b3700ae1566/static",
					},
					changeOrigin:true
				}
			}
		},
		plugins:[
			new ContextReplacementPlugin(/graphql-language-service-interface[\/\\]dist/, /\.js$/),
			new ContextReplacementPlugin(/transformation[\/\\]file/, /\.js$/),
			new ContextReplacementPlugin(/source-map[\/\\]lib/, /\.js$/),

			new HtmlWebpackPlugin({
				...HTML,
				chunks:["app"],
			}),

			new HtmlWebpackPlugin({
				...HTML,
				extra:'<script type="text/javascript" src="cordova.js"></script>',
				filename:"cordova.html",
				chunks:["app"],
			})
		]
	}
}
