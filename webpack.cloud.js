var path = require('path');

module.exports={
	entry:{
		main:"./cloud/index.js",
	},
	output:{
		filename:"[name].js",
		path:path.resolve(__dirname, 'cloud')
	},
	devtool: false,
	target: "node"
}
