import React from "react"
import project from "./package.json"
import Qili from "qili"
import File from "qili/components/file"

const _upload=File.upload
File.upload=function(){
	return _upload(...arguments).catch(a=>a).then(a=>"images/icon.svg")
}

project.homepage=`http://127.0.0.1:9082`

const _render=Qili.render
Qili.render=function(app){
	_render(React.cloneElement(app, {
		service:`http://localhost:9080/1/graphql`,
		isDev:false
	}))
}
