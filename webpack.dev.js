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
			before(app){
				app.get("/app.apk.version",(req, res)=>res.json(require("./package.json").version))
				app.get("/knowledges/5cfdc681cda230ef1c396a4e/index.js",(req,res)=>{
					res.setHeader("content-type", "text/javascript")
					require("fs").createReadStream("./dist/knowledge/math.js").pipe(res)
				})
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
