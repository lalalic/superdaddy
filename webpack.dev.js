const webpack=require("webpack")

module.exports={
	entry:{
		index:["babel-polyfill","./.test.mongo.js", "./src/index.js"],
		tv: ["babel-polyfill","./.test.mongo.js", "./src/tv/index.js"],
		parser: "./src/knowledge/parse.js"
	},
	plugins:[
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common'
		})
	],
	watchOptions:{
		
	}
}
