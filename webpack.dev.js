const webpack=require("webpack")
const path = require('path')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

module.exports={
	entry:{
		index:["babel-polyfill","./style/index.less","./.test.mongo.js", "./src/index.js"]
	},
	devtool: 'source-map',
	devServer:{
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		host: "0.0.0.0",
		port: 9081,
		disableHostCheck: true,
		overlay: {
			errors: true
		},
		stats:{
			warnings: false
		},
		setup(app){
			app.get("/app.apk.version",(req, res)=>res.json(require("./package.json").version))
		}
	}
}
