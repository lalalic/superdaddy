module.exports=()=>({
    entry:["@babel/polyfill","./cloud/index.js"],
    target:"node",
    externals: [
        function(context, request, callback){
            switch(request){
                case "react":
                case "react-dom/server":
                case "react-router":
                    return callback(null, 'commonjs '+request)
            }

            callback()
        }
    ],
    output:{
        path:`${__dirname}/cloud`,
        filename:"__generated.js",
        libraryTarget:"commonjs2"
    },
    mode:"production",
    //devtool:"eval-source-map",
    module: {
        rules: [{
            test: /.js?$/,
            use: ['source-map-loader'],
            enforce:"pre",
        },
        { 
            test: /\.(js)$/, 
            use: "babel-loader",
            exclude: /node_modules/, 
        },{
            test:/.less?$/,
            use: [
                'css-loader',
                'less-loader',
            ]
        }]
    },
})