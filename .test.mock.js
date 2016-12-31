require('restmock');

require("qili-app").QiliApp.WrappedComponent.defaultProps.service='http://localhost:9080/1/'
require("./package.json").homepage="http://localhost:"+require("./mock.json").port

module.exports=require('./lib') 
