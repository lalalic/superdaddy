const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin=require('html-webpack-harddisk-plugin')
const thisIP=require("ip").address()

module.exports=(base,HTML,port)=>{
	return {
		...base,
		entry:{
			index: ["babel-polyfill","./.test.mongo.js","./src/index.js"],
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
		module:{
			...base.module,
			rules:base.module.rules.map((a,i)=>{
				if(i==0){
					a.include.push(path.resolve(__dirname, ".test.mongo.js"))
				}
				return a
			})
		}
	}
}
