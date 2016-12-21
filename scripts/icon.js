module.exports=function(context){
	var root=`${__dirname}\\..\\dist\\images\\`
	return require("svg-to-png")
		.convert(
			require("fs").readdirSync(root)
				.filter(a=>{
					return a.endsWith("svg")
				})
				.map(a=>root+a)
			, `${__dirname}/../cordova/res/`)
}
