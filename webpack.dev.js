const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin=require('html-webpack-harddisk-plugin')
const thisIP=require("ip").address()

module.exports=(base,HTML,port)=>{
	return {
		...base,
		entry:["babel-polyfill","./style/index.less","./.test.mongo.js","./src/index.js"],
		devtool: 'source-map',
		devServer:{
			contentBase: path.join(__dirname, "dist"),
			port,
			host:"0.0.0.0",
			disableHostCheck:true,
			setup(app){
				app.get("/app.apk.version",(req, res)=>res.json(require("./package.json").version))
			}
		}
	}
}
