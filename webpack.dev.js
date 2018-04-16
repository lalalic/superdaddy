const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin=require('html-webpack-harddisk-plugin')
const thisIP=require("ip").address()

module.exports=(base,HTML,port)=>{
	const index=[...base.entry.index]
	index.splice(base.entry.index.length-1,0,"./.test.mongo.js")
	return {
		...base,
		entry:{
			index
		},
		devtool: 'source-map',
		devServer:{
			contentBase: path.join(__dirname, "dist"),
			compress: true,
			port,
			host:"0.0.0.0",
			disableHostCheck:true,
			hot:true,
			inline:false, //for apk
			setup(app){
				app.get("/app.apk.version",(req, res)=>res.json(require("./package.json").version))
			}
		}
	}
}
