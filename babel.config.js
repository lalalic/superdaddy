module.exports={
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ],
    "plugins": [
		"babel-plugin-relay",
		"@babel/plugin-proposal-object-rest-spread",
		"@babel/plugin-proposal-class-properties",
	  	"@babel/plugin-syntax-dynamic-import",
		["module-resolver",{
				"root": ["."],
				"alias":{
					"knowledge":"./src/knowledge",
					"publish":"./src/publish",
					"time-manage":"./src/time-manage",
					"setting":"./src/setting",
					"tv":"./tv",
					"components":"./src/components",
					"icons": "./src/icons",
					"family": "./src/family"
				}
			}]
	]
}
