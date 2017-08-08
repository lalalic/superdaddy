module.exports={
	entry:{
		index:["babel-polyfill","./.test.mongo.js", "./src/index.js"],
		tv: ["babel-polyfill","./.test.mongo.js", "./src/tv/index.js"],
	}
}
