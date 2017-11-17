import React from "react"
import Qili from "qili"
import project from "./package.json"
import File from "qili/components/file"

const host=window.location.hostname

project.homepage=`http://${host}:9081`

const _render=Qili.render
Qili.render=function(app){
	_render(React.cloneElement(app, {
		service: `http://${host}:9080/1/graphql`,
		isDev:false
	}))
}

const _upload=File.upload
File.upload=function(){
	return _upload(...arguments).catch(a=>a).then(a=>"images/icon.svg")
}
