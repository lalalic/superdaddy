const {DefinePlugin} = require("webpack")

module.exports=()=>({
    entry:["./cloud/index.js"],
    target:"node",
    externals: [
        function(context, request, callback){
            switch(request){
                case "react":
                case "react-dom/server":
                case "react-router":
                    return callback(null, 'commonjs '+request)
            }

            if(request.startsWith("material"))
                return callback(null, 'commonjs '+request)
            callback()
        }
    ],
    //["react","react-dom","react-router",],
    output:{
        path:`${__dirname}/cloud`,
        filename:"__generated.js",
    },
    module: {
        rules: [
          { test: /\.(js)$/, use: 'babel-loader' }
        ]
    },
    plugins:[
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ],

})