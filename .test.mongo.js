require("qili-app").QiliApp.WrappedComponent.defaultProps.service='http://localhost:9080/1/'
require("./package.json").homepage="http://localhost:"+require("./mock.json").port
require("qili-app").File.upload=a=>Promise.resolve("images/icon.svg")
